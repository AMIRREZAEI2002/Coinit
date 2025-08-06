'use client';

import React, { useState, useEffect, useCallback} from 'react';
import {
  Grid,
  Container,
  Typography,
  TextField,
  Paper,
  Button,
  styled,
  useTheme,
  Box,
  Skeleton,
  IconButton,
  Chip,
  Badge,
  Alert,
  useMediaQuery,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';

// Type definitions
interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

// Styled Components
const SectionCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  background: `linear-gradient(45deg, ${theme.palette.background.paper} 30%, ${theme.palette.background.default} 70%)`,
  borderRadius: 20,
  padding: theme.spacing(0),
  marginTop: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  }
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: theme.palette.action.hover,
    fontSize: '0.85rem',
    height: 40,
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 20,
  padding: theme.spacing(0.5, 1.5),
  fontSize: '0.8rem',
  fontWeight: 500,
  height: 36,
  boxShadow: 'none',
  background: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  '&.active': {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1, 2),
    fontSize: '0.85rem',
    height: 40,
  }
}));

const CryptoCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
  borderRadius: 12,
  padding: theme.spacing(1.5),
  margin: theme.spacing(.1),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

const MarketPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState<MarketData[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<MarketData[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers' | 'watchlist'>('all');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  // Load watchlist from localStorage
  useEffect(() => {
    const storedWatchlist = localStorage.getItem('cryptoWatchlist');
    if (storedWatchlist) {
      try {
        setWatchlist(JSON.parse(storedWatchlist));
      } catch (e) {
        console.error('Failed to parse watchlist', e);
      }
    }
  }, []);

  // Save watchlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cryptoWatchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to save watchlist', e);
    }
  }, [watchlist]);

  // Fetch market data from API
  const fetchMarketData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch market data. Please try again later.');
      }

      const data = await response.json();
      setCoins(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch and setup refresh
  useEffect(() => {
    fetchMarketData();
    
    // Setup refresh interval
    const interval = setInterval(fetchMarketData, 60000);
    setRefreshInterval(interval);
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fetchMarketData]);

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    } else {
      const interval = setInterval(fetchMarketData, 60000);
      setRefreshInterval(interval);
    }
  };

  // Toggle watchlist
  const toggleWatchlist = (coinId: string) => {
    setWatchlist(prev =>
      prev.includes(coinId)
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...coins];

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        coin =>
          coin.name.toLowerCase().includes(searchLower) ||
          coin.symbol.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    switch (filter) {
      case 'gainers':
        result = result
          .filter(coin => coin.price_change_percentage_24h > 0)
          .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        break;
      case 'losers':
        result = result
          .filter(coin => coin.price_change_percentage_24h < 0)
          .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        break;
      case 'watchlist':
        result = result.filter(coin => watchlist.includes(coin.id));
        break;
    }

    setFilteredCoins(result);
  }, [search, filter, coins, watchlist]);

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num}`;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 2 }}>
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 'bold',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            px: 1
          }}
        >
          Cryptocurrency Market
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 3, px: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Typography variant="body2" color="text.secondary">
            {loading && coins.length > 0 
              ? 'Refreshing data...' 
              : lastUpdated 
                ? `Last updated: ${lastUpdated}` 
                : 'Loading market data...'}
          </Typography>
        </Box>

        <Grid container spacing={1} sx={{ mb: 3, px: 1 }}>
          <Grid size={{xs:12,md:6}}>
            <StyledInput
              label="Search by name or symbol"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ 'aria-label': 'Search cryptocurrencies' }}
              size="small"
            />
          </Grid>

          <Grid size={{xs:12,md:6}}>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <StyledButton
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'active' : ''}
              >
                All
              </StyledButton>

              <StyledButton
                onClick={() => setFilter('gainers')}
                className={filter === 'gainers' ? 'active' : ''}
              >
                Gainers
              </StyledButton>

              <StyledButton
                onClick={() => setFilter('losers')}
                className={filter === 'losers' ? 'active' : ''}
              >
                Losers
              </StyledButton>

              <Badge badgeContent={watchlist.length} color="primary">
                <StyledButton
                  onClick={() => setFilter('watchlist')}
                  className={filter === 'watchlist' ? 'active' : ''}
                >
                  Watchlist
                </StyledButton>
              </Badge>

              <StyledButton onClick={fetchMarketData}>
                <Icon icon="mdi:refresh" width={16} />
              </StyledButton>
              
              <StyledButton 
                onClick={toggleAutoRefresh}
                color={refreshInterval ? 'success' : 'error'}
              >
                <Icon 
                  icon={refreshInterval ? "mdi:autorenew" : "mdi:autorenew-off"} 
                  width={16} 
                />
              </StyledButton>
            </Box>
          </Grid>
        </Grid>

        <SectionCard>
          {loading && filteredCoins.length === 0 ? (
            <Grid container spacing={2}>
              {Array.from({ length: isMobile ? 4 : 8 }).map((_, index) => (
                <Grid size={{xs:12,sm:6,md:4 ,lg:3}} key={index}>
                  <Skeleton variant="rectangular" height={isMobile ? 160 : 220} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {filteredCoins.map((coin) => (
                <Grid size={{xs:12,sm:6,md:4 ,lg:3}} key={coin.id}>
                  <CryptoCard>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: theme.palette.action.hover,
                        }}
                      >
                        <Typography variant="caption" fontWeight={600}>
                          {coin.symbol}
                        </Typography>
                      </Box>

                      <IconButton
                        onClick={() => toggleWatchlist(coin.id)}
                        sx={{
                          color: watchlist.includes(coin.id)
                            ? theme.palette.warning.main
                            : theme.palette.text.secondary,
                        }}
                        aria-label={watchlist.includes(coin.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                        size="small"
                      >
                        <Icon
                          icon={watchlist.includes(coin.id) ? 'mdi:star' : 'mdi:star-outline'}
                          width={20}
                        />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Image
                        src={coin.image}
                        alt={`${coin.name} logo`}
                        width={40}
                        height={40}
                        style={{ borderRadius: '50%' }}
                        onError={(e) => (e.currentTarget.src = '/crypto-fallback.png')}
                      />
                      <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="body1" fontWeight={600} sx={{ fontSize: isMobile ? '1rem' : '1.1rem' }}>
                          {coin.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {coin.symbol.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body1" fontWeight={600} sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
                        ${coin.current_price.toLocaleString(undefined, { 
                          minimumFractionDigits: 2, 
                          maximumFractionDigits: coin.current_price < 1 ? 6 : 2 
                        })}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={`${coin.price_change_percentage_24h >= 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%`}
                        sx={{
                          fontWeight: 600,
                          fontSize: isMobile ? '0.7rem' : '0.8rem',
                          backgroundColor: coin.price_change_percentage_24h >= 0
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                          color: coin.price_change_percentage_24h >= 0
                            ? theme.palette.success.dark
                            : theme.palette.error.dark,
                        }}
                        size={isMobile ? "small" : "medium"}
                      />

                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: isMobile ? '0.65rem' : '0.75rem' }}>
                          Volume
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                          {formatNumber(coin.total_volume)}
                        </Typography>
                      </Box>
                    </Box>
                  </CryptoCard>
                </Grid>
              ))}
            </Grid>
          )}
          
          {!loading && filteredCoins.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No matching cryptocurrencies found
              </Typography>
            </Box>
          )}
        </SectionCard>
      </Container>
    </Box>
  );
};

export default MarketPage;