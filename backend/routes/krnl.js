import express from 'express';
import axios from 'axios';
import db from '../database/db.js';

const router = express.Router();

// Krnl API base configuration
const KRNL_API_BASE = 'https://api.krnl.dev'; // Replace with actual Krnl API endpoint
const KRNL_API_KEY = process.env.KRNL_API_KEY;

// Execute Krnl action
router.post('/execute', async (req, res) => {
  try {
    const { walletAddress, actionType, payload } = req.body;
    
    if (!walletAddress || !actionType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get user ID
    const user = await new Promise((resolve, reject) => {
      db.get(
        'SELECT id FROM users WHERE wallet_address = ?',
        [walletAddress.toLowerCase()],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Record the interaction
    const interactionId = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO krnl_interactions (user_id, action_type, payload, status) VALUES (?, ?, ?, ?)',
        [user.id, actionType, JSON.stringify(payload), 'processing'],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    // Execute Krnl action (mock implementation)
    const krnlResponse = await executeKrnlAction(actionType, payload);
    
    // Update interaction with response
    db.run(
      'UPDATE krnl_interactions SET response = ?, status = ? WHERE id = ?',
      [JSON.stringify(krnlResponse), 'completed', interactionId]
    );

    res.json({
      interactionId,
      actionType,
      status: 'completed',
      response: krnlResponse
    });

  } catch (error) {
    console.error('Krnl execution error:', error);
    res.status(500).json({ error: 'Failed to execute Krnl action' });
  }
});

// Get user's Krnl interactions
router.get('/interactions/:walletAddress', (req, res) => {
  const { walletAddress } = req.params;
  
  db.all(
    `SELECT ki.* FROM krnl_interactions ki 
     JOIN users u ON ki.user_id = u.id 
     WHERE u.wallet_address = ? 
     ORDER BY ki.created_at DESC`,
    [walletAddress.toLowerCase()],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Parse JSON fields
      const interactions = rows.map(row => ({
        ...row,
        payload: row.payload ? JSON.parse(row.payload) : null,
        response: row.response ? JSON.parse(row.response) : null
      }));
      
      res.json(interactions);
    }
  );
});

// Mock Krnl action execution
async function executeKrnlAction(actionType, payload) {
  // This is a mock implementation - replace with actual Krnl API calls
  switch (actionType) {
    case 'deploy_contract':
      return {
        contractAddress: '0x' + Math.random().toString(16).substr(2, 40),
        txHash: '0x' + Math.random().toString(16).substr(2, 64),
        gasUsed: '21000'
      };
    
    case 'execute_transaction':
      return {
        txHash: '0x' + Math.random().toString(16).substr(2, 64),
        status: 'success',
        gasUsed: '45000'
      };
    
    case 'query_data':
      return {
        data: payload,
        timestamp: new Date().toISOString(),
        source: 'krnl'
      };
    
    default:
      throw new Error(`Unknown action type: ${actionType}`);
  }
}

export default router;