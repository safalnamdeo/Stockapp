import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Wallet, Activity, BarChart3, Eye, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { marketIndices, portfolioPerformanceData, watchlistStocks } from "../data/mockData";
import { PriceChangeBadge } from "../components/PriceChangeBadge";
import { StockCard } from "../components/StockCard";
import { useState } from "react";
import { TradeModal } from "../components/TradeModal";
import type { Stock } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import { usePortfolio } from "../context/PortfolioContext";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

export function DashboardPage() {
  const { user } = useAuth();
  const { balance, portfolioValue, totalInvested, profitLoss, profitLossPercent } = usePortfolio();
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
    <div className="space-y-8">
      {/* Welcome Section with Quick Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome back, {user?.name || "Trader"}!</h1>
          <p className="text-muted-foreground mt-2 text-lg">Here's your portfolio overview for today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/market">
            <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]">
              <BarChart3 className="w-4 h-4 mr-2" />
              Browse Market
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button variant="outline">
              <Wallet className="w-4 h-4 mr-2" />
              View Portfolio
            </Button>
          </Link>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-[#2563EB] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-[#2563EB]" />
              </div>
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight">${balance.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Available cash</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#16A34A] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#16A34A]/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-[#16A34A]" />
              </div>
              Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight">${portfolioValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Total holdings value</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#9333EA] shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#9333EA]/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#9333EA]" />
              </div>
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tracking-tight">${totalInvested.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Capital deployed</p>
          </CardContent>
        </Card>

        <Card className={`border-l-4 shadow-sm hover:shadow-md transition-shadow ${profitLoss >= 0 ? 'border-l-[#16A34A]' : 'border-l-[#DC2626]'}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${profitLoss >= 0 ? 'bg-[#16A34A]/10' : 'bg-[#DC2626]/10'}`}>
                <Activity className={`w-4 h-4 ${profitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`} />
              </div>
              Total Return
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold tracking-tight ${profitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {profitLoss >= 0 ? '+' : ''}${profitLoss.toLocaleString()}
            </p>
            <p className={`text-sm font-medium mt-1 ${profitLoss >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
              {profitLoss >= 0 ? '+' : ''}{profitLossPercent}% return
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Performance Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Portfolio Performance</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Your portfolio value over time</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Period:</span>
                  <span className="font-semibold">Last 30 Days</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={portfolioPerformanceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" key="grid-dashboard" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    key="xaxis-dashboard"
                  />
                  <YAxis 
                    className="text-xs" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    key="yaxis-dashboard"
                  />
                  <Tooltip
                    key="tooltip-dashboard"
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line 
                    key="line-dashboard"
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563EB" 
                    strokeWidth={3}
                    dot={false}
                    name="Portfolio Value"
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Market Indices - Takes 1 column */}
        <div>
          <Card className="shadow-sm">
            <CardHeader className="border-b">
              <CardTitle className="text-xl">Market Indices</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Live market overview</p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {marketIndices.map((index) => (
                  <div key={index.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{index.name}</p>
                      <p className="text-xl font-bold mt-1">{index.value.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1">
                        {index.change >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-[#16A34A]" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-[#DC2626]" />
                        )}
                        <span className={`text-sm font-semibold ${index.change >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                          {index.changePercent}%
                        </span>
                      </div>
                      <span className={`text-xs ${index.change >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                        {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Watchlist Section */}
      <div>
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#2563EB]" />
                  Your Watchlist
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Stocks you're tracking</p>
              </div>
              <Link to="/watchlist">
                <Button variant="ghost" size="sm" className="text-[#2563EB]">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
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
          </CardContent>
        </Card>
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