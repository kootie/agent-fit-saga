# Blockchain Development Standards

## Code Standards
- Always use ethers.js v6 for blockchain interactions
- Implement proper error handling for all blockchain operations
- Use environment variables for network configuration
- Validate all wallet addresses using ethers.isAddress()
- Implement retry logic for failed blockchain calls

## Security Guidelines
- Never expose private keys in client-side code
- Always validate user inputs before blockchain operations
- Use proper gas estimation for transactions
- Implement rate limiting for blockchain API calls
- Log all blockchain interactions for audit trails

## Best Practices
- Use TypeScript for type safety
- Implement comprehensive error messages
- Cache blockchain data when appropriate
- Use proper network detection and switching
- Implement graceful fallbacks for network issues

## Testing Requirements
- Mock blockchain calls in unit tests
- Test with both mainnet and testnet configurations
- Validate error handling scenarios
- Test wallet connection and disconnection flows
- Verify transaction status tracking