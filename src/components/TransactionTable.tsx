import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionTableProps {
  data: Array<Record<string, string>>;
  columns: string[];
}

const TransactionTable = ({ data, columns }: TransactionTableProps) => {
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No transaction data available. Please upload a CSV file and map the columns.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    {columns.map((column) => (
                      <TableCell key={column}>{row[column] || "-"}</TableCell>
                    ))}
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
