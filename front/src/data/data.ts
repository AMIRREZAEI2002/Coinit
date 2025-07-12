export type Token = {
  symbol: string; 
  name: string;
};

export type Network = {
  name: string;
  type: string;
};

export type Deposit = {
  id: string;
  crypto: Token;
  network: Network;
  time: string;
  status: 'success' | 'pending' | 'failed';
  amount: number;
  txd: string;
  progress: number;
};

export const cryptoOptions: Token[] = [
  { symbol: 'BNB', name: 'BNB' },
  { symbol: 'usdt', name: 'Tether' },
  { symbol: 'btc', name: 'Bitcoin' },
  { symbol: 'eth', name: 'Ethereum' },
  { symbol: 'sol', name: 'Solana' },
];

export const quickTokens: Token[] = [
  { symbol: 'BNB', name: 'BNB' },
  { symbol: 'usdc', name: 'USD Coin' },
  { symbol: 'dai', name: 'Dai Stablecoin' },
  { symbol: 'uni', name: 'Uniswap' },
];

export const networkOptions: Network[] = [
  { name: 'Tron', type: 'TRC20' },
  { name: 'Ethereum', type: 'ERC20' },
  { name: 'Binance', type: 'BEP20' },
  { name: 'Polygon', type: 'MATIC' },
];

export const deposits: Deposit[] = [
  {
    id: '1',
    crypto: { symbol: 'sol', name: 'Solana' },
    network: { name: 'ZKLINK', type: 'ZKLINK' },
    time: '2025-05-01 22:03:12',
    status: 'success',
    amount: 75,
    txd: '0xbgs...47c2',
    progress: 80
  },
  {
    id: '2',
    crypto: { symbol: 'eth', name: 'Ethereum' },
    network: { name: 'Ethereum', type: 'ERC20' },
    time: '2025-05-02 15:24:33',
    status: 'pending',
    amount: 2.5,
    txd: '0x3a9...f8d1',
    progress: 45
  },
  {
    id: '3',
    crypto: { symbol: 'btc', name: 'Bitcoin' },
    network: { name: 'Binance', type: 'BEP20' },
    time: '2025-05-03 09:17:54',
    status: 'success',
    amount: 0.25,
    txd: '0x7c2...9e4f',
    progress: 100
  },
  {
    id: '4',
    crypto: { symbol: 'usdt', name: 'Tether' },
    network: { name: 'Polygon', type: 'MATIC' },
    time: '2025-05-04 18:42:11',
    status: 'failed',
    amount: 150,
    txd: '0xe5f...a8b3',
    progress: 0
  },
];
