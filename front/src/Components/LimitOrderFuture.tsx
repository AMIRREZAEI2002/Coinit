'use client';
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  TextField,
  Slider,
  Divider,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useCryptoContext } from './CryptoContext';
import Link from 'next/link';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  paddingTop: theme.spacing(0),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
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
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.875rem',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.background.paper,
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
}));

const ArrowButton = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '8px',
  width: '12px',
  height: '12px',
  borderRadius: '2px',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
  transition: '0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const ArrowUp = styled(ArrowButton)({
  top: '6px',
  right: 40,
  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Up arrow
});

const ArrowDown = styled(ArrowButton)({
  bottom: '6px',
  right: 40,
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
    width: 16,
    height: 16,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${theme.palette.primary.light}33`,
    },
  },
  '& .MuiSlider-mark': {
    backgroundColor: theme.palette.grey[500],
    height: 4,
    width: 4,
  },
  '& .MuiSlider-markLabel': {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    top: 20,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.8rem',
  padding: theme.spacing(1, 3),
  transition: theme.transitions.create(['background-color', 'transform']),
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const PriceInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  position: 'relative',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.875rem',
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '16%',
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('xs')]: {
    left: '12%',
    maxWidth: 340,
  },
  [theme.breakpoints.up('sm')]: {
    left: '25%',
    maxWidth: 440,
  },
  [theme.breakpoints.up('md')]: {
    left: "33vw",
    maxWidth: 540,
  },
}));

interface LimitOrderFutureProps {
  isBuy: boolean;
}

const LimitOrderFuture: React.FC<LimitOrderFutureProps> = ({ isBuy }) => {
  const theme = useTheme();
  const { selectedCurrency } = useCryptoContext();
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [unit, setUnit] = useState<'USDT' | 'BTC' | 'Cont'>('USDT');
  const [openModal, setOpenModal] = useState(false);
  const [tempUnit, setTempUnit] = useState<'USDT' | 'BTC' | 'Cont'>('USDT');
  const [showBboSelect, setShowBboSelect] = useState(false);

  // Assume availableBalance and bboQuotes are provided by context
  const availableBalance = selectedCurrency?.availableBalance || 0;
  const currentPrice = selectedCurrency?.currentPrice || 0;
  const bboQuotes = selectedCurrency?.bboQuotes || [
    { option: 'Counterparty 1', price: currentPrice * 0.999 },
    { option: 'Counterparty 5', price: currentPrice * 0.998 },
    { option: 'Queue 1', price: currentPrice * 1.001 },
    { option: 'Queue 5', price: currentPrice * 1.002 },
  ];

  // Conversion constants
  const CONT_TO_BTC = 0.0001;
  const BTC_TO_USDT = currentPrice;
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

  // Set price to last price from context when "Last" is clicked
  const handleLastPriceClick = () => {
    if (currentPrice) {
      setPrice(currentPrice.toFixed(2));
      setShowBboSelect(false);
    }
  };

  // Handle price input change with validation
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || (Number(value) >= 0 && !isNaN(Number(value)))) {
      setPrice(value);
    }
  };

  // Handle quantity input change with validation
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || (Number(value) >= 0 && !isNaN(Number(value)))) {
      setQuantity(value);
      if (value !== '') {
        const usdtValue = convertToUSDT(value, unit);
        const percentage = Math.min((usdtValue / availableBalance) * 5, 5);
        setSliderValue(Math.round(percentage));
      } else {
        setSliderValue(0);
      }
    }
  };

  // Handle slider change to update quantity
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const sliderPercentage = (newValue as number) / 5;
    const usdtQuantity = availableBalance * sliderPercentage;
    setSliderValue(newValue as number);
    setQuantity(convertFromUSDT(usdtQuantity, unit));
  };

  // Handle BBO select change
  const handleBboSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedOption = event.target.value as string;
    const selectedQuote = bboQuotes.find((quote) => quote.option === selectedOption);
    if (selectedQuote) {
      setPrice(selectedQuote.price.toFixed(2));
      setShowBboSelect(false);
    }
  };

  // Toggle BBO select
  const handleBboClick = () => {
    setShowBboSelect(true);
  };

  // Handle increment/decrement for price
  const handleIncrementPrice = () => {
    const current = Number(price) || 0;
    setPrice((current + 0.01).toFixed(2));
  };

  const handleDecrementPrice = () => {
    const current = Number(price) || 0;
    if (current >= 0.01) {
      setPrice((current - 0.01).toFixed(2));
    } else {
      setPrice('0.00');
    }
  };

  // Sync quantity when availableBalance or unit changes
  useEffect(() => {
    if (sliderValue > 0) {
      const sliderPercentage = sliderValue / 5;
      const usdtQuantity = availableBalance * sliderPercentage;
      setQuantity(convertFromUSDT(usdtQuantity, unit));
    } else {
      setQuantity('');
    }
  }, [availableBalance, unit, sliderValue]);

  // Modal handlers
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleConfirm = () => {
    setUnit(tempUnit);
    const usdtQuantity = convertToUSDT(quantity, unit);
    setQuantity(convertFromUSDT(usdtQuantity, tempUnit));
    handleCloseModal();
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
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box display="flex" alignItems="flex-end">
        <Typography variant="body2" className="fs-8">
          Price <Typography component="span" variant="caption" color="text.secondary">
            (USDT)
          </Typography>
        </Typography>
      </Box>

      <PriceInputContainer>
        {showBboSelect ? (
          <StyledSelect
            value=""
            onChange={handleBboSelectChange}
            displayEmpty
            fullWidth
            size="small"
            sx={{ '& .MuiSelect-select': { paddingRight: '100px' } }}
            inputProps={{ 'aria-label': 'BBO Options' }}
          >
            <MenuItem value="" disabled>
              Select BBO Option
            </MenuItem>
            {bboQuotes.map((quote) => (
              <MenuItem key={quote.option} value={quote.option}>
                {quote.option} ({quote.price.toFixed(2)} USDT)
              </MenuItem>
            ))}
          </StyledSelect>
        ) : (
          <>
            <Box position="relative" width="100%">
              <StyledTextField
                fullWidth
                type="number"
                value={price}
                onChange={handlePriceChange}
                placeholder="Enter price"
                size="small"
                inputProps={{ min: 0, step: 0.01 }}
              />
              <ArrowUp
                onClick={handleIncrementPrice}
                aria-label="Increment price"
              />
              <ArrowDown
                onClick={handleDecrementPrice}
                aria-label="Decrement price"
              />
            </Box>
            <Button
              size="small"
              onClick={handleLastPriceClick}
              sx={{
                position: 'absolute',
                right: 50,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '0.75rem',
                color: theme.palette.text.secondary,
                minWidth: 'auto',
                padding: theme.spacing(0.5),
              }}
            >
              Last
            </Button>
            <Button
              size="small"
              onClick={handleBboClick}
              sx={{
                backgroundColor: theme.palette.background.default,
                fontSize: '0.75rem',
                color: theme.palette.text.primary,
                padding: theme.spacing(0.5, 1),
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: theme.palette.grey[700],
                },
              }}
              title="Best Bid Offer (BBO) is used to quickly set the limit order price that matches with the BBO option. When placing an order with the BBO option selected, the system will automatically select the matching market quote to fill the order."
            >
              BBO
            </Button>
          </>
        )}
      </PriceInputContainer>

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

      <Box>
        <StyledTextField
          fullWidth
          value={quantity}
          onChange={handleQuantityChange}
          placeholder={`Enter quantity (${unit})`}
          size="small"
        />
      </Box>

      <Box>
        <StyledSlider
          value={sliderValue}
          onChange={handleSliderChange}
          min={0}
          max={5}
          step={1}
          marks={sliderMarks}
          valueLabelDisplay="off"
        />
      </Box>

      <Box>
        <StyledButton
          variant="contained"
          color={isBuy ? 'success' : 'error'}
          fullWidth
        >
          {isBuy ? 'Buy' : 'Sell'} {selectedCurrency?.symbol || 'BTC'}
        </StyledButton>
      </Box>

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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="futures-unit-settings"
        closeAfterTransition
      >
        <ModalContainer
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
            <FormLabel
              component="legend"
              sx={{ fontSize: '0.875rem', fontWeight: 500, mb: 1 }}
            >
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
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        className="fs-9"
                      >
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
                      tempUnit === option.value
                        ? theme.palette.primary.main
                        : theme.palette.divider
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
              sx={{ borderRadius: 50, textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{ borderRadius: 50, textTransform: 'none' }}
            >
              Confirm
            </Button>
          </Box>
        </ModalContainer>
      </Modal>
    </FormContainer>
  );
};

export default LimitOrderFuture;