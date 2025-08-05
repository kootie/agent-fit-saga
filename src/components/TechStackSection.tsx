import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Database, Shield, Cpu, GitBranch, Zap } from "lucide-react";

const techStack = [
  {
    category: "Smart Contracts & Blockchain",
    icon: Shield,
    color: "primary",
    technologies: [
      { name: "Base", description: "Layer 2 blockchain for fast, low-cost transactions", status: "Live" },
      { name: "Solidity", description: "Smart contracts for NFT minting and data verification", status: "Live" }
    ]
  },
  {
    category: "Data Infrastructure", 
    icon: Database,
    color: "secondary",
    technologies: [
      { name: "The Graph", description: "Decentralized indexing for blockchain data", status: "Live" },
      { name: "Nillion", description: "Secure storage for sensitive fitness data", status: "Live" }
    ]
  },
  {
    category: "Agent Orchestration",
    icon: Cpu,
    color: "accent",
    technologies: [
      { name: "SpoonOS", description: "Native agent framework for lifecycle management", status: "Migrating" },
      { name: "Custom Lang-Server", description: "Legacy orchestration system", status: "Deprecated" }
    ]
  },
  {
    category: "Integrations & APIs",
    icon: GitBranch,
    color: "primary",
    technologies: [
      { name: "Strava API", description: "Fitness activity data integration", status: "Live" },
      { name: "Fitbit API", description: "Health metrics and device data", status: "Planned" },
      { name: "MyFitnessPal", description: "Nutrition tracking integration", status: "Planned" }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Live":
      return "bg-primary/20 text-primary border-primary/30";
    case "Migrating":
      return "bg-secondary/20 text-secondary border-secondary/30";
    case "Planned":
      return "bg-accent/20 text-accent border-accent/30";
    case "Deprecated":
      return "bg-muted/20 text-muted-foreground border-muted/30";
    default:
      return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

const getCardColor = (color: string) => {
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

const TechStackSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Code className="w-16 h-16 text-secondary" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built on <span className="text-secondary">Cutting-Edge</span> Technology
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our tech stack combines the best of Web3, AI, and fitness APIs to create 
            a seamless, secure, and scalable platform.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {techStack.map((stack, index) => {
            const IconComponent = stack.icon;
            return (
              <Card 
                key={index} 
                className={`${getCardColor(stack.color)} transition-all duration-300 hover:shadow-card border backdrop-blur-sm`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-${stack.color}/20 border border-${stack.color}/30`}>
                      <IconComponent className={`w-6 h-6 text-${stack.color}`} />
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-semibold">
                    {stack.category}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {stack.technologies.map((tech, idx) => (
                      <div key={idx} className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{tech.name}</h4>
                          <p className="text-xs text-muted-foreground">{tech.description}</p>
                        </div>
                        <Badge className={getStatusColor(tech.status)}>
                          {tech.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Migration Highlight */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-secondary/10 border-secondary/20">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Zap className="w-12 h-12 text-secondary" />
              </div>
              <CardTitle className="text-2xl font-semibold text-secondary">
                🚀 Strategic Migration to SpoonOS
              </CardTitle>
              <CardDescription className="text-lg">
                We're transitioning from our custom orchestration system to SpoonOS's 
                native agent framework for enhanced performance and scalability.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="agent" size="lg">
                  Technical Architecture
                </Button>
                <Button variant="secondary" size="lg">
                  Migration Timeline
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Badge */}
        <div className="text-center mt-16">
          <Badge variant="secondary" className="px-8 py-4 text-lg bg-secondary/20 border border-secondary backdrop-blur-sm">
            <Code className="w-5 h-5 mr-2" />
            Production-Ready & Battle-Tested
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;