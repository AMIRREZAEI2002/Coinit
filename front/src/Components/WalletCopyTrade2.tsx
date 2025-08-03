'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputAdornment,
  Paper,
  useTheme,
  styled,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CopyTradeRow {
  id: number;
  strategyName: string;
  totalAsset: number;
  roi: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  followers: number;
  currency: string;
}

const rows: CopyTradeRow[] = [
  { id: 1, strategyName: 'ZKL Scalping', totalAsset: 15234.56, roi: '+12.5%', riskLevel: 'Medium', followers: 245, currency: 'zkl' },
  { id: 2, strategyName: 'BTC HODL', totalAsset: 8756.23, roi: '+8.2%', riskLevel: 'Low', followers: 128, currency: 'btc' },
  { id: 3, strategyName: 'ETH Swing', totalAsset: 23456.78, roi: '-2.3%', riskLevel: 'High', followers: 89, currency: 'eth' },
  { id: 4, strategyName: 'SOL Arbitrage', totalAsset: 9876.45, roi: '+15.7%', riskLevel: 'Medium', followers: 310, currency: 'sol' },
  { id: 5, strategyName: 'ADA Trend', totalAsset: 4567.89, roi: '+5.4%', riskLevel: 'Low', followers: 67, currency: 'ada' },
];

const currencyIcons: Record<string, string> = {
  zkl: 'mdi:currency-usd',
  btc: 'cryptocurrency-color:btc',
  eth: 'cryptocurrency-color:eth',
  sol: 'mdi:currency-usd',
  ada: 'mdi:currency-usd',
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

// Styled Components
const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
  marginTop: theme.spacing(3),
  overflow: 'hidden',
}));

const AssetCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.paper} 100%)`,
  },
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const WalletCopyTrade2: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [hideSmallBalances, setHideSmallBalances] = useState<boolean>(false);
  const theme = useTheme();

  const filteredRows: CopyTradeRow[] = useMemo(
    () =>
      rows.filter((row) => {
        const matchesSearch = row.strategyName.toLowerCase().includes(searchText.toLowerCase());
        const matchesBalance = hideSmallBalances ? row.totalAsset >= 1000 : true;
        return matchesSearch && matchesBalance;
      }),
    [searchText, hideSmallBalances]
  );

  return (
    <SectionCard>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Copy Trading Strategies
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search strategies..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 200 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 50,
                backgroundColor: theme.palette.action.hover,
                paddingLeft: 1,
                fontSize: '0.85rem',
                height: 32,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:magnify" fontSize={14} color="#85919f" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={hideSmallBalances}
                  onChange={(e) => setHideSmallBalances(e.target.checked)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  Hide small balances
                </Typography>
              }
              sx={{ mr: 0.5 }}
            />
            <Button
              component={motion.button}
              whileHover={{ scale: 1.08 }}
              variant="text"
              sx={{ minWidth: 'auto', p: 0 }}
              aria-label="Info"
            >
              <Icon icon="mdi:information-outline" fontSize={16} color="#85919f" />
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
        }}
      >
        {filteredRows.length > 0 ? (
          filteredRows.map((row) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <motion.div key={row.id} variants={cardVariants} initial="hidden" animate="visible">
              <AssetCard>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Icon
                    icon={currencyIcons[row.currency] || 'mdi:currency-usd'}
                    width={24}
                    height={24}
                    style={{ marginRight: theme.spacing(2) }}
                  />
                  <Typography variant="h6" fontWeight={600}>
                    {row.strategyName}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 1,
                    flexGrow: 1,
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Total Asset
                    </Typography>
                    <Typography fontWeight={600}>
                      ${row.totalAsset.toFixed(2)} <small style={{ color: theme.palette.text.secondary }}>USDT</small>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      ROI (30 Days)
                    </Typography>
                    <Typography color={row.roi.startsWith('+') ? 'success.main' : 'error.main'}>
                      {row.roi} {row.roi.startsWith('+') ? '▲' : '▼'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Risk Level
                    </Typography>
                    <Typography
                      color={
                        row.riskLevel === 'Low'
                          ? 'success.main'
                          : row.riskLevel === 'Medium'
                          ? 'warning.main'
                          : 'error.main'
                      }
                    >
                      {row.riskLevel}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Followers
                    </Typography>
                    <Typography fontWeight={600}>{row.followers}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Link href={`/copy-trade/${row.id}`} passHref>
                    <Button
                      component={motion.button}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      variant="contained"
                      color="primary"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 20,
                        padding: theme.spacing(0.5, 1.5),
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        width: 80,
                        height: 30,
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: theme.shadows[2],
                        },
                      }}
                    >
                      Copy
                    </Button>
                  </Link>
                </Box>
              </AssetCard>
            </motion.div>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 4 }}>
            No strategies found
          </Typography>
        )}
      </Box>
    </SectionCard>
  );
};

export default WalletCopyTrade2;