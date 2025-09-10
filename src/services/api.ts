const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User endpoints
  async getUser(walletAddress: string) {
    return this.request(`/users/${walletAddress}`);
  }

  async createUser(userData: { walletAddress: string; username?: string; email?: string }) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUserTransactions(walletAddress: string) {
    return this.request(`/users/${walletAddress}/transactions`);
  }

  // Wallet endpoints
  async getWalletBalance(address: string) {
    return this.request(`/wallet/${address}/balance`);
  }

  async verifyWalletSignature(data: { message: string; signature: string; address: string }) {
    return this.request('/wallet/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async recordTransaction(data: { walletAddress: string; txHash: string; type: string; amount?: string }) {
    return this.request('/wallet/transaction', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Blockchain endpoints
  async getNetworkInfo() {
    return this.request('/blockchain/network');
  }

  async getAddressInfo(address: string) {
    return this.request(`/blockchain/address/${address}`);
  }

  async getTransactionInfo(txHash: string) {
    return this.request(`/blockchain/transaction/${txHash}`);
  }

  async recordBlockchainOperation(data: { walletAddress: string; operationType: string; txHash?: string; contractAddress?: string }) {
    return this.request('/blockchain/operation', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBlockchainOperations(walletAddress: string) {
    return this.request(`/blockchain/operations/${walletAddress}`);
  }

  // Blockchain endpoints
  async queryBlockchainData(address: string) {
    return this.request(`/blockchain/query/${address}`);
  }

  async getContractInfo(address: string) {
    return this.request(`/blockchain/contract/${address}`);
  }

  async recordBlockchainOperation(data: { 
    walletAddress: string; 
    operationType: string; 
    txHash?: string; 
    contractAddress?: string; 
    gasUsed?: string; 
  }) {
    return this.request('/blockchain/operation', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBlockchainOperations(walletAddress: string) {
    return this.request(`/blockchain/operations/${walletAddress}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();