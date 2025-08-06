'use client';
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  TextField,
  Slider,
  Checkbox,
  FormControlLabel,
  Divider,
  Modal,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useCryptoContext } from './CryptoContext';
import Link from 'next/link';

interface MarketOrderFutureProps {
  isBuy: boolean;
}

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: 'transparent',
  borderRadius: theme.shape.borderRadius,
  maxWidth: 500,
  margin: 'auto',
  '& .fs-8': {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  '& .fs-9': {
    fontSize: '0.75rem',
    fontWeight: 400,
  },
  '& .fs-10': {
    fontSize: '0.625rem',
    fontWeight: 400,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    maxWidth: '100%',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.875rem',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[800],
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiInputBase-root': {
      fontSize: '0.75rem',
    },
  },
}));

const ArrowButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '8px',
  width: '16px', // Increased for touch
  height: '16px',
  borderRadius: '2px',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
  transition: '0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    width: '14px',
    height: '14px',
  },
}));

const ArrowUp = styled(ArrowButton)({
  top: '2px',
  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Up arrow
});

const ArrowDown = styled(ArrowButton)({
  bottom: '2px',
  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', // Down arrow
});

const StyledSlider = styled(Slider)(({ theme }) => ({
  height: 6,
  '& .MuiSlider-rail': {
    backgroundColor: theme.palette.grey[300],
    opacity: 0.5,
  },
  '& .MuiSlider-track': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiSlider-thumb': {
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.primary.main}`,
    width: 20, // Increased for touch
    height: 20,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${theme.palette.primary.light}33`,
    },
  },
  '& .MuiSlider-mark': {
    backgroundColor: theme.palette.grey[500],
    height: 8,
    width: 2,
  },
  '& .MuiSlider-markLabel': {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    top: 20,
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiSlider-markLabel': {
      fontSize: '0.65rem',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: theme.spacing(1.5, 3),
  minHeight: '48px', // Better touch target
  transition: theme.transitions.create(['background-color', 'transform']),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    padding: theme.spacing(1, 2),
  },
}));

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 540,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxWidth: 320,
  },
}));

const FeesBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${
    theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper
  }, ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100]})`,
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
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300]
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
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    '& h6': {
      fontSize: '1rem',
    },
    '& p': {
      fontSize: '0.75rem',
    },
  },
}));

const MarketOrderFuture: React.FC<MarketOrderFutureProps> = ({ isBuy }) => {
  const theme = useTheme();
  const { selectedCurrency } = useCryptoContext();
  const [quantity, setQuantity] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [unit, setUnit] = useState<'USDT' | 'BTC' | 'Cont'>('USDT');
  const [openModal, setOpenModal] = useState(false);
  const [tempUnit, setTempUnit] = useState<'USDT' | 'BTC' | 'Cont'>('USDT');
  const [mtlChecked, setMtlChecked] = useState(false);
  const [longTpSlChecked, setLongTpSlChecked] = useState(false);
  const [shortTpSlChecked, setShortTpSlChecked] = useState(false);
  const [error, setError] = useState('');

  // Type-safe access to selectedCurrency
  const availableBalance = selectedCurrency?.availableBalance ?? 0;
  const currentPrice = selectedCurrency?.currentPrice ?? 0;

  // Conversion constants
  const CONT_TO_BTC = 0.0001;
  const BTC_TO_USDT = currentPrice || 1; // Avoid division by zero
  const CONT_TO_USDT = currentPrice * CONT_TO_BTC;

  // Convert quantity to USDT for calculations
  const convertToUSDT = (value: string, unit: 'USDT' | 'BTC' | 'Cont'): number => {
    if (value === '') return 0;
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 0) return 0;
    switch (unit) {
      case 'USDT':
        return numValue;
      case 'BTC':
        return numValue * BTC_TO_USDT;
      case 'Cont':
        return numValue * CONT_TO_USDT;
      default:
        return numValue;
    }
  };

  // Convert USDT to target unit for display
  const convertFromUSDT = (usdtValue: number, targetUnit: 'USDT' | 'BTC' | 'Cont'): string => {
    if (usdtValue === 0) return '';
    switch (targetUnit) {
      case 'USDT':
        return usdtValue.toFixed(4);
      case 'BTC':
        return (usdtValue / BTC_TO_USDT).toFixed(8);
      case 'Cont':
        return (usdtValue / CONT_TO_USDT).toFixed(2);
      default:
        return usdtValue.toFixed(4);
    }
  };

  // Handle quantity input change with validation
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || (Number(value) >= 0 && !isNaN(Number(value)))) {
      const usdtValue = convertToUSDT(value, unit);
      if (usdtValue <= availableBalance) {
        setQuantity(value);
        setError('');
        if (value !== '') {
          const percentage = Math.min((usdtValue / availableBalance) * 5, 5);
          setSliderValue(Math.round(percentage));
        } else {
          setSliderValue(0);
        }
      } else {
        setError('Quantity exceeds available balance');
      }
    } else {
      setError('Quantity must be a positive number');
    }
  };

  // Handle increment/decrement for quantity
  const handleIncrementQuantity = () => {
    const current = Number(quantity) || 0;
    const step = unit === 'USDT' ? 0.01 : unit === 'BTC' ? 0.00000001 : 0.01;
    const newValue = current + step;
    const usdtValue = convertToUSDT(newValue.toString(), unit);
    if (usdtValue <= availableBalance) {
      setQuantity(convertFromUSDT(usdtValue, unit));
      setError('');
    } else {
      setError('Quantity exceeds available balance');
    }
  };

  const handleDecrementQuantity = () => {
    const current = Number(quantity) || 0;
    const step = unit === 'USDT' ? 0.01 : unit === 'BTC' ? 0.00000001 : 0.01;
    if (current >= step) {
      const newValue = current - step;
      setQuantity(convertFromUSDT(convertToUSDT(newValue.toString(), unit), unit));
      setError('');
    } else {
      setQuantity('');
      setSliderValue(0);
      setError('');
    }
  };

  // Handle slider change to update quantity
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const sliderPercentage = (newValue as number) / 5;
    const usdtQuantity = availableBalance * sliderPercentage;
    setSliderValue(newValue as number);
    setQuantity(convertFromUSDT(usdtQuantity, unit));
    setError('');
  };

  // Modal handlers
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleConfirm = () => {
    setUnit(tempUnit);
    const usdtQuantity = convertToUSDT(quantity, unit);
    setQuantity(convertFromUSDT(usdtQuantity, tempUnit));
    setError('');
    handleCloseModal();
  };

  // Form submission
  const handleSubmit = (orderType: 'Long' | 'Short') => {
    if (!selectedCurrency) {
      setError('No currency selected');
      return;
    }
    if (!quantity || Number(quantity) <= 0) {
      setError('Please enter a valid quantity');
      return;
    }
    const usdtValue = convertToUSDT(quantity, unit);
    if (usdtValue > availableBalance) {
      setError('Quantity exceeds available balance');
      return;
    }

    const orderData = {
      quantity: Number(quantity),
      unit,
      mtl: mtlChecked,
      longTpSl: longTpSlChecked,
      shortTpSl: shortTpSlChecked,
      orderType,
      symbol: selectedCurrency.symbol,
      isBuy, // Include isBuy to satisfy TypeScript
    };

    console.log('Submitting order:', orderData);
    // Example: await fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderData) });
  };

  const sliderMarks = [
    { value: 0, label: '0%' },
    { value: 1, label: '20%' },
    { value: 2, label: '40%' },
    { value: 3, label: '60%' },
    { value: 4, label: '80%' },
    { value: 5, label: '100%' },
  ];

  return (
    <FormContainer
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Error Message */}
      {error && (
        <Typography color="error" variant="caption" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

      {/* Quantity */}
      <Box display="flex" alignItems="flex-end">
        <Typography
          variant="body2"
          className="fs-8"
          onClick={handleOpenModal}
          sx={{ cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }}
        >
          Quantity{' '}
          <Typography component="span" variant="caption" color="text.secondary">
            ({unit})
          </Typography>
          <Icon icon="mdi:chevron-down" fontSize={12} style={{ marginLeft: 4 }} />
        </Typography>
      </Box>

      <Box position="relative">
        <StyledTextField
          fullWidth
          value={quantity}
          onChange={handleQuantityChange}
          placeholder={`Enter quantity (${unit})`}
          size="small"
          type="number"
          inputProps={{ min: 0, step: unit === 'USDT' ? 0.01 : unit === 'BTC' ? 0.00000001 : 0.01 }}
          error={!!error && error.includes('quantity')}
        />
        <ArrowUp onClick={handleIncrementQuantity} aria-label="Increment quantity" />
        <ArrowDown onClick={handleDecrementQuantity} aria-label="Decrement quantity" />
      </Box>

      {/* Slider */}
      <Box>
        <StyledSlider
          value={sliderValue}
          onChange={handleSliderChange}
          min={0}
          max={5}
          step={1}
          marks={sliderMarks}
          valueLabelDisplay="off"
          disabled={!availableBalance}
        />
      </Box>

      {/* Buy/Sell */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Typography variant="caption" color="text.secondary" className="fs-9">
            Buy
          </Typography>
          <Typography variant="body2" className="fs-8">
            {convertToUSDT(quantity, unit).toFixed(4)} USDT
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" className="fs-9">
            Sell
          </Typography>
          <Typography variant="body2" className="fs-8">
            {convertToUSDT(quantity, unit).toFixed(4)} USDT
          </Typography>
        </Box>
      </Box>

      {/* Max Long/Short */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box>
          <Typography variant="caption" color="text.secondary" className="fs-9">
            Max Long
          </Typography>
          <Typography variant="body2" className="fs-9">
            {availableBalance.toFixed(4)}{' '}
            <Typography component="span" className="fs-10">USDT</Typography>
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" className="fs-9">
            Max Short
          </Typography>
          <Typography variant="body2" className="fs-9">
            {availableBalance.toFixed(4)}{' '}
            <Typography component="span" className="fs-10">USDT</Typography>
          </Typography>
        </Box>
      </Box>

      {/* MTL Checkbox */}
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={mtlChecked}
              onChange={(e) => setMtlChecked(e.target.checked)}
              size="small"
              sx={{
                color: theme.palette.grey[500],
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
                padding: theme.spacing(0.5), // Better touch target
              }}
            />
          }
          label={<Typography variant="body2" className="fs-8">MTL</Typography>}
          sx={{ margin: 0 }}
        />
      </Box>

      <Divider sx={{ my: 1, bgcolor: theme.palette.divider }} />

      {/* TP/SL Checkboxes */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={longTpSlChecked}
              onChange={(e) => setLongTpSlChecked(e.target.checked)}
              size="small"
              sx={{
                color: theme.palette.grey[500],
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
                padding: theme.spacing(0.5),
              }}
            />
          }
          label={<Typography variant="body2" className="fs-8">Long TP/SL</Typography>}
          sx={{ margin: 0 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={shortTpSlChecked}
              onChange={(e) => setShortTpSlChecked(e.target.checked)}
              size="small"
              sx={{
                color: theme.palette.grey[500],
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
                padding: theme.spacing(0.5),
              }}
            />
          }
          label={<Typography variant="body2" className="fs-8">Short TP/SL</Typography>}
          sx={{ margin: 0 }}
        />
      </Box>

      {/* Long/Short Buttons */}
      <Box display="flex" gap={2}>
        <StyledButton
          variant="contained"
          color="success"
          fullWidth
          onClick={() => handleSubmit('Long')}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
          }}
          disabled={!selectedCurrency || !quantity || Number(quantity) <= 0 || !!error}
        >
          {isBuy ? 'Open Long' : 'Close Long'}
        </StyledButton>
        <StyledButton
          variant="contained"
          color="error"
          fullWidth
          onClick={() => handleSubmit('Short')}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
          }}
          disabled={!selectedCurrency || !quantity || Number(quantity) <= 0 || !!error}
        >
          {isBuy ? 'Open Short' : 'Close Short'}
        </StyledButton>
      </Box>

      {/* Margin */}
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flex={1}>
          <Typography variant="caption" color="text.secondary" className="fs-9">
            Margin
          </Typography>
          <Typography variant="body2" className="fs-8">
            0 <Typography component="span" className="fs-9">USDT</Typography>
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" flex={1}>
          <Typography variant="caption" color="text.secondary" className="fs-9">
            Margin
          </Typography>
          <Typography variant="body2" className="fs-8">
            0 <Typography component="span" className="fs-9">USDT</Typography>
          </Typography>
        </Box>
      </Box>

      {/* Fees */}
      <FeesBox>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Fees</Typography>
          <Link
            href="/fees"
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

      {/* Unit Selection Modal */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="futures-unit-settings" closeAfterTransition>
        <ModalContainer
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Typography id="futures-unit-settings" variant="h6" fontWeight="bold">
            Futures Unit Settings
          </Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 1 }}>
              Order by Quantity
            </FormLabel>
            <RadioGroup
              value={tempUnit}
              onChange={(e) => setTempUnit(e.target.value as 'USDT' | 'BTC' | 'Cont')}
            >
              {[
                {
                  value: 'USDT',
                  title: 'Order by Cost (USDT)',
                  desc: 'Enter the order cost. The cost is not affected by leverage. The global unit will switch to USDT.',
                },
                {
                  value: 'BTC',
                  title: 'Order by Quantity (BTC)',
                  desc: 'Enter the futures quantity (in BTC). The global unit will switch to BTC.',
                },
                {
                  value: 'Cont',
                  title: 'Order by Quantity (Cont)',
                  desc: `Enter the futures quantity (in Cont). 1 Cont = 0.0001 BTC ≈ ${CONT_TO_USDT.toFixed(4)} USDT. The global unit will switch to Cont.`,
                },
              ].map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio size="small" />}
                  label={
                    <Box>
                      <Typography variant="body2" className="fs-8">
                        {option.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" className="fs-9">
                        {option.desc}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    alignItems: 'flex-start',
                    m: 1,
                    px: 2,
                    py: 1,
                    border: `1px solid ${
                      tempUnit === option.value ? theme.palette.primary.main : theme.palette.divider
                    }`,
                    borderRadius: 2,
                    bgcolor:
                      tempUnit === option.value
                        ? `${theme.palette.primary.main}20`
                        : theme.palette.background.paper,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: `${theme.palette.primary.main}10`,
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Box display="flex" gap={2} justifyContent="flex-end" mt={2}>
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              sx={{ borderRadius: 50, textTransform: 'none', minWidth: '100px' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{ borderRadius: 50, textTransform: 'none', minWidth: '100px' }}
            >
              Confirm
            </Button>
          </Box>
        </ModalContainer>
      </Modal>
    </FormContainer>
  );
};

export default MarketOrderFuture;