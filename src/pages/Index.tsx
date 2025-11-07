import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProcessSteps from "@/components/ProcessSteps";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProcessSteps />
      <Features />
    </div>
  );
};

export default Index;
