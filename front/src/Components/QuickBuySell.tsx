import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Menu, 
  MenuItem, 
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import QuickBuySellDifferentMethods from './QuickBuySellDeffrentMethods';
import QuickBuySellHowToBuy from './QuickBuySellHowToBuy';

interface Currency {
  name: string;
  symbol: string;
  icon: string;
  price: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  fee: string;
  processingTime: string;
}

const currencies: Currency[] = [
  { name: 'USDT', symbol: 'USDT', icon: 'mdi:currency-usd', price: 1 },
];

const coins: Currency[] = [
  { name: 'Bitcoin', symbol: 'BTC', icon: 'cryptocurrency-color:btc', price: 40000 },
  { name: 'Ethereum', symbol: 'ETH', icon: 'cryptocurrency-color:eth', price: 3000 },
  { name: 'Litecoin', symbol: 'LTC', icon: 'cryptocurrency-color:ltc', price: 150 },
  { name: 'Ripple', symbol: 'XRP', icon: 'cryptocurrency-color:xrp', price: 0.5 },
  { name: 'Dogecoin', symbol: 'DOGE', icon: 'cryptocurrency-color:doge', price: 0.1 },
];

const paymentMethods: PaymentMethod[] = [
  { 
    id: '1', 
    name: 'Debit/Credit Card', 
    icon: 'mdi:credit-card',
    description: 'Instant purchase with your bank card',
    fee: '0.1% transaction fee',
    processingTime: 'Instant' 
  },
  { 
    id: '2', 
    name: 'Bank Transfer', 
    icon: 'mdi:bank',
    description: 'Transfer from your bank account',
    fee: '0.5% transaction fee',
    processingTime: '1-3 business days' 
  },
  { 
    id: '3', 
    name: 'PayPal', 
    icon: 'mdi:paypal',
    description: 'Pay with your PayPal account',
    fee: '1.2% transaction fee',
    processingTime: 'Instant' 
  },
];

// Function to extract fee percentage from string
const getFeeDecimal = (feeString: string): number => {
  const match = feeString.match(/(\d+\.?\d*)%/);
  if (match) {
    return parseFloat(match[1]) / 100;
  }
  return 0;
};

