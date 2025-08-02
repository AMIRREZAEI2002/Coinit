'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
} from '@mui/material';
import { Icon } from '@iconify/react';

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
  padding: theme.spacing(4),
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
  marginTop: theme.spacing(4),
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  backdropFilter: "blur(10px)",

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: 20,
    padding: "1px",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
  },

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 12px 36px rgba(0, 0, 0, 0.08)",
  },
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
  padding: theme.spacing(1, 2),
  fontSize: '0.85rem',
  fontWeight: 500,
  height: 40,
  boxShadow: 'none',
  background: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  transition: 'transform 0.8s ease, box-shadow 0.7s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[2],
    borderColor: theme.palette.primary.main,
    background: theme.palette.primary.light,
  },
  '&.active': {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
    transform: 'scale(1.05)',
  },
}));

const CryptoCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const MarketPage = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState<MarketData[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<MarketData[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers' | 'watchlist'>('all');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [page, setPage] = useState(1); // برای صفحه‌بندی
  const [hasMore, setHasMore] = useState(true); // برای بررسی وجود داده‌های بیشتر
  const observer = useRef<IntersectionObserver | null>(null); // برای Intersection Observer

  // Load watchlist from localStorage on initial render
  useEffect(() => {
    const storedWatchlist = localStorage.getItem('cryptoWatchlist');
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cryptoWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch market data from API with pagination
  const fetchMarketData = useCallback(async (pageNum: number, reset = false) => {
    try {
      setLoading(true);

      // Using CoinGecko API with pagination (20 coins per page)
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${pageNum}&sparkline=false&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }

      const data = await response.json();

      // اگر reset=true باشد (مثلاً بعد از تغییر فیلتر یا سرچ)، لیست قبلی پاک می‌شه
      setCoins(prev => (reset ? data : [...prev, ...data]));
      setFilteredCoins(prev => (reset ? data : [...prev, ...data]));
      setLastUpdated(new Date().toLocaleTimeString());
      setHasMore(data.length === 20); // اگر کمتر از 20 آیتم برگردونده شد، یعنی داده بیشتری نیست
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch and refresh
  useEffect(() => {
    fetchMarketData(1, true); // بارگذاری اولیه صفحه اول

    // Refresh data every 60 seconds (فقط برای صفحه اول)
    const intervalId = setInterval(() => fetchMarketData(1, true), 60000);
    return () => clearInterval(intervalId);
  }, [fetchMarketData]);

  // Intersection Observer برای Infinite Scroll
  const lastCoinRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch more data when page changes
  useEffect(() => {
    if (page > 1) {
      fetchMarketData(page);
    }
  }, [page, fetchMarketData]);

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
    if (filter === 'gainers') {
      result = result
        .filter(coin => coin.price_change_percentage_24h > 0)
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    } else if (filter === 'losers') {
      result = result
        .filter(coin => coin.price_change_percentage_24h < 0)
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    } else if (filter === 'watchlist') {
      result = result.filter(coin => watchlist.includes(coin.id));
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 'bold',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Cryptocurrency Market
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
          {lastUpdated ? `Last updated: ${lastUpdated}` : 'Loading market data...'}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <StyledInput
              label="Search by name or symbol"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ 'aria-label': 'Search cryptocurrencies' }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={1} sx={{ flexWrap: 'wrap' }}>
              <Grid>
                <StyledButton
                  onClick={() => {
                    setFilter('all');
                    setPage(1);
                    fetchMarketData(1, true); // Reset data on filter change
                  }}
                  className={filter === 'all' ? 'active' : ''}
                >
                  All
                </StyledButton>
              </Grid>

              <Grid>
                <StyledButton
                  onClick={() => {
                    setFilter('gainers');
                    setPage(1);
                    fetchMarketData(1, true);
                  }}
                  className={filter === 'gainers' ? 'active' : ''}
                >
                  Top Gainers
                </StyledButton>
              </Grid>

              <Grid>
                <StyledButton
                  onClick={() => {
                    setFilter('losers');
                    setPage(1);
                    fetchMarketData(1, true);
                  }}
                  className={filter === 'losers' ? 'active' : ''}
                >
                  Top Losers
                </StyledButton>
              </Grid>

              <Grid>
                <Badge badgeContent={watchlist.length} color="primary">
                  <StyledButton
                    onClick={() => {
                      setFilter('watchlist');
                      setPage(1);
                      fetchMarketData(1, true);
                    }}
                    className={filter === 'watchlist' ? 'active' : ''}
                  >
                    Watchlist
                  </StyledButton>
                </Badge>
              </Grid>

              <Grid>
                <StyledButton onClick={() => fetchMarketData(1, true)}>
                  <Icon icon="mdi:refresh" width={16} style={{ marginRight: theme.spacing(0.5) }} />
                  Refresh
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <SectionCard>
          {loading && filteredCoins.length === 0 ? (
            <Grid container spacing={2}>
              {Array.from({ length: 12 }).map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                  <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3 }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {filteredCoins.map((coin, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  key={coin.id}
                  ref={index === filteredCoins.length - 1 ? lastCoinRef : null} // Attach observer to last coin
                >
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
                          #{index + 1}
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
                      >
                        <Icon
                          icon={watchlist.includes(coin.id) ? 'mdi:star' : 'mdi:star-outline'}
                          width={24}
                        />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <img
                        src={coin.image}
                        alt={`${coin.name} logo`}
                        width={40}
                        height={40}
                        style={{ borderRadius: '50%' }}
                      />
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                          {coin.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {coin.symbol.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body1" fontWeight={600} sx={{ fontSize: '1.25rem' }}>
                        ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={`${coin.price_change_percentage_24h >= 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%`}
                        sx={{
                          fontWeight: 600,
                          backgroundColor: coin.price_change_percentage_24h >= 0
                            ? theme.palette.success.light
                            : theme.palette.error.light,
                          color: coin.price_change_percentage_24h >= 0
                            ? theme.palette.success.dark
                            : theme.palette.error.dark,
                        }}
                        size="small"
                      />

                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          Volume
                        </Typography>
                        <Typography variant="caption">
                          {formatNumber(coin.total_volume)}
                        </Typography>
                      </Box>
                    </Box>
                  </CryptoCard>
                </Grid>
              ))}
              {loading && filteredCoins.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={`skeleton-${index}`}>
                      <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 3 }} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          )}
          {!hasMore && filteredCoins.length > 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No more coins to load.
              </Typography>
            </Box>
          )}
        </SectionCard>
      </Container>
    </Box>
  );
};

export default MarketPage;