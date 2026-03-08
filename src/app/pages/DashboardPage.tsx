import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Wallet } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { marketIndices, portfolioPerformanceData, userData, watchlistStocks } from "../data/mockData";
import { PriceChangeBadge } from "../components/PriceChangeBadge";
import { StockCard } from "../components/StockCard";
import { useState } from "react";
import { TradeModal } from "../components/TradeModal";
import type { Stock } from "../data/mockData";

export function DashboardPage() {
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const handleBuy = (stock: Stock) => {
    setSelectedStock(stock);
    setTradeType('buy');
    setTradeModalOpen(true);
  };

  const handleSell = (stock: Stock) => {
    setSelectedStock(stock);
    setTradeType('sell');
    setTradeModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {userData.name}!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your portfolio today.</p>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {marketIndices.map((index) => (
          <Card key={index.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {index.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">{index.value.toLocaleString()}</p>
                  <PriceChangeBadge 
                    change={index.change} 
                    changePercent={index.changePercent}
                    className="mt-2"
                  />
                </div>
                {index.change >= 0 ? (
                  <ArrowUpRight className="w-8 h-8 text-[#16A34A]" />
                ) : (
                  <ArrowDownRight className="w-8 h-8 text-[#DC2626]" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${userData.balance.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${userData.portfolioValue.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${userData.totalInvested.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Profit/Loss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${userData.profitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {userData.profitLoss >= 0 ? '+' : ''}${userData.profitLoss.toLocaleString()}
            </p>
            <p className={`text-sm ${userData.profitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {userData.profitLoss >= 0 ? '+' : ''}{userData.profitLossPercent}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Growth Chart */}
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
              />
              <Line 
                key="portfolio-value"
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

      {/* Watchlist Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Watchlist</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {watchlistStocks.map((stock) => (
            <StockCard 
              key={stock.id} 
              stock={stock}
              onBuy={handleBuy}
              onSell={handleSell}
            />
          ))}
        </div>
      </div>

      <TradeModal
        stock={selectedStock}
        type={tradeType}
        open={tradeModalOpen}
        onOpenChange={setTradeModalOpen}
      />
    </div>
  );
}