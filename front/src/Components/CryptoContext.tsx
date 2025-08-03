'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CryptoData {
  balance: number;
  bidPrice: number;
  askPrice: number;
  bboQuotes: { option: string; price: number }[];
  availableBalance?: number;
  name: string;
  symbol: string;
  icon: string;
  currentPrice: number;
  change: number;
  indexPrice: number;
  fairPrice: number;
  fundingRate: string;
  timer: string;
  high24h: number;
  low24h: number;
  volume: string;
  turnover: string;
  marketCap?: number;
}

interface CryptoContextType {
  selectedCurrency: CryptoData;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<CryptoData>>;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCryptoContext must be used within a CryptoProvider');
  }
  return context;
};

interface CryptoProviderProps {
  children: ReactNode;
}

export const CryptoProvider: React.FC<CryptoProviderProps> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CryptoData>({
    balance: 10000,
    bidPrice: 65000,
    askPrice: 65100,
    bboQuotes: [],
    name: 'Bitcoin',
    symbol: 'bitcoin',
    icon: 'cryptocurrency-color:btc',
    currentPrice: 65000.1234,
    change: 2.34,
    indexPrice: 64980.12,
    fairPrice: 65010.45,
    fundingRate: '0.01%',
    timer: '8h',
    high24h: 66000.0,
    low24h: 64000.0,
    volume: '12.5K',
    turnover: '$800M',
    marketCap: 1280000000000,
    availableBalance: 1000,  // مقدار نمونه اضافه شد
  });  
  

  return (
    <CryptoContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};
