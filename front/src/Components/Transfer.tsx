/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Snackbar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// ✅ TypeScript interfaces
interface Wallet {
  id: string;
  address: string;
  label: string;
  currency: string[]; // ✅ تغییر به آرایه
  balance: number;
}

interface FormData {
  fromWallet: string;
  toAddress: string;
  amount: string;
  currency: string;
  note: string;
}

// ✅ Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  background: theme.palette.background.paper,
  marginBottom: theme.spacing(4),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  position: 'relative',
  '& .MuiInputBase-root': {
    paddingRight: theme.spacing(6),
    borderRadius: '8px',
    background: theme.palette.background.paper,
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    paddingRight: theme.spacing(6),
    borderRadius: '8px',
    background: theme.palette.background.paper,
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '55%',
  right: theme.spacing(2),
  transform: 'translateY(-50%)',
  color: theme.palette.text.secondary,
}));
const IconWrapper2 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '55%',
  right: theme.spacing(5),
  transform: 'translateY(-50%)',
  color: theme.palette.text.secondary,
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)'
    : 'linear-gradient(45deg, #1e3a8a 30%, #3b82f6 90%)',
  color: '#fff',
  padding: theme.spacing(1.5, 4),
  borderRadius: '8px',
  fontWeight: 600,
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #2563eb 30%, #4b8bf5 90%)'
      : 'linear-gradient(45deg, #1e40af 30%, #2563eb 90%)',
  },
  '&:disabled': {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

const AmountButton = styled(Button)(({ theme }) => ({
  minWidth: 40,
  height: 40,
  borderRadius: '8px',
  background: theme.palette.mode === 'dark' ? '#4b5563' : '#e5e7eb',
  color: theme.palette.text.primary,
  '&:hover': {
    background: theme.palette.mode === 'dark' ? '#6b7280' : '#d1d5db',
  },
}));

const Transfer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fromWallet: '',
    toAddress: '',
    amount: '',
    currency: '',
    note: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // ✅ Wallets با currency آرایه
  const wallets: Wallet[] = [
    { id: 'wallet1', address: '0xAbC123...9FEd', label: 'Multi Wallet', currency: ['BTC','ETH'], balance: 2.5 },
    { id: 'wallet2', address: '0xDeF456...4Bcd', label: 'BTC Wallet', currency: ['BTC'], balance: 0.1 },
    { id: 'wallet3', address: '0xGhI789...2Xyz', label: 'USDT Wallet', currency: ['USDT'], balance: 1000 },
  ];

  const validateForm = useCallback(() => {
    const newErrors: Partial<FormData> = {};
    const selectedWallet = wallets.find((w) => w.id === formData.fromWallet);

    if (!formData.fromWallet) {
      newErrors.fromWallet = 'Please select a wallet.';
    }
    if (!formData.toAddress) {
      newErrors.toAddress = 'Please enter a recipient address.';
    } else if (formData.currency === 'ETH' && !/^(0x)?[0-9a-fA-F]{40}$/.test(formData.toAddress)) {
      newErrors.toAddress = 'Please enter a valid Ethereum address.';
    } else if (formData.currency === 'BTC' && !/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(formData.toAddress)) {
      newErrors.toAddress = 'Please enter a valid Bitcoin address.';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount.';
    } else if (selectedWallet && parseFloat(formData.amount) > selectedWallet.balance) {
      newErrors.amount = `Amount exceeds wallet balance (${selectedWallet.balance}).`;
    }
    if (!formData.currency) {
      newErrors.currency = 'Please select a currency.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, wallets]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name as keyof FormData]: value }));
      setErrors((prev) => ({ ...prev, [name as keyof FormData]: undefined }));
    },
    []
  );

  const handleIncrement = useCallback(() => {
    setFormData((prev) => {
      const currentAmount = parseFloat(prev.amount) || 0;
      return { ...prev, amount: (currentAmount + 0.1).toFixed(4) };
    });
    setErrors((prev) => ({ ...prev, amount: undefined }));
  }, []);

  const handleDecrement = useCallback(() => {
    setFormData((prev) => {
      const currentAmount = parseFloat(prev.amount) || 0;
      return { ...prev, amount: Math.max(0, currentAmount - 0.1).toFixed(4) };
    });
    setErrors((prev) => ({ ...prev, amount: undefined }));
  }, []);

  const handleMaxAmount = useCallback(() => {
    const selectedWallet = wallets.find((w) => w.id === formData.fromWallet);
    if (selectedWallet) {
      setFormData((prev) => ({ ...prev, amount: selectedWallet.balance.toString() }));
      setErrors((prev) => ({ ...prev, amount: undefined }));
    }
  }, [formData.fromWallet, wallets]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        setSnackbarMessage('Transaction sent for review!');
        setShowSnackbar(true);
        setFormData({ fromWallet: '', toAddress: '', amount: '', currency: '', note: '' });
      }
    },
    [formData, validateForm]
  );

  const handleReset = useCallback(() => {
    setFormData({ fromWallet: '', toAddress: '', amount: '', currency: '', note: '' });
    setErrors({});
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setShowSnackbar(false);
  }, []);

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 0, sm: 3, lg: 0 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, md: 9 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <StyledCard>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 1, sm: 0 } }}>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      1. Transfer Form
                    </Typography>
                  </Box>
                }
                subheader={<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Send cryptocurrency securely from one of your wallets.</Typography>}
                sx={{ borderBottom: 'none', bgcolor: 'transparent', py: 3, px: { xs: 2, md: 4 } }}
              />
              <CardContent sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 4 } }}>
                <Box component="form" id="cryptoTransferForm" onSubmit={handleSubmit} noValidate>
                  {/* From Wallet */}
                  <StyledFormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel id="fromWallet-label">From Wallet</InputLabel>
                    <Select
                      labelId="fromWallet-label"
                      id="fromWallet"
                      name="fromWallet"
                      value={formData.fromWallet}
                      onChange={handleChange as any}
                      label="From Wallet"
                      error={!!errors.fromWallet}
                      required
                    >
                      <MenuItem value="" disabled>Select a wallet</MenuItem>
                      {wallets.map((wallet) => (
                        <MenuItem key={wallet.id} value={wallet.id}>
                          {wallet.address} ({wallet.label}) - Balance: {wallet.balance} [{wallet.currency.join(', ')}]
                        </MenuItem>
                      ))}
                    </Select>
                    <IconWrapper2>
                      <Tooltip title="Source wallet for the transaction">
                        <Icon icon="mdi:wallet" width={24} />
                      </Tooltip>
                    </IconWrapper2>
                    {errors.fromWallet && <Typography variant="caption" color="error" sx={{ pl: 2, mt: 1 }}>{errors.fromWallet}</Typography>}
                  </StyledFormControl>

                  {/* To Address */}
                  <StyledFormControl fullWidth sx={{ mb: 4 }}>
                    <StyledTextField id="toAddress" name="toAddress" label="To Address" value={formData.toAddress} onChange={handleChange as any} placeholder="Enter recipient’s wallet address" error={!!errors.toAddress} required fullWidth />
                    <IconWrapper>
                      <Tooltip title="Scan QR code or enter address">
                        <Icon icon="mdi:qrcode-scan" width={24} />
                      </Tooltip>
                    </IconWrapper>
                    {errors.toAddress && <Typography variant="caption" color="error" sx={{ pl: 2, mt: 1 }}>{errors.toAddress}</Typography>}
                  </StyledFormControl>

                  {/* Amount & Currency */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>Amount</Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'stretch', md: 'center' }, gap: { xs: 2, md: 2 } }}>
                      <StyledTextField
                        id="amount"
                        name="amount"
                        type="text"
                        value={formData.amount}
                        onChange={handleChange as any}
                        placeholder="0.00"
                        error={!!errors.amount}
                        required
                        sx={{ flex: 1, width: '100%' }}
                        InputProps={{
                          inputMode: 'decimal',
                          endAdornment: (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <AmountButton onClick={handleIncrement}><Icon icon="mdi:plus" width={20} /></AmountButton>
                              <AmountButton onClick={handleDecrement}><Icon icon="mdi:minus" width={20} /></AmountButton>
                            </Box>
                          ),
                        }}
                      />
                      <FormControl sx={{ minWidth: { xs: '100%', md: 120 } }} error={!!errors.currency}>
                        <InputLabel id="currency-label">Currency</InputLabel>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        <Select labelId="currency-label" id="currency" name="currency" value={formData.currency} onChange={handleChange as any}>
                          <MenuItem value="" disabled>Select Currency</MenuItem>
                          {wallets.filter((w) => w.id === formData.fromWallet)
                            .flatMap((w) => w.currency)
                            .map((cur) => (
                              <MenuItem key={cur} value={cur}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Icon icon={`cryptocurrency:${cur.toLowerCase()}`} width={20} />
                                  {cur}
                                </Box>
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <Button variant="outlined" onClick={handleMaxAmount} sx={{ width: { xs: '100%', md: 'auto' }, mt: { xs: 1, md: 0 } }} disabled={!formData.fromWallet}>Max</Button>
                    </Box>
                    {errors.amount && <Typography variant="caption" color="error" sx={{ pl: 2, mt: 1 }}>{errors.amount}</Typography>}
                  </Box>

                  {/* Note */}
                  <StyledFormControl fullWidth sx={{ mb: 5 }}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <StyledTextField id="note" name="note" label="Note (Optional)" value={formData.note} onChange={handleChange as any} multiline rows={3} placeholder="Add a memo or reference" />
                  </StyledFormControl>

                  {/* Buttons */}
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'flex-end', gap: { xs: 2, sm: 2 }, mt: 3 }}>
                    <Button variant="outlined" onClick={handleReset}>Clear</Button>
                    <GradientButton type="submit" startIcon={<Icon icon="mdi:send" />}>Review & Send</GradientButton>
                  </Box>
                </Box>
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>
      </Grid>
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose} message={snackbarMessage} action={<IconButton size="small" color="inherit" onClick={handleSnackbarClose}><Icon icon="mdi:close" /></IconButton>} />
    </Box>
  );
};

export default Transfer;
