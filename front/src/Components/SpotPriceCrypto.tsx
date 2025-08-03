/* eslint-disable react/display-name */
  'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Grid as MuiGrid,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Collapse,
} from '@mui/material';
import { Icon } from '@iconify/react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useCryptoContext } from './CryptoContext';

// Interfaces
interface CryptoData {
  name: string;
  symbol: string;
  icon: string;
  currentPrice: number;
  change: number;
  indexPrice: number;
  fairPrice: number;
  fundingRate: string;
  timer: string;
  high24h: number;
  low24h: number;
  volume: string;
  turnover: string;
  marketCap?: number;
}

// Sample data
const cryptoData: CryptoData[] = [
  {
    name: 'Bitcoin',
    symbol: 'bitcoin', // lowercase برای سازگاری
    icon: 'cryptocurrency-color:btc',
    currentPrice: 65000.1234,
    change: 2.34,
    indexPrice: 64980.12,
    fairPrice: 65010.45,
    fundingRate: '0.01%',
    timer: '8h',
    high24h: 66000.0,
    low24h: 64000.0,
    volume: '12.5K',
    turnover: '$800M',
    marketCap: 1280000000000,
  },
  {
    name: 'Ethereum',
    symbol: 'ethereum',
    icon: 'cryptocurrency-color:eth',
    currentPrice: 3200.5678,
    change: -1.12,
    indexPrice: 3190.23,
    fairPrice: 3205.67,
    fundingRate: '0.02%',
    timer: '8h',
    high24h: 3300.0,
    low24h: 3100.0,
    volume: '15.2K',
    turnover: '$500M',
    marketCap: 384000000000,
  },
  {
    name: 'Ripple',
    symbol: 'ripple',
    icon: 'cryptocurrency-color:xrp',
    currentPrice: 0.5678,
    change: 0.45,
    indexPrice: 0.565,
    fairPrice: 0.568,
    fundingRate: '0.01%',
    timer: '8h',
    high24h: 0.58,
    low24h: 0.55,
    volume: '50.1M',
    turnover: '$28M',
    marketCap: 31000000000,
  },
];

// Styled components
const BlueLabel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '6px',
  padding: '3px 8px',
  fontSize: '11px',
  fontWeight: 600,
  marginLeft: theme.spacing(1),
  transition: 'background-color 0.3s ease',
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  padding: theme.spacing(1.5),
  '&::-webkit-scrollbar': {
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.divider,
    borderRadius: '6px',
  },
}));

// Custom Grid component
interface GridProps {
  size?: { xs?: number | string; sm?: number | string; md?: number | string; lg?: number | string };
  children: React.ReactNode;
  [key: string]: unknown;
}

const Grid: React.FC<GridProps> = ({ size, children, ...props }) => {
  return <MuiGrid {...props} {...size}>{children}</MuiGrid>;
};

// Memoized ListItem for better performance

const CryptoListItem = React.memo(
  ({
    currency,
    handleCurrencySelect,
    theme,
    isSelected,
  }: {
    currency: CryptoData;
    handleCurrencySelect: (currency: CryptoData) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theme: any;
    isSelected: boolean;
  }) => (
    <ListItem
      onClick={() => handleCurrencySelect(currency)}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        py: 1.5,
        px: 2,
        borderRadius: '12px',
        mb: 1,
        transition: 'all 0.3s ease',
        backgroundColor: isSelected ? theme.palette.action.selected : 'transparent',
        '&:hover': {
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(90deg, rgba(138, 43, 226, 0.15), rgba(0, 191, 255, 0.1))'
            : 'linear-gradient(90deg, rgba(106, 17, 203, 0.08), rgba(37, 117, 252, 0.06))',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
      role="option"
      aria-selected={isSelected}
    >
      <ListItemIcon sx={{ minWidth: 48 }}>
        <Icon
          icon={currency.icon}
          width={36}
          height={36}
          style={{
            filter: theme.palette.mode === 'dark'
              ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.2))'
              : 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.1))',
          }}
        />
      </ListItemIcon>
      <Box sx={{ ml: 2, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {currency.symbol.toUpperCase()}/USDT
          </Typography>
          <Typography
            variant="caption"
            sx={{
              ml: 1,
              background: theme.palette.mode === 'dark' ? 'rgba(0, 191, 255, 0.15)' : 'rgba(37, 117, 252, 0.1)',
              color: theme.palette.mode === 'dark' ? '#00bfff' : '#2575fc',
              px: 1,
              py: 0.2,
              borderRadius: '4px',
              fontWeight: 600,
            }}
          >
            {currency.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 0.5, alignItems: 'center' }}>
          <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.text.primary }}>
            ${currency.currentPrice.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              ml: 1.5,
              fontWeight: 600,
              color: currency.change >= 0
                ? theme.palette.mode === 'dark'
                  ? '#4ade80'
                  : '#22c55e'
                : theme.palette.mode === 'dark'
                ? '#f87171'
                : '#ef4444',
            }}
          >
            {currency.change >= 0 ? '↑' : '↓'} {Math.abs(currency.change).toFixed(2)}%
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'right', minWidth: 80 }}>
        <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, color: theme.palette.text.secondary }}>
          Vol: {currency.volume}
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, color: theme.palette.text.secondary }}>
          MCap: ${currency.marketCap ? (currency.marketCap / 1000000000).toFixed(1) + 'B' : 'N/A'}
        </Typography>
      </Box>
    </ListItem>
  )
);

