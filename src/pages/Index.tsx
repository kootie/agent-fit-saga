import HeroSection from "@/components/HeroSection";
import AgentsSection from "@/components/AgentsSection";
import ProblemsSection from "@/components/ProblemsSection";
import SolutionSection from "@/components/SolutionSection";
import TechStackSection from "@/components/TechStackSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProblemsSection />
      <SolutionSection />
      <AgentsSection />
      <TechStackSection />
      <Footer />
    </div>
  );
};

export default Index;
