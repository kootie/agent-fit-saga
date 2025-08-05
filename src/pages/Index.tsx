import { Suspense, lazy } from "react";

// Lazy load components to identify any import issues
const HeroSection = lazy(() => import("@/components/HeroSection"));
const AgentsSection = lazy(() => import("@/components/AgentsSection"));
const ProblemsSection = lazy(() => import("@/components/ProblemsSection"));
const SolutionSection = lazy(() => import("@/components/SolutionSection"));
const TechStackSection = lazy(() => import("@/components/TechStackSection"));
const Footer = lazy(() => import("@/components/Footer"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
        <ProblemsSection />
        <SolutionSection />
        <AgentsSection />
        <TechStackSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
