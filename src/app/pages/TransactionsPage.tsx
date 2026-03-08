import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { transactions } from "../data/mockData";

export function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground mt-1">View all your trading activities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{transaction.symbol}</p>
                        <p className="text-sm text-muted-foreground">{transaction.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.type === 'buy' ? 'default' : 'secondary'}
                        className={
                          transaction.type === 'buy'
                            ? 'bg-[#2563EB] hover:bg-[#1d4ed8]'
                            : 'bg-[#DC2626] hover:bg-[#b91c1c] text-white'
                        }
                      >
                        {transaction.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{transaction.quantity}</TableCell>
                    <TableCell className="text-right">${transaction.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${transaction.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
