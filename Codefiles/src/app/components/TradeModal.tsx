import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { Stock } from "../data/mockData";
import { toast } from "sonner";
import { usePortfolio } from "../context/PortfolioContext";

interface TradeModalProps {
  stock: Stock | null;
  type: 'buy' | 'sell';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TradeModal({ stock, type, open, onOpenChange }: TradeModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const { balance, buyStock, sellStock, getHolding } = usePortfolio();

  // Reset quantity when modal opens
  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open]);

  if (!stock) return null;

  const total = stock.price * quantity;
  const isBuy = type === 'buy';
  const holding = getHolding(stock.id);
  const availableShares = holding?.quantity || 0;

  const handleTrade = () => {
    if (isBuy) {
      if (total > balance) {
        toast.error("Insufficient balance", {
          description: `You need $${total.toFixed(2)} but only have $${balance.toFixed(2)}`,
        });
        return;
      }
      
      const success = buyStock(stock, quantity, stock.price);
      if (success) {
        toast.success(
          `Successfully bought ${quantity} share${quantity > 1 ? 's' : ''} of ${stock.symbol}`,
          {
            description: `Total cost: $${total.toFixed(2)}`,
          }
        );
        onOpenChange(false);
      } else {
        toast.error("Purchase failed", {
          description: "Unable to complete the transaction",
        });
      }
    } else {
      if (quantity > availableShares) {
        toast.error("Insufficient shares", {
          description: `You only have ${availableShares} share${availableShares !== 1 ? 's' : ''} available`,
        });
        return;
      }
      
      const success = sellStock(stock, quantity, stock.price);
      if (success) {
        toast.success(
          `Successfully sold ${quantity} share${quantity > 1 ? 's' : ''} of ${stock.symbol}`,
          {
            description: `Total return: $${total.toFixed(2)}`,
          }
        );
        onOpenChange(false);
      } else {
        toast.error("Sale failed", {
          description: "Unable to complete the transaction",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isBuy ? 'Buy' : 'Sell'} {stock.symbol}</DialogTitle>
          <DialogDescription>
            {stock.name} - ${stock.price.toFixed(2)} per share
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {!isBuy && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shares Available</span>
                <span className="font-semibold">{availableShares}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={isBuy ? undefined : availableShares}
              value={quantity}
              onChange={(e) => {
                const val = Math.max(1, parseInt(e.target.value) || 1);
                setQuantity(isBuy ? val : Math.min(val, availableShares));
              }}
              className="bg-input-background"
            />
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price per share</span>
              <span className="font-medium">${stock.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium">{quantity}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-medium">Estimated {isBuy ? 'Cost' : 'Return'}</span>
              <span className="font-semibold text-lg">${total.toFixed(2)}</span>
            </div>
            {isBuy && (
              <div className="flex justify-between text-sm pt-1">
                <span className="text-muted-foreground">Available Balance</span>
                <span className={`font-medium ${total > balance ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
                  ${balance.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleTrade}
            className={isBuy ? "bg-[#2563EB] hover:bg-[#1d4ed8]" : "bg-[#DC2626] hover:bg-[#b91c1c]"}
            disabled={!isBuy && quantity > availableShares}
          >
            {isBuy ? 'Buy' : 'Sell'} Shares
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}