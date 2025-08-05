import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Brain, Database, TrendingUp } from "lucide-react";

const problems = [
  {
    title: "Fragmented Fitness Data",
    description: "Users juggle multiple Web2 platforms (Strava, Fitbit, MyFitnessPal), leading to siloed activity, nutrition, and health records.",
    impact: "Reduces insights and makes goal tracking cumbersome",
    severity: "High",
    icon: Database,
    color: "destructive"
  },
  {
    title: "Lack of Personalized Guidance",
    description: "Current apps offer generic plans. Users with varying goals need dynamic, AI‑tailored coaching.",
    impact: "One-size-fits-all approach fails individual needs",
    severity: "High",
    icon: Brain,
    color: "destructive"
  },
  {
    title: "Community Engagement Gaps",
    description: "Fitness communities exist, but moderation and motivation are manual, leading to drop‑off and low accountability.",
    impact: "High user churn and reduced motivation",
    severity: "Medium",
    icon: Users,
    color: "secondary"
  },
  {
    title: "Ownership & Motivation Issues",
    description: "Users invest time but don't 'own' their progress—no transferable proof of achievement or incentives beyond badges.",
    impact: "Limited long-term engagement",
    severity: "Medium",
    icon: TrendingUp,
    color: "accent"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High":
      return "bg-destructive/20 text-destructive border-destructive/30";
    case "Medium":
      return "bg-secondary/20 text-secondary border-secondary/30";
    default:
      return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

const getCardColor = (color: string) => {
  switch (color) {
    case "destructive":
      return "border-destructive/20 bg-destructive/5";
    case "secondary":
      return "border-secondary/20 bg-secondary/5";
    case "accent":
      return "border-accent/20 bg-accent/5";
    default:
      return "border-border bg-card";
  }
};

const ProblemsSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-16 h-16 text-destructive" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Problem We're <span className="text-destructive">Solving</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The fitness industry is fragmented and lacks personalization. 
            We identified critical pain points that affect millions of fitness enthusiasts.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <Card 
                key={index} 
                className={`${getCardColor(problem.color)} transition-all duration-300 hover:shadow-card border backdrop-blur-sm`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${problem.color}/20 border border-${problem.color}/30`}>
                      <IconComponent className={`w-6 h-6 text-${problem.color}`} />
                    </div>
                    <Badge className={getSeverityColor(problem.severity)}>
                      {problem.severity} Impact
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-semibold">
                    {problem.title}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="p-4 rounded-lg bg-muted/50 border border-muted">
                    <p className="text-sm font-medium text-muted-foreground">
                      <span className="text-foreground">Impact:</span> {problem.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Affected Parties */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8">Who's Affected?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-6 py-3 text-lg bg-card">
              🏃‍♂️ Fitness Enthusiasts
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-lg bg-card">
              🏆 Amateur & Pro Athletes
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-lg bg-card">
              👥 Community Organizers
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-lg bg-card">
              🏥 Rehabilitation Centers
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;