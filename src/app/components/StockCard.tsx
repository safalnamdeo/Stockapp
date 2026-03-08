import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PriceChangeBadge } from "./PriceChangeBadge";
import type { Stock } from "../data/mockData";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface StockCardProps {
  stock: Stock;
  onBuy?: (stock: Stock) => void;
  onSell?: (stock: Stock) => void;
}

export function StockCard({ stock, onBuy, onSell }: StockCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/stock/${stock.id}`)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{stock.symbol}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{stock.name}</p>
          </div>
          <PriceChangeBadge change={stock.change} changePercent={stock.changePercent} showIcon={false} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-3xl font-semibold">${stock.price.toFixed(2)}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Market Cap</p>
              <p className="font-medium">{stock.marketCap}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Volume</p>
              <p className="font-medium">{stock.volume}</p>
            </div>
          </div>
          {(onBuy || onSell) && (
            <div className="flex gap-2 pt-2">
              {onBuy && (
                <Button 
                  size="sm" 
                  className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBuy(stock);
                  }}
                >
                  Buy
                </Button>
              )}
              {onSell && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSell(stock);
                  }}
                >
                  Sell
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
