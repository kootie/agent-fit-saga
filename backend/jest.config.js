/**
 * Jest Configuration for Klunkaz Backend Tests
 * 
 * This configuration demonstrates:
 * 1. ES modules support for modern JavaScript
 * 2. Test coverage reporting
 * 3. Test environment setup
 * 4. Auto-test hook integration
 */

export default {
  // Use Node.js environment for backend testing
  testEnvironment: 'node',
  
  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],
  
  // Coverage configuration
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov'
  ],
  
  // Files to include in coverage
  collectCoverageFrom: [
    'routes/**/*.js',
    'database/**/*.js',
    'server.js',
    '!**/node_modules/**',
    '!**/tests/**'
  ],
  
  // Test timeout
  testTimeout: 10000,
  
  // Verbose output for detailed test results
  verbose: true
};