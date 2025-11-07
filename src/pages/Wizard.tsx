import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    { id: 1, title: "Upload CSV", icon: Upload, description: "Upload your transaction file" },
    { id: 2, title: "Review Transactions", icon: FileText, description: "AI analyzes your data" },
    { id: 3, title: "Approve Transaction", icon: CheckCircle2, description: "Verify and approve" },
    { id: 4, title: "Push to Xero", icon: Send, description: "Sync with your account" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for processing`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/50 to-background">
      {/* Header */}
      <header className="bg-primary/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
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
          <Button variant="outline" size="sm" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Sign In
          </Button>
        </div>
      </header>

      {/* Wizard Steps */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">AI Reconciliation Wizard</h1>
          <p className="text-center text-muted-foreground mb-12">Follow these steps to reconcile your transactions</p>

          {/* Steps Progress */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="relative">
                  <div
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex flex-col items-center text-center p-6 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                      isActive
                        ? "border-primary bg-primary/5 shadow-md"
                        : isCompleted
                        ? "border-primary/50 bg-primary/5"
                        : "border-border bg-background hover:border-primary/30"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                          ? "bg-primary/50 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-1/2 -translate-y-1/2">
                      <div className={`w-4 h-0.5 ${isCompleted ? "bg-primary" : "bg-border"}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="bg-card border border-border rounded-xl shadow-lg p-8">
            {currentStep === 1 && (
              <>
                <h2 className="text-2xl font-bold mb-6">Step 1: Upload Your CSV File</h2>
            
            <input
              type="file"
              id="csv-upload"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label 
              htmlFor="csv-upload" 
              className="block border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">
                    {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-muted-foreground">CSV files only (Max 10MB)</p>
                </div>
                {!uploadedFile && (
                  <div className="mt-4 px-8 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-accent transition-colors shadow-[var(--shadow-soft)]">
                    Choose File
                  </div>
                )}
              </div>
            </label>

            {uploadedFile && (
              <div className="mt-8 flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button onClick={() => setUploadedFile(null)} variant="outline" size="sm">
                  Remove
                </Button>
              </div>
            )}

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => navigate("/")}>
                    Back to Home
                  </Button>
                  <Button disabled={!uploadedFile} size="lg" onClick={() => setCurrentStep(2)}>
                    Continue to Review
                  </Button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="text-2xl font-bold mb-6">Step 2: Review Transactions</h2>
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground mb-6">AI is analyzing your transactions...</p>
                  <p className="text-sm text-muted-foreground">This feature is coming soon!</p>
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Previous
                  </Button>
                  <Button size="lg" onClick={() => setCurrentStep(3)}>
                    Continue to Approve
                  </Button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="text-2xl font-bold mb-6">Step 3: Approve Transaction</h2>
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground mb-6">Review and approve your transactions...</p>
                  <p className="text-sm text-muted-foreground">This feature is coming soon!</p>
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Previous
                  </Button>
                  <Button size="lg" onClick={() => setCurrentStep(4)}>
                    Continue to Push
                  </Button>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className="text-2xl font-bold mb-6">Step 4: Push to Xero</h2>
                <div className="text-center py-12">
                  <Send className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground mb-6">Ready to sync with your Xero account...</p>
                  <p className="text-sm text-muted-foreground">This feature is coming soon!</p>
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Previous
                  </Button>
                  <Button size="lg" onClick={() => navigate("/")}>
                    Complete
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
