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

  // Krnl endpoints
  async executeKrnlAction(data: { walletAddress: string; actionType: string; payload?: any }) {
    return this.request('/krnl/execute', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getKrnlInteractions(walletAddress: string) {
    return this.request(`/krnl/interactions/${walletAddress}`);
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();