import { initDatabase } from '../database/db.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔧 Initializing Klunkaz database...');

initDatabase()
  .then(() => {
    console.log('✅ Database initialization completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  });