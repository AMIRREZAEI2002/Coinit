export const dynamic = 'force-dynamic';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import TradingViewWidget from './TradingViewWidget';
import Image from 'next/image';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

async function getMarketData(vsCurrency = 'usd', perPage = 6): Promise<Coin[]> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false`,
  );
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

const quickAccessButtons = [
  { title: 'Home', bgColor: '#49d84e', icon: 'mdi:home', href: '/' },
  { title: 'My Profile', bgColor: '#1e40af', icon: 'mdi:account', href: '/panel/profile' },
  { title: 'Spot', bgColor: '#2563eb', icon: 'mdi:swap-horizontal', href: '/Spot' },
  { title: 'Deposit', bgColor: '#1e40af', icon: 'mdi:bank', href: '/Deposit' },
  { title: 'wallet', bgColor: '#2563eb', icon: 'mdi:wallet-outline', href: '/Wallet/Overview' },
  { title: 'Future', bgColor: '#1e40af', icon: 'mdi:trending-up', href: '/Future' },
];

export default async function CryptoMarketLanding() {
  let coins: Coin[] = [];
  try {
    coins = await getMarketData('usd', 6);
  } catch (err) {
    console.error(err);
  }

  const renderCoinList = (showRank = false) => (
    <Box>
      {coins.map((c) => (
        <Box
          key={c.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            p: 0.4,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Image src={c.image} alt={c.symbol} width={24} height={24} />
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
        width: "100%",
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
            display: 'flex',
            flex: 'row',
            '&:hover': { bgcolor: `${button.bgColor}CC` },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              p: 0.4,
              fontSize: {xs:12, md: 18},
            }}
          >
            <span style={{ fontSize: 'inherit' }}>{button.title}</span>
            <Box
              sx={{
                bgcolor: 'white',
                borderRadius: '20px',
                fontSize: {xs:15, md : 25},
                ml: 1,
                display: 'flex',
                alignItems: 'center',
                p: '2px'
              }}
            >
              <Icon icon={button.icon} color="black" style={{ fontSize: 'inherit' }}/>
            </Box>
          </Box>
        </Button>
      ))}
    </Box>
  );

  return (
    <Box sx={{ pt: 0, px: 2 }}>
      <Box sx={{ my: 2, textAlign: 'center' }}>
      <Typography
          variant='h6'
          component="h2"
          sx={{
            fontWeight: 'bold',
            background: `linear-gradient(90deg, #26A17B, #1e40af)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Crypto Market Insights and Analytics
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mt: 0.5 }}>
          Top Cryptocurrencies Price List by Market Capitalization.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {/* Quick buttons - فقط با CSS برای سایز کوچک/بزرگ */}
        <Grid size={{xs:12, md:4}} display={{ xs: 'flex', md: 'none' }}>
          {renderQuickAccessButtons(false)}
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Box sx={{ p: 1 }}>
            {coins.length === 0 ? (
              <Typography color="error">Failed to load data</Typography>
            ) : (
              renderCoinList(false)
            )}
          </Box>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <TradingViewWidget /> {/* این Client Component هست */}
        </Grid>

        <Grid size={{xs:12, md:4}} display={{ xs: 'none', md: 'flex' }}>
          {renderQuickAccessButtons(true)}
        </Grid>
      </Grid>
    </Box>
  );
}