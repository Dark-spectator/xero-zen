import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-secondary via-secondary/50 to-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Automate Your Financial Reconciliation with{" "}
              <span className="text-primary">AI Power</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Upload your CSV files and let our AI reconcile transactions automatically. 
              Review, approve, and push directly to Xero in minutes—not hours.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group" onClick={() => navigate("/wizard")}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Free for 14 days • No credit card required
            </p>
          </div>

          <div className="relative animate-slide-in-right">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroIllustration}
                alt="AI Reconciliation Automation"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
};

export default Hero;
