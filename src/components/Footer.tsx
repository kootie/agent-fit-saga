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
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Klunkaz Logo" 
                className="h-8 w-auto"
              />
              <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Klunkaz
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your ultimate digital platform powered by cutting-edge technology and innovative design.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Technology Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Technology</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-secondary transition-colors">Platform</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Performance</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Innovation</a></li>
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
            <span>for the digital community</span>
          </div>

          {/* CTA */}
          <Button variant="hero" size="sm">
            Get Started
          </Button>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Klunkaz. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;