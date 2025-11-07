import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ColumnMappingProps {
  columns: string[];
}

const ColumnMapping = ({ columns }: ColumnMappingProps) => {
  const requiredColumns = [
    "Date",
    "Contact Name",
    "Amount",
    "Description",
    "Account Code",
    "Reference",
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-6">Choose how to import your CSV columns</h3>
      {requiredColumns.map((columnName) => (
        <div
          key={columnName}
          className="flex items-center gap-4 p-4 bg-background border border-border rounded-lg hover:border-primary/30 transition-colors"
        >
          {/* Icon and Column Name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="font-medium truncate">{columnName}</span>
          </div>

          {/* Arrow */}
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />

          {/* Status Indicator */}
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
          </div>

          {/* Dropdown */}
          <div className="w-64 flex-shrink-0">
            <Select defaultValue={columnName}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select column" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-50">
                {columns.map((col) => (
                  <SelectItem key={col} value={col}>
                    {col}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColumnMapping;
