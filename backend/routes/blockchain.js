import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { ethers } from 'ethers';
import db from '../database/db.js';

const router = express.Router();

// Standard error response helper (API Standards)
const handleError = (res, error, code = 'BLOCKCHAIN_ERROR', status = 500) => {
  console.error(`Blockchain Error [${code}]:`, error);
  return res.status(status).json({
    error: typeof error === 'string' ? error : error.message,
    code,
    details: process.env.NODE_ENV === 'development' ? error.stack || {} : {},
    timestamp: new Date().toISOString()
  });
};

// Initialize Base provider
const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);

// Record blockchain operation
router.post('/operation', (req, res) => {
  const { walletAddress, operationType, txHash, contractAddress, gasUsed } = req.body;
  
  if (!ethers.isAddress(walletAddress)) {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  // First get user ID
  db.get(
    'SELECT id FROM users WHERE wallet_address = ?',
    [walletAddress.toLowerCase()],
    (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Insert blockchain operation
      db.run(
        'INSERT INTO blockchain_operations (user_id, operation_type, tx_hash, contract_address, gas_used) VALUES (?, ?, ?, ?, ?)',
        [user.id, operationType, txHash, contractAddress, gasUsed],
        function(err) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to record operation' });
          }
          
          res.json({
            id: this.lastID,
            operationType,
            txHash,
            contractAddress,
            gasUsed,
            status: 'pending'
          });
        }
      );
    }
  );
});

// Get user's blockchain operations
router.get('/operations/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  
  if (!ethers.isAddress(walletAddress)) {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  db.all(
    `SELECT bo.* FROM blockchain_operations bo 
     JOIN users u ON bo.user_id = u.id 
     WHERE u.wallet_address = ? 
     ORDER BY bo.created_at DESC`,
    [walletAddress.toLowerCase()],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

// Query blockchain data with full steering rules compliance
router.get('/query/:address', [
  param('address').custom(value => {
    if (!ethers.isAddress(value)) {
      throw new Error('Invalid blockchain address format');
    }
    return true;
  })
], async (req, res) => {
  // API Standards: Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Invalid address format',
      code: 'INVALID_ADDRESS',
      details: errors.array(),
      timestamp: new Date().toISOString()
    });
  }

  const { address } = req.params;
  const MAX_RETRIES = 3;

  // Blockchain Standards: Implement retry logic for failed blockchain calls
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Blockchain Standards: Proper error handling for all blockchain operations
      const [balance, transactionCount] = await Promise.all([
        provider.getBalance(address),
        provider.getTransactionCount(address)
      ]);

      // API Standards: Log all blockchain interactions for audit
      console.log(`Blockchain query successful - Attempt ${attempt}`, {
        address,
        timestamp: new Date().toISOString()
      });

      // API Standards: Consistent response format with metadata
      return res.json({
        data: {
          address,
          balance: ethers.formatEther(balance),
          balanceWei: balance.toString(),
          transactionCount,
          network: 'Base'
        },
        metadata: {
          attempt,
          queryTime: new Date().toISOString(),
          provider: 'Base Network'
        }
      });
    } catch (error) {
      console.error(`Blockchain query attempt ${attempt} failed:`, error);
      
      if (attempt === MAX_RETRIES) {
        return handleError(res, error, 'BLOCKCHAIN_QUERY_ERROR');
      }
      
      // Blockchain Standards: Exponential backoff for retries
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
});

// Get contract information
router.get('/contract/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: 'Invalid contract address' });
    }
    
    // Check if address is a contract
    const code = await provider.getCode(address);
    const isContract = code !== '0x';
    
    if (!isContract) {
      return res.status(400).json({ error: 'Address is not a contract' });
    }
    
    const balance = await provider.getBalance(address);
    
    res.json({
      address,
      isContract: true,
      balance: ethers.formatEther(balance),
      bytecodeLength: code.length,
      network: 'Base'
    });
  } catch (error) {
    console.error('Contract query error:', error);
    res.status(500).json({ error: 'Failed to query contract data' });
  }
});

export default router;