const QuickBuySell = () => {
  const [mode, setMode] = useState<'buy'|'sell'>('buy');
  const [spendAmount, setSpendAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [selectedCoin, setSelectedCoin] = useState<Currency>(coins[0]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(paymentMethods[0]);
  
  const [currencySearch, setCurrencySearch] = useState<string>('');
  const [coinSearch, setCoinSearch] = useState<string>('');
  const [isRefreshingPrice, setIsRefreshingPrice] = useState<boolean>(false);
  
  const [currencyAnchorEl, setCurrencyAnchorEl] = useState<null | HTMLElement>(null);
  const [coinAnchorEl, setCoinAnchorEl] = useState<null | HTMLElement>(null);
  const [paymentAnchorEl, setPaymentAnchorEl] = useState<null | HTMLElement>(null);
  
  const currencyOpen = Boolean(currencyAnchorEl);
  const coinOpen = Boolean(coinAnchorEl);
  const paymentOpen = Boolean(paymentAnchorEl);

  // Determine labels based on mode
  const spendLabel = mode === 'buy' ? "Spend" : "Sell";
  const receiveLabel = mode === 'buy' ? "Receive" : "Get";
  const spendPlaceholder = mode === 'buy' ? "Enter amount" : "Enter crypto amount";
  const receivePlaceholder = mode === 'buy' ? "Enter crypto amount" : "Enter amount";

  // Filter currencies and coins based on search
  const filteredCurrencies = currencies.filter(c => 
    c.name.toLowerCase().includes(currencySearch.toLowerCase()) || 
    c.symbol.toLowerCase().includes(currencySearch.toLowerCase())
  );
  
  const filteredCoins = coins.filter(c => 
    c.name.toLowerCase().includes(coinSearch.toLowerCase()) || 
    c.symbol.toLowerCase().includes(coinSearch.toLowerCase())
  );

  // Handle conversion when coin, currency, mode, or payment changes
  useEffect(() => {
    if (spendAmount && !isNaN(parseFloat(spendAmount))) {
      calculateConversion('spend', spendAmount);
    } else if (receiveAmount && !isNaN(parseFloat(receiveAmount))) {
      calculateConversion('receive', receiveAmount);
    }
  }, [selectedCoin, selectedCurrency, mode, selectedPayment]);

  // Corrected conversion logic
  const calculateConversion = (source: 'spend' | 'receive', value: string) => {
    const amount = parseFloat(value);
    if (isNaN(amount)) return;

    const fee = getFeeDecimal(selectedPayment.fee);

    if (mode === 'buy') {
      if (source === 'spend') {
        // Buying: Spend fiat to receive crypto (after fee)
        const cryptoAmount = amount / selectedCoin.price;
        const afterFee = cryptoAmount * (1 - fee);
        setReceiveAmount(afterFee.toFixed(8));
      } else {
        // Buying: Calculate required fiat based on desired crypto (including fee)
        const requiredFiat = (amount * selectedCoin.price) / (1 - fee);
        setSpendAmount(requiredFiat.toFixed(2));
      }
    } else {
      // SELL MODE
      if (source === 'spend') {
        // Selling: Convert crypto to fiat (after fee)
        const fiatValue = amount * selectedCoin.price;
        const afterFee = fiatValue * (1 - fee);
        setReceiveAmount(afterFee.toFixed(2));
      } else {
        // Selling: Calculate required crypto based on desired fiat (including fee)
        const requiredCrypto = amount / (selectedCoin.price * (1 - fee));
        setSpendAmount(requiredCrypto.toFixed(8));
      }
    }
  };

  // Handle amount changes with validation
  const handleSpendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setSpendAmount(value);
      calculateConversion('spend', value);
    }
  };

  const handleReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setReceiveAmount(value);
      calculateConversion('receive', value);
    }
  };

  // Toggle between buy/sell
  const handleModeChange = (newMode: 'buy'|'sell') => {
    setMode(newMode);
    setSpendAmount('');
    setReceiveAmount('');
  };

  // Currency selection handlers
  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setCurrencyAnchorEl(null);
    setCurrencySearch('');
  };

  const handleCoinSelect = (coin: Currency) => {
    setSelectedCoin(coin);
    setCoinAnchorEl(null);
    setCoinSearch('');
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedPayment(method);
    setPaymentAnchorEl(null);
  };

  // Increment/decrement handlers
  const incrementSpend = () => {
    const newValue = (parseFloat(spendAmount || '0') + 1).toString();
    setSpendAmount(newValue);
    calculateConversion('spend', newValue);
  };

  const decrementSpend = () => {
    const current = parseFloat(spendAmount || '0');
    if (current > 0) {
      const newValue = (current - 1).toString();
      setSpendAmount(newValue);
      calculateConversion('spend', newValue);
    }
  };

  const incrementReceive = () => {
    const newValue = (parseFloat(receiveAmount || '0') + 1).toString();
    setReceiveAmount(newValue);
    calculateConversion('receive', newValue);
  };

  const decrementReceive = () => {
    const current = parseFloat(receiveAmount || '0');
    if (current > 0) {
      const newValue = (current - 1).toString();
      setReceiveAmount(newValue);
      calculateConversion('receive', newValue);
    }
  };

  // Refresh current price
  const refreshCurrentPrice = () => {
    setIsRefreshingPrice(true);
    
    // Simulate API call to fetch latest price
    setTimeout(() => {
      // Generate a random price change (-10% to +10%)
      const changeFactor = 0.9 + Math.random() * 0.2;
      const newPrice = parseFloat((selectedCoin.price * changeFactor).toFixed(2));
      
      // Update coin price
      setSelectedCoin(prev => ({ ...prev, price: newPrice }));
      
      // Recalculate conversion
      if (spendAmount) {
        calculateConversion('spend', spendAmount);
      } else if (receiveAmount) {
        calculateConversion('receive', receiveAmount);
      }
      
      setIsRefreshingPrice(false);
    }, 800);
  };

  // Get current rate
  const getCurrentRate = () => {
    return `1 ${selectedCoin.symbol} = ${selectedCoin.price.toFixed(2)} ${selectedCurrency.symbol}`;
  };

  return (
    <Grid container spacing={4} sx={{ py: 4, px: { xs: 2, md: 6 }, bgcolor: 'background.default' }}>
      {/* Left Column - Description */}
      <Grid size={{xs:12,md:6}}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Buy & Sell Crypto Instantly
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Trade cryptocurrencies in seconds with our secure platform and competitive rates.
          </Typography>
          
          <Box sx={{ display: 'flex', mt: 3, gap: 1 }}>
            {coins.slice(0, 5).map((coin) => (
                <motion.div
                key={coin.symbol}
                whileHover={{ scale: 1.1 }}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer'
                }}
                >
                <Icon icon={coin.icon} style={{ fontSize: 20, color: '#111827' }} />
                </motion.div>
            ))}
            </Box>
        </motion.div>
      </Grid>

      {/* Right Column - Buy/Sell Form */}
      <Grid size={{xs:12,md:6}}>
        {/* Buy/Sell Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              bgcolor: 'background.paper', 
              borderRadius: '50px', 
              p: 0.5, 
              mb: 3,
              boxShadow: 1
            }}
          >
            <Button
              fullWidth
              onClick={() => handleModeChange('buy')}
              sx={{
                bgcolor: mode === 'buy' ? 'success.main' : 'transparent',
                color: mode === 'buy' ? 'common.white' : 'text.primary',
                borderRadius: '50px',
                py: 1,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: mode === 'buy' ? 'success.dark' : 'action.hover',
                },
              }}
            >
              Buy
            </Button>
            <Button
              fullWidth
              onClick={() => handleModeChange('sell')}
              sx={{
                bgcolor: mode === 'sell' ? 'error.main' : 'transparent',
                color: mode === 'sell' ? 'common.white' : 'text.primary',
                borderRadius: '50px',
                py: 1,
                fontWeight: 600,
                '&:hover': {
                  bgcolor: mode === 'sell' ? 'error.dark' : 'action.hover',
                },
              }}
            >
              Sell
            </Button>
          </Box>
        </motion.div>

        {/* Current Rate Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2,
            p: 1,
            bgcolor: 'action.hover',
            borderRadius: 1
          }}>
            <Typography variant="body2">
              {getCurrentRate()}
            </Typography>
            <Button 
              variant="outlined" 
              size="small"
              onClick={refreshCurrentPrice}
              disabled={isRefreshingPrice}
              startIcon={
                isRefreshingPrice ? 
                <CircularProgress size={16} /> : 
                <Icon icon="mdi:refresh" />
              }
            >
              Refresh
            </Button>
          </Box>
        </motion.div>

        {/* Spend Section */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="caption" color="text.secondary">
              {spendLabel}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
              <TextField
                type="text"
                value={spendAmount}
                onChange={handleSpendChange}
                placeholder={spendPlaceholder}
                variant="standard"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: '1.75rem', fontWeight: 700 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={incrementSpend} disabled={!spendAmount}>
                        <Icon icon="mdi:plus" />
                      </IconButton>
                      <IconButton 
                        onClick={decrementSpend} 
                        disabled={!spendAmount || parseFloat(spendAmount) <= 0}
                      >
                        <Icon icon="mdi:minus" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* تغییر مهم: در حالت فروش دکمه انتخاب کوین در اینجا قرار می‌گیرد */}
              {mode === 'buy' ? (
                <Button
                  onClick={(e) => setCurrencyAnchorEl(e.currentTarget)}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1.5, 
                    borderRadius: 1,
                    minWidth: 'auto'
                  }}
                >
                  <Icon icon={selectedCurrency.icon} fontSize={24} />
                  <Typography sx={{ mx: 1, fontWeight: 500 }}>
                    {selectedCurrency.symbol}
                  </Typography>
                  <Icon icon="mdi:chevron-down" fontSize={16} />
                </Button>
              ) : (
                <Button
                  onClick={(e) => setCoinAnchorEl(e.currentTarget)}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1.5, 
                    borderRadius: 1,
                    minWidth: 'auto'
                  }}
                >
                  <Icon icon={selectedCoin.icon} fontSize={24} />
                  <Typography sx={{ mx: 1, fontWeight: 500 }}>
                    {selectedCoin.symbol}
                  </Typography>
                  <Icon icon="mdi:chevron-down" fontSize={16} />
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>


        {/* Currency Selection Menu */}
        <Menu
          anchorEl={currencyAnchorEl}
          open={currencyOpen}
          onClose={() => setCurrencyAnchorEl(null)}
          sx={{ 
            '& .MuiPaper-root': { 
              width: 300,
              maxHeight: 300,
              borderRadius: 2,
              boxShadow: 3
            } 
          }}
        >
          <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider' }}>
            <TextField
              fullWidth
              placeholder="Search currency"
              value={currencySearch}
              onChange={(e) => setCurrencySearch(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="mdi:magnify" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {filteredCurrencies.map((currency) => (
            <MenuItem 
              key={currency.symbol} 
              onClick={() => handleCurrencySelect(currency)}
              sx={{ py: 1.5 }}
            >
              <Icon icon={currency.icon} fontSize={20} style={{ marginRight: 12 }} />
              <Box>
                <Typography>{currency.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {currency.symbol}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Receive Section */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                {receiveLabel}
              </Typography>
              <Tooltip title="Amount you'll receive after fees" arrow>
                <Icon icon="mdi:information-outline" style={{ marginLeft: 6 }} />
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
              <TextField
                type="text"
                value={receiveAmount}
                onChange={handleReceiveChange}
                placeholder={receivePlaceholder}
                variant="standard"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: '1.75rem', fontWeight: 700 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={incrementReceive} disabled={!receiveAmount}>
                        <Icon icon="mdi:plus" />
                      </IconButton>
                      <IconButton 
                        onClick={decrementReceive} 
                        disabled={!receiveAmount || parseFloat(receiveAmount) <= 0}
                      >
                        <Icon icon="mdi:minus" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* تغییر مهم: در حالت فروش دکمه انتخاب ارز در اینجا قرار می‌گیرد */}
              {mode === 'buy' ? (
                <Button
                  onClick={(e) => setCoinAnchorEl(e.currentTarget)}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1.5, 
                    borderRadius: 1,
                    minWidth: 'auto'
                  }}
                >
                  <Icon icon={selectedCoin.icon} fontSize={24} />
                  <Typography sx={{ mx: 1, fontWeight: 500 }}>
                    {selectedCoin.symbol}
                  </Typography>
                  <Icon icon="mdi:chevron-down" fontSize={16} />
                </Button>
              ) : (
                <Button
                  onClick={(e) => setCurrencyAnchorEl(e.currentTarget)}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 1.5, 
                    borderRadius: 1,
                    minWidth: 'auto'
                  }}
                >
                  <Icon icon={selectedCurrency.icon} fontSize={24} />
                  <Typography sx={{ mx: 1, fontWeight: 500 }}>
                    {selectedCurrency.symbol}
                  </Typography>
                  <Icon icon="mdi:chevron-down" fontSize={16} />
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>


        {/* Coin Selection Menu */}
        <Menu
          anchorEl={coinAnchorEl}
          open={coinOpen}
          onClose={() => setCoinAnchorEl(null)}
          sx={{ 
            '& .MuiPaper-root': { 
              borderRadius: 2,
              boxShadow: 3
            } 
          }}
        >
          <Box sx={{ p: 0, borderBottom: 1, borderColor: 'divider' }}>
            <TextField
              fullWidth
              placeholder="Search coin"
              value={coinSearch}
              onChange={(e) => setCoinSearch(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="mdi:magnify" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {filteredCoins.map((coin) => (
            <MenuItem 
              key={coin.symbol} 
              onClick={() => handleCoinSelect(coin)}
              sx={{ py: 1.5 }}
            >
              <Icon icon={coin.icon} fontSize={20} style={{ marginRight: 12 }} />
              <Box>
                <Typography>{coin.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {coin.symbol}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  ${coin.price.toLocaleString()}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            Payment Method
          </Typography>
          <Card sx={{ mb: 2, borderRadius: 2, position: 'relative', p:0 }}>
            <Chip 
              label="Best price" 
              color="primary" 
              size="small" 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                right: 0,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0
              }} 
            />
            <CardContent sx={{p:'0px !important'}}>
              <Button
                fullWidth
                onClick={(e) => setPaymentAnchorEl(e.currentTarget)}
                sx={{
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  p: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon={selectedPayment.icon} fontSize={24} style={{ marginRight: 12 }} />
                  <Box>
                    <Typography>{selectedPayment.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedPayment.fee}
                    </Typography>
                  </Box>
                </Box>
                <Icon icon="mdi:chevron-down" fontSize={16} />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Method Menu */}
        <Menu
          anchorEl={paymentAnchorEl}
          open={paymentOpen}
          onClose={() => setPaymentAnchorEl(null)}
          sx={{ 
            '& .MuiPaper-root': { 
                width: 400,
              borderRadius: 2,
              boxShadow: 3
            } 
          }}
        >
          {paymentMethods.map((method) => (
            <MenuItem 
              key={method.id} 
              onClick={() => handlePaymentSelect(method)}
              sx={{ py: 2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Icon icon={method.icon} fontSize={28} style={{ marginRight: 16 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight={600}>{method.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {method.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between',flexDirection:{xs:'column', md:'row'}, mt: 1 }}>
                    <Typography variant="caption">
                      Fee: {method.fee}
                    </Typography>
                    <Typography variant="caption">
                      Processing: {method.processingTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              borderRadius: '50px',
              py: 1,
              fontSize: '1.1rem',
              fontWeight: 600,
              bgcolor: mode === 'buy' ? 'success.main' : 'error.main',
              '&:hover': {
                bgcolor: mode === 'buy' ? 'success.dark' : 'error.dark',
              },
            }}
          >
            {mode === 'buy' ? `Buy ${selectedCoin.symbol}` : `Sell ${selectedCoin.symbol}`}
          </Button>
        </motion.div>
      </Grid>
      <Grid size={{xs:12}}>
        <QuickBuySellHowToBuy/>
      </Grid>
      <Grid size={{xs:12}}>
        <QuickBuySellDifferentMethods/>
      </Grid>
    </Grid>
  );
};

export default QuickBuySell;