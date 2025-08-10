import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WalletConnect from '@/components/WalletConnect';
import KrnlDemo from '@/components/KrnlDemo';
import FeaturesShowcase from '@/components/FeaturesShowcase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Database, Zap } from 'lucide-react';
import { apiService } from '@/services/api';

const Demo = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [krnlInteractions, setKrnlInteractions] = useState<any[]>([]);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  useEffect(() => {
    if (walletAddress) {
      fetchUserData();
    }
  }, [walletAddress]);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const fetchUserData = async () => {
    if (!walletAddress) return;

    try {
      const [txData, krnlData] = await Promise.all([
        apiService.getUserTransactions(walletAddress),
        apiService.getKrnlInteractions(walletAddress)
      ]);
      
      setTransactions(txData);
      setKrnlInteractions(krnlData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-6 text-center bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto">
          <div className="mb-8 flex justify-center">
            <img 
              src="/logo.png" 
              alt="Klunkaz Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Klunkaz MVP Demo
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of Krnl and Base blockchain integration
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="px-4 py-2 bg-primary/10 border-primary text-primary">
              <Zap className="w-4 h-4 mr-2" />
              Krnl Powered
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-secondary/10 border-secondary text-secondary">
              <Database className="w-4 h-4 mr-2" />
              Base Network
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-accent/10 border-accent text-accent">
              <Activity className="w-4 h-4 mr-2" />
              SQLite Backend
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Demo Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="krnl">Krnl Demo</TabsTrigger>
              <TabsTrigger value="data">User Data</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>

            <TabsContent value="wallet" className="mt-8">
              <div className="flex justify-center">
                <WalletConnect />
              </div>
            </TabsContent>

            <TabsContent value="krnl" className="mt-8">
              <div className="flex justify-center">
                <KrnlDemo walletAddress={walletAddress} />
              </div>
            </TabsContent>

            <TabsContent value="data" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Transactions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Transactions
                    </CardTitle>
                    <CardDescription>
                      Your transaction history on Base network
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactions.length > 0 ? (
                      <div className="space-y-3">
                        {transactions.slice(0, 5).map((tx, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{tx.type}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(tx.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                              {tx.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No transactions yet
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Krnl Interactions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Krnl Interactions
                    </CardTitle>
                    <CardDescription>
                      Your Krnl action history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {krnlInteractions.length > 0 ? (
                      <div className="space-y-3">
                        {krnlInteractions.slice(0, 5).map((interaction, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{interaction.action_type}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(interaction.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={interaction.status === 'completed' ? 'default' : 'secondary'}>
                              {interaction.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No Krnl interactions yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <FeaturesShowcase />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Demo;