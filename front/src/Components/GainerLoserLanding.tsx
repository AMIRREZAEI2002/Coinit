'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tooltip,
  styled,
  CircularProgress,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  performance: number;
  marketCap: number;
  image: string;
}

// Styled Components
const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default, // Softer light background, fallback for light mode
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.08)', // Softer shadow
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.grey[900] || '#1e2526', // Dark mode background
  }),
}));

const CryptoCard = styled(motion(Box))(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Softer, non-bright background
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.06)', // Subtle shadow
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.09)', // Slightly stronger hover shadow
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
  },
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.grey[900] || '#1e2526', // Dark mode background
  }),
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  color: theme.palette.grey[600] || theme.palette.text.secondary, // Darker secondary text
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up('md')]: {
    marginBottom: 0,
  },
}));

const CryptoInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const CryptoIcon = styled(Icon)(({ theme }) => ({
  width: '24px',
  height: '24px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const CryptoName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: '0.85rem',
  color: theme.palette.text.primary,
}));

const CryptoSymbol = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.grey[600] || theme.palette.text.secondary,
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: '1.8rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.grey[600] || theme.palette.text.secondary,
}));

const TableTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: '1.2rem',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

const ProgressBarContainer = styled('div')(({ theme }) => ({
  width: 80,
  height: 5,
  backgroundColor: theme.palette.grey[300] || theme.palette.divider, // Slightly darker divider
  borderRadius: 2,
  position: 'relative',
  overflow: 'hidden',
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: theme.palette.grey[800] || '#3f4b4c',
  }),
}));

const GainProgressBar = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.primary.main, // Align with WalletFundingSectionDeposit
  borderRadius: 2,
}));

const LossProgressBar = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.error.main,
  borderRadius: 2,
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: 'center',
  margin: theme.spacing(2),
}));

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

// Iconify icon mapping for common cryptocurrencies
const iconMap: { [key: string]: string } = {
  bitcoin: 'cryptocurrency-color:btc',
  ethereum: 'cryptocurrency-color:eth',
  solana: 'cryptocurrency-color:sol',
  ripple: 'cryptocurrency-color:xrp',
  cardano: 'cryptocurrency-color:ada',
  dogecoin: 'cryptocurrency-color:doge',
  binancecoin: 'cryptocurrency-color:bnb',
  polkadot: 'cryptocurrency-color:dot',
  chainlink: 'cryptocurrency-color:link',
  // Add more mappings as needed
};

const GainerLoserLanding = () => {
  const [gainers, setGainers] = useState<CryptoData[]>([]);
  const [losers, setLosers] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: false,
              price_change_percentage: '7d',
            },
          }
        );

        const data: CryptoData[] = response.data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          performance: coin.price_change_percentage_7d_in_currency,
          marketCap: coin.market_cap,
          image: `cryptocurrency-color:${coin.symbol.toLowerCase()}`,
        }));

        // Sort and select top 3 gainers and losers
        const sortedData = data.sort(
          (a, b) => (b.performance || 0) - (a.performance || 0)
        );
        setGainers(sortedData.slice(0, 3));
        setLosers(sortedData.slice(-3).reverse());
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <SectionCard>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      </SectionCard>
    );
  }

  if (error) {
    return (
      <SectionCard>
        <ErrorMessage>{error}</ErrorMessage>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center' }}>
          <HeaderTitle variant="h5">Top Cryptocurrency Movers</HeaderTitle>
          <HeaderSubtitle variant="body2">
            View the biggest gainers and losers in the crypto market over the past 7 days
          </HeaderSubtitle>
        </Box>
        <Grid container spacing={3}>
        {/* Gainers */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TableTitle>Gainers</TableTitle>
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            {gainers.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                aria-label={`Gainer ${crypto.name}`}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                  <FieldLabel>Name</FieldLabel>
                  <CryptoInfo>
                    <Tooltip title={crypto.name}>
                      <CryptoIcon
                        icon={iconMap[crypto.id] || 'cryptocurrency-color:generic'}
                        width="24"
                        height="24"
                      />
                    </Tooltip>
                    <Box>
                      <CryptoName>{crypto.name}</CryptoName>
                      <CryptoSymbol>{crypto.symbol}</CryptoSymbol>
                    </Box>
                  </CryptoInfo>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
                  <FieldLabel>Price</FieldLabel>
                  <Typography variant="body2" fontSize="0.85rem">
                    ${crypto.price.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 100 }}>
                  <FieldLabel>7D Performance</FieldLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" fontSize="0.7rem">
                      +{crypto.performance.toFixed(2)}%
                    </Typography>
                    <Tooltip title={`+${crypto.performance.toFixed(2)}%`}>
                      <ProgressBarContainer>
                        <GainProgressBar style={{ width: `${Math.min(Math.abs(crypto.performance), 100)}%` }} />
                      </ProgressBarContainer>
                    </Tooltip>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                  <FieldLabel>Market Cap</FieldLabel>
                  <Typography variant="body2" fontSize="0.85rem">
                    ${crypto.marketCap.toLocaleString()}
                  </Typography>
                </Box>
              </CryptoCard>
            ))}
          </Box>
        </Grid>

        {/* Losers */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TableTitle>Losers</TableTitle>
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            {losers.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                aria-label={`Loser ${crypto.name}`}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                  <FieldLabel>Name</FieldLabel>
                  <CryptoInfo>
                    <Tooltip title={crypto.name}>
                      <CryptoIcon
                        icon={iconMap[crypto.id] || 'cryptocurrency-color:generic'}
                        width="24"
                        height="24"
                      />
                    </Tooltip>
                    <Box>
                      <CryptoName>{crypto.name}</CryptoName>
                      <CryptoSymbol>{crypto.symbol}</CryptoSymbol>
                    </Box>
                  </CryptoInfo>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
                  <FieldLabel>Price</FieldLabel>
                  <Typography variant="body2" fontSize="0.85rem">
                    ${crypto.price.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 100 }}>
                  <FieldLabel>7D Performance</FieldLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" fontSize="0.7rem">
                      {crypto.performance.toFixed(2)}%
                    </Typography>
                    <Tooltip title={`${crypto.performance.toFixed(2)}%`}>
                      <ProgressBarContainer>
                        <LossProgressBar style={{ width: `${Math.min(Math.abs(crypto.performance), 100)}%` }} />
                      </ProgressBarContainer>
                    </Tooltip>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                  <FieldLabel>Market Cap</FieldLabel>
                  <Typography variant="body2" fontSize="0.85rem">
                    ${crypto.marketCap.toLocaleString()}
                  </Typography>
                </Box>
              </CryptoCard>
            ))}
          </Box>
        </Grid>
        </Grid>
      </Box>
    </SectionCard>
  );
};

export default GainerLoserLanding;