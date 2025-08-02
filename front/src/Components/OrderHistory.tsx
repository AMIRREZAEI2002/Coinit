import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

interface OrderHistoryItem {
  id: string;
  pair: string;
  type: string;
  price: number;
  amount: number;
  time: string;
}

interface OrderHistoryProps {
  history: OrderHistoryItem[];
}

const OrderHistory = ({ history }: OrderHistoryProps) => {
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>Order History</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Pair</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.pair}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.price > 0 ? order.price : 'Market'}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>{order.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderHistory;
