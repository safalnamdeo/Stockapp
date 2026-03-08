import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import type { Stock } from "../data/mockData";
import { toast } from "sonner";

interface TradeModalProps {
  stock: Stock | null;
  type: 'buy' | 'sell';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TradeModal({ stock, type, open, onOpenChange }: TradeModalProps) {
  const [quantity, setQuantity] = useState<number>(1);

  if (!stock) return null;

  const total = stock.price * quantity;
  const isBuy = type === 'buy';

  const handleTrade = () => {
    toast.success(
      `Successfully ${isBuy ? 'bought' : 'sold'} ${quantity} share${quantity > 1 ? 's' : ''} of ${stock.symbol}`,
      {
        description: `Total: $${total.toFixed(2)}`,
      }
    );
    onOpenChange(false);
    setQuantity(1);
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
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
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
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleTrade}
            className={isBuy ? "bg-[#2563EB] hover:bg-[#1d4ed8]" : "bg-[#DC2626] hover:bg-[#b91c1c]"}
          >
            {isBuy ? 'Buy' : 'Sell'} Shares
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
