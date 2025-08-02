'use client';
import React, { useState, useEffect, useCallback } from 'react';
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

// Constants
const FEE_RATE = 0.001; // 0.1%
const WALLET_BALANCE = 1000; // Assumed wallet balance in USDT

// Styled components
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
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
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
  marginTop: theme.spacing(2),
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
  marginTop: '1rem',
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

interface StopLimitOrderProps {
  isBuy: boolean;
}

const StopLimitOrder: React.FC<StopLimitOrderProps> = ({ isBuy }) => {
  const theme = useTheme();
  const { selectedCurrency } = useCryptoContext();
  const [triggerPrice, setTriggerPrice] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Calculate wallet balance and symbol
  const walletBalance = selectedCurrency?.balance || WALLET_BALANCE;
  const baseSymbol = selectedCurrency?.symbol?.toUpperCase() || 'SPOT';
  const symbolBalance = price ? (walletBalance / parseFloat(price)).toFixed(6) : '0.000000';
  const maxAvailable = isBuy ? walletBalance : parseFloat(symbolBalance);
  const balanceText = isBuy
    ? `Balance: ${walletBalance.toFixed(2)} USDT`
    : `Balance: ${symbolBalance} ${baseSymbol}`;

  // Auto-calculate amount and total
  useEffect(() => {
    if (focusedField !== 'total' && focusedField !== 'amount') {
      const priceNum = parseFloat(price) || 0;
      const amountNum = parseFloat(amount) || 0;
      if (priceNum > 0 && amountNum > 0) {
        const totalValue = priceNum * amountNum;
        setTotal(totalValue.toFixed(2));
      } else {
        setTotal('');
      }
    }
  }, [price, amount, focusedField]);

  // Update based on slider
  useEffect(() => {
    const newTotal = (sliderValue / 100) * maxAvailable;
    if (isBuy) {
      setTotal(newTotal.toFixed(2));
      if (price && parseFloat(price) > 0) {
        setAmount((newTotal / parseFloat(price)).toFixed(6));
      }
    } else {
      setAmount(newTotal.toFixed(6));
      if (price && parseFloat(price) > 0) {
        setTotal((newTotal * parseFloat(price)).toFixed(2));
      }
    }
  }, [sliderValue, maxAvailable, price, isBuy]);

  // Handle total input change
  const handleTotalChange = useCallback(
    (value: string) => {
      setTotal(value);
      const priceNum = parseFloat(price) || 0;
      const totalNum = parseFloat(value) || 0;
      if (priceNum > 0 && totalNum > 0) {
        setAmount((totalNum / priceNum).toFixed(6));
      } else {
        setAmount('');
      }
    },
    [price]
  );

  // Handle amount input change
  const handleAmountChange = useCallback(
    (value: string) => {
      setAmount(value);
      const priceNum = parseFloat(price) || 0;
      const amountNum = parseFloat(value) || 0;
      if (priceNum > 0 && amountNum > 0) {
        setTotal((amountNum * priceNum).toFixed(2));
      } else {
        setTotal('');
      }
    },
    [price]
  );

  // Handle input changes
  const handleNumberInputChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>, field: string) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value;
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setter(value);
        if (field === 'total') handleTotalChange(value);
        if (field === 'amount') handleAmountChange(value);
      }
    },
    [handleTotalChange, handleAmountChange]
  );

  // Handle step buttons
  const stepTriggerPrice = useCallback(
    (step: number) => {
      const currentValue = parseFloat(triggerPrice) || 0;
      const newValue = Math.max(0, currentValue + step);
      setTriggerPrice(newValue.toFixed(2));
    },
    [triggerPrice]
  );

  const stepPrice = useCallback(
    (step: number) => {
      const currentValue = parseFloat(price) || 0;
      const newValue = Math.max(0, currentValue + step);
      setPrice(newValue.toFixed(2));
    },
    [price]
  );

  const stepAmount = useCallback(
    (step: number) => {
      const currentValue = parseFloat(amount) || 0;
      const newValue = Math.max(0, currentValue + step);
      setAmount(newValue.toFixed(6));
      if (price && parseFloat(price) > 0) {
        setTotal((newValue * parseFloat(price)).toFixed(2));
      }
    },
    [amount, price]
  );

  const stepTotal = useCallback(
    (step: number) => {
      const currentValue = parseFloat(total) || 0;
      const newValue = Math.max(0, currentValue + step);
      setTotal(newValue.toFixed(2));
      if (price && parseFloat(price) > 0) {
        setAmount((newValue / parseFloat(price)).toFixed(6));
      }
    },
    [total, price]
  );

  // Handle max button
  const handleMaxBalance = useCallback(() => {
    setSliderValue(100);
    if (isBuy) {
      setTotal(walletBalance.toFixed(2));
      if (price && parseFloat(price) > 0) {
        setAmount((walletBalance / parseFloat(price)).toFixed(6));
      }
    } else {
      setAmount(symbolBalance);
      if (price && parseFloat(price) > 0) {
        setTotal((parseFloat(symbolBalance) * parseFloat(price)).toFixed(2));
      }
    }
  }, [isBuy, walletBalance, symbolBalance, price]);

  // Handle trade action
  const handleTradeAction = useCallback(() => {
    const triggerPriceNum = parseFloat(triggerPrice) || 0;
    const priceNum = parseFloat(price) || 0;
    const amountNum = parseFloat(amount) || 0;
    const totalNum = parseFloat(total) || 0;

    if (!selectedCurrency?.symbol) {
      alert('Please select a currency');
      return;
    }

    if (!triggerPriceNum || !priceNum || !amountNum || !totalNum) {
      alert('Please fill in all fields with valid numbers');
      return;
    }

    if (triggerPriceNum <= 0 || priceNum <= 0 || amountNum <= 0 || totalNum <= 0) {
      alert('Values must be greater than zero');
      return;
    }

    if (isBuy ? totalNum > walletBalance : amountNum > parseFloat(symbolBalance)) {
      alert('Insufficient balance');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const fee = totalNum * FEE_RATE;
      const tradeData = {
        action: isBuy ? 'Buy' : 'Sell',
        type: 'stop-limit',
        currency: selectedCurrency?.name || 'Unknown',
        symbol: baseSymbol,
        triggerPrice: triggerPriceNum.toFixed(2),
        price: priceNum.toFixed(2),
        amount: amountNum.toFixed(6),
        total: totalNum.toFixed(2),
        fee: fee.toFixed(6),
      };

      setShowFees(true);
      setTimeout(() => setShowFees(false), 4000);

      console.log('Stop-Limit Trade:', tradeData);
      alert(`Stop-Limit ${isBuy ? 'Buy' : 'Sell'} ${tradeData.symbol} - ${tradeData.amount} @ ${tradeData.price}`);

      // Reset form
      setTriggerPrice('');
      setPrice('');
      setAmount('');
      setTotal('');
      setSliderValue(0);
      setIsLoading(false);
    }, 1000);
  }, [triggerPrice, price, amount, total, selectedCurrency, isBuy, walletBalance, symbolBalance, baseSymbol]);

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
        onChange={handleNumberInputChange(setter, fieldKey)}
        onFocus={() => setFocusedField(fieldKey)}
        onBlur={() => setFocusedField(null)}
        placeholder="Enter amount"
        disabled={isLoading}
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
        <StepButton size="small" onClick={onStepUp} disabled={isLoading}>
          <ArrowDropUpIcon fontSize="small" />
        </StepButton>
        <StepButton size="small" onClick={onStepDown} disabled={isLoading}>
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
        {/* Trigger Price Input */}
        {renderInput(
          'triggerPrice',
          'Trigger Price',
          triggerPrice,
          setTriggerPrice,
          'USDT',
          1,
          () => stepTriggerPrice(1),
          () => stepTriggerPrice(-1),
          true
        )}

        {/* Price Input */}
        {renderInput(
          'price',
          'Price',
          price,
          setPrice,
          'USDT',
          1,
          () => stepPrice(1),
          () => stepPrice(-1),
          true
        )}

        {/* Amount and Total Inputs */}
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

        {/* Slider */}
        <Box mx={2.4} mt={2} display="flex" alignItems="center" gap={2}>
          <Slider
            value={sliderValue}
            onChange={(_, newValue) => setSliderValue(newValue as number)}
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

        {/* Trade Button */}
        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <TradeButton
            component={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            isBuy={isBuy}
            variant="contained"
            sx={{ flex: 1 }}
            onClick={handleTradeAction}
            disabled={isLoading || !triggerPrice || !price || !amount || !total}
          >
            {isLoading ? 'Processing...' : `Stop-Limit ${isBuy ? `Buy ${baseSymbol}` : `Sell ${baseSymbol}`}`}
          </TradeButton>
        </Box>

        {/* Fees Box */}
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

export default StopLimitOrder;