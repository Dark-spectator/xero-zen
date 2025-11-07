import { Sparkles, Shield, Zap, BarChart3, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description: "Advanced machine learning algorithms automatically match and categorize transactions with 99% accuracy.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process thousands of transactions in seconds. What used to take hours now takes minutes.",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Enterprise-grade encryption and security protocols keep your financial data completely safe.",
  },
  {
    icon: BarChart3,
    title: "Smart Insights",
    description: "Get actionable insights and analytics on your financial data with automated reporting.",
  },
  {
    icon: Clock,
    title: "Save 20+ Hours Monthly",
    description: "Automate repetitive reconciliation tasks and focus on growing your business instead.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Multi-user access with role-based permissions for seamless team workflow.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to streamline your financial reconciliation process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mb-4 text-primary">
                <feature.icon className="h-10 w-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
