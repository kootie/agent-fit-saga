import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { apiService } from '@/services/api';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletConnect = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          await fetchBalance(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Web3 wallet');
      return;
    }

    setIsConnecting(true);
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Switch to Base network
      await switchToBase();
      
      setAccount(accounts[0]);
      await fetchBalance(accounts[0]);
      
      // Create user in backend
      await apiService.createUser({ walletAddress: accounts[0] });
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const switchToBase = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x2105' }], // Base mainnet
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x2105',
                chainName: 'Base',
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://mainnet.base.org'],
                blockExplorerUrls: ['https://basescan.org'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding Base network:', addError);
        }
      }
    }
  };

  const fetchBalance = async (address: string) => {
    try {
      const balanceData = await apiService.getWalletBalance(address);
      setBalance(balanceData.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!account) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Wallet className="w-6 h-6" />
            Connect Wallet
          </CardTitle>
          <CardDescription>
            Connect your wallet to access Klunkaz features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={connectWallet} 
            disabled={isConnecting}
            className="w-full"
            size="lg"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Make sure you're on the Base network
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Connected
          </span>
          <Badge variant="secondary">Base</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Address</p>
          <div className="flex items-center gap-2">
            <code className="text-sm bg-muted px-2 py-1 rounded">
              {formatAddress(account)}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="h-8 w-8 p-0"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-8 w-8 p-0"
            >
              <a
                href={`https://basescan.org/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
        
        {balance && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">Balance</p>
            <p className="text-lg font-semibold">
              {parseFloat(balance).toFixed(4)} ETH
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletConnect;