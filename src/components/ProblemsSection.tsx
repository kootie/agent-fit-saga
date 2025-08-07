
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Shield, TrendingDown, MapPin } from "lucide-react";

const problems = [
  {
    title: "Cycling Safety Crisis",
    description: "Cyclists face increasing risks on roads with limited emergency response options and no reliable way to call for help during accidents or mechanical failures.",
    impact: "Higher injury rates and delayed emergency response",
    severity: "High",
    icon: Shield,
    color: "destructive"
  },
  {
    title: "Fragmented Performance Data",
    description: "Cyclists use multiple platforms (Strava, Garmin, Wahoo) but lack unified insights and community connection around their performance data.",
    impact: "Limited performance optimization and community engagement",
    severity: "High",
    icon: TrendingDown,
    color: "destructive"
  },
  {
    title: "Expensive Cycling Insurance",
    description: "Traditional cycling insurance is costly and doesn't leverage community support or modern risk-sharing models.",
    impact: "Many cyclists ride uninsured or underinsured",
    severity: "Medium",
    icon: Users,
    color: "secondary"
  },
  {
    title: "Disconnected Pro Support",
    description: "Amateur cyclists want to support professional cyclists but lack direct connection and meaningful ways to contribute to their careers.",
    impact: "Missed opportunities for fan engagement and pro cyclist funding",
    severity: "Medium",
    icon: MapPin,
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
            Cycling Challenges We're <span className="text-destructive">Solving</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The cycling community faces critical safety, performance, and engagement challenges. 
            We identified key pain points that affect millions of cyclists worldwide.
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
          <h3 className="text-2xl font-semibold mb-8">Who Benefits?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-6 py-3 text-lg bg-card">
              🚴‍♂️ Recreational Cyclists
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-lg bg-card">
              🏆 Competitive Cyclists
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-lg bg-card">
              👥 Cycling Communities
            </Badge>
            <Badge variant="outline" className="px-6 py-3 text-lg bg-card">
              🚴‍♀️ Professional Cyclists
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
