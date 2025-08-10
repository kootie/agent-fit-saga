import express from 'express';
import { ethers } from 'ethers';
import db from '../database/db.js';

const router = express.Router();

// Initialize Base provider
const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);

// Get wallet balance
router.get('/:address/balance', async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.formatEther(balance);
    
    res.json({
      address,
      balance: balanceInEth,
      balanceWei: balance.toString(),
      network: 'Base'
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
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