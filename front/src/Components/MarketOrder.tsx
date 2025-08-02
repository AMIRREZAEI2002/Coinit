'use client';
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Typography,
  InputBase,
  Slider,
  IconButton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';
import { useCryptoContext } from './CryptoContext';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

const FEE_RATE = 0.001; // 0.1%
const WALLET_BALANCE = 1000; // Assumed wallet balance in USDT

const TradeButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isBuy',
})<{ isBuy: boolean }>(({ theme, isBuy }) => ({
  borderRadius: '50px',
  padding: theme.spacing(0.8),
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: theme.shadows[2],
  backgroundColor: isBuy ? theme.palette.success.main : theme.palette.error.main,
  color: theme.palette.common.white,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'scale(1.02)',
    backgroundColor: isBuy ? theme.palette.success.dark : theme.palette.error.dark,
  },
}));

const StepButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 50,
  padding: 0,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
  color: theme.palette.text.primary,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[400],
    transform: 'scale(1.01)',
  },
}));

const FeesBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${
    theme.palette.mode === 'dark'
      ? theme.palette.grey[900]
      : theme.palette.background.paper
  }, ${
    theme.palette.mode === 'dark'
      ? theme.palette.grey[800]
      : theme.palette.grey[100]
  })`,
  borderRadius: '16px',
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${
    theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[300]
  }`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  },
  '& h6': {
    fontWeight: 700,
    fontSize: '1.1rem',
    marginBottom: 5,
  },
  '& .discount': {
    color: theme.palette.success.main,
    fontWeight: 600,
  },
  '& p': {
    margin: 0,
    color: theme.palette.text.secondary,
  },
}));

const NumberInput = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginTop: '1.5rem',
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    paddingLeft: '20px',
    paddingRight: '40px',
    height: '48px',
    fontSize: '0.875rem',
    color: 'text.primary',
    transition: 'border-color 0.2s ease',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '& input[type=number]': {
      'MozAppearance': 'textfield',
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.text.disabled,
    },
  },
  '& .label': {
    position: 'absolute',
    top: '-8px',
    left: '12px',
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    fontWeight: 500,
    backgroundColor: 'transparent',
    padding: '0 5px',
    zIndex: 1,
  },
  '& .unit': {
    position: 'absolute',
    top: '18px',
    right: '40px',
    fontSize: '0.75rem',
    color: '#333333',
  },
}));

const BalanceTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  background: theme.palette.background.default,
  marginTop: theme.spacing(0),
  marginLeft: 6,
  paddingLeft: 10,
  borderRadius: 50,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

interface MarketOrderProps {
  isBuy: boolean;
}

