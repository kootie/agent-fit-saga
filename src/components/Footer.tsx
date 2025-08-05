import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Trophy, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-6 bg-background border-t border-border">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Agent Fit Saga
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Revolutionary Web3 fitness platform powered by AI agents and blockchain technology.
            </p>
            <Badge variant="secondary" className="w-fit">
              <Trophy className="w-4 h-4 mr-2" />
              ETHGlobal Winner
            </Badge>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">AI Agents</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">NFT Achievements</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Strava Integration</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Technology Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Technology</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-secondary transition-colors">SpoonOS</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Base Blockchain</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">The Graph</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Nillion</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Whitepaper</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-secondary">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-accent">
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-destructive" />
            <span>for the fitness community</span>
          </div>

          {/* CTA */}
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Agent Fit Saga. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;