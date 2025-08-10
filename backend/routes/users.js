import express from 'express';
import db from '../database/db.js';
import { ethers } from 'ethers';

const router = express.Router();

// Get user by wallet address
router.get('/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  
  if (!ethers.isAddress(walletAddress)) {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  db.get(
    'SELECT * FROM users WHERE wallet_address = ?',
    [walletAddress.toLowerCase()],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!row) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(row);
    }
  );
});

// Create or update user
router.post('/', (req, res) => {
  const { walletAddress, username, email } = req.body;
  
  if (!ethers.isAddress(walletAddress)) {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  const normalizedAddress = walletAddress.toLowerCase();
  
  db.run(
    `INSERT OR REPLACE INTO users (wallet_address, username, email, updated_at) 
     VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
    [normalizedAddress, username, email],
    function(err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Get the created/updated user
      db.get(
        'SELECT * FROM users WHERE wallet_address = ?',
        [normalizedAddress],
        (err, row) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
          }
          res.json(row);
        }
      );
    }
  );
});

// Get user transactions
router.get('/:walletAddress/transactions', (req, res) => {
  const { walletAddress } = req.params;
  
  if (!ethers.isAddress(walletAddress)) {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  db.all(
    `SELECT t.* FROM transactions t 
     JOIN users u ON t.user_id = u.id 
     WHERE u.wallet_address = ? 
     ORDER BY t.created_at DESC`,
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

export default router;