'use client'
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { usePair } from './PairContext';

interface Trade {
  price: number;
  amount: number;
  time: string;
}

const RecentTrades: React.FC = () => {
  const { pair } = usePair();
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Mock data; replace with API/WebSocket
    const mockTrades: Trade[] = [
      { price: 50050, amount: 0.2, time: '14:30:00' },
      { price: 50000, amount: 0.1, time: '14:29:50' },
    ];
    setTrades(mockTrades);
  }, [pair]);

  return (
    <div>
      <Typography variant="h6">Recent Trades</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade, index) => (
            <TableRow key={index}>
              <TableCell>{trade.price}</TableCell>
              <TableCell>{trade.amount}</TableCell>
              <TableCell>{trade.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentTrades;