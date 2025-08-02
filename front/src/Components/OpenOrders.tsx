import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export interface OpenOrder {
  id: string;
  pair: string;
  type: string;
  price: number;
  amount: number;
  status: string;
}

interface Props {
  orders: OpenOrder[];
}

const OpenOrders: React.FC<Props> = ({ orders }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Open Orders
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Pair</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.pair}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.price > 0 ? order.price : 'Market'}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OpenOrders;
