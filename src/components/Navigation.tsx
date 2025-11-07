import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-foreground/20">
              <svg
                className="w-5 h-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-primary-foreground">ReconcileAI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors">
              Pricing
            </a>
          </div>

          <Button variant="outline" size="sm" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
