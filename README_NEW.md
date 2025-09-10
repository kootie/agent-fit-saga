# Klunkaz MVP

A minimal viable product showcasing direct Base blockchain integration with a modern React frontend and Node.js backend.

## 🚀 System Features

### 🔐 **Wallet & Authentication**
- **MetaMask Integration**: Seamless wallet connection with automatic network switching
- **Base Network Support**: Auto-detection and switching to Base mainnet/testnet
- **Signature Verification**: Cryptographic signature validation for secure authentication
- **Multi-Wallet Support**: Compatible with MetaMask and other Web3 wallets
- **Session Management**: Persistent user sessions with secure token handling

### ⚡ **Direct Blockchain Operations**
- **Address Queries**: Query any address information on Base network
- **Contract Information**: Get detailed contract data and bytecode information
- **Transaction Monitoring**: Track and monitor blockchain transactions
- **Operation History**: Complete audit trail of all blockchain operations
- **Real-time Status**: Live updates on blockchain query execution

### 🌐 **Base Blockchain Features**
- **Balance Tracking**: Real-time ETH balance monitoring on Base network
- **Transaction History**: Complete transaction log with Base explorer integration
- **Gas Optimization**: Efficient gas usage through Base's L2 scaling
- **Block Explorer Links**: Direct links to BaseScan for transaction verification
- **Network Health**: Connection status and network performance monitoring

### 💾 **Database & Storage**
- **SQLite Backend**: Lightweight, serverless database for optimal performance
- **User Profiles**: Wallet-linked user accounts with customizable profiles
- **Transaction Logs**: Comprehensive transaction history with metadata
- **Blockchain Operation Records**: Detailed logs of all blockchain operations
- **Session Persistence**: Secure session storage and management

### 🎨 **User Interface**
- **Modern Design**: Clean, responsive UI built with Tailwind CSS and Shadcn/ui
- **Interactive Demo**: Live demo environment for testing all features
- **Real-time Updates**: Dynamic UI updates without page refreshes
- **Mobile Responsive**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Adaptive theming based on user preferences

### 🔒 **Security Features**
- **Rate Limiting**: API protection against abuse and spam
- **CORS Protection**: Secure cross-origin resource sharing configuration
- **Input Validation**: Comprehensive validation of all user inputs
- **Error Handling**: Graceful error handling with user-friendly messages
- **Environment Isolation**: Secure separation of development and production configs

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Shadcn/ui** for UI components
- **Ethers.js** for Web3 integration
- **React Query** for data fetching

### Backend
- **Node.js** with Express
- **SQLite3** database
- **Ethers.js** for blockchain interaction
- **CORS** and security middleware
- **Rate limiting** for API protection

### Blockchain
- **Base Network** (Ethereum L2)
- **Direct blockchain** integration
- **MetaMask** wallet integration

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask browser extension

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd klunkaz-mvp
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment setup**
   ```bash
   # Frontend
   cp .env.example .env
   
   # Backend
   cp backend/.env.example backend/.env
   ```

5. **Initialize database**
   ```bash
   cd backend
   npm run init-db
   cd ..
   ```

6. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start individually:
   # Frontend: npm run dev
   # Backend: cd backend && npm run dev
   ```

7. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Demo: http://localhost:5173/demo

## 📱 Usage

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Switch to Base**: The app will prompt you to switch to Base network
3. **Explore Features**: 
   - View wallet balance
   - Execute blockchain queries
   - Monitor transaction history
   - See real-time updates

## 🔧 Configuration

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:3001/api
```

### Backend Environment Variables
```env
PORT=3001
NODE_ENV=development
BASE_RPC_URL=https://sepolia.base.org
BASE_CHAIN_ID=84532
DB_PATH=./database/klunkaz.db
# No external API keys required for direct blockchain operations
```

## 📚 API Documentation

### 👤 **User Management Endpoints**

#### `GET /api/users/:walletAddress`
Get user profile by wallet address

#### `POST /api/users`
Create or update user profile

#### `GET /api/users/:walletAddress/transactions`
Get user's transaction history

### 💰 **Wallet Management Endpoints**

