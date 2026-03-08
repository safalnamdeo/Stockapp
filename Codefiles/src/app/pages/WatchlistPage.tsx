import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Star } from "lucide-react";
import { watchlistStocks } from "../data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { PriceChangeBadge } from "../components/PriceChangeBadge";
import { useState } from "react";
import { TradeModal } from "../components/TradeModal";
import type { Stock } from "../data/mockData";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function WatchlistPage() {
  const navigate = useNavigate();
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const handleBuy = (stock: Stock, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedStock(stock);
    setTradeType('buy');
    setTradeModalOpen(true);
  };

  const handleSell = (stock: Stock, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedStock(stock);
    setTradeType('sell');
    setTradeModalOpen(true);
  };

  const handleRemove = (stock: Stock, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`${stock.symbol} removed from watchlist`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Watchlist</h1>
        <p className="text-muted-foreground mt-1">Monitor your favorite stocks</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#2563EB]" />
            My Watchlist ({watchlistStocks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Market Cap</TableHead>
                  <TableHead className="text-right">Volume</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {watchlistStocks.map((stock) => (
                  <TableRow
                    key={stock.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/stock/${stock.id}`)}
                  >
                    <TableCell className="font-medium">{stock.name}</TableCell>
                    <TableCell className="font-mono">{stock.symbol}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${stock.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <PriceChangeBadge
                        change={stock.change}
                        changePercent={stock.changePercent}
                        showIcon={false}
                      />
                    </TableCell>
                    <TableCell className="text-right">{stock.marketCap}</TableCell>
                    <TableCell className="text-right">{stock.volume}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          className="bg-[#2563EB] hover:bg-[#1d4ed8]"
                          onClick={(e) => handleBuy(stock, e)}
                        >
                          Buy
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => handleSell(stock, e)}
                        >
                          Sell
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => handleRemove(stock, e)}
                        >
                          <Star className="w-4 h-4 fill-[#2563EB] text-[#2563EB]" />
                        </Button>
                      </div>
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
        type={tradeType}
        open={tradeModalOpen}
        onOpenChange={setTradeModalOpen}
      />
    </div>
  );
}
