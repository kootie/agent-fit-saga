import express from 'express';
import { param, body, validationResult } from 'express-validator';
import { ethers } from 'ethers';
import db from '../database/db.js';

const router = express.Router();

// Initialize Base provider
const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);

// Get wallet balance (Following both steering rules)
router.get('/:address/balance', [
  param('address').custom(value => {
    if (!ethers.isAddress(value)) {
      throw new Error('Invalid wallet address format');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Invalid wallet address',
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
      const balance = await provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balance);
      
      // API Standards: Consistent response format with metadata
      return res.json({
        data: {
          address,
          balance: balanceInEth,
          balanceWei: balance.toString(),
          network: 'Base'
        },
        metadata: {
          attempt,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error(`Balance fetch attempt ${attempt} failed:`, error);
      
      if (attempt === MAX_RETRIES) {
        return res.status(500).json({
          error: 'Failed to fetch balance after retries',
          code: 'BALANCE_FETCH_ERROR',
          details: { 
            address, 
            attempts: MAX_RETRIES,
            lastError: error.message 
          },
          timestamp: new Date().toISOString()
        });
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
});

// Verify wallet signature
router.post('/verify', (req, res) => {
  try {
    const { message, signature, address } = req.body;
    
    if (!message || !signature || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const recoveredAddress = ethers.verifyMessage(message, signature);
    const isValid = recoveredAddress.toLowerCase() === address.toLowerCase();
    
    res.json({
      isValid,
      recoveredAddress,
      providedAddress: address
    });
  } catch (error) {
    console.error('Error verifying signature:', error);
    res.status(500).json({ error: 'Failed to verify signature' });
  }
});

// Record transaction
router.post('/transaction', (req, res) => {
  const { walletAddress, txHash, type, amount } = req.body;
  
  if (!ethers.isAddress(walletAddress) || !txHash) {
    return res.status(400).json({ error: 'Invalid wallet address or transaction hash' });
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

      // Insert transaction
      db.run(
        'INSERT INTO transactions (user_id, tx_hash, type, amount) VALUES (?, ?, ?, ?)',
        [user.id, txHash, type, amount],
        function(err) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to record transaction' });
          }
          
          res.json({
            id: this.lastID,
            txHash,
            type,
            amount,
            status: 'pending'
          });
        }
      );
    }
  );
});

export default router;