import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { DollarSign, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { portfolioHoldings, userData } from "../data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { portfolioPerformanceData } from "../data/mockData";
import { useState } from "react";
import { TradeModal } from "../components/TradeModal";
import type { Stock } from "../data/mockData";
import { stocks } from "../data/mockData";

export function PortfolioPage() {
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const handleSell = (holding: typeof portfolioHoldings[0]) => {
    const stock = stocks.find(s => s.id === holding.stockId);
    if (stock) {
      setSelectedStock(stock);
      setTradeModalOpen(true);
    }
  };

  const totalValue = portfolioHoldings.reduce((sum, h) => sum + h.totalValue, 0);
  const totalProfitLoss = portfolioHoldings.reduce((sum, h) => sum + h.profitLoss, 0);
  const totalProfitLossPercent = (totalProfitLoss / (totalValue - totalProfitLoss)) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground mt-1">Track your holdings and performance</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Total Profit/Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${totalProfitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toFixed(2)}
            </p>
            <p className={`text-sm mt-1 ${totalProfitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{portfolioHoldings.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Stocks</p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={portfolioPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              />
              <Line
                key="portfolio-performance"
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Avg Price</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                  <TableHead className="text-right">Profit/Loss</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioHoldings.map((holding) => (
                  <TableRow key={holding.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{holding.symbol}</p>
                        <p className="text-sm text-muted-foreground">{holding.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{holding.quantity}</TableCell>
                    <TableCell className="text-right">${holding.avgPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${holding.currentPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ${holding.totalValue.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={holding.profitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}>
                        <p className="font-semibold">
                          {holding.profitLoss >= 0 ? '+' : ''}${holding.profitLoss.toFixed(2)}
                        </p>
                        <p className="text-sm">
                          {holding.profitLoss >= 0 ? '+' : ''}{holding.profitLossPercent.toFixed(2)}%
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSell(holding)}
                      >
                        Sell
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <TradeModal
        stock={selectedStock}
        type="sell"
        open={tradeModalOpen}
        onOpenChange={setTradeModalOpen}
      />
    </div>
  );
}