#### `GET /api/wallet/:address/balance`
Get wallet balance on Base network

#### `POST /api/wallet/verify`
Verify wallet signature for authentication

#### `POST /api/wallet/transaction`
Record a new transaction

### ⚡ **Blockchain Integration Endpoints**

#### `POST /api/blockchain/operation`
Record blockchain operation

#### `GET /api/blockchain/operations/:walletAddress`
Get user's blockchain operation history

#### `GET /api/blockchain/query/:address`
Query blockchain data for an address

#### `GET /api/blockchain/contract/:address`
Get contract information

### 🏥 **System Health Endpoints**

#### `GET /api/health`
System health check

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        KLUNKAZ MVP ARCHITECTURE                  │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   Frontend      │   Backend API   │      Blockchain Layer       │
│   (React)       │   (Node.js)     │      (Base Network)         │
│                 │                 │                             │
│ ┌─────────────┐ │ ┌─────────────┐ │ ┌─────────────────────────┐ │
│ │ Wallet UI   │ │ │ REST API    │ │ │ Base Network            │ │
│ │ • Connect   │◄┼►│ • Users     │◄┼►│ • ETH Transactions      │ │
│ │ • Balance   │ │ │ • Wallet    │ │ │ • Smart Contracts       │ │
│ │ • History   │ │ │ • Blockchain│ │ │ • Gas Optimization      │ │
│ └─────────────┘ │ └─────────────┘ │ └─────────────────────────┘ │
│                 │                 │                             │
│ ┌─────────────┐ │ ┌─────────────┐ │ ┌─────────────────────────┐ │
│ │ Blockchain  │ │ │ SQLite DB   │ │ │ Direct Integration      │ │
│ │ • Query     │ │ │ • Users     │ │ │ • Address Queries       │ │
│ │ • Monitor   │ │ │ • Txns      │ │ │ • Contract Information  │ │
│ │ • History   │ │ │ • Sessions  │ │ │ • Transaction Monitoring│ │
│ └─────────────┘ │ └─────────────┘ │ └─────────────────────────┘ │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

## 📋 **Feature Matrix**

| Feature Category | Component | Status | Description |
|-----------------|-----------|---------|-------------|
| **Authentication** | Wallet Connect | ✅ Complete | MetaMask integration with Base network |
| | Signature Verify | ✅ Complete | Cryptographic signature validation |
| | Session Management | ✅ Complete | Persistent user sessions |
| **Blockchain** | Base Integration | ✅ Complete | Native Base network support |
| | Balance Tracking | ✅ Complete | Real-time ETH balance monitoring |
| | Transaction History | ✅ Complete | Complete transaction logs |
| **Blockchain Operations** | Address Queries | ✅ Complete | Query any address on Base network |
| | Contract Information | ✅ Complete | Get contract data and bytecode |
| | Operation History | ✅ Complete | Complete operation audit trail |
| **Database** | User Management | ✅ Complete | SQLite-based user profiles |
| | Transaction Logs | ✅ Complete | Comprehensive transaction storage |
| | Operation Records | ✅ Complete | Blockchain operation audit trail |
| **Security** | Rate Limiting | ✅ Complete | API abuse protection |
| | Input Validation | ✅ Complete | Comprehensive input sanitization |
| | Error Handling | ✅ Complete | Graceful error management |
| **UI/UX** | Responsive Design | ✅ Complete | Mobile-first responsive interface |
| | Real-time Updates | ✅ Complete | Dynamic UI without page refreshes |
| | Interactive Demo | ✅ Complete | Live feature demonstration |

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd backend
# Set environment variables
# Deploy with your preferred platform
```

## 🆘 Support & Community

### Getting Help
- 📖 **Documentation**: Check this README and `/demo` page
- 🐛 **Issues**: Create GitHub issue with detailed description
- 💬 **Discussions**: Join community discussions

### Resources
- [Base Network Documentation](https://docs.base.org)
- [MetaMask Developer Docs](https://docs.metamask.io)
- [Ethers.js Documentation](https://docs.ethers.org)

---

**Built with ❤️ for the Web3 community**

*Klunkaz MVP - Empowering the future of decentralized applications*