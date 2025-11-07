import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, User, DollarSign, FileText, Hash, Tag, ChevronRight, Target } from "lucide-react";

interface ColumnMappingProps {
  requiredColumns: string[];
}

const ColumnMapping = ({ requiredColumns }: ColumnMappingProps) => {
  const columnIcons: Record<string, any> = {
    "Date": Calendar,
    "Contact Name": User,
    "Amount": DollarSign,
    "Description": FileText,
    "Account Code": Hash,
    "Reference": Tag,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Transactions</h2>
        <p className="text-muted-foreground">
          Choose how to import your CSV columns
        </p>
      </div>

      <div className="space-y-3">
        {requiredColumns.map((column, index) => {
          const Icon = columnIcons[column] || FileText;
          
          return (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                {/* Left Icon */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium truncate">{column}</span>
                </div>

                {/* Arrow */}
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />

                {/* Status Indicator */}
                <div className="p-1.5 rounded-full bg-accent shrink-0">
                  <Target className="h-4 w-4 text-accent-foreground" />
                </div>

                {/* Dropdown */}
                <div className="w-64 shrink-0">
                  <Select>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Column name" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border z-50">
                      <SelectItem value={column.toLowerCase().replace(/\s+/g, '_')}>
                        {column}
                      </SelectItem>
                      <SelectItem value="date_column">Date Column</SelectItem>
                      <SelectItem value="name_column">Name Column</SelectItem>
                      <SelectItem value="amount_column">Amount Column</SelectItem>
                      <SelectItem value="desc_column">Description Column</SelectItem>
                      <SelectItem value="code_column">Code Column</SelectItem>
                      <SelectItem value="ref_column">Reference Column</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ColumnMapping;
