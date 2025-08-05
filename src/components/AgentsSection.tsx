import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Calendar, Shield, Apple, Users, Trophy, Bot, Sparkles } from "lucide-react";
import aiAgentIcon from "@/assets/ai-agent-icon.jpg";

const agents = [
  {
    id: "goal-setting",
    name: "Goal-Setting Agent",
    description: "AI-powered goal creation and milestone tracking tailored to your fitness level and objectives.",
    icon: Target,
    features: ["Smart goal recommendations", "Progress tracking", "Adaptive milestones"],
    color: "primary"
  },
  {
    id: "daily-checkin",
    name: "Daily Check-In Agent",
    description: "Your personal fitness companion that tracks daily activities and provides motivation.",
    icon: Calendar,
    features: ["Daily habit tracking", "Motivation messages", "Progress insights"],
    color: "secondary"
  },
  {
    id: "injury-management",
    name: "Injury Management Agent",
    description: "Context-aware coaching that adapts to your injury history and recovery needs.",
    icon: Shield,
    features: ["Injury-aware workouts", "Recovery guidance", "Safety monitoring"],
    color: "accent"
  },
  {
    id: "nutrition",
    name: "Nutrition Agent",
    description: "Personalized nutrition coaching that aligns with your fitness goals and dietary preferences.",
    icon: Apple,
    features: ["Meal planning", "Nutrition tracking", "Goal-aligned recommendations"],
    color: "primary"
  },
  {
    id: "community",
    name: "Community Moderation Agent",
    description: "Automated community management that fosters engagement and maintains positive interactions.",
    icon: Users,
    features: ["Smart moderation", "Engagement boosting", "Community insights"],
    color: "secondary"
  },
  {
    id: "nft-minting",
    name: "NFT Minting Agent",
    description: "Automatically mints achievement NFTs when you reach significant fitness milestones.",
    icon: Trophy,
    features: ["Milestone detection", "Automatic minting", "Achievement verification"],
    color: "accent"
  }
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return "border-primary/20 bg-primary/5 hover:bg-primary/10";
    case "secondary":
      return "border-secondary/20 bg-secondary/5 hover:bg-secondary/10";
    case "accent":
      return "border-accent/20 bg-accent/5 hover:bg-accent/10";
    default:
      return "border-border bg-card hover:bg-accent/5";
  }
};

const AgentsSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src={aiAgentIcon} 
                alt="AI Agent" 
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Your <span className="bg-gradient-hero bg-clip-text text-transparent">AI Agents</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Six specialized AI agents working together to revolutionize your fitness journey. 
            Each agent brings unique capabilities powered by advanced machine learning.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {agents.map((agent) => {
            const IconComponent = agent.icon;
            return (
              <Card 
                key={agent.id} 
                className={`${getColorClasses(agent.color)} transition-all duration-300 hover:shadow-card hover:scale-105 border backdrop-blur-sm`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-${agent.color}/20 border border-${agent.color}/30`}>
                      <IconComponent className={`w-6 h-6 text-${agent.color}`} />
                    </div>
                    <Bot className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  <CardTitle className="text-xl font-semibold">
                    {agent.name}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {agent.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${agent.color}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Migration Notice */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-secondary/10 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-secondary">
                🚀 Powered by SpoonOS
              </CardTitle>
              <CardDescription className="text-lg">
                We're migrating from our custom orchestration to SpoonOS's native agent framework 
                for enhanced lifecycle management, observability, and scalability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="agent" size="lg">
                Learn About Our Tech Stack
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;