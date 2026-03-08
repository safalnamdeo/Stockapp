import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { stocks } from "../data/mockData";
import { PriceChangeBadge } from "../components/PriceChangeBadge";
import { useNavigate } from "react-router";
import { TradeModal } from "../components/TradeModal";
import type { Stock } from "../data/mockData";

export function StockMarketPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stock Market</h1>
        <p className="text-muted-foreground mt-1">Browse and trade stocks</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Stocks</CardTitle>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name or symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
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
                {filteredStocks.map((stock) => (
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
