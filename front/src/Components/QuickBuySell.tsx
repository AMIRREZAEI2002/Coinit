import React, { useState, useEffect, useRef } from 'react';
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
  CircularProgress,
  Container,
  useTheme,
  useMediaQuery,
  Alert
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
  { name: 'US Dollar', symbol: 'USD', icon: 'mdi:currency-usd', price: 1 },
  { name: 'Euro', symbol: 'EUR', icon: 'mdi:currency-eur', price: 0.92 },
];

const coins: Currency[] = [
  { name: 'Bitcoin', symbol: 'BTC', icon: 'cryptocurrency:btc', price: 40000 },
  { name: 'Ethereum', symbol: 'ETH', icon: 'cryptocurrency:eth', price: 3000 },
  { name: 'Litecoin', symbol: 'LTC', icon: 'cryptocurrency:ltc', price: 150 },
  { name: 'Ripple', symbol: 'XRP', icon: 'cryptocurrency:xrp', price: 0.5 },
  { name: 'Dogecoin', symbol: 'DOGE', icon: 'cryptocurrency:doge', price: 0.1 },
  { name: 'Solana', symbol: 'SOL', icon: 'cryptocurrency:sol', price: 120 },
  { name: 'Cardano', symbol: 'ADA', icon: 'cryptocurrency:ada', price: 0.45 },
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
  { 
    id: '4', 
    name: 'Apple Pay', 
    icon: 'mdi:apple',
    description: 'Pay with your Apple device',
    fee: '0.8% transaction fee',
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [mode, setMode] = useState<'buy'|'sell'>('buy');
  const [spendAmount, setSpendAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [selectedCoin, setSelectedCoin] = useState<Currency>(coins[0]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(paymentMethods[0]);
  
  const [currencySearch, setCurrencySearch] = useState<string>('');
  const [coinSearch, setCoinSearch] = useState<string>('');
  const [isRefreshingPrice, setIsRefreshingPrice] = useState<boolean>(false);
  const [transactionAlert, setTransactionAlert] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  
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
  const receivePlaceholder = mode === 'buy' ? "Enter crypto amount" : "Enter amount"

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
    let value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value) && value !== '') return;
    if (value === '') {
      setSpendAmount('');
      calculateConversion('spend', '');
      return;
    }
    const numericValue = parseFloat(value);
    if (numericValue < 0) {
      value = '0';
    }
    setSpendAmount(value);
    calculateConversion('spend', value);
  };
  const handleReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value) && value !== '') return;
    if (value === '') {
      setSpendAmount('');
      calculateConversion('spend', '');
      return;
    }
    const numericValue = parseFloat(value);
    if (numericValue < 0) {
      value = '0';
    }
    setSpendAmount(value);
    calculateConversion('spend', value);
  };

  // Toggle between buy/sell
  const handleModeChange = (newMode: 'buy'|'sell') => {
    setMode(newMode);
    setSpendAmount('');
    setReceiveAmount('');
    
    // Animate card on mode change
    if (cardRef.current) {
      cardRef.current.animate(
        [
          { transform: 'scale(0.95)', opacity: 0.8 },
          { transform: 'scale(1)', opacity: 1 }
        ],
        {
          duration: 300,
          easing: 'ease-out'
        }
      );
    }
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
    const newValue = (parseFloat(spendAmount || '0') + (mode === 'buy' ? 0.1 : 0.1)).toString();
    setSpendAmount(newValue);
    calculateConversion('spend', newValue);
  };

  const decrementSpend = () => {
    const current = parseFloat(spendAmount || '0');
    if (current > 0) {
      const newValue = (current - (mode === 'buy' ? 0.1 : 0.1)).toString();
      setSpendAmount(newValue);
      calculateConversion('spend', newValue);
    }
  };

  const incrementReceive = () => {
    const newValue = (parseFloat(receiveAmount || '0') + (mode === 'buy' ? 0.01 : 10)).toString();
    setReceiveAmount(newValue);
    calculateConversion('receive', newValue);
  };

  const decrementReceive = () => {
    const current = parseFloat(receiveAmount || '0');
    if (current > 0) {
      const newValue = (current - (mode === 'buy' ? 0.01 : 10)).toString();
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

  // Get reverse rate
  const getReverseRate = () => {
    const reverseRate = 1 / selectedCoin.price;
    return `1 ${selectedCurrency.symbol} = ${reverseRate.toFixed(8)} ${selectedCoin.symbol}`;
  };

  // Handle transaction
  const handleTransaction = () => {
    // Calculate our profit (0.5% of the transaction)
    const transactionAmount = parseFloat(mode === 'buy' ? spendAmount : receiveAmount);
    const ourProfit = transactionAmount * 0.005;
    
    // Create transaction details
    const details = {
      type: mode,
      from: mode === 'buy' ? selectedCurrency.symbol : selectedCoin.symbol,
      fromAmount: mode === 'buy' ? spendAmount : spendAmount,
      to: mode === 'buy' ? selectedCoin.symbol : selectedCurrency.symbol,
      toAmount: mode === 'buy' ? receiveAmount : receiveAmount,
      paymentMethod: selectedPayment.name,
      fee: selectedPayment.fee,
      ourProfit: ourProfit.toFixed(2),
      gasFee: "0.0005 ETH", // This would be calculated in a real app
      transactionHash: "0x" + Math.random().toString(36).substring(2, 66), // Simulated hash
      timestamp: new Date().toISOString(),
      status: "Pending Signature", // Simulated status
      comment: "Please sign the transaction in your wallet to complete the process"
    };
    
    setTransactionDetails(details);
    setTransactionAlert(true);
    
    // Hide alert after 5 seconds
    setTimeout(() => {
      setTransactionAlert(false);
    }, 5000);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 0, WebkitFontSmoothing: 'antialiased' }}>
      {transactionAlert && transactionDetails && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', top: 20, left: 0, right: 0, zIndex: 9999, padding: '0 16px' }}
        >
          <Alert 
            severity="info" 
            onClose={() => setTransactionAlert(false)}
            sx={{ 
              boxShadow: 3,
              borderRadius: 2,
              maxWidth: 600,
              margin: '0 auto',
              backgroundColor: theme.palette.background.paper
            }}
          >
            <Typography variant="h6" gutterBottom>
              Transaction Details
            </Typography>
            <Box component="pre" sx={{ 
              backgroundColor: theme.palette.background.default,
              p: 2,
              borderRadius: 1,
              overflowX: 'auto',
              fontSize: {xs:11,md:15},
              mt: 1
            }}>
              {JSON.stringify(transactionDetails, null, 2)}
            </Box>
            <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.secondary }}>
              {transactionDetails.comment}
            </Typography>
          </Alert>
        </motion.div>
      )}

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Left Column - Description */}
        <Grid size={{xs:12,md:6}}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              sx={{
                fontSize: { xs: 20, md: 30 },
                background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2
              }}
            >
              Buy & Sell Crypto Instantly
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
              Trade cryptocurrencies in seconds with our secure platform and competitive rates.
              Start trading with as little as $10.
            </Typography>

            <Box sx={{ display: 'flex', mt: 3, gap: 1, flexWrap: 'wrap' }}>
              {coins.slice(0, 6).map((coin) => (
                <motion.div
                  key={coin.symbol}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer'
                  }}
                >
                  <Icon icon={coin.icon} style={{ fontSize: 20 }} />
                </motion.div>
              ))}
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon icon="mdi:shield-check" style={{ color: theme.palette.success.main, fontSize: 24, marginRight: 8 }} />
                <Typography variant="body2" color="text.secondary">Secure Transactions</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Icon icon="mdi:lightning-bolt" style={{ color: theme.palette.warning.main, fontSize: 24, marginRight: 8 }} />
                <Typography variant="body2" color="text.secondary">Instant Processing</Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>

        {/* Right Column - Buy/Sell Form */}
        <Grid size={{xs:12,md:6}}>
            <Card 
              ref={cardRef}
              sx={{ 
                borderRadius: 3, 
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
                height: '100%',
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <CardContent sx={{ p: { xs: 1, sm: 3 } }}>
                {/* Buy/Sell Toggle */}
                <motion.div layout style={{ marginBottom: 24 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      bgcolor: theme.palette.background.default,
                      borderRadius: '50px',
                      p: 0.1,
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
                        fontWeight: 700,
                        fontSize: isMobile ? 12 : 15,
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
                        fontWeight: 700,
                        fontSize: isMobile ? 11 : 15,
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
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mb: 2,
                    p: 1,
                    bgcolor: theme.palette.action.hover,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon="mdi:trending-up" style={{ marginRight: 8, color: theme.palette.success.main }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize:{xs:12,md:15} }}>
                            {getCurrentRate()}
                          </Typography>
                          <Typography sx={{fontSize:{xs:11,md:15}}} color="text.secondary">
                            {getReverseRate()}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={refreshCurrentPrice}
                        disabled={isRefreshingPrice}
                        startIcon={isRefreshingPrice ?
                          <CircularProgress size={12} /> :
                          <Icon icon="mdi:refresh" />}
                        sx={{ 
                          minWidth: 'auto',
                          fontSize: 12,
                          py: 0.5
                        }}
                      >
                        {isMobile ? '' : 'Refresh'}
                      </Button>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      mt: 1,
                      pt: 1,
                      borderTop: `1px dashed ${theme.palette.divider}`,
                      fontSize: 12
                    }}>
                      <Typography sx={{fontSize:{xs:12,md:15}}}>Platform Fee</Typography>
                      <Typography sx={{ fontWeight: 500 ,fontSize:{xs:12,md:15}}}>
                        0.5% + Gas Fee
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>

                {/* Spend Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card sx={{ 
                    mb: 1,
                    py: '0px !important',
                    borderRadius: 2,
                    border: 'none', 
                    boxShadow: 'none', 
                    background: 'transparent'
                  }}>
                    <CardContent sx={{ px: '5px !important' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        {spendLabel}
                      </Typography>
                      
                      {/* Mobile layout for currency selector */}
                      {isMobile ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0,p:0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' ,p:0}}>
                            <Button
                              onClick={(e) => mode === 'buy' ? setCurrencyAnchorEl(e.currentTarget) : setCoinAnchorEl(e.currentTarget)}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                borderRadius: '12px 12px 0 0',
                                minWidth: 'auto',
                                bgcolor: theme.palette.background.default,
                                border: `1px solid ${theme.palette.divider}`,
                                height: 48,
                                width: '100%',
                                justifyContent: 'flex-start'
                              }}
                            >
                              <Icon 
                                icon={mode === 'buy' ? selectedCurrency.icon : selectedCoin.icon} 
                                fontSize={18} 
                              />
                              <Typography sx={{ mx: 1, fontWeight: 600, fontSize: 12 }}>
                                {mode === 'buy' ? selectedCurrency.symbol : selectedCoin.symbol}
                              </Typography>
                              <Box sx={{ flexGrow: 1 }} />
                              <Icon icon="mdi:chevron-down" fontSize={16} />
                            </Button>
                          </Box>
                          
                          <TextField
                            type="text"
                            value={spendAmount}
                            onChange={handleSpendChange}
                            placeholder={spendPlaceholder}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              sx: { 
                                fontSize: { xs: 13, sm: 15 }, 
                                fontWeight: 600,
                                height: 50,
                                '& input': { py: 1 },
                                borderRadius: '0 0 12px 12px',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0
                              },
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="text.secondary" sx={{ fontWeight: 500, fontSize:{xs:12,md:15} }}>
                                    {mode === 'buy' ? selectedCurrency.symbol : selectedCoin.symbol}
                                  </Typography>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton 
                                    onClick={decrementSpend} 
                                    disabled={!spendAmount || parseFloat(spendAmount) <= 0}
                                    size="small"
                                    sx={{ 
                                      bgcolor: theme.palette.action.hover, 
                                      borderRadius: 1, 
                                      mr: 0.5 
                                    }}
                                  >
                                    <Icon icon="mdi:minus" fontSize={16} />
                                  </IconButton>
                                  <IconButton 
                                    onClick={incrementSpend} 
                                    disabled={!spendAmount}
                                    size="small"
                                    sx={{ bgcolor: theme.palette.action.hover, borderRadius: 1 }}
                                  >
                                    <Icon icon="mdi:plus" fontSize={16} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <TextField
                            type="text"
                            value={spendAmount}
                            onChange={handleSpendChange}
                            placeholder={spendPlaceholder}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              sx: { 
                                fontSize: { xs: 12, sm: 15 }, 
                                fontWeight: 600,
                                height: 50,
                                '& input': { py: 1 }
                              },
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                                    {mode === 'buy' ? selectedCurrency.symbol : selectedCoin.symbol}
                                  </Typography>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton 
                                    onClick={decrementSpend} 
                                    disabled={!spendAmount || parseFloat(spendAmount) <= 0}
                                    size="small"
                                    sx={{ 
                                      bgcolor: theme.palette.action.hover, 
                                      borderRadius: 1, 
                                      mr: 0.5 
                                    }}
                                  >
                                    <Icon icon="mdi:minus" fontSize={16} />
                                  </IconButton>
                                  <IconButton 
                                    onClick={incrementSpend} 
                                    disabled={!spendAmount}
                                    size="small"
                                    sx={{ bgcolor: theme.palette.action.hover, borderRadius: 1 }}
                                  >
                                    <Icon icon="mdi:plus" fontSize={16} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Button
                            onClick={(e) => mode === 'buy' ? setCurrencyAnchorEl(e.currentTarget) : setCoinAnchorEl(e.currentTarget)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 1,
                              borderRadius: 2,
                              minWidth: 'auto',
                              bgcolor: theme.palette.background.default,
                              border: `1px solid ${theme.palette.divider}`,
                              height: 50
                            }}
                          >
                            <Icon 
                              icon={mode === 'buy' ? selectedCurrency.icon : selectedCoin.icon} 
                              fontSize={24} 
                            />
                            <Typography sx={{ mx: 1, fontWeight: 600, fontSize: 12 }}>
                              {mode === 'buy' ? selectedCurrency.symbol : selectedCoin.symbol}
                            </Typography>
                            <Icon icon="mdi:chevron-down" fontSize={16} />
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Arrow divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  style={{ display: 'flex', justifyContent: 'center', margin: '0px 0' }}
                >
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`
                  }}>
                    <Icon 
                      icon={mode === 'buy' ? "mdi:arrow-down" : "mdi:arrow-down"} 
                      fontSize={24} 
                      style={{ 
                        color: mode === 'buy' ? theme.palette.success.main : theme.palette.error.main 
                      }} 
                    />
                  </Box>
                </motion.div>

                {/* Receive Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Card sx={{ 
                    mb: 3, 
                    borderRadius: 2,
                    border: 'none', 
                    boxShadow: 'none', 
                    background: 'transparent'
                  }}>
                    <CardContent sx={{ p: '5px !important' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                          {receiveLabel}
                        </Typography>
                        <Tooltip title="Amount you'll receive after fees" arrow>
                          <Icon 
                            icon="mdi:information-outline" 
                            style={{ fontSize: 16, color: theme.palette.text.secondary }} 
                          />
                        </Tooltip>
                      </Box>
                      
                      {/* Mobile layout for currency selector */}
                      {isMobile ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                              onClick={(e) => mode === 'buy' ? setCoinAnchorEl(e.currentTarget) : setCurrencyAnchorEl(e.currentTarget)}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                borderRadius: '12px 12px 0 0',
                                minWidth: 'auto',
                                bgcolor: theme.palette.background.default,
                                border: `1px solid ${theme.palette.divider}`,
                                height: 48,
                                width: '100%',
                                justifyContent: 'flex-start'
                              }}
                            >
                              <Icon 
                                icon={mode === 'buy' ? selectedCoin.icon : selectedCurrency.icon} 
                                fontSize={20} 
                              />
                              <Typography sx={{ mx: 1, fontWeight: 600, fontSize:{xs:12,md:15} }}>
                                {mode === 'buy' ? selectedCoin.symbol : selectedCurrency.symbol}
                              </Typography>
                              <Box sx={{ flexGrow: 1 }} />
                              <Icon icon="mdi:chevron-down" fontSize={16} />
                            </Button>
                          </Box>
                          
                          <TextField
                            type="text"
                            value={receiveAmount}
                            onChange={handleReceiveChange}
                            placeholder={receivePlaceholder}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              sx: { 
                                fontSize:{xs:12,md:15}, 
                                fontWeight: 600,
                                height: 50,
                                '& input': { py: 1 },
                                borderRadius: '0 0 12px 12px',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0
                              },
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="text.secondary" sx={{ fontWeight: 500, fontSize:{xs:12,md:15} }}>
                                    {mode === 'buy' ? selectedCoin.symbol : selectedCurrency.symbol}
                                  </Typography>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton 
                                    onClick={decrementReceive} 
                                    disabled={!receiveAmount || parseFloat(receiveAmount) <= 0}
                                    size="small"
                                    sx={{ 
                                      bgcolor: theme.palette.action.hover, 
                                      borderRadius: 1, 
                                      mr: 0.5 
                                    }}
                                  >
                                    <Icon icon="mdi:minus" fontSize={16} />
                                  </IconButton>
                                  <IconButton 
                                    onClick={incrementReceive} 
                                    disabled={!receiveAmount}
                                    size="small"
                                    sx={{ bgcolor: theme.palette.action.hover, borderRadius: 1 }}
                                  >
                                    <Icon icon="mdi:plus" fontSize={16} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <TextField
                            type="text"
                            value={receiveAmount}
                            onChange={handleReceiveChange}
                            placeholder={receivePlaceholder}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              sx: { 
                                fontSize:{xs:12,md:15}, 
                                fontWeight: 600,
                                height: 50,
                                '& input': { py: 1 }
                              },
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                                    {mode === 'buy' ? selectedCoin.symbol : selectedCurrency.symbol}
                                  </Typography>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton 
                                    onClick={decrementReceive} 
                                    disabled={!receiveAmount || parseFloat(receiveAmount) <= 0}
                                    size="small"
                                    sx={{ 
                                      bgcolor: theme.palette.action.hover, 
                                      borderRadius: 1, 
                                      mr: 0.5 
                                    }}
                                  >
                                    <Icon icon="mdi:minus" fontSize={16} />
                                  </IconButton>
                                  <IconButton 
                                    onClick={incrementReceive} 
                                    disabled={!receiveAmount}
                                    size="small"
                                    sx={{ bgcolor: theme.palette.action.hover, borderRadius: 1 }}
                                  >
                                    <Icon icon="mdi:plus" fontSize={16} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Button
                            onClick={(e) => mode === 'buy' ? setCoinAnchorEl(e.currentTarget) : setCurrencyAnchorEl(e.currentTarget)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 1.2,
                              borderRadius: 2,
                              minWidth: 'auto',
                              bgcolor: theme.palette.background.default,
                              border: `1px solid ${theme.palette.divider}`,
                              height: 50
                            }}
                          >
                            <Icon 
                              icon={mode === 'buy' ? selectedCoin.icon : selectedCurrency.icon} 
                              fontSize={24} 
                            />
                            <Typography sx={{ mx: 1, fontWeight: 600, fontSize:{xs:12,md:15} }}>
                              {mode === 'buy' ? selectedCoin.symbol : selectedCurrency.symbol}
                            </Typography>
                            <Icon icon="mdi:chevron-down" fontSize={16} />
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  style={{ marginBottom: 24 }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    Payment Method
                  </Typography>
                  <Card sx={{ 
                    borderRadius: 2, 
                    position: 'relative',
                    border: `1px solid ${theme.palette.divider}`,
                    background: theme.palette.background.paper
                  }}>
                    <Chip
                      label="Best price"
                      color="primary"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        borderTopLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }} 
                    />
                    <CardContent sx={{ p: '5px !important' }}>
                      <Button
                        fullWidth
                        onClick={(e) => setPaymentAnchorEl(e.currentTarget)}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'transparent'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Icon 
                            icon={selectedPayment.icon} 
                            fontSize={isMobile ? 22 : 24} 
                            style={{ 
                              color: theme.palette.primary.main,
                              marginRight: 12 
                            }} 
                          />
                          <Box sx={{ textAlign: 'left' }}>
                            <Typography 
                              sx={{ 
                                fontWeight: 600, 
                                fontSize:{xs:12,md:13}
                              }}
                            >
                              {selectedPayment.name}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ fontSize:{xs:11,md:12} }}
                            >
                              {selectedPayment.fee}
                            </Typography>
                          </Box>
                        </Box>
                        <Icon 
                          icon="mdi:chevron-down" 
                          fontSize={17} 
                          style={{ color: theme.palette.text.secondary }} 
                        />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleTransaction}
                    sx={{
                      borderRadius: '50px',
                      py: 0.5,
                      fontSize:{xs:12,md:15},
                      fontWeight: 700,
                      bgcolor: mode === 'buy' ? 'success.main' : 'error.main',
                      '&:hover': {
                        bgcolor: mode === 'buy' ? 'success.dark' : 'error.dark',
                      },
                      boxShadow: `0 4px 10px ${mode === 'buy' 
                        ? 'rgba(46, 204, 113, 0.3)' 
                        : 'rgba(231, 76, 60, 0.3)'}`
                    }}
                  >
                    {mode === 'buy' 
                      ? `Buy ${selectedCoin.symbol}` 
                      : `Sell ${selectedCoin.symbol}`}
                  </Button>
                </motion.div>

                {/* Fee Summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  style={{ marginTop: 16 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: 12,
                    color: theme.palette.text.secondary,
                    mt: 2,
                    pt: 2,
                    borderTop: `1px solid ${theme.palette.divider}`
                  }}>
                    <Typography variant="caption">Processing fee</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {selectedPayment.fee}
                    </Typography>
                  </Box>
                </motion.div>
              </CardContent>
            </Card>
        </Grid>
      </Grid>

      {/* Currency Selection Menu */}
      <Menu
        anchorEl={currencyAnchorEl}
        open={currencyOpen}
        onClose={() => setCurrencyAnchorEl(null)}
        sx={{
          '& .MuiPaper-root': {
            width: { xs: '90vw', sm: 300 },
            maxHeight: 300,
            borderRadius: 2,
            boxShadow: 3,
            mt: 1
          }
        }}
      >
        <Box sx={{ p: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <TextField
            fullWidth
            placeholder="Search currency"
            value={currencySearch}
            onChange={(e) => setCurrencySearch(e.target.value)}
            size="small"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:magnify" />
                </InputAdornment>
              ),
            }} 
          />
        </Box>
        <Box sx={{ maxHeight: 250, overflow: 'auto' }}>
          {filteredCurrencies.map((currency) => (
            <MenuItem
              key={currency.symbol}
              onClick={() => handleCurrencySelect(currency)}
              sx={{ py: 1.5 }}
            >
              <Icon icon={currency.icon} fontSize={24} style={{ marginRight: 12, color: theme.palette.primary.main }} />
              <Box>
                <Typography>{currency.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {currency.symbol}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Menu>

      {/* Coin Selection Menu */}
      <Menu
        anchorEl={coinAnchorEl}
        open={coinOpen}
        onClose={() => setCoinAnchorEl(null)}
        sx={{
          '& .MuiPaper-root': {
            width: { xs: '90vw', sm: 300 },
            maxHeight: 300,
            borderRadius: 2,
            boxShadow: 3,
            mt: 1
          }
        }}
      >
        <Box sx={{ p: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <TextField
            fullWidth
            placeholder="Search coin"
            value={coinSearch}
            onChange={(e) => setCoinSearch(e.target.value)}
            size="small"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:magnify" />
                </InputAdornment>
              ),
            }} 
          />
        </Box>
        <Box sx={{ maxHeight: 250, overflow: 'auto' }}>
          {filteredCoins.map((coin) => (
            <MenuItem
              key={coin.symbol}
              onClick={() => handleCoinSelect(coin)}
              sx={{ py: 1.5 }}
            >
              <Icon icon={coin.icon} fontSize={24} style={{ marginRight: 12 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography>{coin.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {coin.symbol}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
                  ${coin.price.toLocaleString()}
                </Typography>
              </Box>
              <Typography 
                variant="caption" 
                sx={{ 
                  bgcolor: coin.price > 1000 ? theme.palette.success.light : theme.palette.warning.light,
                  color: coin.price > 1000 ? theme.palette.success.dark : theme.palette.warning.dark,
                  px: 1,
                  borderRadius: 1,
                  fontWeight: 600
                }}
              >
                {coin.price > 1000 ? 'High Cap' : 'Mid Cap'}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>

      {/* Payment Method Menu */}
      <Menu
        anchorEl={paymentAnchorEl}
        open={paymentOpen}
        onClose={() => setPaymentAnchorEl(null)}
        sx={{
          '& .MuiPaper-root': {
            width: { xs: '90vw', sm: 400 },
            borderRadius: 2,
            boxShadow: 3,
            mt: 1
          }
        }}
      >
        {paymentMethods.map((method) => (
          <MenuItem
            key={method.id}
            onClick={() => handlePaymentSelect(method)}
            sx={{ py: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Icon 
                icon={method.icon} 
                fontSize={28} 
                style={{ 
                  marginRight: 16,
                  color: theme.palette.primary.main
                }} 
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight={600}>{method.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {method.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, gap: 1 }}>
                  <Chip 
                    label={method.fee} 
                    size="small" 
                    sx={{ 
                      bgcolor: theme.palette.background.default,
                      fontSize: '0.7rem'
                    }} 
                  />
                  <Chip 
                    label={method.processingTime} 
                    size="small" 
                    sx={{ 
                      bgcolor: method.processingTime === 'Instant' 
                        ? theme.palette.success.light 
                        : theme.palette.warning.light,
                      color: method.processingTime === 'Instant' 
                        ? theme.palette.success.dark 
                        : theme.palette.warning.dark,
                      fontSize: '0.7rem'
                    }} 
                  />
                </Box>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>
      <Grid container spacing={1}>
        <Grid size={{xs:12 , md: 12}}>
          <QuickBuySellHowToBuy/>
        </Grid>
        <Grid size={{xs:12 , md: 12}}>
          <QuickBuySellDifferentMethods/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuickBuySell;