# Klunkaz MVP

A minimal viable product showcasing Krnl and Base blockchain integration with a modern React frontend and Node.js backend.

## 🚀 System Features

### 🔐 **Wallet & Authentication**

- **MetaMask Integration**: Seamless wallet connection with automatic network switching
- **Base Network Support**: Auto-detection and switching to Base mainnet/testnet
- **Signature Verification**: Cryptographic signature validation for secure authentication
- **Multi-Wallet Support**: Compatible with MetaMask and other Web3 wallets
- **Session Management**: Persistent user sessions with secure token handling

### ⚡ **Krnl Integration**

- **Contract Deployment**: Deploy smart contracts directly through Krnl infrastructure
- **Transaction Execution**: Execute complex blockchain transactions with Krnl optimization
- **Data Querying**: Query blockchain data efficiently using Krnl's indexing
- **Action History**: Complete audit trail of all Krnl operations
- **Real-time Status**: Live updates on Krnl action execution status

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
- **Krnl Interaction Records**: Detailed logs of all Krnl operations
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

### 📊 **Analytics & Monitoring**

- **Health Checks**: System health monitoring endpoints
- **Performance Metrics**: Response time and throughput monitoring
- **Error Tracking**: Comprehensive error logging and reporting
- **User Activity**: Detailed logs of user interactions and behaviors
- **API Usage**: Request tracking and usage analytics

### 🔧 **Developer Features**

