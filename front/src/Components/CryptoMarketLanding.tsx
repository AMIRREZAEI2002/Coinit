'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { Icon } from '@iconify/react';
import axios from 'axios';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

const useMarketData = (vsCurrency = 'usd', perPage = 6) => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Coin[]>(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: vsCurrency,
              order: 'market_cap_desc',
              per_page: perPage,
              page: 1,
              sparkline: false,
            },
          }
        );
        setData(res.data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [vsCurrency, perPage]);

  return { data, loading, error };
};

const quickAccessButtons = [
  { title: 'Quick access', bgColor: '#2563eb', icon: 'mdi:key', href: '#' },
  { title: 'My Profile', bgColor: '#1e40af', icon: 'mdi:account', href: '/panel/profile' },
  { title: 'Return To Spot', bgColor: '#2563eb', icon: 'mdi:swap-horizontal', href: '/header/spot' },
  { title: 'Deposit', bgColor: '#1e40af', icon: 'mdi:bank', href: '/deposit' },
  { title: 'Go To wallet', bgColor: '#2563eb', icon: 'mdi:wallet-outline', href: '/wallet' },
  { title: 'Future Trading', bgColor: '#1e40af', icon: 'mdi:trending-up', href: '/header/future' },
];

const CryptoMarketLanding = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const { data: coins, loading, error } = useMarketData('usd', 6);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    widgetRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": "COINBASE:BTCUSD",
      "interval": "60",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "hide_legend": false
    });
    widgetRef.current.appendChild(script);
  }, []);

  const renderCoinList = (showRank = false) => (
    <Box>
      {coins.map((c) => (
        <Box
          key={c.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1.5,
            p: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={c.image} alt={c.symbol} style={{ width: 34, height: 34 }} />
            <Typography variant="body2" fontWeight={600}>
              {c.name} ({c.symbol.toUpperCase()})
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            {showRank ? (
              <Typography variant="body2">#{c.market_cap_rank}</Typography>
            ) : (
              <>
                <Typography variant="body2">
                  ${c.current_price.toLocaleString()}
                </Typography>
                <Typography
                  variant="caption"
                  color={c.price_change_percentage_24h >= 0 ? 'success.main' : 'error.main'}
                >
                  {c.price_change_percentage_24h.toFixed(2)}%
                </Typography>
              </>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );

  const renderQuickAccessButtons = (fullWidth: boolean) => (
    <Box
      sx={{
        bgcolor: 'rgba(0, 0, 0, 0.08)',
        borderRadius: 1,
        p: 1,
        display: 'flex',
        flexDirection: fullWidth ? 'column' : 'row',
        flexWrap: fullWidth ? 'nowrap' : 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: fullWidth ? '100%' : 'auto',
      }}
    >
      {quickAccessButtons.map((button, idx) => (
        <Button
          key={idx}
          href={button.href}
          sx={{
            width: fullWidth ? '90%' : '45%',
            bgcolor: button.bgColor,
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            borderRadius: '20px',
            textTransform: 'none',
            '&:hover': { bgcolor: `${button.bgColor}CC` },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
            }}
          >
            <span>{button.title}</span>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: '20px',
                ml: 1,
                display: 'flex',
                alignItems: 'center',
                p: '8px'
              }}
            >
              <Icon icon={button.icon} color="black" fontSize={25} />
            </Box>
          </Box>
        </Button>
      ))}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ p: 3, pb: 1 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
          Crypto Market Insights and Analytics
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', pl: 0.5 }}>
          Top Cryptocurrencies Price List by Market Capitalization.
        </Typography>
      </Box>

      <Grid container spacing={2}>

        {!isLargeScreen && (
          <Grid size={{xs: 12}}>
            {renderQuickAccessButtons(false)}
          </Grid>
        )}

        <Grid size={{xs: 12 ,md: 6, lg: 4}}>
          <Box sx={{ p: 2 }}>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && renderCoinList(false)}
          </Box>
        </Grid>

        <Grid size={{xs: 12 ,md: 6, lg: 4}}>
          <Box
            ref={widgetRef}
            sx={{
              height: 400,
              width: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[1],
              bgcolor: 'background.paper',
            }}
          />
        </Grid>

        {isLargeScreen && (
          <Grid size={{xs: 12 ,md: 6, lg: 4}}>
            {renderQuickAccessButtons(true)}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CryptoMarketLanding;
