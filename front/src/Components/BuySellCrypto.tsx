'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { useCryptoContext } from './CryptoContext';
import { motion } from 'framer-motion';

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

interface Order {
  price: number;
  quantity: number;
  total: number;
}

interface MarketTrade {
  price: number;
  amount: number;
  time: string;
}

const generateFakeOrderBook = (currentPrice: number, symbol: string, sortType: 'default' | 'buy' | 'sell'): { buyOrders: Order[]; sellOrders: Order[] } => {
  const buyOrders: Order[] = [];
  const sellOrders: Order[] = [];
  if (!currentPrice || typeof currentPrice !== 'number') {
    console.error('Invalid currentPrice:', currentPrice);
    return { buyOrders: [], sellOrders: [] };
  }

  const volatility = symbol.toLowerCase() === 'bitcoin' ? 100 : symbol.toLowerCase() === 'ethereum' ? 10 : 0.01;
  const quantityBase = symbol.toLowerCase() === 'bitcoin' ? 0.1 : symbol.toLowerCase() === 'ethereum' ? 1 : 100;

  if (sortType !== 'sell') {
    for (let i = 1; i <= 10; i++) {
      const buyPrice = currentPrice - i * volatility;
      const quantity = quantityBase * (1 + Math.random() * 0.5);
      
      buyOrders.push({
        price: parseFloat(buyPrice.toFixed(2)),
        quantity: parseFloat(quantity.toFixed(4)),
        total: parseFloat((buyPrice * quantity).toFixed(2))
      });
    }
  }

  if (sortType !== 'buy') {
    for (let i = 1; i <= 10; i++) {
      const sellPrice = currentPrice + i * volatility;
      const quantity = quantityBase * (1 + Math.random() * 0.5);
      
      sellOrders.push({
        price: parseFloat(sellPrice.toFixed(2)),
        quantity: parseFloat(quantity.toFixed(4)),
        total: parseFloat((sellPrice * quantity).toFixed(2))
      });
    }
  }

  return { buyOrders, sellOrders };
};

const generateFakeMarketTrades = (currentPrice: number, symbol: string): MarketTrade[] => {
  const trades: MarketTrade[] = [];
  if (!currentPrice || typeof currentPrice !== 'number') {
    console.error('Invalid currentPrice:', currentPrice);
    return [];
  }

  const volatility = symbol.toLowerCase() === 'bitcoin' ? 100 : symbol.toLowerCase() === 'ethereum' ? 10 : 0.01;
  const amountBase = symbol.toLowerCase() === 'bitcoin' ? 0.05 : symbol.toLowerCase() === 'ethereum' ? 0.5 : 50;
  const now = Date.now();
  const msPerMinute = 60 * 1000;

  for (let i = 0; i < 10; i++) {
    const price = currentPrice + (Math.random() - 0.5) * volatility * 2;
    const amount = amountBase * (1 + Math.random() * 0.5);
    const timestamp = now - i * msPerMinute * 5;
    
    trades.push({
      price: parseFloat(price.toFixed(2)),
      amount: parseFloat(amount.toFixed(4)),
      time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }

  return trades;
};

const BuySellCrypto: React.FC = () => {
  const theme = useTheme();
  const { selectedCurrency = { currentPrice: 50000, symbol: 'BTC' } } = useCryptoContext();
  const [activeTab, setActiveTab] = useState<'orderbook' | 'markettrade'>('orderbook');
  const [sortType, setSortType] = useState<'default' | 'buy' | 'sell'>('default');
  const [buyOrders, setBuyOrders] = useState<Order[]>([]);
  const [sellOrders, setSellOrders] = useState<Order[]>([]);
  const [marketTrades, setMarketTrades] = useState<MarketTrade[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const refreshData = useCallback(() => {
    const { buyOrders, sellOrders } = generateFakeOrderBook(selectedCurrency.currentPrice, selectedCurrency.symbol, sortType);
    const trades = generateFakeMarketTrades(selectedCurrency.currentPrice, selectedCurrency.symbol);
    console.log('Generated data:', { buyOrders, sellOrders, trades });
    setBuyOrders(buyOrders);
    setSellOrders(sellOrders);
    setMarketTrades(trades);
  }, [selectedCurrency.currentPrice, selectedCurrency.symbol, sortType]);

  useEffect(() => {
    console.log('Refreshing data for:', selectedCurrency);
    refreshData();
    
    intervalRef.current = setInterval(refreshData, 2000);
    
    return () => {
      if (intervalRef.current) {
        console.log('Clearing interval');
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshData]);

  useEffect(() => {
    refreshData();
  }, [selectedCurrency, sortType, refreshData]);

  const handleSort = (type: 'default' | 'buy' | 'sell') => {
    setSortType(type);
  };

  const handleTabChange = (tab: 'orderbook' | 'markettrade') => {
    setActiveTab(tab);
    setSortType('default');
  };

  const totalBuyQuantity = buyOrders.reduce((sum, order) => sum + order.quantity, 0);
  const totalSellQuantity = sellOrders.reduce((sum, order) => sum + order.quantity, 0);
  const totalBuyValue = buyOrders.reduce((sum, order) => sum + order.total, 0);
  const totalSellValue = sellOrders.reduce((sum, order) => sum + order.total, 0);
  const totalTradeAmount = marketTrades.reduce((sum, trade) => sum + trade.amount, 0);
  const recentPriceChange = marketTrades.length > 1 ? 
    ((marketTrades[0].price - marketTrades[1].price) / marketTrades[1].price) * 100 : 0;

  return (
    <Box
      sx={{
        height: { xs: 'auto', lg: 584 },
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Box sx={{ display: 'flex', bgcolor: 'divider', borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Button
          fullWidth
          variant={activeTab === 'orderbook' ? 'contained' : 'text'}
          onClick={() => handleTabChange('orderbook')}
          sx={{
            borderRadius: 0,
            p: 0.5,
            fontSize: 11,
            fontWeight: 'semi-bold',
            color: activeTab === 'orderbook' ? 'primary.contrastText' : 'text.secondary',
            bgcolor: activeTab === 'orderbook' ? 'primary.main' : 'transparent',
            '&:hover': {
              bgcolor: activeTab === 'orderbook' ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          Order Book
        </Button>
        <Button
          fullWidth
          variant={activeTab === 'markettrade' ? 'contained' : 'text'}
          onClick={() => handleTabChange('markettrade')}
          sx={{
            borderRadius: 0,
            p: 1,
            fontSize: 11,
            fontWeight: 'semi-bold',
            color: activeTab === 'markettrade' ? 'primary.contrastText' : 'text.secondary',
            bgcolor: activeTab === 'markettrade' ? 'primary.main' : 'transparent',
            '&:hover': {
              bgcolor: activeTab === 'markettrade' ? 'primary.dark' : 'action.hover',
            },
          }}
        >
          Market Trade
        </Button>
      </Box>

      {activeTab === 'orderbook' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, gap: 1 }}>
          <Button
            size="small"
            variant={sortType === 'default' ? 'contained' : 'outlined'}
            onClick={() => handleSort('default')}
          >
            <Icon icon="fa:sort" />
          </Button>
          <Button
            size="small"
            variant={sortType === 'buy' ? 'contained' : 'outlined'}
            color="success"
            onClick={() => handleSort('buy')}
          >
            <Icon icon="fa:sort-up" />
          </Button>
          <Button
            size="small"
            variant={sortType === 'sell' ? 'contained' : 'outlined'}
            color="error"
            onClick={() => handleSort('sell')}
          >
            <Icon icon="fa:sort-down" />
          </Button>
        </Box>
      )}

      <Box sx={{ flex: 1, overflow: 'auto', p: 0 }}>
        {activeTab === 'orderbook' ? (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {buyOrders.length === 0 && sellOrders.length === 0 ? (
              <Typography textAlign="center" py={2}>No data available</Typography>
            ) : (
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 9, m: 0, p: 0.5, textAlign: 'center' }}>Price(USDT)</TableCell>
                    <TableCell sx={{ fontSize: 9, m: 0, p: 0.5, textAlign: 'center' }}>Quantity({selectedCurrency.symbol})</TableCell>
                    <TableCell sx={{ fontSize: 9, m: 0, p: 0.5, textAlign: 'center' }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {sellOrders.map((order, index) => (
                    <TableRow key={`sell-${index}`} hover>
                      <TableCell sx={{ color: 'error.main', fontSize: 10, m: 0, p: 0.5, textAlign: 'center' }}>{order.price.toLocaleString()}</TableCell>
                      <TableCell sx={{ fontSize: 10, m: 0, p: 0.5, textAlign: 'center' }}>{order.quantity.toLocaleString()}</TableCell>
                      <TableCell sx={{ fontSize: 10, m: 0, p: 0.5, textAlign: 'center' }}>{order.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                {sortType === 'default' && (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3} sx={{ textAlign: 'center', py: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <Typography variant="body1" color="primary" fontWeight="bold">
                            {selectedCurrency.currentPrice.toLocaleString('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </Typography>
                          <Icon 
                            icon="fa-solid:arrows-alt-v" 
                            style={{ color: theme.palette.primary.main, fontSize: 10 }} 
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}

                <TableBody>
                  {buyOrders.map((order, index) => (
                    <TableRow key={`buy-${index}`} hover>
                      <TableCell sx={{ color: 'success.main', fontSize: 10, m: 0, p: 0.5, textAlign: 'center' }}>{order.price.toLocaleString()}</TableCell>
                      <TableCell sx={{ fontSize: 10, m: 0, p: 0.5, textAlign: 'center' }}>{order.quantity.toLocaleString()}</TableCell>
                      <TableCell sx={{ fontSize: 10, m: 0, p: 0.5, textAlign: 'center' }}>{order.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        ) : (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {marketTrades.length === 0 ? (
              <Typography textAlign="center" py={2}>No market trades available</Typography>
            ) : (
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 10, m: 0, p: 0.5, textAlign: 'center' }}>Price(USDT)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 10, m: 0, p: 0.5, textAlign: 'center' }}>Amount({selectedCurrency.symbol})</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: 10, m: 0, p: 0.5, textAlign: 'center' }}>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marketTrades.map((trade, index) => (
                    <TableRow key={`trade-${index}`} hover>
                      <TableCell sx={{ 
                        fontSize: 11, 
                        m: 0, 
                        px: 0.5, 
                        textAlign: 'center',
                        color: trade.price >= selectedCurrency.currentPrice ? 'success.main' : 'error.main' 
                      }}>
                        {trade.price.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ fontSize: 11, m: 0, px: 0.5, textAlign: 'center' }}>{trade.amount.toLocaleString()}</TableCell>
                      <TableCell sx={{ fontSize: 11, m: 0, px: 0.5, textAlign: 'center' }}>{trade.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        )}
      </Box>

      <Box
        component={motion.div}
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          scale: isHovered ? 1.01 : 1,
          boxShadow: isHovered ? theme.shadows[8] : theme.shadows[4]
        }}
        transition={{ 
          duration: 0.5, 
          ease: 'easeOut',
          scale: { type: 'spring', stiffness: 300, damping: 15 }
        }}
        sx={{
          m: 0,
          p: 0,
          borderRadius: 3,
          bgcolor: theme.palette.background.paper,
          backgroundImage: theme.palette.background.paper,
          boxShadow: theme.shadows[4],
          border: `1px solid ${theme.palette.divider}`,
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          component={motion.div}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8 }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '4px',
            background: theme.palette.mode === 'dark' ? 
              'linear-gradient(to right, #00e676, red)' : 
              'linear-gradient(to right, red, #00e676)',
          }}
        />

        {activeTab === 'orderbook' ? (
          <Stack direction="row" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              sx={{
                flex: 1,
                p: 1,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? 
                  'rgba(16, 185, 129, 0.15)' : 
                  'rgba(16, 185, 129, 0.1)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 
                  'rgba(16, 185, 129, 0.4)' : 
                  'rgba(16, 185, 129, 0.3)'}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Icon icon="fa-solid:arrow-up" color={theme.palette.success.main} />
                </motion.div>
                <Typography sx={{ fontSize: 12 }} fontWeight="bold">Buy Orders</Typography>
              </Stack>
              <Typography variant="body2" color="success.main" fontWeight="bold" textAlign="center">
                {totalBuyQuantity.toFixed(4)}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                (${totalBuyValue.toLocaleString('en-US', { minimumFractionDigits: 2 })})
              </Typography>
            </Box>

            <Box
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              sx={{
                flex: 1,
                p: 1,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? 
                  'rgba(239, 68, 68, 0.15)' : 
                  'rgba(239, 68, 68, 0.1)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 
                  'rgba(239, 68, 68, 0.4)' : 
                  'rgba(239, 68, 68, 0.3)'}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <motion.div
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Icon icon="fa-solid:arrow-down" color={theme.palette.error.main} />
                </motion.div>
                <Typography sx={{ fontSize: 12 }} variant="body2" fontWeight="bold">Sell Orders</Typography>
              </Stack>
              <Typography variant="body2" color="error.main" fontWeight="bold" textAlign="center">
                {totalSellQuantity.toFixed(4)}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                (${totalSellValue.toLocaleString('en-US', { minimumFractionDigits: 2 })})
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Box sx={{ position: 'relative', zIndex: 1, background: theme.palette.background.paper }}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? 
                  'rgba(103, 58, 183, 0.15)' : 
                  'rgba(103, 58, 183, 0.1)',
                border: `1px solid ${theme.palette.mode === 'dark' ? 
                  'rgba(103, 58, 183, 0.4)' : 
                  'rgba(103, 58, 183, 0.3)'}`,
                textAlign: 'center',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 0 }}>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Icon icon="fa-solid:exchange-alt" color={theme.palette.primary.main} fontSize={12} />
                </motion.div>
                <Typography variant="body2" fontWeight="bold">Market Trades</Typography>
              </Stack>
              
              <Typography variant="body2" color="primary" fontWeight="bold" sx={{ mb: 0, fontSize: 12 }}>
                {totalTradeAmount.toFixed(4)} {selectedCurrency.symbol}
              </Typography>
              
              <Stack direction="row" alignItems="center" justifyContent="center" sx={{ fontSize: 12 }} spacing={1}>
                <Typography variant="body2">24h Change:</Typography>
                <Typography 
                  sx={{ fontSize: 12 }}
                  fontWeight="bold"
                  color={recentPriceChange >= 0 ? 'success.main' : 'error.main'}
                >
                  {recentPriceChange >= 0 ? '+ ' : ''}{recentPriceChange.toFixed(2)}%
                </Typography>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Icon 
                    icon={recentPriceChange >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'} 
                    color={recentPriceChange >= 0 ? theme.palette.success.main : theme.palette.error.main} 
                  />
                </motion.div>
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BuySellCrypto;