- **RESTful API**: Clean, well-documented API endpoints
- **TypeScript Support**: Full type safety across frontend and backend
- **Hot Reload**: Fast development with instant code updates
- **Comprehensive Logging**: Detailed logs for debugging and monitoring
- **Environment Configuration**: Flexible config management for different environments

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
- **Krnl** infrastructure
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
   # Edit backend/.env with your configuration
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
   - Execute Krnl actions
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
BASE_RPC_URL=https://mainnet.base.org
BASE_CHAIN_ID=8453
PRIVATE_KEY=your_private_key_here
DB_PATH=./database/klunkaz.db
KRNL_API_KEY=your_krnl_api_key_here
```

## 📚 API Documentation

### 👤 **User Management Endpoints**

#### `GET /api/users/:walletAddress`

Get user profile by wallet address

```json
Response: {
  "id": 1,
  "wallet_address": "0x...",
  "username": "user123",
  "email": "user@example.com",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z"
}
```

#### `POST /api/users`

Create or update user profile

```json
Request: {
  "walletAddress": "0x...",
  "username": "user123",
  "email": "user@example.com"
}
```

#### `GET /api/users/:walletAddress/transactions`

Get user's transaction history

```json
Response: [{
  "id": 1,
  "tx_hash": "0x...",
  "type": "transfer",
  "amount": "0.1",
  "status": "completed",
  "created_at": "2025-01-01T00:00:00Z"
}]
```

### 💰 **Wallet Management Endpoints**

#### `GET /api/wallet/:address/balance`

Get wallet balance on Base network

```json
Response: {
  "address": "0x...",
  "balance": "1.2345",
  "balanceWei": "1234500000000000000",
  "network": "Base"
}
```

#### `POST /api/wallet/verify`

Verify wallet signature for authentication

```json
Request: {
  "message": "Sign this message to authenticate",
  "signature": "0x...",
  "address": "0x..."
}
Response: {
  "isValid": true,
  "recoveredAddress": "0x...",
  "providedAddress": "0x..."
}
```

#### `POST /api/wallet/transaction`

Record a new transaction

```json
Request: {
  "walletAddress": "0x...",
  "txHash": "0x...",
  "type": "transfer",
  "amount": "0.1"
}
```

### ⚡ **Krnl Integration Endpoints**

#### `POST /api/krnl/execute`

Execute Krnl blockchain action

```json
Request: {
  "walletAddress": "0x...",
  "actionType": "deploy_contract",
  "payload": {
    "contractName": "MyContract",
    "constructorArgs": ["param1", "param2"],
    "gasLimit": "500000"
  }
}
Response: {
  "interactionId": 123,
  "actionType": "deploy_contract",
  "status": "completed",
  "response": {
    "contractAddress": "0x...",
    "txHash": "0x...",
    "gasUsed": "21000"
  }
}
```

#### `GET /api/krnl/interactions/:walletAddress`

Get user's Krnl interaction history

```json
Response: [{
  "id": 1,
  "action_type": "deploy_contract",
  "payload": {...},
  "response": {...},
  "status": "completed",
  "created_at": "2025-01-01T00:00:00Z"
}]
```

### 🏥 **System Health Endpoints**

#### `GET /api/health`

System health check

```json
Response: {
  "status": "OK",
  "timestamp": "2025-01-01T00:00:00Z",
  "service": "Klunkaz API"
}
```

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        KLUNKAZ MVP ARCHITECTURE                  │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   Frontend      │   Backend API   │      Blockchain Layer       │
│   (React)       │   (Node.js)     │      (Base + Krnl)         │
│                 │                 │                             │
│ ┌─────────────┐ │ ┌─────────────┐ │ ┌─────────────────────────┐ │
│ │ Wallet UI   │ │ │ REST API    │ │ │ Base Network            │ │
│ │ • Connect   │◄┼►│ • Users     │◄┼►│ • ETH Transactions      │ │
│ │ • Balance   │ │ │ • Wallet    │ │ │ • Smart Contracts       │ │
│ │ • History   │ │ │ • Krnl      │ │ │ • Gas Optimization      │ │
│ └─────────────┘ │ └─────────────┘ │ └─────────────────────────┘ │
│                 │                 │                             │
│ ┌─────────────┐ │ ┌─────────────┐ │ ┌─────────────────────────┐ │
│ │ Krnl Demo   │ │ │ SQLite DB   │ │ │ Krnl Infrastructure     │ │
│ │ • Deploy    │ │ │ • Users     │ │ │ • Contract Deployment   │ │
│ │ • Execute   │ │ │ • Txns      │ │ │ • Transaction Execution │ │
│ │ • Query     │ │ │ • Sessions  │ │ │ • Data Indexing         │ │
│ └─────────────┘ │ └─────────────┘ │ └─────────────────────────┘ │
│                 │                 │                             │
│ ┌─────────────┐ │ ┌─────────────┐ │ ┌─────────────────────────┐ │
│ │ Real-time   │ │ │ Security    │ │ │ Web3 Integration        │ │
│ │ • Updates   │ │ │ • CORS      │ │ │ • Ethers.js             │ │
│ │ • Monitoring│ │ │ • Rate Limit│ │ │ • MetaMask              │ │
│ │ • Analytics │ │ │ • Validation│ │ │ • Signature Verification│ │
│ └─────────────┘ │ └─────────────┘ │ └─────────────────────────┘ │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

## 📋 **Feature Matrix**

| Feature Category    | Component           | Status      | Description                            |
| ------------------- | ------------------- | ----------- | -------------------------------------- |
| **Authentication**  | Wallet Connect      | ✅ Complete | MetaMask integration with Base network |
|                     | Signature Verify    | ✅ Complete | Cryptographic signature validation     |
|                     | Session Management  | ✅ Complete | Persistent user sessions               |
| **Blockchain**      | Base Integration    | ✅ Complete | Native Base network support            |
|                     | Balance Tracking    | ✅ Complete | Real-time ETH balance monitoring       |
|                     | Transaction History | ✅ Complete | Complete transaction logs              |
| **Krnl Operations** | Contract Deploy     | ✅ Complete | Smart contract deployment via Krnl     |
|                     | Transaction Execute | ✅ Complete | Complex transaction execution          |
|                     | Data Query          | ✅ Complete | Blockchain data querying               |
| **Database**        | User Management     | ✅ Complete | SQLite-based user profiles             |
|                     | Transaction Logs    | ✅ Complete | Comprehensive transaction storage      |
|                     | Interaction History | ✅ Complete | Krnl operation audit trail             |
| **Security**        | Rate Limiting       | ✅ Complete | API abuse protection                   |
|                     | Input Validation    | ✅ Complete | Comprehensive input sanitization       |
|                     | Error Handling      | ✅ Complete | Graceful error management              |
| **UI/UX**           | Responsive Design   | ✅ Complete | Mobile-first responsive interface      |
|                     | Real-time Updates   | ✅ Complete | Dynamic UI without page refreshes      |
|                     | Interactive Demo    | ✅ Complete | Live feature demonstration             |

## 💻 **System Requirements**

### **Development Environment**

- **Node.js**: 18.0+ (LTS recommended)
- **npm**: 8.0+ or **yarn**: 1.22+
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### **Browser Requirements**

- **Chrome**: 90+ (recommended)
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **MetaMask Extension**: Latest version

### **Network Requirements**

- **Internet Connection**: Stable broadband
- **Base Network Access**: RPC endpoint connectivity
- **Krnl API Access**: Valid API key and connectivity

### **Hardware Requirements**

- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 1GB free space
- **CPU**: Modern multi-core processor

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔧 **Advanced Configuration**

### **Custom Krnl Endpoints**

```env
# backend/.env
KRNL_API_BASE=https://custom-krnl-endpoint.com
KRNL_TIMEOUT=30000
KRNL_RETRY_ATTEMPTS=3
```

### **Database Optimization**

```env
# backend/.env
DB_PATH=./database/klunkaz.db
DB_POOL_SIZE=10
DB_TIMEOUT=5000
```

### **Security Hardening**

```env
# backend/.env
RATE_LIMIT_WINDOW=900000  # 15 minutes
RATE_LIMIT_MAX=100        # requests per window
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

## 🐛 **Troubleshooting**

### **Common Issues**

#### **"Cannot connect to MetaMask"**

- ✅ Ensure MetaMask is installed and unlocked
- ✅ Check if site is allowed in MetaMask settings
- ✅ Try refreshing the page and reconnecting

#### **"Network not supported"**

- ✅ App will auto-prompt to add Base network
- ✅ Manually add Base network in MetaMask if needed
- ✅ Check RPC URL configuration in backend/.env

#### **"Krnl API key invalid"**

- ✅ Verify API key is correctly set in backend/.env
- ✅ Check API key hasn't expired
- ✅ Ensure no extra spaces or characters

#### **"Database connection failed"**

- ✅ Run `npm run init-db` in backend directory
- ✅ Check DB_PATH permissions
- ✅ Ensure SQLite3 is properly installed

#### **"CORS errors in browser"**

- ✅ Check CORS_ORIGINS in backend/.env
- ✅ Ensure frontend URL is whitelisted
- ✅ Restart backend server after config changes

### **Debug Mode**

```bash
# Enable detailed logging
NODE_ENV=development DEBUG=* npm run dev:full
```

### **Health Checks**

```bash
# Check backend health
curl http://localhost:3001/api/health

# Check database
cd backend && npm run init-db
```

## 📊 **Performance Optimization**

### **Frontend Optimization**

- **Code Splitting**: Lazy loading implemented for components
- **Bundle Size**: Optimized with Vite's tree shaking
- **Caching**: Browser caching for static assets
- **Image Optimization**: Compressed logo and assets

### **Backend Optimization**

- **Database Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: Efficient database connection management
- **Rate Limiting**: Prevents API abuse and ensures stability
- **Compression**: Gzip compression for API responses

### **Blockchain Optimization**

- **Gas Estimation**: Automatic gas price optimization
- **Batch Operations**: Multiple operations in single transaction
- **Caching**: Balance and transaction data caching
- **Error Recovery**: Automatic retry for failed operations

## 🚀 **Production Deployment**

### **Environment Setup**

```bash
# Production environment variables
NODE_ENV=production
BASE_RPC_URL=https://mainnet.base.org
CORS_ORIGINS=https://yourdomain.com
RATE_LIMIT_MAX=1000
```

### **Security Checklist**

- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] Database backed up
- [ ] Monitoring enabled
- [ ] Error tracking configured

### **Monitoring**

- **Health Checks**: `/api/health` endpoint
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Response time monitoring
- **User Analytics**: Usage pattern tracking

## 🆘 **Support & Community**

### **Getting Help**

- 📖 **Documentation**: Check this README and `/demo` page
- 🐛 **Issues**: Create GitHub issue with detailed description
- 💬 **Discussions**: Join community discussions
- 📧 **Contact**: Reach out for enterprise support

### **Contributing**

- 🍴 Fork the repository
- 🌟 Star if you find it useful
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 🔧 Submit pull requests

### **Resources**

- [Base Network Documentation](https://docs.base.org)
- [Krnl Documentation](https://docs.krnl.dev)
- [MetaMask Developer Docs](https://docs.metamask.io)
- [Ethers.js Documentation](https://docs.ethers.org)

---

**Built with ❤️ for the Web3 community**

_Klunkaz MVP - Empowering the future of decentralized applications_
