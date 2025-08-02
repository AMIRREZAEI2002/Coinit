'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CryptoData {
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
  setSelectedCurrency: (currency: CryptoData) => void;
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
    name: 'Bitcoin',
    symbol: 'bitcoin', // lowercase برای سازگاری
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
  });

  return (
    <CryptoContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};