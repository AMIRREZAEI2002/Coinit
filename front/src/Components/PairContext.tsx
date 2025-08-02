'use client';

import React, { createContext, useState, useContext } from 'react';
interface PairContextType {
  pair: string;
  setPair: (pair: string) => void;
}
const PairContext = createContext<PairContextType | undefined>(undefined);
export const PairProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pair, setPair] = useState('BTC/USDT');
  return (
    <PairContext.Provider value={{ pair, setPair }}>
      {children}
    </PairContext.Provider>
  );
};
export const usePair = () => {
  const context = useContext(PairContext);
  if (!context) {
    throw new Error('usePair must be used within a PairProvider');
  }
  return context;
};