import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileCheck, CheckCircle2, Send, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ColumnMapping from "@/components/ColumnMapping";
import TransactionTable from "@/components/TransactionTable";
import Papa from "papaparse";

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<Array<Record<string, string>>>([]);
  const [csvColumns, setCsvColumns] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [mappedData, setMappedData] = useState<Array<Record<string, string>>>([
    {
      "Date": "2024-01-15",
      "Contact Name": "Acme Corp",
      "Amount": "$1,250.00",
      "Description": "Monthly software subscription",
      "Account Code": "400",
      "Reference": "INV-2024-001"
    },
    {
      "Date": "2024-01-18",
      "Contact Name": "Tech Solutions Ltd",
      "Amount": "$3,500.00",
      "Description": "Consulting services - Q1",
      "Account Code": "500",
      "Reference": "INV-2024-002"
    },
    {
      "Date": "2024-01-22",
      "Contact Name": "Office Supplies Co",
      "Amount": "$425.50",
      "Description": "Office supplies and equipment",
      "Account Code": "610",
      "Reference": "INV-2024-003"
    },
    {
      "Date": "2024-01-25",
      "Contact Name": "Cloud Hosting Inc",
      "Amount": "$899.00",
      "Description": "Cloud hosting services",
      "Account Code": "420",
      "Reference": "INV-2024-004"
    },
    {
      "Date": "2024-01-28",
      "Contact Name": "Marketing Agency",
      "Amount": "$2,750.00",
      "Description": "Digital marketing campaign",
      "Account Code": "700",
      "Reference": "INV-2024-005"
    }
  ]);
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
    { id: 4, title: "Push to Xero", icon: Send, color: "text-accent" },
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
      
      // Parse CSV file
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as Array<Record<string, string>>;
          const columns = results.meta.fields || [];
          
          setCsvData(data);
          setCsvColumns(columns);
          
          toast({
            title: "File uploaded successfully",
            description: `${file.name} - ${data.length} rows, ${columns.length} columns`,
          });
        },
        error: (error) => {
          toast({
            title: "Error parsing CSV",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    }
  };

  useEffect(() => {
    // When column mapping changes, apply it to create mapped data
    if (Object.keys(columnMapping).length > 0 && csvData.length > 0) {
      const mapped = csvData.map((row) => {
        const mappedRow: Record<string, string> = {};
        Object.entries(columnMapping).forEach(([requiredCol, csvCol]) => {
          mappedRow[requiredCol] = row[csvCol] || "";
        });
        return mappedRow;
      });
      setMappedData(mapped);
    }
  }, [columnMapping, csvData]);

  const handleNext = () => {
    if (currentStep < 4) {
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
          <h1 className="text-4xl font-bold mb-2">Reconcile Buddy Wizard</h1>
          <p className="text-muted-foreground">Follow the steps to reconcile your transactions</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
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
            <ColumnMapping 
              requiredColumns={requiredColumns}
              csvColumns={csvColumns}
              onMappingChange={setColumnMapping}
            />
          )}

          {currentStep === 3 && (
            <TransactionTable 
              data={mappedData}
              columns={requiredColumns}
              onDataChange={setMappedData}
            />
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Push to Xero</h2>
                <p className="text-muted-foreground">
                  Download your reconciled transactions or upload directly to Xero
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="p-4 rounded-full bg-primary/10 w-fit">
                      <Download className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Download Xero CSV</h3>
                      <p className="text-muted-foreground text-sm">
                        Download your transactions as a CSV file formatted for Xero import
                      </p>
                    </div>
                    <Button className="w-full">
                      Download Xero CSV
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="p-4 rounded-full bg-accent/10 w-fit">
                      <Send className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Upload to Xero</h3>
                      <p className="text-muted-foreground text-sm">
                        Directly upload your transactions to your Xero account
                      </p>
                    </div>
                    <Button className="w-full" variant="secondary">
                      Upload to Xero
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground text-center">
                  {mappedData.length} transactions ready to be pushed to Xero
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={handleBack}>
              {currentStep === 1 ? "Back to Home" : "Previous"}
            </Button>
            <Button onClick={handleNext} disabled={currentStep === 4}>
              {currentStep === 4 ? "Finish" : currentStep === 3 ? "Approve" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Wizard;
