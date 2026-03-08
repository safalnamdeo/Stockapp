import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Stock } from "../data/mockData";

export interface PortfolioHolding {
  stock: Stock;
  quantity: number;
  avgBuyPrice: number;
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell";
  stock: Stock;
  quantity: number;
  price: number;
  total: number;
  date: Date;
}

interface PortfolioContextType {
  balance: number;
  holdings: PortfolioHolding[];
  transactions: Transaction[];
  portfolioValue: number;
  totalInvested: number;
  profitLoss: number;
  profitLossPercent: number;
  buyStock: (stock: Stock, quantity: number, price: number) => boolean;
  sellStock: (stock: Stock, quantity: number, price: number) => boolean;
  getHolding: (stockId: string) => PortfolioHolding | undefined;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(50000);
  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Calculate portfolio metrics
  const portfolioValue = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalInvested = holdings.reduce((sum, h) => sum + h.totalInvested, 0);
  const profitLoss = portfolioValue - totalInvested;
  const profitLossPercent = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

  // Update current values when holdings change
  useEffect(() => {
    setHoldings(prevHoldings =>
      prevHoldings.map(holding => {
        const currentValue = holding.stock.price * holding.quantity;
        const profitLoss = currentValue - holding.totalInvested;
        const profitLossPercent = (profitLoss / holding.totalInvested) * 100;
        return {
          ...holding,
          currentValue,
          profitLoss,
          profitLossPercent,
        };
      })
    );
  }, []);

  const buyStock = (stock: Stock, quantity: number, price: number): boolean => {
    const total = quantity * price;

    // Check if user has enough balance
    if (total > balance) {
      return false;
    }

    // Update balance
    setBalance(prev => prev - total);

    // Update holdings
    setHoldings(prevHoldings => {
      const existingHoldingIndex = prevHoldings.findIndex(h => h.stock.id === stock.id);

      if (existingHoldingIndex >= 0) {
        // Update existing holding
        const existing = prevHoldings[existingHoldingIndex];
        const newQuantity = existing.quantity + quantity;
        const newTotalInvested = existing.totalInvested + total;
        const newAvgBuyPrice = newTotalInvested / newQuantity;
        const currentValue = stock.price * newQuantity;
        const profitLoss = currentValue - newTotalInvested;
        const profitLossPercent = (profitLoss / newTotalInvested) * 100;

        const updated = [...prevHoldings];
        updated[existingHoldingIndex] = {
          stock,
          quantity: newQuantity,
          avgBuyPrice: newAvgBuyPrice,
          totalInvested: newTotalInvested,
          currentValue,
          profitLoss,
          profitLossPercent,
        };
        return updated;
      } else {
        // Add new holding
        const currentValue = stock.price * quantity;
        const profitLoss = currentValue - total;
        const profitLossPercent = (profitLoss / total) * 100;

        return [
          ...prevHoldings,
          {
            stock,
            quantity,
            avgBuyPrice: price,
            totalInvested: total,
            currentValue,
            profitLoss,
            profitLossPercent,
          },
        ];
      }
    });

    // Add transaction
    const transaction: Transaction = {
      id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "buy",
      stock,
      quantity,
      price,
      total,
      date: new Date(),
    };
    setTransactions(prev => [transaction, ...prev]);

    return true;
  };

  const sellStock = (stock: Stock, quantity: number, price: number): boolean => {
    // Check if user has enough shares
    const holding = holdings.find(h => h.stock.id === stock.id);
    if (!holding || holding.quantity < quantity) {
      return false;
    }

    const total = quantity * price;

    // Update balance
    setBalance(prev => prev + total);

    // Update holdings
    setHoldings(prevHoldings => {
      const existingHoldingIndex = prevHoldings.findIndex(h => h.stock.id === stock.id);
      if (existingHoldingIndex < 0) return prevHoldings;

      const existing = prevHoldings[existingHoldingIndex];
      const newQuantity = existing.quantity - quantity;

      if (newQuantity === 0) {
        // Remove holding completely
        return prevHoldings.filter((_, i) => i !== existingHoldingIndex);
      } else {
        // Update holding
        const soldInvestedAmount = (existing.totalInvested / existing.quantity) * quantity;
        const newTotalInvested = existing.totalInvested - soldInvestedAmount;
        const currentValue = stock.price * newQuantity;
        const profitLoss = currentValue - newTotalInvested;
        const profitLossPercent = (profitLoss / newTotalInvested) * 100;

        const updated = [...prevHoldings];
        updated[existingHoldingIndex] = {
          ...existing,
          quantity: newQuantity,
          totalInvested: newTotalInvested,
          currentValue,
          profitLoss,
          profitLossPercent,
        };
        return updated;
      }
    });

    // Add transaction
    const transaction: Transaction = {
      id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "sell",
      stock,
      quantity,
      price,
      total,
      date: new Date(),
    };
    setTransactions(prev => [transaction, ...prev]);

    return true;
  };

  const getHolding = (stockId: string): PortfolioHolding | undefined => {
    return holdings.find(h => h.stock.id === stockId);
  };

  return (
    <PortfolioContext.Provider
      value={{
        balance,
        holdings,
        transactions,
        portfolioValue,
        totalInvested,
        profitLoss,
        profitLossPercent,
        buyStock,
        sellStock,
        getHolding,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
