import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, Coins, Users, BarChart3, Smartphone } from "lucide-react";
import nftBadgeIcon from "@/assets/nft-badge-icon.jpg";

const solutions = [
  {
    title: "Unified Data Platform",
    description: "Seamlessly integrate all your fitness data from multiple platforms into one comprehensive dashboard.",
    benefits: ["Strava integration", "Cross-platform sync", "Unified analytics"],
    icon: BarChart3,
    color: "primary"
  },
  {
    title: "AI-Powered Personalization",
    description: "Dynamic coaching that adapts to your goals, injury history, and progress in real-time.",
    benefits: ["Context-aware coaching", "Injury prevention", "Goal optimization"],
    icon: Zap,
    color: "secondary"
  },
  {
    title: "Automated Community Management",
    description: "AI agents moderate communities and boost engagement without manual oversight.",
    benefits: ["Smart moderation", "Engagement insights", "24/7 support"],
    icon: Users,
    color: "accent"
  },
  {
    title: "Blockchain-Verified Achievements",
    description: "Earn transferable NFT achievements that prove your fitness milestones on-chain.",
    benefits: ["Ownership proof", "Transferable assets", "Immutable records"],
    icon: Shield,
    color: "primary"
  }
];

const businessModels = [
  {
    model: "Freemium & Subscription",
    description: "Basic tracking free; Premium AI agents for advanced coaching",
    icon: Smartphone
  },
  {
    model: "NFT-Based Achievements",
    description: "One-time mint fees and secondary market royalties",
    icon: Coins
  },
  {
    model: "Data Insights API",
    description: "Aggregated analytics for sports brands and insurers",
    icon: BarChart3
  }
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return "border-primary/20 bg-primary/5";
    case "secondary":
      return "border-secondary/20 bg-secondary/5";
    case "accent":
      return "border-accent/20 bg-accent/5";
    default:
      return "border-border bg-card";
  }
};

const SolutionSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-hero bg-clip-text text-transparent">Solution</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Agent Fit Saga addresses every pain point with cutting-edge Web3 technology, 
            AI agents, and blockchain-verified achievements.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <Card 
                key={index} 
                className={`${getColorClasses(solution.color)} transition-all duration-300 hover:shadow-card hover:scale-105 border backdrop-blur-sm`}
              >
                <CardHeader>
                  <div className={`w-fit p-3 rounded-lg bg-${solution.color}/20 border border-${solution.color}/30 mb-4`}>
                    <IconComponent className={`w-6 h-6 text-${solution.color}`} />
                  </div>
                  
                  <CardTitle className="text-xl font-semibold">
                    {solution.title}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 text-${solution.color}`} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* NFT Achievement Showcase */}
        <div className="mb-20">
          <Card className="max-w-4xl mx-auto bg-gradient-accent border-accent/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src={nftBadgeIcon} 
                  alt="NFT Achievement Badge" 
                  className="w-20 h-20 rounded-full object-cover animate-pulse-glow"
                />
              </div>
              <CardTitle className="text-2xl font-semibold text-accent-foreground">
                Revolutionary NFT Achievement System
              </CardTitle>
              <CardDescription className="text-lg text-accent-foreground/80">
                First-of-its-kind blockchain-verified fitness achievements that you truly own
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="nft" size="lg">
                Explore NFT Achievements
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Business Models */}
        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-12">Sustainable Business Models</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {businessModels.map((model, index) => {
              const IconComponent = model.icon;
              return (
                <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {model.model}
                    </CardTitle>
                    <CardDescription>
                      {model.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;