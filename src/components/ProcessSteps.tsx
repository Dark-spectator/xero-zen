import { FileUp, Search, CheckCircle2, Send } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Upload CSV",
    description: "Simply drag and drop your transaction files or bank statements. Our system supports all major CSV formats.",
    icon: FileUp,
    color: "text-primary",
  },
  {
    number: "02",
    title: "Review Transactions",
    description: "Our AI automatically categorizes and matches transactions. Review suggested mappings with intelligent insights.",
    icon: Search,
    color: "text-accent",
  },
  {
    number: "03",
    title: "Approve Transactions",
    description: "Quickly approve or edit AI suggestions. Batch approve matching transactions with a single click.",
    icon: CheckCircle2,
    color: "text-primary",
  },
  {
    number: "04",
    title: "Push to Xero",
    description: "Seamlessly sync approved transactions to your Xero account. Real-time updates keep your books accurate.",
    icon: Send,
    color: "text-accent",
  },
];

const ProcessSteps = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to automated reconciliation. Save hours of manual work every month.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step number badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className={`mb-4 ${step.color}`}>
                <step.icon className="h-12 w-12 group-hover:scale-110 transition-transform" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}
            </Card>
          ))}
        </div>

        {/* Visual connector for mobile */}
        <div className="lg:hidden flex justify-center mt-8">
          <div className="flex flex-col items-center gap-2">
            {steps.map((_, index) => (
              index < steps.length - 1 && (
                <div key={index} className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
