/**
 * Frontend Component Tests for Klunkaz MVP
 * 
 * This test file demonstrates:
 * 1. React component testing with TypeScript
 * 2. Wallet integration testing
 * 3. Blockchain interaction testing
 * 4. UI/UX validation
 * 5. Error handling in components
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WalletConnect from '@/components/WalletConnect';
import BlockchainDemo from '@/components/BlockchainDemo';
import FeaturesShowcase from '@/components/FeaturesShowcase';
import { apiService } from '@/services/api';

// Mock the API service
vi.mock('@/services/api', () => ({
  apiService: {
    getWalletBalance: vi.fn(),
    queryBlockchainData: vi.fn(),
    getContractInfo: vi.fn(),
    recordBlockchainOperation: vi.fn(),
  }
}));

// Mock window.ethereum for MetaMask testing
const mockEthereum = {
  request: vi.fn(),
  on: vi.fn(),
  removeListener: vi.fn(),
};

Object.defineProperty(window, 'ethereum', {
  value: mockEthereum,
  writable: true,
});

describe('🎨 Frontend Component Tests', () => {
  const testWalletAddress = '0x742d35Cc6634C0532925a3b8D0C9e3e0C0e8b4C0';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('💰 WalletConnect Component', () => {
    it('should render connect wallet button when not connected', () => {
      render(<WalletConnect />);
      
      expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
      expect(screen.getByText('Connect your wallet to access Klunkaz features')).toBeInTheDocument();
    });

    it('should handle wallet connection flow', async () => {
      mockEthereum.request.mockResolvedValueOnce([testWalletAddress]);
      vi.mocked(apiService.getWalletBalance).mockResolvedValueOnce({
        balance: '1.2345',
        address: testWalletAddress,
        network: 'Base'
      });

      render(<WalletConnect />);
      
      const connectButton = screen.getByText('Connect Wallet');
      fireEvent.click(connectButton);

      await waitFor(() => {
        expect(mockEthereum.request).toHaveBeenCalledWith({
          method: 'eth_requestAccounts'
        });
      });
    });

    it('should display wallet information when connected', async () => {
      // Mock connected state
      mockEthereum.request.mockResolvedValueOnce([testWalletAddress]);
      
      render(<WalletConnect />);
      
      // Simulate connection
      fireEvent.click(screen.getByText('Connect Wallet'));
      
      await waitFor(() => {
        expect(screen.getByText('Connected')).toBeInTheDocument();
      });
    });

    it('should handle network switching to Base', async () => {
      mockEthereum.request
        .mockResolvedValueOnce([testWalletAddress]) // eth_requestAccounts
        .mockResolvedValueOnce(undefined); // wallet_switchEthereumChain

      render(<WalletConnect />);
      
      fireEvent.click(screen.getByText('Connect Wallet'));

      await waitFor(() => {
        expect(mockEthereum.request).toHaveBeenCalledWith({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }]
        });
      });
    });
  });

  describe('⚡ BlockchainDemo Component', () => {
    it('should render blockchain demo interface', () => {
      render(<BlockchainDemo walletAddress={testWalletAddress} />);
      
      expect(screen.getByText('Blockchain Operations')).toBeInTheDocument();
      expect(screen.getByText('Query blockchain data directly on Base network')).toBeInTheDocument();
    });

    it('should handle address information query', async () => {
      const mockResponse = {
        data: {
          address: testWalletAddress,
          balance: '1.2345',
          transactionCount: 42,
          network: 'Base'
        },
        metadata: {
          attempt: 1,
          queryTime: new Date().toISOString()
        }
      };

      vi.mocked(apiService.queryBlockchainData).mockResolvedValueOnce(mockResponse);

      render(<BlockchainDemo walletAddress={testWalletAddress} />);
      
      // Select query type
      const queryTypeSelect = screen.getByRole('combobox');
      fireEvent.click(queryTypeSelect);
      fireEvent.click(screen.getByText('Address Information'));

      // Enter address
      const addressInput = screen.getByRole('textbox');
      fireEvent.change(addressInput, { target: { value: testWalletAddress } });

      // Execute query
      const executeButton = screen.getByText('Execute Query');
      fireEvent.click(executeButton);

      await waitFor(() => {
        expect(apiService.queryBlockchainData).toHaveBeenCalledWith(testWalletAddress);
        expect(screen.getByText('Success')).toBeInTheDocument();
      });
    });

    it('should handle contract information query', async () => {
      const contractAddress = '0xA0b86a33E6441b8e8C7C7b0b8e8C7C7b0b8e8C7C';
      const mockResponse = {
        data: {
          address: contractAddress,
          isContract: true,
          balance: '0.0',
          bytecodeLength: 1024
        }
      };

      vi.mocked(apiService.getContractInfo).mockResolvedValueOnce(mockResponse);

      render(<BlockchainDemo walletAddress={testWalletAddress} />);
      
      // Select contract info query
      const queryTypeSelect = screen.getByRole('combobox');
      fireEvent.click(queryTypeSelect);
      fireEvent.click(screen.getByText('Contract Information'));

      // Enter contract address
      const addressInput = screen.getByRole('textbox');
      fireEvent.change(addressInput, { target: { value: contractAddress } });

      // Execute query
      fireEvent.click(screen.getByText('Execute Query'));

      await waitFor(() => {
        expect(apiService.getContractInfo).toHaveBeenCalledWith(contractAddress);
      });
    });

    it('should display error messages properly', async () => {
      vi.mocked(apiService.queryBlockchainData).mockRejectedValueOnce(
        new Error('Network error')
      );

      render(<BlockchainDemo walletAddress={testWalletAddress} />);
      
      // Set up and execute a query that will fail
      const queryTypeSelect = screen.getByRole('combobox');
      fireEvent.click(queryTypeSelect);
      fireEvent.click(screen.getByText('Address Information'));

      const addressInput = screen.getByRole('textbox');
      fireEvent.change(addressInput, { target: { value: testWalletAddress } });

      fireEvent.click(screen.getByText('Execute Query'));

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    it('should show loading state during queries', async () => {
      // Mock a delayed response
      vi.mocked(apiService.queryBlockchainData).mockImplementationOnce(
        () => new Promise(resolve => setTimeout(resolve, 100))
      );

      render(<BlockchainDemo walletAddress={testWalletAddress} />);
      
      // Set up query
      const queryTypeSelect = screen.getByRole('combobox');
      fireEvent.click(queryTypeSelect);
      fireEvent.click(screen.getByText('Address Information'));

      const addressInput = screen.getByRole('textbox');
      fireEvent.change(addressInput, { target: { value: testWalletAddress } });

      // Execute query
      fireEvent.click(screen.getByText('Execute Query'));

      // Check loading state
      expect(screen.getByText('Querying...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('🎯 FeaturesShowcase Component', () => {
    it('should render all feature cards', () => {
      render(<FeaturesShowcase />);
      
      expect(screen.getByText('Platform Features')).toBeInTheDocument();
      expect(screen.getByText('Base Network Integration')).toBeInTheDocument();
      expect(screen.getByText('SQLite Backend')).toBeInTheDocument();
      expect(screen.getByText('Secure Authentication')).toBeInTheDocument();
    });

    it('should display technology stack', () => {
      render(<FeaturesShowcase />);
      
      expect(screen.getByText('Technology Stack')).toBeInTheDocument();
      expect(screen.getByText('React + TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js + Express')).toBeInTheDocument();
      expect(screen.getByText('Base Network')).toBeInTheDocument();
    });

    it('should show architecture overview', () => {
      render(<FeaturesShowcase />);
      
      expect(screen.getByText('Architecture Overview')).toBeInTheDocument();
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend API')).toBeInTheDocument();
      expect(screen.getByText('Blockchain')).toBeInTheDocument();
    });
  });

  describe('🔗 API Service Integration', () => {
    it('should handle API service errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      vi.mocked(apiService.queryBlockchainData).mockRejectedValueOnce(
        new Error('API service unavailable')
      );

      render(<BlockchainDemo walletAddress={testWalletAddress} />);
      
      // Trigger API call
      const queryTypeSelect = screen.getByRole('combobox');
      fireEvent.click(queryTypeSelect);
      fireEvent.click(screen.getByText('Address Information'));

      const addressInput = screen.getByRole('textbox');
      fireEvent.change(addressInput, { target: { value: testWalletAddress } });

      fireEvent.click(screen.getByText('Execute Query'));

      await waitFor(() => {
        expect(screen.getByText('API service unavailable')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });

    it('should record operations when wallet is connected', async () => {
      vi.mocked(apiService.queryBlockchainData).mockResolvedValueOnce({
        data: { address: testWalletAddress, balance: '1.0' }
      });
      vi.mocked(apiService.recordBlockchainOperation).mockResolvedValueOnce({});

      render(<BlockchainDemo walletAddress={testWalletAddress} />);
      
      // Execute a query
      const queryTypeSelect = screen.getByRole('combobox');
      fireEvent.click(queryTypeSelect);
      fireEvent.click(screen.getByText('Address Information'));

      const addressInput = screen.getByRole('textbox');
      fireEvent.change(addressInput, { target: { value: testWalletAddress } });

      fireEvent.click(screen.getByText('Execute Query'));

      await waitFor(() => {
        expect(apiService.recordBlockchainOperation).toHaveBeenCalledWith({
          walletAddress: testWalletAddress,
          operationType: 'address_info'
        });
      });
    });
  });

  describe('🎨 UI/UX Validation', () => {
    it('should be responsive and accessible', () => {
      render(<FeaturesShowcase />);
      
      // Check for proper heading hierarchy
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      
      // Check for proper semantic structure
      const cards = screen.getAllByRole('article');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should provide proper form validation feedback', () => {
      render(<BlockchainDemo />);
      
      // Try to execute without selecting query type
      const executeButton = screen.getByText('Execute Query');
      expect(executeButton).toBeDisabled();
    });

    it('should show appropriate messages for different states', () => {
      render(<BlockchainDemo />);
      
      expect(screen.getByText('Connect your wallet to record operations in your history')).toBeInTheDocument();
    });
  });
});