# Klunkaz Backend

A minimal MVP backend for Klunkaz platform with Krnl and Base blockchain integration.

## Features

- **SQLite Database**: Lightweight database for user data and transactions
- **Base Network Integration**: Native support for Base blockchain
- **Krnl Integration**: Advanced blockchain operations via Krnl
- **Wallet Authentication**: Secure wallet-based user authentication
- **RESTful API**: Clean API endpoints for frontend integration

## Quick Start

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Initialize Database**
   ```bash
   npm run init-db
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## API Endpoints

### Users
- `GET /api/users/:walletAddress` - Get user by wallet address
- `POST /api/users` - Create or update user
- `GET /api/users/:walletAddress/transactions` - Get user transactions

### Wallet
- `GET /api/wallet/:address/balance` - Get wallet balance
- `POST /api/wallet/verify` - Verify wallet signature
- `POST /api/wallet/transaction` - Record transaction

### Krnl
- `POST /api/krnl/execute` - Execute Krnl action
- `GET /api/krnl/interactions/:walletAddress` - Get Krnl interactions

### Health
- `GET /api/health` - Health check endpoint

## Database Schema

### Users Table
- `id` - Primary key
- `wallet_address` - Unique wallet address
- `username` - Optional username
- `email` - Optional email
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Transactions Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `tx_hash` - Unique transaction hash
- `type` - Transaction type
- `amount` - Transaction amount
- `status` - Transaction status
- `created_at` - Creation timestamp

### Krnl Interactions Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `action_type` - Type of Krnl action
- `payload` - JSON payload
- `response` - JSON response
- `status` - Interaction status
- `created_at` - Creation timestamp

## Configuration

### Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `BASE_RPC_URL` - Base network RPC URL
- `BASE_CHAIN_ID` - Base network chain ID
- `PRIVATE_KEY` - Private key for blockchain operations
- `DB_PATH` - SQLite database path
- `KRNL_API_KEY` - Krnl API key

## Development

The backend is built with:
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **Ethers.js** - Ethereum library
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API rate limiting

## Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Configure production database
3. Set up proper CORS origins
4. Configure rate limiting
5. Set up SSL/TLS
6. Configure monitoring and logging