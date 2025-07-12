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
    async function fetch() {
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
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [vsCurrency, perPage]);

  return { data, loading, error };
};

const CryptoMarketLanding = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const { data: coins, loading, error } = useMarketData('usd', 6);

  const quickAccessButtons = [
    { title: 'Quick access', bgColor: '#2563eb', icon: 'mdi:key', href: '#' },
    { title: 'My Profile', bgColor: '#1e40af', icon: 'mdi:account', href: '/panel/profile' },
    { title: 'Return To Spot', bgColor: '#2563eb', icon: 'mdi:swap-horizontal', href: '/header/spot' },
    { title: 'Deposit', bgColor: '#1e40af', icon: 'mdi:bank', href: '/deposit' },
    { title: 'Go To wallet', bgColor: '#2563eb', icon: 'mdi:wallet', href: '/wallet' },
    { title: 'Future Trading', bgColor: '#1e40af', icon: 'mdi:trending-up', href: '/header/future' },
  ];

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
        {/* Quick Access Buttons */}
        {!isLargeScreen && (
          <Grid size={{xs:12}}>
            <Box
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                p: 2,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              {quickAccessButtons.map((button, idx) => (
                <Button
                  key={idx}
                  href={button.href}
                  sx={{
                    width: '45%',
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
                      width: '100%',
                    }}
                  >
                    <span>{button.title}</span>
                    <Box
                      sx={{
                        bgcolor: 'white',
                        borderRadius: '20px',
                        p: '8px',
                        ml: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Icon icon={button.icon} fontSize={20} />
                    </Box>
                  </Box>
                </Button>
              ))}
            </Box>
          </Grid>
        )}

        {/* Market Data */}
        <Grid size={{xs:12, md: 6, lg: 4}}>
          <Box sx={{ p: 2 }}>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {!loading && !error && (
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
                      <img src={c.image} alt={c.symbol} style={{ width: 24, height: 24 }} />
                      <Typography variant="body2" fontWeight={600}>
                        {c.name} ({c.symbol.toUpperCase()})
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2">${c.current_price.toLocaleString()}</Typography>
                      <Typography
                        variant="caption"
                        color={c.price_change_percentage_24h >= 0 ? 'success.main' : 'error.main'}
                      >
                        {c.price_change_percentage_24h.toFixed(2)}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        <Grid size={{xs:12, md: 6, lg: 4}}>
          <Box sx={{ p: 2 }}>
            {loading && <CircularProgress />}
            {!loading && !error && (
              <Box>
                {/* e.g., show top 6 again, or other data */}
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
                      <img src={c.image} alt={c.symbol} style={{ width: 24, height: 24 }} />
                      <Typography variant="body2" fontWeight={600}>
                        {c.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2">${c.market_cap_rank}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        {/* Quick Access for large screens */}
        {isLargeScreen && (
          <Grid size={{xs:12, md: 6, lg: 4}}>
            <Box
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              {quickAccessButtons.map((button, idx) => (
                <Button
                  key={idx}
                  href={button.href}
                  sx={{
                    width: '90%',
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
                      width: '100%',
                    }}
                  >
                    <span>{button.title}</span>
                    <Box
                      sx={{
                        bgcolor: 'white',
                        borderRadius: '20px',
                        p: '8px',
                        ml: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Icon icon={button.icon} fontSize={20} />
                    </Box>
                  </Box>
                </Button>
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CryptoMarketLanding;