const MarketOrder: React.FC<MarketOrderProps> = ({ isBuy }) => {
  const theme = useTheme();
  const { selectedCurrency } = useCryptoContext();
  const [total, setTotal] = useState('');
  const [amount, setAmount] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showFees, setShowFees] = useState(false);

  // Calculate market price based on buy/sell
  const marketPrice = isBuy 
    ? selectedCurrency?.askPrice || selectedCurrency?.currentPrice || 1
    : selectedCurrency?.bidPrice || selectedCurrency?.currentPrice || 1;
  
  const walletBalance = selectedCurrency?.balance || WALLET_BALANCE;
  const baseSymbol = selectedCurrency?.symbol?.toUpperCase() || 'SPOT';
  const symbolBalance = marketPrice > 0 
    ? (walletBalance / marketPrice).toFixed(6) 
    : '0.000000';

  // Calculate max available based on buy/sell
  const maxAvailable = isBuy ? walletBalance : parseFloat(symbolBalance);
  const balanceText = isBuy 
    ? `Balance: ${walletBalance.toFixed(2)} USDT` 
    : `Balance: ${symbolBalance} ${baseSymbol}`;

  // Calculate Amount based on Total
  useEffect(() => {
    if (focusedField !== 'amount') {
      const totalNum = parseFloat(total) || 0;
      if (totalNum > 0 && marketPrice > 0) {
        const amountValue = isBuy ? totalNum / marketPrice : totalNum;
        setAmount(amountValue.toFixed(6));
      } else {
        setAmount('');
      }
    }
  }, [total, marketPrice, isBuy]);

  // Update Total based on Slider
  useEffect(() => {
    const newTotal = (sliderValue / 100) * maxAvailable;
    setTotal(isBuy ? newTotal.toFixed(2) : (newTotal * marketPrice).toFixed(2));
  }, [sliderValue, maxAvailable, marketPrice, isBuy]);

  // Handle input changes
  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  // Handle step buttons
  const stepAmount = (step: number) => {
    const currentValue = parseFloat(amount) || 0;
    const newValue = Math.max(0, currentValue + step);
    setAmount(newValue.toFixed(6));
  };

  const stepTotal = (step: number) => {
    const currentValue = parseFloat(total) || 0;
    const newValue = Math.max(0, currentValue + step);
    setTotal(newValue.toFixed(2));
  };

  // Handle trade action
  const handleTradeAction = () => {
    const totalNum = parseFloat(total) || 0;
    const amountNum = parseFloat(amount) || 0;
    
    if (!selectedCurrency?.symbol) {
      alert('Please select a currency');
      return;
    }
    
    if (totalNum <= 0 || amountNum <= 0) {
      alert('Total and amount must be greater than zero');
      return;
    }
    
    if (isBuy ? totalNum > walletBalance : amountNum > parseFloat(symbolBalance)) {
      alert('Insufficient balance');
      return;
    }
    
    const fee = totalNum * FEE_RATE;
    const tradeData = {
      action: isBuy ? 'Buy' : 'Sell',
      currency: selectedCurrency?.name || 'Unknown',
      symbol: baseSymbol,
      total: totalNum.toFixed(2),
      amount: amountNum.toFixed(6),
      marketPrice: marketPrice.toFixed(2),
      fee: fee.toFixed(6),
    };
    
    setShowFees(true);
    setTimeout(() => setShowFees(false), 4000);
    
    console.log('Market Trade:', tradeData);
    alert(`${isBuy ? 'Buy' : 'Sell'} ${tradeData.symbol} - ${tradeData.amount} @ ${tradeData.marketPrice}`);
    
    // Reset form
    setTotal('');
    setAmount('');
    setSliderValue(0);
  };

  // Handle max button
  const handleMaxBalance = () => {
    setSliderValue(100);
    if (isBuy) {
      setTotal(walletBalance.toFixed(2));
    } else {
      setAmount(symbolBalance);
    }
  };

  // Render input field
  const renderInput = (
    fieldKey: string,
    label: string,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    unit: string,
    step: number,
    onStepUp: () => void,
    onStepDown: () => void,
    showUnitAnimation = true
  ) => (
    <NumberInput>
      <Typography className="label">{label}:</Typography>
      <InputBase
        type="text"
        fullWidth
        inputProps={{ pattern: '[0-9]*\\.?[0-9]*', inputMode: 'decimal' }}
        value={value}
        onChange={handleNumberInputChange(setter)}
        onFocus={() => setFocusedField(fieldKey)}
        onBlur={() => setFocusedField(null)}
        placeholder="Enter amount"
      />
      <AnimatePresence>
        {(showUnitAnimation ? focusedField === fieldKey : true) && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="unit"
          >
            <Typography variant="body2" color="#333333">
              {unit}
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
      <Box
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.2,
        }}
      >
        <StepButton size="small" onClick={onStepUp}>
          <ArrowDropUpIcon fontSize="small" />
        </StepButton>
        <StepButton size="small" onClick={onStepDown}>
          <ArrowDropDownIcon fontSize="small" />
        </StepButton>
      </Box>
    </NumberInput>
  );

  // Render loading state if no currency is selected
  if (!selectedCurrency) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ p: 0 }}>
        <NumberInput>
          <Typography className="label">Price:</Typography>
          <Typography
            sx={{
              backgroundColor: theme.palette.background.default,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '12px',
              padding: '16px 20px',
              height: '55px',
              fontSize: '0.875rem',
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {marketPrice.toFixed(2)} USDT
          </Typography>
        </NumberInput>
        
        {isBuy ? (
          <>
            {renderInput(
              'total',
              'Total',
              total,
              setTotal,
              'USDT',
              1,
              () => stepTotal(1),
              () => stepTotal(-1),
              true
            )}
            <BalanceTypography onClick={handleMaxBalance}>
              {balanceText}
            </BalanceTypography>
            {renderInput(
              'amount',
              'Amount',
              amount,
              setAmount,
              baseSymbol,
              0.01,
              () => stepAmount(0.01),
              () => stepAmount(-0.01),
              true
            )}
          </>
        ) : (
          <>
            {renderInput(
              'amount',
              'Amount',
              amount,
              setAmount,
              baseSymbol,
              0.01,
              () => stepAmount(0.01),
              () => stepAmount(-0.01),
              true
            )}
            <BalanceTypography onClick={handleMaxBalance}>
              {balanceText}
            </BalanceTypography>
            {renderInput(
              'total',
              'Total',
              total,
              setTotal,
              'USDT',
              1,
              () => stepTotal(1),
              () => stepTotal(-1),
              true
            )}
          </>
        )}
        
        <Box mx={2.4} mt={2} display="flex" alignItems="center" gap={2}>
          <Slider
            value={sliderValue}
            onChange={(e, newValue) => setSliderValue(newValue as number)}
            min={0}
            max={100}
            step={10}
            marks={[
              { value: 0, label: '0%' },
              { value: 20, label: '20%' },
              { value: 40, label: '40%' },
              { value: 60, label: '60%' },
              { value: 80, label: '80%' },
              { value: 100, label: '100%' },
            ]}
            sx={{
              color: isBuy ? theme.palette.success.main : theme.palette.error.main,
              '& .MuiSlider-markLabel': {
                fontSize: '0.8rem',
                color: isBuy ? theme.palette.success.main : theme.palette.error.main,
                fontWeight: 'bold',
              },
              '& .MuiSlider-mark': {
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: isBuy ? theme.palette.success.main : theme.palette.error.main,
              },
            }}
          />
          <Typography variant="body2">{sliderValue}%</Typography>
        </Box>
        
        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <TradeButton
            isBuy={isBuy}
            variant="contained"
            sx={{ flex: 1 }}
            onClick={handleTradeAction}
          >
            {isBuy ? `Buy ${baseSymbol}` : `Sell ${baseSymbol}`}
          </TradeButton>
        </Box>
        
        <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FeesBox>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Fees</Typography>
                  <Link
                    href="#"
                    passHref
                    style={{
                      background: theme.palette.customColors?.feeseFirst || theme.palette.grey[200],
                      paddingLeft: 5,
                      paddingRight: 5,
                      borderRadius: 50,
                      fontSize: 11,
                      textDecoration: 'none',
                      color: 'inherit',
                      alignContent: 'center',
                    }}
                  >
                    Get <span className="discount">50% Off</span>{' '}
                    <Icon icon="noto-v1:gem-stone" width={12} height={12} style={{ paddingLeft: 1 }} />
                  </Link>
                </Box>
                <Typography variant="body2">Maker 0.0000% / Taker 0.0500%</Typography>
              </FeesBox>
            </motion.div>
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default MarketOrder;