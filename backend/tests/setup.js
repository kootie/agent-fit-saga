/**
 * Test Setup for Klunkaz Backend
 * 
 * This setup file:
 * 1. Configures test environment
 * 2. Sets up database for testing
 * 3. Provides test utilities
 * 4. Demonstrates auto-test hook integration
 */

import { beforeAll, afterAll } from '@jest/globals';
import { initDatabase } from '../database/db.js';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Global test setup
beforeAll(async () => {
  console.log('🧪 Setting up test environment...');
  
  // Initialize test database
  await initDatabase();
  
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.DB_PATH = ':memory:'; // Use in-memory database for tests
  
  console.log('✅ Test environment ready');
});

// Global test cleanup
afterAll(async () => {
  console.log('🧹 Cleaning up test environment...');
  
  // Close database connections
  // Add any cleanup logic here
  
  console.log('✅ Test cleanup completed');
});

// Test utilities
export const testUtils = {
  // Generate valid Ethereum address for testing
  generateValidAddress: () => '0x742d35Cc6634C0532925a3b8D0C9e3e0C0e8b4C0',
  
  // Generate invalid address for testing
  generateInvalidAddress: () => '0xinvalid',
  
  // Generate test transaction hash
  generateTxHash: () => '0x' + '1'.repeat(64),
  
  // Wait for async operations
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Mock blockchain provider responses
  mockProviderResponse: (data) => ({
    data,
    metadata: {
      attempt: 1,
      timestamp: new Date().toISOString()
    }
  })
};

// Console override for cleaner test output
const originalConsoleLog = console.log;
console.log = (...args) => {
  if (process.env.NODE_ENV === 'test' && !process.env.VERBOSE_TESTS) {
    // Only show test-related logs
    if (args[0]?.includes('🧪') || args[0]?.includes('✅') || args[0]?.includes('❌')) {
      originalConsoleLog(...args);
    }
  } else {
    originalConsoleLog(...args);
  }
};