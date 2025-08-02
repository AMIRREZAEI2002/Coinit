'use client';

import React, { useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

// تایپ برای داده‌های والت
interface WalletData {
  balance: number;
  currency: string;
  equivalent: number;
  equivalentCurrency: string;
  pnl: string;
}

// تایپ برای تنظیمات دکمه
interface ButtonConfig {
  label: string;
  href: string;
  variant: 'contained' | 'outlined';
  icon?: string;
  disabled?: boolean;
  paths: string[];
}

// تنظیمات دکمه‌ها
const buttons: ButtonConfig[] = [
  { label: 'Deposit', href: '/Deposit', variant: 'contained', icon: 'mdi:chevron-down', paths: ['/Wallet/Overview', '/Wallet/Spot'] },
  { label: 'Buy', href: '/Spot', variant: 'contained', paths: ['/Wallet/Fiat'] },
  { label: 'Sell', href: '/Spot', variant: 'outlined', paths: ['/Wallet/Fiat'] },
  { label: 'Transfer', href: '/Working', variant: 'outlined', paths: ['/Wallet/Overview', '/Wallet/Fiat', '/Wallet/Spot'] },
  { label: 'Spot Statement', href: '/Spot', variant: 'outlined', paths: ['/Wallet/Overview','/Wallet/Spot'] },
  { label: 'Withdraw', href: '/panel/WithdrawalAddresses', variant: 'outlined', paths: ['/Wallet/Spot'] },
  { label: '...', href: '#', variant: 'outlined', disabled: true, paths: ['/Wallet/Overview','/Wallet/Spot'] },
  { label: 'Futures Trading Fees', href: '/panel/TradingFees', variant: 'contained', paths: ['/Wallet/Futures'] },
  { label: 'Futures Statement', href: '/Working', variant: 'outlined', paths: ['/Wallet/Futures'] },
  { label: 'Receive', href: '/Working', variant: 'contained', icon: 'mdi:chevron-down', paths: ['/Wallet/DEX'] },
  { label: 'Copy Trade', href: '/Wallet/CopyTrading', variant: 'contained', paths: ['/Wallet/CopyTrading'] },
  { label: 'Funding History', href: '/Wallet/FundingHistory', variant: 'outlined', paths: ['/Wallet/Futures', '/Wallet/DEX', '/Wallet/CopyTrading'] },
  { label: 'Send', href: '/Working', variant: 'outlined', paths: ['/Wallet/DEX'] },
];

// مسیرهایی که شبکه‌ها نمایش داده می‌شوند
const networkSelectPaths = ['/Wallet/Dex'];

// کامپوننت مشترک
const WalletHeader: React.FC = () => {
  const pathname = usePathname();

  // دیباگ pathname و دکمه‌ها
  useEffect(() => {
    console.log('Current pathname:', pathname);
    console.log('Available buttons:', buttons.filter((button) => button.paths.includes(pathname || '')));
  }, [pathname]);

  // داده‌های نمونه (قابل تغییر با API)
  const [data, setData] = React.useState<WalletData>({
    balance: 6.73,
    currency: 'USDT',
    equivalent: 6.73,
    equivalentCurrency: 'USDT',
    pnl: '0.00 USD (0.00%)',
  });

  // شبکه انتخاب‌شده (برای Dex)
  const [network, setNetwork] = React.useState<string>('AllNetworks');

  // فیلتر دکمه‌های مرتبط با مسیر فعلی (case-sensitive)
  const currentButtons = useMemo(
    () => buttons.filter((button) => button.paths.includes(pathname || '')),
    [pathname]
  );

  // آیا شبکه‌ها نمایش داده شوند؟
  const showNetworkSelect = useMemo(() => networkSelectPaths.includes(pathname || ''), [pathname]);

  const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
    setData({ ...data, currency: event.target.value });
  };

  const handleEquivalentCurrencyChange = (event: SelectChangeEvent<string>) => {
    setData({ ...data, equivalentCurrency: event.target.value });
  };

  const handleNetworkChange = (event: SelectChangeEvent<string>) => {
    setNetwork(event.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 3,
        p: 3,
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        {/* بخش سمت چپ */}
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          {/* خط اول: شبکه‌ها (فقط برای Dex) */}
          {showNetworkSelect && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
                fontSize: '0.75rem',
                mb: 1,
              }}
            >
              <Select
                value={network}
                onChange={handleNetworkChange}
                size="small"
                variant="standard"
                sx={{
                  ml: 1,
                  '&:before': { display: 'none' },
                  '&:after': { display: 'none' },
                  '& .MuiSelect-select': {
                    padding: 0,
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                  },
                }}
              >
                <MenuItem value="AllNetworks">
                  All Networks{' '}
                  <Icon
                    icon="mdi:eye"
                    color="text.primary"
                    fontSize={15}
                    style={{ transform: 'translate(0,2px)', padding: 1 }}
                  />
                </MenuItem>
                <MenuItem value="Ethereum">Ethereum</MenuItem>
                <MenuItem value="Binance">Binance Smart Chain</MenuItem>
              </Select>
            </Box>
          )}

          {/* خط دوم: Estimated Balance و آیکون چشم */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              fontSize: '0.75rem',
            }}
          >
            <Link href="#" style={{textDecoration: 'none',color: 'inherit' }} passHref>
              <Typography
                variant="body2"
                sx={{
                  alignContent: 'center',
                  color: 'text.secondary',
                  cursor: 'pointer',
                  mr: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Estimated Balance
                <Icon icon="mdi:eye" color="text.primary" fontSize={10} style={{ marginLeft: 4 }} />
              </Typography>
            </Link>
          </Box>

          {/* خط سوم: مقدار بالانس و انتخاب واحد */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              {data.balance.toFixed(2)}
            </Typography>
            <Select
              value={data.currency}
              onChange={handleCurrencyChange}
              size="small"
              variant="standard"
              sx={{
                ml: 1,
                '&:before': { display: 'none' },
                '&:after': { display: 'none' },
                '& .MuiSelect-select': {
                  padding: 0,
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                },
              }}
            >
              <MenuItem value="USDT">USDT</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="BTC">BTC</MenuItem>
            </Select>
          </Box>

          {/* خط چهارم: معادل و انتخاب واحد */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.secondary',
              fontSize: '0.75rem',
              mt: 0.5,
            }}
          >
            <Typography variant="body2" component="div" sx={{ zIndex: 2 }}>
              = {data.equivalent.toFixed(2)}
            </Typography>
            <Select
              value={data.equivalentCurrency}
              onChange={handleEquivalentCurrencyChange}
              size="small"
              variant="standard"
              sx={{
                ml: 0.5,
                '&:before': { display: 'none' },
                '&:after': { display: 'none' },
                '& .MuiSelect-select': {
                  padding: 0,
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                },
              }}
            >
              <MenuItem value="USDT">USDT</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="BTC">BTC</MenuItem>
            </Select>
          </Box>

          {/* خط پنجم: Today's PNL */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              Today&apos;s PNL:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.875rem', ml: 1 }}>
              {data.pnl}
            </Typography>
          </Box>
        </Box>

        {/* بخش سمت راست: دکمه‌ها */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            width: { xs: '100%', md: 'auto' },
            mt: { xs: 2, md: 0 },
            gap: { xs: 1, sm: 1, md: 1 },
          }}
        >
          {currentButtons.length > 0 ? (
            currentButtons.map((button, index) => (
              <Link key={index} href={button.href} style={{color: 'inherit', textDecoration: 'none'}} passHref>
                <Button
                  fullWidth
                  variant={button.variant}
                  color="primary"
                  disabled={button.disabled}
                  sx={{
                    borderRadius: 20,
                    textTransform: 'none',
                    fontSize: '0.75rem',
                    textWrap: 'nowrap',
                    py: 0.5,
                    px: 2,
                    mb: { xs: 0, sm: 0, md: 0 },
                    minWidth: 80,
                    height: 30,
                    opacity: button.disabled ? 0.3 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: button.variant === 'contained' ? 'none' : undefined,
                    '&:hover': {
                      boxShadow: button.variant === 'contained' ? '0px 2px 8px rgba(0, 0, 0, 0.1)' : undefined,
                    },
                  }}
                >
                  {button.label}
                  {button.icon && (
                    <Icon icon={button.icon} fontSize={12} style={{ marginLeft: 4 }} />
                  )}
                </Button>
              </Link>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No actions available for {pathname}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WalletHeader;