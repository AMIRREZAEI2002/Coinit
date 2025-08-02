'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  Paper,
  Avatar,
  Stack,
  Divider,
  Fade,
  useMediaQuery,
} from '@mui/material';
import { Icon } from '@iconify/react';

interface Currency {
  name: string;
  symbol: string;
  icon: string;
  color: string;
}

const currencies: Currency[] = [
  { name: 'Bitcoin', symbol: 'BTC', icon: 'cryptocurrency-color:btc', color: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', icon: 'cryptocurrency-color:eth', color: '#627EEA' },
  { name: 'Tether', symbol: 'USDT', icon: 'cryptocurrency-color:usdt', color: '#26A17B' },
  { name: 'Litecoin', symbol: 'LTC', icon: 'cryptocurrency-color:ltc', color: '#345D9D' },
  { name: 'Ripple', symbol: 'XRP', icon: 'cryptocurrency-color:xrp', color: '#008DD2' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: 'cryptocurrency-color:doge', color: '#C2A633' },
];

const SpotWallet: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // تشخیص موبایل
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USDT');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [balance, setBalance] = useState<number>(0.0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedCurrencyData =
    currencies.find((c) => c.symbol === selectedCurrency) || currencies[2];

  const handleCurrencyMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCurrencySelect = (symbol: string) => {
    setSelectedCurrency(symbol);
    setAnchorEl(null);
    setBalance(0.0);
  };

  const handleDeposit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setBalance((prev) => prev + 100.0);
      setIsLoading(false);
    }, 1000);
  };

  const handleTransfer = () => {
    if (balance < 10) return alert(`Insufficient ${selectedCurrency} balance`);
    setIsLoading(true);
    setTimeout(() => {
      setBalance((prev) => prev - 10);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Paper
      sx={{
        flex: 1,
        p: isMobile ? 2 : 3,
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 8px 30px rgba(0,0,0,0.35)'
            : '0 6px 20px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 1.5 : 2,
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Typography
          fontSize={isMobile ? '13px' : '14px'}
          fontWeight={600}
          display="flex"
          alignItems="center"
          gap={1}
          color="text.primary"
          mb={isMobile ? 1 : 0}
        >
          <Icon icon="mdi:wallet-outline" fontSize={18} />
          Spot Wallet
        </Typography>
        <Button
          onClick={handleCurrencyMenuOpen}
          endIcon={<Icon icon="mdi:chevron-down" />}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: isMobile ? 1.5 : 2,
            py: 0.5,
            bgcolor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[800]
                : theme.palette.grey[100],
            fontSize: isMobile ? '12px' : '13px',
            fontWeight: 500,
            color: theme.palette.text.primary,
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'dark'
                  ? theme.palette.grey[700]
                  : theme.palette.grey[200],
            },
          }}
        >
          <Avatar
            sx={{
              width: 24,
              height: 24,
              mx:1
            }}
          >
            <Icon icon={selectedCurrencyData.icon} />
          </Avatar>
          {selectedCurrency}
        </Button>

        {/* Mobile-friendly Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          TransitionComponent={Fade}
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: isMobile ? '100%' : 200,
              maxWidth: isMobile ? '100%' : 300,
              bgcolor: theme.palette.background.paper,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 6px 16px rgba(0,0,0,0.4)'
                  : '0 6px 16px rgba(0,0,0,0.1)',
            },
          }}
        >
          {currencies.map((c) => (
            <MenuItem
              key={c.symbol}
              onClick={() => handleCurrencySelect(c.symbol)}
              sx={{
                py: 1,
                px:4,
                gap: 1,
                fontSize: isMobile ? '12px' : '13px',
                borderRadius: 1,
                '&:hover': {
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[100],
                },
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                }}
              >
                <Icon icon={c.icon} />
              </Avatar>
              <Box flex={1}>
                <Typography fontSize={isMobile ? '12px' : '13px'}>{c.name}</Typography>
                <Typography
                  fontSize={isMobile ? '10px' : '11px'}
                  color="text.secondary"
                  lineHeight={1.2}
                >
                  {c.symbol}
                </Typography>
              </Box>
              {c.symbol === selectedCurrency && (
                <Icon
                  icon="mdi:check-circle"
                  fontSize={18}
                  color={theme.palette.primary.main}
                />
              )}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Balance Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: isMobile ? 1.5 : 2,
          borderRadius: 2,
          bgcolor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[50],
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography color="text.secondary" fontSize={isMobile ? '11px' : '12px'}>
          Total Balance
        </Typography>
        <Typography fontSize={isMobile ? '18px' : '20px'} fontWeight={700} color="text.primary">
          {balance.toFixed(4)} {selectedCurrency}
        </Typography>
        <Typography fontSize={isMobile ? '11px' : '12px'} color="text.secondary">
          ≈ ${(balance * 1).toFixed(2)} USD
        </Typography>
      </Box>

      {/* Actions */}
      <Stack direction={isMobile ? 'column' : 'row'} spacing={1.5}>
        <Button
          onClick={handleDeposit}
          disabled={isLoading}
          fullWidth
          variant="contained"
          startIcon={<Icon icon="mdi:qrcode" />}
          sx={{
            borderRadius: 2,
            py: isMobile ? 0.8 : 1,
            fontSize: isMobile ? '12px' : '13px',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
            },
          }}
        >
          {isLoading ? 'Processing...' : 'Deposit'}
        </Button>
        <Button
          onClick={handleTransfer}
          disabled={isLoading}
          fullWidth
          variant="outlined"
          startIcon={<Icon icon="mdi:swap-horizontal" />}
          sx={{
            borderRadius: 2,
            py: isMobile ? 0.8 : 1,
            fontSize: isMobile ? '12px' : '13px',
            fontWeight: 600,
            borderWidth: 1.5,
            '&:hover': {
              borderWidth: 1.5,
            },
          }}
        >
          {isLoading ? 'Processing...' : 'Transfer'}
        </Button>
      </Stack>

      {/* Info */}
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        p={1.5}
        sx={{
          bgcolor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[50],
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Icon
          icon="mdi:information"
          color={theme.palette.primary.main}
          fontSize={18}
        />
        <Typography fontSize={isMobile ? '11px' : '12px'} flex={1}>
          Available: {balance.toFixed(4)} {selectedCurrency} — Deposit to trade.
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Box>
        <Typography
          fontSize={isMobile ? '11px' : '12px'}
          fontWeight={600}
          color="text.secondary"
          mb={1}
        >
          Quick Actions
        </Typography>
        <Stack direction={isMobile ? 'column' : 'row'} spacing={1.5}>
          {[
            { label: 'Convert', icon: 'mdi:swap-horizontal' },
            { label: 'Buy', icon: 'mdi:arrow-top-right' },
            { label: 'Sell', icon: 'mdi:arrow-bottom-left' },
          ].map((a, i) => (
            <Button
              key={i}
              variant="outlined"
              fullWidth
              startIcon={<Icon icon={a.icon} />}
              sx={{
                borderRadius: 2,
                py: isMobile ? 0.8 : 0.5,
                fontSize: isMobile ? '11px' : '12px',
                color: theme.palette.text.secondary,
                borderColor: theme.palette.divider,
                '&:hover': {
                  bgcolor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.grey[800]
                      : theme.palette.grey[100],
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                },
              }}
            >
              {a.label}
            </Button>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default SpotWallet;
