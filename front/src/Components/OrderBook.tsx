// components/OrderBook.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

interface Order {
  price: number;
  amount: number;
  total: number;
}

interface Props {
  pair: string;
  bids: Order[];
  asks: Order[];
}

const OrderBook: React.FC<Props> = ({ pair, bids, asks }) => {
  return (
    <div>
      <Typography variant="h6">Order Book for {pair}</Typography>

      <Typography variant="subtitle1">Asks</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asks.map((order, index) => (
            <TableRow key={`ask-${index}`}>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>{order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Bids
      </Typography>
      <Table size="small">
        <TableBody>
          {bids.map((order, index) => (
            <TableRow key={`bid-${index}`}>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>{order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderBook;
