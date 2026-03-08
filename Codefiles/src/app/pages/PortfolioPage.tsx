import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { portfolioPerformanceData } from "../data/mockData";
import { useState } from "react";
import { TradeModal } from "../components/TradeModal";
import type { Stock } from "../data/mockData";
import { usePortfolio } from "../context/PortfolioContext";
import { Link } from "react-router";

export function PortfolioPage() {
  const { holdings, portfolioValue, totalInvested, profitLoss, profitLossPercent } = usePortfolio();
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const handleSell = (stock: Stock) => {
    setSelectedStock(stock);
    setTradeModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground mt-1">Track your holdings and performance</p>
        </div>
        {holdings.length === 0 && (
          <Link to="/market">
            <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Start Trading
            </Button>
          </Link>
        )}
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
            <p className="text-3xl font-bold">${portfolioValue.toLocaleString()}</p>
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
            <p className={`text-3xl font-bold ${profitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)}
            </p>
            <p className={`text-sm mt-1 ${profitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {profitLoss >= 0 ? '+' : ''}{profitLossPercent.toFixed(2)}%
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
            <p className="text-3xl font-bold">{holdings.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Stocks</p>
          </CardContent>
        </Card>
      </div>

      {holdings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Holdings Yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Start building your portfolio by buying stocks from the market
            </p>
            <Link to="/market">
              <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
                Browse Market
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Portfolio Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={portfolioPerformanceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" key="grid-portfolio" />
                  <XAxis
                    dataKey="date"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    key="xaxis-portfolio"
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    key="yaxis-portfolio"
                  />
                  <Tooltip
                    key="tooltip-portfolio"
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card)',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                  />
                  <Line
                    key="line-portfolio"
                    type="monotone"
                    dataKey="value"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={false}
                    name="Portfolio Value"
                    isAnimationActive={false}
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
                    {holdings.map((holding) => (
                      <TableRow key={holding.stock.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{holding.stock.symbol}</p>
                            <p className="text-sm text-muted-foreground">{holding.stock.name}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{holding.quantity}</TableCell>
                        <TableCell className="text-right">${holding.avgBuyPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-semibold">
                          ${holding.stock.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ${holding.currentValue.toFixed(2)}
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
                            onClick={() => handleSell(holding.stock)}
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
        </>
      )}

      <TradeModal
        stock={selectedStock}
        type="sell"
        open={tradeModalOpen}
        onOpenChange={setTradeModalOpen}
      />
    </div>
  );
}