const SpotPriceCrypto: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { selectedCurrency, setSelectedCurrency } = useCryptoContext();
  const [currentCryptoData, setCurrentCryptoData] = useState<CryptoData>(cryptoData[0]);
  const [isStarred, setIsStarred] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  const toggleDetails = useCallback(() => {
    if (isMobile) {
      setShowMobileDetails((prev) => !prev);
    } else {
      setShowDetails((prev) => !prev);
    }
  }, [isMobile]);

  const handleCurrencySelect = useCallback(
    (currency: CryptoData) => {
      console.log('Selected currency in SpotPriceCrypto:', currency); // لاگ برای دیباگ
      setCurrentCryptoData(currency);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setSelectedCurrency(currency); // کل داده CryptoData رو می‌فرستیم
      setDrawerOpen(false);
    },
    [setSelectedCurrency]
  );

  const toggleStar = useCallback(() => {
    setIsStarred((prev) => !prev);
  }, []);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'success.main' : 'error.main';
  };

  const formatChange = (change: number) => {
    return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  };

  const DetailItem: React.FC<{
    label: string;
    value: string;
    color?: string;
    mobile?: boolean;
  }> = ({ label, value, color, mobile = false }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          alignItems: mobile ? 'center' : 'flex-start',
          justifyContent: mobile ? 'center' : 'flex-start',
          p: mobile ? 0.5 : 0,
          transition: 'all 0.2s ease',
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mr: mobile ? 0 : 1,
            mb: mobile ? 0.5 : 0,
            textAlign: mobile ? 'center' : 'left',
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            color: color || 'inherit',
            textAlign: mobile ? 'center' : 'left',
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: { xs: 0, md: 2 },
        boxShadow: theme.shadows[2],
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[4],
        },
      }}
    >
      {/* Desktop View */}
      {!isMobile ? (
        <Box>
          <Grid container justifyContent="space-between" alignItems="center" spacing={1} sx={{ py: 1.5, px: 1 }}>
            <Grid size={{ xs: 3 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton size="small" onClick={toggleStar} aria-label="Toggle favorite">
                  <Icon
                    icon={isStarred ? 'mdi:star' : 'mdi:star-outline'}
                    width={20}
                    height={20}
                    style={{ color: isStarred ? theme.palette.warning.main : theme.palette.text.secondary }}
                  />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={toggleDrawer}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 1,
                    p: 0.75,
                    '&:hover': {
                      backgroundColor: theme.palette.action.selected,
                    },
                  }}
                  aria-label="Select currency"
                >
                  <Icon icon={selectedCurrency.icon} width={24} height={24} />
                  <Box ml={1}>
                    <Typography variant="body1" fontWeight="bold">
                      {selectedCurrency.symbol.toUpperCase()}/USDT
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Perpetual
                      </Typography>
                      <BlueLabel>500x</BlueLabel>
                    </Box>
                  </Box>
                  <Icon icon="mdi:chevron-down" width={14} height={14} />
                </IconButton>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color={getChangeColor(currentCryptoData.change)}
                sx={{ textAlign: 'center' }}
              >
                ${currentCryptoData.currentPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Grid>
            <Grid size={{ xs: 3 }} sx={{ textAlign: 'right' }}>
              <IconButton
                size="small"
                onClick={toggleDetails}
                sx={{
                  borderRadius: 50,
                  backgroundColor: showDetails ? theme.palette.action.selected : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.action.selectedOpacity,
                  },
                }}
                aria-label="Toggle details"
              >
                {showDetails ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
              </IconButton>
            </Grid>
          </Grid>
          <Collapse in={showDetails} timeout="auto" unmountOnExit>
            <Box
              sx={{
                backgroundColor: theme.palette.background.default,
                py: 1.5,
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              <ScrollContainer>
                <Box display="flex" justifyContent="space-around" width="100%" alignItems="center" gap={2}>
                  <DetailItem
                    label="Change:"
                    value={formatChange(currentCryptoData.change)}
                    color={getChangeColor(currentCryptoData.change)}
                  />
                  <DetailItem
                    label="Idx:"
                    value={currentCryptoData.indexPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  />
                  <DetailItem
                    label="Fair:"
                    value={currentCryptoData.fairPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  />
                  <DetailItem
                    label="Fund/Time:"
                    value={`${currentCryptoData.fundingRate}/${currentCryptoData.timer}`}
                  />
                  <DetailItem
                    label="24h H/L:"
                    value={`${currentCryptoData.high24h.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}/${currentCryptoData.low24h.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  />
                  <DetailItem label="Vol:" value={currentCryptoData.volume} />
                  <DetailItem label="Turn:" value={currentCryptoData.turnover} />
                </Box>
              </ScrollContainer>
            </Box>
          </Collapse>
        </Box>
      ) : (
        <Box sx={{ p: 1 }}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
            <Grid size={{ xs: 4 }}>
              <Box
                sx={{
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 2,
                  m: 0.5,
                }}
              >
                <IconButton
                  onClick={toggleDrawer}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 0.75,
                    px: 1,
                    borderRadius: 2,
                  }}
                  aria-label="Select currency"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Icon icon={selectedCurrency.icon} width={20} height={20} />
                    <Typography variant="body2" fontWeight="bold">
                      {selectedCurrency.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                  <Icon icon="mdi:chevron-down" width={14} height={14} />
                </IconButton>
              </Box>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color={getChangeColor(currentCryptoData.change)}
                textAlign="center"
                my={1}
              >
                ${currentCryptoData.currentPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Grid>
            <Grid size={{ xs: 4 }} sx={{ textAlign: 'right' }}>
              <IconButton
                size="small"
                onClick={toggleDetails}
                sx={{
                  borderRadius: 50,
                  backgroundColor: showMobileDetails ? theme.palette.action.selected : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.action.selectedOpacity,
                  },
                }}
                aria-label="Toggle details"
              >
                {showMobileDetails ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
              </IconButton>
            </Grid>
          </Grid>
          <Collapse in={showMobileDetails} timeout="auto" unmountOnExit>
            <Box
              sx={{
                backgroundColor: theme.palette.background.default,
                borderRadius: 2,
                p: 1.5,
                mt: 1,
                boxShadow: theme.shadows[1],
              }}
            >
              <MuiGrid container spacing={1.5}>
                <Grid size={{ xs: 6 }}>
                  <DetailItem
                    label="Change"
                    value={formatChange(currentCryptoData.change)}
                    color={getChangeColor(currentCryptoData.change)}
                    mobile
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <DetailItem
                    label="Fair"
                    value={currentCryptoData.fairPrice.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    mobile
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <DetailItem
                    label="Fund/Time"
                    value={`${currentCryptoData.fundingRate}/${currentCryptoData.timer}`}
                    mobile
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <DetailItem
                    label="24h H/L"
                    value={`${currentCryptoData.high24h.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}/${currentCryptoData.low24h.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                    mobile
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <DetailItem label="Vol" value={currentCryptoData.volume} mobile />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <DetailItem label="Turn" value={currentCryptoData.turnover} mobile />
                </Grid>
              </MuiGrid>
            </Box>
          </Collapse>
        </Box>
      )}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: { xs: '80vw', md: 400 },
            borderRadius: '0 16px 16px 0',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(145deg, #1a1d2b, #2a3147)'
              : 'linear-gradient(145deg, #f0f4ff, #ffffff)',
            borderRight: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #8a2be2, #00bfff)'
                : 'linear-gradient(90deg, #6a11cb, #2575fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Select Token
          </Typography>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              },
            }}
            aria-label="Close drawer"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider
          sx={{
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
            mx: 2,
          }}
        />
        <List
          sx={{
            p: 2,
            maxHeight: '80vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.divider,
              borderRadius: '6px',
            },
          }}
        >
          {cryptoData.map((currency) => (
            <CryptoListItem
              key={currency.symbol}
              currency={currency}
              handleCurrencySelect={handleCurrencySelect}
              theme={theme}
              isSelected={currency.symbol === selectedCurrency.symbol}
            />
          ))}
        </List>
        <Box
          sx={{
            p: 2,
            textAlign: 'center',
            background: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.03)',
            borderTop: theme.palette.mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, opacity: 0.7 }}>
            {cryptoData.length} cryptocurrencies listed • Updated just now
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SpotPriceCrypto;