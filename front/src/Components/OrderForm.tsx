'use client'
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { usePair } from './PairContext';

const OrderForm: React.FC = () => {
  const { pair, setPair } = usePair();
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [amount, setAmount] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handlePairChange = (event: SelectChangeEvent<string>) => {
    setPair(event.target.value);
  };

  const handleOrderTypeChange = (event: SelectChangeEvent<'market' | 'limit'>) => {
    setOrderType(event.target.value as 'market' | 'limit');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Placing order:', { pair, orderType, amount, price });
    // Replace with actual API call
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Pair</InputLabel>
        <Select value={pair} onChange={handlePairChange}>
          <MenuItem value="BTC/USDT">BTC/USDT</MenuItem>
          <MenuItem value="ETH/USDT">ETH/USDT</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Order Type</InputLabel>
        <Select value={orderType} onChange={handleOrderTypeChange}>
          <MenuItem value="market">Market</MenuItem>
          <MenuItem value="limit">Limit</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />
      {orderType === 'limit' && (
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Place Order
      </Button>
    </form>
  );
};

export default OrderForm;