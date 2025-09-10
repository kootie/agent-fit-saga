import express from 'express';
import { param, body, validationResult } from 'express-validator';
import db from '../database/db.js';
import { ethers } from 'ethers';

const router = express.Router();

// Standard error response helper (API Standards)
const handleError = (res, error, code = 'INTERNAL_ERROR', status = 500) => {
  console.error(`API Error [${code}]:`, error);
  return res.status(status).json({
    error: typeof error === 'string' ? error : error.message,
    code,
    details: process.env.NODE_ENV === 'development' ? error.stack || {} : {},
    timestamp: new Date().toISOString()
  });
};

// Validation middleware
const validateWalletAddress = param('walletAddress').custom(value => {
  if (!ethers.isAddress(value)) {
    throw new Error('Invalid wallet address format');
  }
  return true;
});

// Get user by wallet address (Following both steering rules)
router.get('/:walletAddress', [validateWalletAddress], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: errors.array(),
      timestamp: new Date().toISOString()
    });
  }

  const { walletAddress } = req.params;
  
  // Blockchain Standards: Address validation already done by middleware
  // API Standards: Parameterized query to prevent SQL injection
  db.get(
    'SELECT * FROM users WHERE wallet_address = ?',
    [walletAddress.toLowerCase()],
    (err, row) => {
      if (err) {
        return handleError(res, err, 'DATABASE_ERROR');
      }
      
      if (!row) {
        return res.status(404).json({
          error: 'User not found',
          code: 'USER_NOT_FOUND',
          details: { walletAddress },
          timestamp: new Date().toISOString()
        });
      }
      
      // API Standards: Consistent response format
      res.json({
        data: row,
        timestamp: new Date().toISOString()
      });
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