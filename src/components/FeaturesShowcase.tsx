import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Zap, 
  Shield, 
  Layers, 
  Code, 
  Globe,
  Wallet,
  Terminal,
  Lock
} from 'lucide-react';

const FeaturesShowcase = () => {
  const features = [
    {
      icon: Wallet,
      title: 'Base Network Integration',
      description: 'Native integration with Base blockchain for fast, low-cost transactions',
      badge: 'Blockchain',
      color: 'bg-primary/10 text-primary border-primary'
    },
    {
      icon: Terminal,
      title: 'Direct Blockchain',
      description: 'Direct blockchain operations using Ethers.js and Base network',
      badge: 'Infrastructure',
      color: 'bg-secondary/10 text-secondary border-secondary'
    },
    {
      icon: Database,
      title: 'SQLite Backend',
      description: 'Lightweight, efficient database for user data and transaction history',
      badge: 'Database',
      color: 'bg-accent/10 text-accent border-accent'
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Wallet-based authentication with signature verification',
      badge: 'Security',
      color: 'bg-green-500/10 text-green-500 border-green-500'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Live balance tracking and transaction monitoring',
      badge: 'Performance',
      color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500'
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Clean APIs and comprehensive documentation',
      badge: 'DX',
      color: 'bg-purple-500/10 text-purple-500 border-purple-500'
    }
  ];

  const techStack = [
    { name: 'React + TypeScript', category: 'Frontend' },
    { name: 'Node.js + Express', category: 'Backend' },
    { name: 'SQLite', category: 'Database' },
    { name: 'Base Network', category: 'Blockchain' },
    { name: 'Ethers.js', category: 'Web3' },
    { name: 'MetaMask', category: 'Wallet' }
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Platform Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with modern technologies for a seamless Web3 experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className={feature.color}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  {tech.name}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {tech.category}
                </span>
                {index < techStack.length - 1 && (
                  <span className="text-muted-foreground">•</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-background to-muted/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Layers className="w-6 h-6" />
                Architecture Overview
              </CardTitle>
              <CardDescription>
                Minimal MVP architecture for rapid development and deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <Globe className="w-8 h-8 mx-auto text-primary" />
                  </div>
                  <h4 className="font-semibold">Frontend</h4>
                  <p className="text-sm text-muted-foreground">
                    React + TypeScript with modern UI components
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="p-4 bg-secondary/10 rounded-lg">
                    <Terminal className="w-8 h-8 mx-auto text-secondary" />
                  </div>
                  <h4 className="font-semibold">Backend API</h4>
                  <p className="text-sm text-muted-foreground">
                    Node.js REST API with SQLite database
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <Lock className="w-8 h-8 mx-auto text-accent" />
                  </div>
                  <h4 className="font-semibold">Blockchain</h4>
                  <p className="text-sm text-muted-foreground">
                    Base network integration via Krnl
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;