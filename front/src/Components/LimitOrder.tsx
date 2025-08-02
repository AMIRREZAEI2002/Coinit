'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Slider,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
  FormHelperText,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { useCryptoContext } from './CryptoContext';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

const FEE_RATE = 0.001; // 0.1%
const WALLET_BALANCE = 0; // Assumed wallet balance in USDT

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
    marginBottom: theme.spacing(1),
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

interface LimitOrderProps {
  isBuy: boolean;
}

const LimitOrder: React.FC<LimitOrderProps> = ({ isBuy }) => {
  const theme = useTheme();
  const { selectedCurrency } = useCryptoContext();

  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [isTPChecked, setIsTPChecked] = useState(false);
  const [isSLChecked, setIsSLChecked] = useState(false);
  const [tpTriggerPrice, setTpTriggerPrice] = useState('');
  const [slTriggerPrice, setSlTriggerPrice] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showFees, setShowFees] = useState(false);

  const baseSymbol = selectedCurrency?.symbol?.toUpperCase() || 'SPOT';

  // Calculate Total based on Price and Amount
  useEffect(() => {
    const priceNum = parseFloat(price) || 0;
    const amountNum = parseFloat(amount) || 0;
    if (priceNum > 0 && amountNum > 0) {
      const totalValue = priceNum * amountNum;
      setTotal((totalValue * (1 - FEE_RATE)).toFixed(2));
    } else {
      setTotal('');
    }
  }, [price, amount]);

  // Update Amount based on Slider
  useEffect(() => {
    const priceNum = parseFloat(price) || 1;
    if (priceNum > 0) {
      const maxAmount = WALLET_BALANCE / priceNum;
      const newAmount = (sliderValue / 100) * maxAmount;
      setAmount(newAmount.toFixed(6));
    }
  }, [sliderValue, price]);

  // Handle Total input change
  const handleTotalChange = (val: string) => {
    const num = parseFloat(val) || 0;
    setTotal(val);
    if (num > 0) {
      const priceNum = parseFloat(price) || 1;
      const amountValue = (num / priceNum) / (1 - FEE_RATE);
      setAmount(amountValue.toFixed(6));
      const maxTotal = WALLET_BALANCE * (1 - FEE_RATE);
      setSliderValue(Math.min((num / maxTotal) * 100, 100));
    } else {
      setAmount('');
      setSliderValue(0);
    }
  };

  // Restrict input to non-negative numbers only
  const handleNumberChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
        setter(value);
      }
    };

  // Handle increment/decrement
  const stepValue = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    current: string,
    step: number,
  ) => {
    const numValue = parseFloat(current) || 0;
    const newValue = Math.max(0, numValue + step).toFixed(6);
    setter(newValue);
    // Update slider if adjusting amount
    if (setter === setAmount) {
      const priceNum = parseFloat(price) || 1;
      const maxAmount = WALLET_BALANCE / priceNum;
      setSliderValue((parseFloat(newValue) / maxAmount) * 100);
    }
    // Update total if adjusting amount or price
    if (setter === setAmount || setter === setPrice) {
      const priceNum = parseFloat(setter === setPrice ? newValue : price) || 1;
      const amountNum = parseFloat(setter === setAmount ? newValue : amount) || 0;
      if (priceNum > 0 && amountNum > 0) {
        setTotal((priceNum * amountNum * (1 - FEE_RATE)).toFixed(2));
      }
    }
  };

  const renderInput = (
    fieldKey: string,
    label: string,
    value: string,
    setter: (v: string) => void,
    unit: string,
    step: number,
    helper?: string,
    showUnitAnimation = true,
  ) => (
    <Box sx={{ position: 'relative', my: 2 }}>
      <TextField
        fullWidth
        type="text"
        label={label}
        value={value}
        onChange={handleNumberChange(setter)}
        onFocus={() => setFocusedField(fieldKey)}
        onBlur={() => setFocusedField(null)}
        variant="outlined"
        placeholder="Enter value"
        InputLabelProps={{ shrink: true }}
        inputProps={{ inputMode: 'decimal', pattern: '[0-9]*\\.?[0-9]*' }}
        sx={{
          height: 48,
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: theme.palette.background.default,
            '&:hover fieldset': { borderColor: theme.palette.primary.main },
            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
          },
        }}
      />
      <FormHelperText sx={{ ml: 1 }}>{helper || ''}</FormHelperText>
      <AnimatePresence>
        {(showUnitAnimation ? focusedField === fieldKey : true) && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', right: 40, top: 16 }}
          >
            <Typography variant="body2" color="textSecondary">
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
        <StepButton size="small" onClick={() => stepValue(setter, value, step)}>
          <ArrowDropUp fontSize="small" />
        </StepButton>
        <StepButton size="small" onClick={() => stepValue(setter, value, -step)}>
          <ArrowDropDown fontSize="small" />
        </StepButton>
      </Box>
    </Box>
  );

  const handleTradeAction = (action: 'buy' | 'sell') => {
    const priceNum = parseFloat(price) || 0;
    const amountNum = parseFloat(amount) || 0;
    const tpNum = parseFloat(tpTriggerPrice) || 0;
    const slNum = parseFloat(slTriggerPrice) || 0;

    // Validate TP/SL
    let error = '';
    if (isTPChecked && tpNum > 0) {
      if (isBuy && tpNum <= priceNum) {
        error = 'Take Profit price must be greater than the order price for a buy order.';
      } else if (!isBuy && tpNum >= priceNum) {
        error = 'Take Profit price must be less than the order price for a sell order.';
      }
    }
    if (isSLChecked && slNum > 0) {
      if (isBuy && slNum >= priceNum) {
        error = 'Stop Loss price must be less than the order price for a buy order.';
      } else if (!isBuy && slNum <= priceNum) {
        error = 'Stop Loss price must be greater than the order price for a sell order.';
      }
    }
    if (priceNum <= 0 || amountNum <= 0) {
      error = 'Price and Amount must be greater than zero.';
    }

    if (error) {
      alert(error);
      return;
    }

    const tradeData = {
      action,
      currency: selectedCurrency?.name || 'Unknown',
      symbol: selectedCurrency?.symbol || 'SPOT',
      price,
      amount,
      total,
      tpTriggerPrice: isTPChecked ? tpTriggerPrice : undefined,
      slTriggerPrice: isSLChecked ? slTriggerPrice : undefined,
    };
    console.log('Limit Trade:', tradeData);
    setShowFees(true);
    setTimeout(() => setShowFees(false), 4000);
    alert(`${action} ${selectedCurrency?.name || 'Unknown'} - ${JSON.stringify(tradeData)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box>
        {renderInput('price', 'Price', price, setPrice, 'USDT', 1, undefined, true)}
        {renderInput('amount', 'Amount', amount, setAmount, baseSymbol, 0.01, undefined, true)}
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
        {renderInput('total', 'Total', total, handleTotalChange, 'USDT', 1, undefined, false)}
        <Box display="flex" gap={1} mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isTPChecked}
                onChange={(e) => setIsTPChecked(e.target.checked)}
                color={isBuy ? 'success' : 'error'}
              />
            }
            label="TP"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={isSLChecked}
                onChange={(e) => setIsSLChecked(e.target.checked)}
                color={isBuy ? 'success' : 'error'}
              />
            }
            label="SL"
          />
        </Box>
        <AnimatePresence>
          {isTPChecked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderInput('tp', 'TP Trigger Price', tpTriggerPrice, setTpTriggerPrice, 'USDT', 1, undefined, true)}
            </motion.div>
          )}
          {isSLChecked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderInput('sl', 'SL Trigger Price', slTriggerPrice, setSlTriggerPrice, 'USDT', 1, undefined, true)}
            </motion.div>
          )}
        </AnimatePresence>
        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <TradeButton
            isBuy={isBuy}
            fullWidth
            variant="contained"
            onClick={() => handleTradeAction(isBuy ? 'buy' : 'sell')}
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

export default LimitOrder;