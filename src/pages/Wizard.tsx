import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileCheck, CheckCircle2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ColumnMapping from "@/components/ColumnMapping";

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const requiredColumns = [
    "Date",
    "Contact Name",
    "Amount",
    "Description",
    "Account Code",
    "Reference",
  ];

  const steps = [
    { id: 1, title: "Upload CSV", icon: Upload, color: "text-primary" },
    { id: 2, title: "Review Columns", icon: FileCheck, color: "text-accent" },
    { id: 3, title: "Review Transactions", icon: CheckCircle2, color: "text-accent" },
    { id: 4, title: "Approve", icon: CheckCircle2, color: "text-accent" },
    { id: 5, title: "Push to Xero", icon: Send, color: "text-accent" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
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
        description: `${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
      });
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/50 to-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">AI Reconciliation Wizard</h1>
          <p className="text-muted-foreground">Follow the steps to reconcile your transactions</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <Card
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`p-6 transition-all cursor-pointer hover:shadow-lg ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-lg scale-105"
                    : isCompleted
                    ? "border-accent bg-accent/5 hover:border-accent/50"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Step {step.id}</p>
                    <p className="font-semibold">{step.title}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Content Area */}
        <Card className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Upload Your CSV File</h2>
                <p className="text-muted-foreground">
                  Upload your transaction CSV file to begin the reconciliation process
                </p>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="p-4 rounded-full bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">CSV files only</p>
                  </div>
                </label>
              </div>

              {uploadedFile && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
                  <FileCheck className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <ColumnMapping requiredColumns={requiredColumns} />
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review Transactions</h2>
                <p className="text-muted-foreground">
                  Review your imported transaction data
                </p>
              </div>
              <div className="text-center py-12 text-muted-foreground">
                Transaction data table will be implemented here
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Approve Transactions</h2>
                <p className="text-muted-foreground">
                  Review and approve AI-reconciled transactions
                </p>
              </div>
              <div className="text-center py-12 text-muted-foreground">
                Transaction approval interface will be implemented here
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Push to Xero</h2>
                <p className="text-muted-foreground">
                  Connect and sync approved transactions to Xero
                </p>
              </div>
              <div className="text-center py-12 text-muted-foreground">
                Xero integration will be implemented here
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={handleBack}>
              {currentStep === 1 ? "Back to Home" : "Previous"}
            </Button>
            <Button onClick={handleNext} disabled={currentStep === 5}>
              {currentStep === 5 ? "Complete" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Wizard;
