import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X } from "lucide-react";

interface TransactionTableProps {
  data: Array<Record<string, string>>;
  columns: string[];
  onDataChange?: (data: Array<Record<string, string>>) => void;
}

const TransactionTable = ({ data, columns, onDataChange }: TransactionTableProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<Record<string, string>>({});
  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedRow({ ...data[index] });
  };

  const handleSave = (index: number) => {
    const newData = [...data];
    newData[index] = editedRow;
    onDataChange?.(newData);
    setEditingIndex(null);
    setEditedRow({});
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedRow({});
  };

  const handleFieldChange = (column: string, value: string) => {
    setEditedRow({ ...editedRow, [column]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Transactions</h2>
        <p className="text-muted-foreground">
          Review your imported transaction data ({data.length} transactions)
        </p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.map((column) => (
                  <TableHead key={column} className="font-semibold">
                    {column}
                  </TableHead>
                ))}
                <TableHead className="font-semibold w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No transaction data available. Please upload a CSV file and map the columns.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    {columns.map((column) => (
                      <TableCell key={column}>
                        {editingIndex === index ? (
                          <Input
                            value={editedRow[column] || ""}
                            onChange={(e) => handleFieldChange(column, e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          row[column] || "-"
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      {editingIndex === index ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSave(index)}
                            className="h-8 w-8 p-0"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancel}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
