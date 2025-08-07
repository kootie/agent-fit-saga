
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Bot, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="CycleSafe Pro Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-accent rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-primary-glow rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Award Badge */}
        <div className="mb-8 flex justify-center">
          <Badge variant="secondary" className="px-6 py-2 text-lg bg-secondary/20 border border-secondary backdrop-blur-sm">
            <Trophy className="w-5 h-5 mr-2" />
            🏆 ETHGlobal Agentic Ethereum 2025 Winner
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
          CycleSafe Pro
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
          The Ultimate Cycling Safety & Performance Platform
        </p>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          Connect with Strava, track performance, request emergency rescue, access crowdfunded insurance, 
          and support your favorite pro cyclists - all powered by AI agents and blockchain technology.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge variant="outline" className="px-4 py-2 bg-primary/10 border-primary text-primary">
            <Bot className="w-4 h-4 mr-2" />
            AI Safety Agents
          </Badge>
          <Badge variant="outline" className="px-4 py-2 bg-secondary/10 border-secondary text-secondary">
            <Shield className="w-4 h-4 mr-2" />
            Emergency Rescue
          </Badge>
          <Badge variant="outline" className="px-4 py-2 bg-accent/10 border-accent text-accent">
            <Users className="w-4 h-4 mr-2" />
            Pro Cyclist Support
          </Badge>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="xl" className="min-w-48">
            Connect Strava
          </Button>
          <Button variant="agent" size="xl" className="min-w-48">
            View Safety Features
          </Button>
        </div>

        {/* Integration logos */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Powered by cutting-edge technology</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-sm font-semibold">Strava</span>
            <span className="text-sm font-semibold">Emergency Services</span>
            <span className="text-sm font-semibold">The Graph</span>
            <span className="text-sm font-semibold">Base Network</span>
            <span className="text-sm font-semibold">SpoonOS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
