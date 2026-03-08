// Mock data for the stock trading app

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  high: number;
  low: number;
  open: number;
}

export interface PortfolioHolding {
  id: string;
  stockId: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Transaction {
  id: string;
  date: string;
  stockId: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

// Market indices
export const marketIndices: MarketIndex[] = [
  {
    name: "NIFTY 50",
    value: 21453.80,
    change: 245.60,
    changePercent: 1.16,
  },
  {
    name: "SENSEX",
    value: 71483.75,
    change: 389.25,
    changePercent: 0.55,
  },
  {
    name: "NASDAQ",
    value: 15235.89,
    change: -56.42,
    changePercent: -0.37,
  },
];

// Stock list
export const stocks: Stock[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.25,
    change: 2.45,
    changePercent: 1.39,
    marketCap: "2.8T",
    volume: "52.3M",
    high: 179.50,
    low: 176.20,
    open: 177.00,
  },
  {
    id: "2",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.65,
    change: -1.25,
    changePercent: -0.87,
    marketCap: "1.8T",
    volume: "28.5M",
    high: 144.20,
    low: 142.10,
    open: 143.50,
  },
  {
    id: "3",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 412.80,
    change: 5.60,
    changePercent: 1.38,
    marketCap: "3.1T",
    volume: "22.8M",
    high: 414.50,
    low: 410.20,
    open: 411.00,
  },
  {
    id: "4",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.35,
    change: 3.15,
    changePercent: 1.80,
    marketCap: "1.8T",
    volume: "45.2M",
    high: 179.80,
    low: 176.50,
    open: 177.20,
  },
  {
    id: "5",
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 242.84,
    change: -8.45,
    changePercent: -3.36,
    marketCap: "770B",
    volume: "115.3M",
    high: 252.30,
    low: 241.50,
    open: 250.20,
  },
  {
    id: "6",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 12.45,
    changePercent: 1.44,
    marketCap: "2.2T",
    volume: "38.7M",
    high: 880.50,
    low: 870.20,
    open: 872.00,
  },
  {
    id: "7",
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 485.20,
    change: -2.80,
    changePercent: -0.57,
    marketCap: "1.2T",
    volume: "16.5M",
    high: 489.50,
    low: 483.20,
    open: 487.00,
  },
  {
    id: "8",
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 598.75,
    change: 7.25,
    changePercent: 1.23,
    marketCap: "260B",
    volume: "4.2M",
    high: 602.50,
    low: 595.20,
    open: 596.00,
  },
  {
    id: "9",
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: 188.45,
    change: 4.35,
    changePercent: 2.36,
    marketCap: "305B",
    volume: "58.3M",
    high: 190.20,
    low: 186.50,
    open: 187.00,
  },
  {
    id: "10",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 192.45,
    change: 1.85,
    changePercent: 0.97,
    marketCap: "555B",
    volume: "8.7M",
    high: 193.50,
    low: 191.20,
    open: 191.80,
  },
  {
    id: "11",
    symbol: "V",
    name: "Visa Inc.",
    price: 285.30,
    change: -0.95,
    changePercent: -0.33,
    marketCap: "590B",
    volume: "5.8M",
    high: 287.20,
    low: 284.50,
    open: 286.00,
  },
  {
    id: "12",
    symbol: "WMT",
    name: "Walmart Inc.",
    price: 168.75,
    change: 2.15,
    changePercent: 1.29,
    marketCap: "450B",
    volume: "6.5M",
    high: 169.80,
    low: 167.50,
    open: 168.00,
  },
];

// Portfolio holdings
export const portfolioHoldings: PortfolioHolding[] = [
  {
    id: "1",
    stockId: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 25,
    avgPrice: 165.50,
    currentPrice: 178.25,
    totalValue: 4456.25,
    profitLoss: 318.75,
    profitLossPercent: 7.7,
  },
  {
    id: "2",
    stockId: "3",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    quantity: 15,
    avgPrice: 395.20,
    currentPrice: 412.80,
    totalValue: 6192.00,
    profitLoss: 264.00,
    profitLossPercent: 4.45,
  },
  {
    id: "3",
    stockId: "6",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    quantity: 10,
    avgPrice: 820.50,
    currentPrice: 875.28,
    totalValue: 8752.80,
    profitLoss: 547.80,
    profitLossPercent: 6.68,
  },
  {
    id: "4",
    stockId: "5",
    symbol: "TSLA",
    name: "Tesla Inc.",
    quantity: 20,
    avgPrice: 255.30,
    currentPrice: 242.84,
    totalValue: 4856.80,
    profitLoss: -249.20,
    profitLossPercent: -4.88,
  },
  {
    id: "5",
    stockId: "9",
    symbol: "AMD",
    name: "Advanced Micro Devices",
    quantity: 30,
    avgPrice: 175.80,
    currentPrice: 188.45,
    totalValue: 5653.50,
    profitLoss: 379.50,
    profitLossPercent: 7.20,
  },
];

// Transaction history
export const transactions: Transaction[] = [
  {
    id: "1",
    date: "2026-03-08",
    stockId: "9",
    symbol: "AMD",
    name: "Advanced Micro Devices",
    type: "buy",
    quantity: 10,
    price: 188.45,
    total: 1884.50,
  },
  {
    id: "2",
    date: "2026-03-07",
    stockId: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "buy",
    quantity: 5,
    price: 175.20,
    total: 876.00,
  },
  {
    id: "3",
    date: "2026-03-06",
    stockId: "5",
    symbol: "TSLA",
    name: "Tesla Inc.",
    type: "sell",
    quantity: 5,
    price: 248.50,
    total: 1242.50,
  },
  {
    id: "4",
    date: "2026-03-05",
    stockId: "3",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "buy",
    quantity: 8,
    price: 408.30,
    total: 3266.40,
  },
  {
    id: "5",
    date: "2026-03-04",
    stockId: "6",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    type: "buy",
    quantity: 5,
    price: 865.50,
    total: 4327.50,
  },
  {
    id: "6",
    date: "2026-03-03",
    stockId: "2",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    type: "sell",
    quantity: 10,
    price: 145.80,
    total: 1458.00,
  },
  {
    id: "7",
    date: "2026-03-02",
    stockId: "9",
    symbol: "AMD",
    name: "Advanced Micro Devices",
    type: "buy",
    quantity: 20,
    price: 170.25,
    total: 3405.00,
  },
  {
    id: "8",
    date: "2026-03-01",
    stockId: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "buy",
    quantity: 20,
    price: 162.50,
    total: 3250.00,
  },
];

// Portfolio performance data (for charts)
export const portfolioPerformanceData = [
  { id: "perf-1", date: "Jan", value: 45000 },
  { id: "perf-2", date: "Feb", value: 47500 },
  { id: "perf-3", date: "Mar", value: 46800 },
  { id: "perf-4", date: "Apr", value: 49200 },
  { id: "perf-5", date: "May", value: 51000 },
  { id: "perf-6", date: "Jun", value: 48500 },
  { id: "perf-7", date: "Jul", value: 52300 },
  { id: "perf-8", date: "Aug", value: 54800 },
  { id: "perf-9", date: "Sep", value: 53200 },
  { id: "perf-10", date: "Oct", value: 56500 },
  { id: "perf-11", date: "Nov", value: 58900 },
  { id: "perf-12", date: "Dec", value: 61250 },
];

// Stock price history (for detail charts)
export const generateStockPriceHistory = (basePrice: number, days: number = 30) => {
  const data = [];
  let price = basePrice * 0.95; // Start from 5% lower
  
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.48) * (basePrice * 0.02); // Random change
    price = Math.max(price + change, basePrice * 0.85); // Don't go below 15% of base
    price = Math.min(price, basePrice * 1.15); // Don't go above 15% of base
    
    data.push({
      date: new Date(2026, 1, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(2)),
    });
  }
  
  return data;
};

// Watchlist
export const watchlistStocks = [stocks[1], stocks[4], stocks[7], stocks[10]];

// User data
export const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  balance: 75000,
  totalInvested: 61250,
  portfolioValue: 29911.35,
  profitLoss: 1260.85,
  profitLossPercent: 4.39,
};