'use client';
import { Box, Typography, Paper, Tooltip, Grid, styled } from '@mui/material';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  performance: number;
  marketCap: number;
}

const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.08)',
  marginTop: theme.spacing(3),
}));

const CryptoCard = styled(motion(Box))(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  transition: 'transform 0.2s ease',
  '&:hover': { transform: 'scale(1.02)' },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.5, ease: "easeOut" as any },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.3, ease: "easeInOut" as any },
  },
};
// تابع کمک‌کننده برای آیکون با fallback
const getIconName = (symbol: string) => {
  const formatted = symbol.toLowerCase();
  // سعی می‌کنیم آیکون مخصوص هر توکن
  return `token-branded:${formatted}`;
};

// اگر Iconify نتونه آیکون رو نشون بده، ما یه آیکون ساده نمایش می‌دیم (CSS کلاس داره که دیده بشه)
const FallbackIcon = 'cryptocurrency-color:btc';

export default function ClientGainerLoser({ gainers, losers }: { gainers: CryptoData[]; losers: CryptoData[] }) {
  const renderIcon = (symbol: string) => {
    const iconName = getIconName(symbol);
    return (
      <Icon
        icon={iconName}
        width={30}
        height={30}
        style={{borderRadius: 100}}
        onError={(e) => {
          // اگر آیکون پیدا نشد fallback بده
          (e.target as HTMLElement).setAttribute('data-icon', FallbackIcon);
        }}
      />
    );
  };

  return (
    <SectionCard>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Top Cryptocurrency Movers</Typography>
        <Typography variant="body2" color="text.secondary">
          View the biggest gainers and losers in the last 7 days
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{xs:12,md:6}}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Gainers</Typography>
          {gainers.map((c) => (
            <CryptoCard key={c.id} variants={cardVariants} initial="hidden" animate="visible">
              <Tooltip title={c.name}>{renderIcon(c.symbol)}</Tooltip>
              <Typography>{c.name}</Typography>
              <Typography>${c.price.toFixed(8)}</Typography>
              <Typography color="success.main">+{c.performance.toFixed(4)}%</Typography>
            </CryptoCard>
          ))}
        </Grid>

        <Grid size={{xs:12,md:6}}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Losers</Typography>
          {losers.map((c) => (
            <CryptoCard key={c.id} variants={cardVariants} initial="hidden" animate="visible">
              <Tooltip title={c.name}>{renderIcon(c.symbol)}</Tooltip>
              <Typography>{c.name}</Typography>
              <Typography>${c.price.toFixed(8)}</Typography>
              <Typography color="error.main">{c.performance.toFixed(4)}%</Typography>
            </CryptoCard>
          ))}
        </Grid>
      </Grid>
    </SectionCard>
  );
}
