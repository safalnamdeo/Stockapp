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
import { usePortfolio } from "../context/PortfolioContext";
import { Receipt } from "lucide-react";

export function TransactionsPage() {
  const { transactions } = usePortfolio();

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
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Receipt className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Transactions Yet</h3>
              <p className="text-muted-foreground text-center">
                Your transaction history will appear here once you start trading
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
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
                        <div>
                          <p className="font-medium">
                            {transaction.date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.date.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{transaction.stock.symbol}</p>
                          <p className="text-sm text-muted-foreground">{transaction.stock.name}</p>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}