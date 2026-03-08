import { useParams, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { stocks, generateStockPriceHistory } from "../data/mockData";
import { PriceChangeBadge } from "../components/PriceChangeBadge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TradeModal } from "../components/TradeModal";
import { useState } from "react";
import type { Stock } from "../data/mockData";

export function StockDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stock = stocks.find((s) => s.id === id);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  if (!stock) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Stock not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const priceHistory = generateStockPriceHistory(stock.price);

  const handleBuy = () => {
    setTradeType('buy');
    setTradeModalOpen(true);
  };

  const handleSell = () => {
    setTradeType('sell');
    setTradeModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Market
      </Button>

      {/* Stock Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{stock.name}</h1>
          <p className="text-xl text-muted-foreground mt-1">{stock.symbol}</p>
        </div>
        <div className="flex gap-3">
          <Button size="lg" className="bg-[#2563EB] hover:bg-[#1d4ed8]" onClick={handleBuy}>
            Buy
          </Button>
          <Button size="lg" variant="outline" onClick={handleSell}>
            Sell
          </Button>
        </div>
      </div>

      {/* Price Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${stock.price.toFixed(2)}</p>
            <PriceChangeBadge
              change={stock.change}
              changePercent={stock.changePercent}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${stock.open.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              High
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#16A34A]">${stock.high.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#DC2626]">${stock.low.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Market Cap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stock.marketCap}</p>
          </CardContent>
        </Card>
      </div>

      {/* Price Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Price History (30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={priceHistory} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" key="grid-stock-detail" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                key="xaxis-stock-detail"
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                domain={['dataMin - 5', 'dataMax + 5']}
                key="yaxis-stock-detail"
              />
              <Tooltip
                key="tooltip-stock-detail"
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Line
                key="line-stock-detail"
                type="monotone"
                dataKey="price"
                stroke={stock.change >= 0 ? '#16A34A' : '#DC2626'}
                strokeWidth={2}
                dot={false}
                name="Stock Price"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Symbol</p>
              <p className="font-semibold font-mono">{stock.symbol}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company Name</p>
              <p className="font-semibold">{stock.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="font-semibold">{stock.marketCap}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="font-semibold">{stock.volume}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <TradeModal
        stock={stock}
        type={tradeType}
        open={tradeModalOpen}
        onOpenChange={setTradeModalOpen}
      />
    </div>
  );
}