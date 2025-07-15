// data.ts
export interface Token {
  id: string;
  name: string;
  symbol: string;
  price?: number; // اختیاری برای سازگاری با کدهای قبلی
  change?: number; // اختیاری برای سازگاری با کدهای قبلی
  icon?: string; // اختیاری برای سازگاری با کدهای قبلی
}

export interface Network {
  name: string;
  type: string;
}

export interface Deposit {
  id: string;
  crypto: Token;
  network: Network;
  time: string;
  status: 'success' | 'pending' | 'failed';
  amount: number;
  txd: string;
  progress: number;
}

export interface CryptoData {
  id: number;
  name: string;
  category: string;
  price: string;
  performance: number;
  marketCap: string;
}

export interface TradingPair {
  id: number;
  pair: string;
  price: number;
  change: number;
  volume: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface TradeHistoryEntry {
  id: number;
  time: string;
  price: number;
  amount: number;
  type: 'buy' | 'sell';
}

export const tokens: Token[] = [
  { id: 'bnb', name: 'BNB', symbol: 'BNB', price: 580.32, change: 1.8, icon: 'https://via.placeholder.com/24?text=BNB' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', price: 1.0, change: 0.0, icon: 'https://via.placeholder.com/24?text=USDT' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 61000.45, change: -1.2, icon: 'https://via.placeholder.com/24?text=BTC' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3400.21, change: 2.5, icon: 'https://via.placeholder.com/24?text=ETH' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', price: 150.67, change: 5.7, icon: 'https://via.placeholder.com/24?text=SOL' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', price: 1.0, change: 0.0, icon: 'https://via.placeholder.com/24?text=USDC' },
  { id: 'dai', name: 'Dai Stablecoin', symbol: 'DAI', price: 1.0, change: 0.0, icon: 'https://via.placeholder.com/24?text=DAI' },
  { id: 'uni', name: 'Uniswap', symbol: 'UNI', price: 7.5, change: 3.2, icon: 'https://via.placeholder.com/24?text=UNI' },
];

export const cryptoOptions: Token[] = [
  { id: 'bnb', name: 'BNB', symbol: 'BNB' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH' },
  { id: 'sol', name: 'Solana', symbol: 'SOL' },
];

export const quickTokens: Token[] = [
  { id: 'bnb', name: 'BNB', symbol: 'BNB' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC' },
  { id: 'dai', name: 'Dai Stablecoin', symbol: 'DAI' },
  { id: 'uni', name: 'Uniswap', symbol: 'UNI' },
];

export const networkOptions: Network[] = [
  { name: 'Tron', type: 'TRC20' },
  { name: 'Ethereum', type: 'ERC20' },
  { name: 'Binance', type: 'BEP20' },
  { name: 'Polygon', type: 'MATIC' },
  { name: 'ZKLINK', type: 'ZKLINK' }, // اضافه شده برای سازگاری با deposits
];

export const deposits: Deposit[] = [
  {
    id: '1',
    crypto: { id: 'sol', name: 'Solana', symbol: 'SOL' },
    network: { name: 'ZKLINK', type: 'ZKLINK' },
    time: '2025-05-01 22:03:12',
    status: 'success',
    amount: 75,
    txd: '0xbgs...47c2',
    progress: 80,
  },
  {
    id: '2',
    crypto: { id: 'eth', name: 'Ethereum', symbol: 'ETH' },
    network: { name: 'Ethereum', type: 'ERC20' },
    time: '2025-05-02 15:24:33',
    status: 'pending',
    amount: 2.5,
    txd: '0x3a9...f8d1',
    progress: 45,
  },
  {
    id: '3',
    crypto: { id: 'btc', name: 'Bitcoin', symbol: 'BTC' },
    network: { name: 'Binance', type: 'BEP20' },
    time: '2025-05-03 09:17:54',
    status: 'success',
    amount: 0.25,
    txd: '0x7c2...9e4f',
    progress: 100,
  },
  {
    id: '4',
    crypto: { id: 'usdt', name: 'Tether', symbol: 'USDT' },
    network: { name: 'Polygon', type: 'MATIC' },
    time: '2025-05-04 18:42:11',
    status: 'failed',
    amount: 150,
    txd: '0xe5f...a8b3',
    progress: 0,
  },
];

export const topGainers: CryptoData[] = [
  {
    id: 1,
    name: "Ansem's minutes",
    category: "Ansem Meme",
    price: "$5.21",
    performance: 81.3,
    marketCap: "$121.2M",
  },
  {
    id: 2,
    name: "StartUp",
    category: "StartUp Meme",
    price: "$35.01",
    performance: 63.1,
    marketCap: "$105.01M",
  },
  {
    id: 3,
    name: "Yapper",
    category: "Blockchain Service",
    price: "$21.93",
    performance: 73.9,
    marketCap: "$85.3M",
  },
];

export const topLosers: CryptoData[] = [
  {
    id: 1,
    name: "CryptoLoss1",
    category: "Meme Coin",
    price: "$2.15",
    performance: -45.2,
    marketCap: "$50.5M",
  },
  {
    id: 2,
    name: "CryptoLoss2",
    category: "DeFi",
    price: "$12.30",
    performance: -33.7,
    marketCap: "$75.2M",
  },
  {
    id: 3,
    name: "CryptoLoss3",
    category: "Blockchain Service",
    price: "$8.45",
    performance: -28.9,
    marketCap: "$42.3M",
  },
];

export const tradingPairs: TradingPair[] = [
  { id: 1, pair: 'ETH/USDT', price: 3400.12, change: 2.5, volume: 1250000000 },
  { id: 2, pair: 'BTC/USDT', price: 61000.34, change: -1.2, volume: 8900000000 },
  { id: 3, pair: 'SOL/USDT', price: 150.67, change: 5.7, volume: 560000000 },
  { id: 4, pair: 'BNB/USDT', price: 580.32, change: 1.8, volume: 720000000 },
  { id: 5, pair: 'ETH/BTC', price: 0.055, change: 0.3, volume: 450000000 },
];

export const orderBooks: Record<string, { bids: OrderBookEntry[]; asks: OrderBookEntry[] }> = {
  'ETH/USDT': {
    bids: [
      { price: 3400.5, amount: 1.25, total: 4250.625 },
      { price: 3400.25, amount: 2.3, total: 7820.575 },
      { price: 3400.0, amount: 0.75, total: 2550 },
      { price: 3399.75, amount: 1.5, total: 5099.625 },
      { price: 3399.5, amount: 0.9, total: 3059.55 },
    ],
    asks: [
      { price: 3401.0, amount: 2.1, total: 7142.1 },
      { price: 3401.25, amount: 1.75, total: 5952.1875 },
      { price: 3401.5, amount: 3.2, total: 10884.8 },
      { price: 3401.75, amount: 1.25, total: 4252.1875 },
      { price: 3402.0, amount: 2.5, total: 8505 },
    ],
  },
  'BTC/USDT': {
    bids: [
      { price: 61000.5, amount: 0.1, total: 6100.05 },
      { price: 61000.25, amount: 0.2, total: 12200.05 },
      { price: 61000.0, amount: 0.15, total: 9150 },
      { price: 60999.75, amount: 0.3, total: 18299.925 },
      { price: 60999.5, amount: 0.25, total: 15249.875 },
    ],
    asks: [
      { price: 61001.0, amount: 0.2, total: 12200.2 },
      { price: 61001.25, amount: 0.15, total: 9150.1875 },
      { price: 61001.5, amount: 0.4, total: 24400.6 },
      { price: 61001.75, amount: 0.1, total: 6100.175 },
      { price: 61002.0, amount: 0.3, total: 18300.6 },
    ],
  },
  'SOL/USDT': {
    bids: [
      { price: 150.7, amount: 10, total: 1507 },
      { price: 150.65, amount: 15, total: 2259.75 },
      { price: 150.6, amount: 8, total: 1204.8 },
      { price: 150.55, amount: 12, total: 1806.6 },
      { price: 150.5, amount: 20, total: 3010 },
    ],
    asks: [
      { price: 150.75, amount: 10, total: 1507.5 },
      { price: 150.8, amount: 15, total: 2262 },
      { price: 150.85, amount: 8, total: 1206.8 },
      { price: 150.9, amount: 12, total: 1810.8 },
      { price: 150.95, amount: 20, total: 3019 },
    ],
  },
  'BNB/USDT': {
    bids: [
      { price: 580.4, amount: 5, total: 2902 },
      { price: 580.35, amount: 8, total: 4642.8 },
      { price: 580.3, amount: 3, total: 1740.9 },
      { price: 580.25, amount: 10, total: 5802.5 },
      { price: 580.2, amount: 7, total: 4061.4 },
    ],
    asks: [
      { price: 580.45, amount: 5, total: 2902.25 },
      { price: 580.5, amount: 8, total: 4644 },
      { price: 580.55, amount: 3, total: 1741.65 },
      { price: 580.6, amount: 10, total: 5806 },
      { price: 580.65, amount: 7, total: 4064.55 },
    ],
  },
  'ETH/BTC': {
    bids: [
      { price: 0.0551, amount: 20, total: 1.102 },
      { price: 0.05505, amount: 25, total: 1.37625 },
      { price: 0.055, amount: 15, total: 0.825 },
      { price: 0.05495, amount: 30, total: 1.6485 },
      { price: 0.0549, amount: 10, total: 0.549 },
    ],
    asks: [
      { price: 0.05515, amount: 20, total: 1.103 },
      { price: 0.0552, amount: 25, total: 1.38 },
      { price: 0.05525, amount: 15, total: 0.82875 },
      { price: 0.0553, amount: 30, total: 1.659 },
      { price: 0.05535, amount: 10, total: 0.5535 },
    ],
  },
};

export const tradeHistories: Record<string, TradeHistoryEntry[]> = {
  'ETH/USDT': [
    { id: 1, time: '12:45:23', price: 3400.5, amount: 0.5, type: 'buy' },
    { id: 2, time: '12:45:20', price: 3400.25, amount: 1.2, type: 'sell' },
    { id: 3, time: '12:45:15', price: 3400.75, amount: 0.8, type: 'buy' },
    { id: 4, time: '12:45:10', price: 3400.0, amount: 2.5, type: 'sell' },
    { id: 5, time: '12:45:05', price: 3401.0, amount: 1.0, type: 'buy' },
  ],
  'BTC/USDT': [
    { id: 1, time: '12:45:23', price: 61000.5, amount: 0.05, type: 'buy' },
    { id: 2, time: '12:45:20', price: 61000.25, amount: 0.1, type: 'sell' },
    { id: 3, time: '12:45:15', price: 61000.75, amount: 0.08, type: 'buy' },
    { id: 4, time: '12:45:10', price: 61000.0, amount: 0.2, type: 'sell' },
    { id: 5, time: '12:45:05', price: 61001.0, amount: 0.15, type: 'buy' },
  ],
  'SOL/USDT': [
    { id: 1, time: '12:45:23', price: 150.7, amount: 10, type: 'buy' },
    { id: 2, time: '12:45:20', price: 150.65, amount: 15, type: 'sell' },
    { id: 3, time: '12:45:15', price: 150.75, amount: 8, type: 'buy' },
    { id: 4, time: '12:45:10', price: 150.6, amount: 12, type: 'sell' },
    { id: 5, time: '12:45:05', price: 150.8, amount: 20, type: 'buy' },
  ],
  'BNB/USDT': [
    { id: 1, time: '12:45:23', price: 580.4, amount: 5, type: 'buy' },
    { id: 2, time: '12:45:20', price: 580.35, amount: 8, type: 'sell' },
    { id: 3, time: '12:45:15', price: 580.45, amount: 3, type: 'buy' },
    { id: 4, time: '12:45:10', price: 580.3, amount: 10, type: 'sell' },
    { id: 5, time: '12:45:05', price: 580.5, amount: 7, type: 'buy' },
  ],
  'ETH/BTC': [
    { id: 1, time: '12:45:23', price: 0.0551, amount: 20, type: 'buy' },
    { id: 2, time: '12:45:20', price: 0.05505, amount: 25, type: 'sell' },
    { id: 3, time: '12:45:15', price: 0.05515, amount: 15, type: 'buy' },
    { id: 4, time: '12:45:10', price: 0.055, amount: 30, type: 'sell' },
    { id: 5, time: '12:45:05', price: 0.0552, amount: 10, type: 'buy' },
  ],
};