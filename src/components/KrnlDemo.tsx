import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Terminal, Zap, Database } from 'lucide-react';
import { apiService } from '@/services/api';

interface KrnlDemoProps {
  walletAddress?: string;
}

const KrnlDemo = ({ walletAddress }: KrnlDemoProps) => {
  const [actionType, setActionType] = useState<string>('');
  const [payload, setPayload] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const actionTypes = [
    { value: 'deploy_contract', label: 'Deploy Contract', icon: Zap },
    { value: 'execute_transaction', label: 'Execute Transaction', icon: Terminal },
    { value: 'query_data', label: 'Query Data', icon: Database },
  ];

  const executeAction = async () => {
    if (!walletAddress || !actionType) {
      setError('Please connect wallet and select an action type');
      return;
    }

    setIsExecuting(true);
    setError(null);
    setResult(null);

    try {
      let parsedPayload = {};
      if (payload.trim()) {
        try {
          parsedPayload = JSON.parse(payload);
        } catch (e) {
          throw new Error('Invalid JSON payload');
        }
      }

      const response = await apiService.executeKrnlAction({
        walletAddress,
        actionType,
        payload: parsedPayload,
      });

      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to execute Krnl action');
    } finally {
      setIsExecuting(false);
    }
  };

  const getPlaceholderPayload = (type: string) => {
    switch (type) {
      case 'deploy_contract':
        return JSON.stringify({
          contractName: 'MyContract',
          constructorArgs: ['param1', 'param2'],
          gasLimit: '500000'
        }, null, 2);
      case 'execute_transaction':
        return JSON.stringify({
          to: '0x...',
          value: '0.1',
          data: '0x...',
          gasLimit: '21000'
        }, null, 2);
      case 'query_data':
        return JSON.stringify({
          query: 'SELECT * FROM contracts WHERE owner = ?',
          params: [walletAddress]
        }, null, 2);
      default:
        return '';
    }
  };

  if (!walletAddress) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Terminal className="w-6 h-6" />
            Krnl Integration
          </CardTitle>
          <CardDescription>
            Connect your wallet to interact with Krnl
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          Krnl Integration
        </CardTitle>
        <CardDescription>
          Execute blockchain operations using Krnl
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Action Type</label>
          <Select value={actionType} onValueChange={setActionType}>
            <SelectTrigger>
              <SelectValue placeholder="Select an action type" />
            </SelectTrigger>
            <SelectContent>
              {actionTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Payload (JSON)</label>
          <Textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            placeholder={actionType ? getPlaceholderPayload(actionType) : 'Select an action type first'}
            className="min-h-32 font-mono text-sm"
          />
        </div>

        <Button
          onClick={executeAction}
          disabled={isExecuting || !actionType}
          className="w-full"
          size="lg"
        >
          {isExecuting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Executing...
            </>
          ) : (
            'Execute Krnl Action'
          )}
        </Button>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Result</h3>
              <Badge variant="secondary">Success</Badge>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KrnlDemo;