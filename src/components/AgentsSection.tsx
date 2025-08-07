
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Shield, Users, Trophy, Bot, Sparkles, BarChart3 } from "lucide-react";
import aiAgentIcon from "@/assets/ai-agent-icon.jpg";

const agents = [
  {
    id: "emergency-response",
    name: "Emergency Response Agent",
    description: "AI-powered crash detection and emergency coordination with real-time location sharing and rescue dispatch.",
    icon: Phone,
    features: ["Crash detection", "Emergency dispatch", "Medical alert system"],
    color: "primary"
  },
  {
    id: "performance-tracking",
    name: "Performance Tracking Agent",
    description: "Advanced Strava integration with personalized coaching insights and route optimization for cyclists.",
    icon: BarChart3,
    features: ["Strava sync", "Performance analytics", "Route recommendations"],
    color: "secondary"
  },
  {
    id: "safety-monitoring",
    name: "Safety Monitoring Agent",
    description: "Continuous safety assessment using weather data, traffic conditions, and bike maintenance alerts.",
    icon: Shield,
    features: ["Weather alerts", "Traffic monitoring", "Maintenance reminders"],
    color: "accent"
  },
  {
    id: "community-matching",
    name: "Community Matching Agent",
    description: "Connect cyclists with similar routes, skills, and interests while managing group rides and challenges.",
    icon: Users,
    features: ["Rider matching", "Group coordination", "Challenge management"],
    color: "primary"
  },
  {
    id: "insurance-coordinator",
    name: "Insurance Coordinator Agent",
    description: "Automated claims processing and risk assessment for crowdfunded cycling insurance pools.",
    icon: Trophy,
    features: ["Claims automation", "Risk assessment", "Pool management"],
    color: "secondary"
  },
  {
    id: "pro-support",
    name: "Pro Support Agent",
    description: "Facilitate connections between amateur cyclists and professional athletes through sponsorship and fan engagement.",
    icon: Bot,
    features: ["Fan matching", "Sponsorship tracking", "Content delivery"],
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
            Meet Your <span className="bg-gradient-hero bg-clip-text text-transparent">Cycling AI Agents</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Six specialized AI agents working together to revolutionize your cycling experience. 
            From emergency response to performance optimization and community building.
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
                for enhanced lifecycle management, observability, and scalability in cycling safety.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="agent" size="lg">
                Learn About Our Safety Tech
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
