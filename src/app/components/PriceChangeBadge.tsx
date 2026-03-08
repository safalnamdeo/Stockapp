import { cn } from "../components/ui/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceChangeBadgeProps {
  change: number;
  changePercent: number;
  className?: string;
  showIcon?: boolean;
}

export function PriceChangeBadge({ 
  change, 
  changePercent, 
  className,
  showIcon = true 
}: PriceChangeBadgeProps) {
  const isPositive = change >= 0;
  
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded text-sm",
        isPositive 
          ? "bg-[#16A34A]/10 text-[#16A34A]" 
          : "bg-[#DC2626]/10 text-[#DC2626]",
        className
      )}
    >
      {showIcon && (
        isPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )
      )}
      <span>
        {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
      </span>
    </div>
  );
}
