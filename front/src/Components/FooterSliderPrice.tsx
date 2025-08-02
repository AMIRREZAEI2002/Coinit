'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, IconButton, Link, Typography, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import axios from 'axios';

// نگاشت نام رمزارزها به آیکون‌ها
const cryptoIcons: Record<string, string> = {
  bitcoin: 'cryptocurrency-color:btc',
  ethereum: 'cryptocurrency-color:eth',
  solana: 'cryptocurrency-color:sol',
  ripple: 'cryptocurrency-color:xrp',
  cardano: 'cryptocurrency-color:ada',
  dogecoin: 'cryptocurrency-color:doge',
  binancecoin: 'cryptocurrency-color:bnb',
};

interface CryptoData {
  name: string;
  price: number;
  change: string;
  icon: string;
}

const cryptoList = ['bitcoin', 'ethereum', 'solana', 'ripple', 'cardano', 'dogecoin', 'binancecoin'];

const FooterSliderPrice: React.FC = () => {
  const theme = useTheme();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  // دریافت داده‌های قیمت از API
  const fetchCryptoData = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: cryptoList.join(','),
          vs_currencies: 'usd',
          include_24hr_change: true,
        },
      });
      const data = response.data;
      const formattedData = cryptoList.map((crypto) => ({
        name: crypto.charAt(0).toUpperCase() + crypto.slice(1), // تبدیل به نام (بدون USDT)
        price: data[crypto]?.usd || 0,
        change: data[crypto]?.usd_24h_change?.toFixed(2) || '0.00',
        icon: cryptoIcons[crypto] || 'mdi:currency-usd', // آیکون پیش‌فرض اگر یافت نشد
      }));
      setCryptoData(formattedData);
    } catch (error) {
      console.error('خطا در دریافت داده‌های کریپتو:', error);
    }
  };

  // به‌روزرسانی داده‌ها
  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  // انیمیشن اسلایدر
  useEffect(() => {
    if (!marqueeRef.current || cryptoData.length === 0) return;

    const speedPxPerSec = 70; // سرعت اسلایدر
    let animationFrameId: number;
    let lastTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPaused) {
        setTranslateX((prev) => {
          const containerWidth = marqueeRef.current!.scrollWidth / 2; // نصف عرض برای لوپ
          let newTranslateX = prev - (speedPxPerSec * elapsed) / 1000; // حرکت به چپ
          if (newTranslateX <= -containerWidth) {
            newTranslateX += containerWidth; // ریست لوپ
          }
          return newTranslateX;
        });
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cryptoData, isPaused]);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
        py: 0,
        px: 1,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon icon="material-symbols:signal-cellular-4-bar" color={theme.palette.primary.main} width={16} />
          <Typography variant="caption" color="primary" sx={{ fontWeight: 'light' }}>
            Network Normal
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'light' }}>
            Line 1
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <IconButton size="small">
          <Icon icon="material-symbols:format-align-left" width={16} />
        </IconButton>
        <IconButton size="small">
          <Icon icon="material-symbols:whatshot" color={theme.palette.primary.main} width={16} />
        </IconButton>

        <Box
          ref={marqueeRef}
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Box
            sx={{
              display: 'flex',
              transform: `translateX(${translateX}px)`,
              willChange: 'transform',
            }}
          >
            {/* آیتم‌های اصلی */}
            {cryptoData.map((crypto, index) => (
              <Box
                key={`crypto-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mx: 2,
                  flexShrink: 0,
                }}
              >
                <Icon icon={crypto.icon} width={16} style={{ marginRight: 8 }} />
                <Typography color="text.secondary" sx={{ mr: 1 }}>
                  {crypto.name}
                </Typography>
                <Typography color="text.primary" sx={{ mr: 0.5 }}>
                  ${crypto.price.toFixed(2)}
                </Typography>
                <Typography color={parseFloat(crypto.change) >= 0 ? 'success.main' : 'error.main'}>
                  {parseFloat(crypto.change) >= 0 ? '+' : ''}{crypto.change}%
                </Typography>
              </Box>
            ))}
            {cryptoData.map((crypto, index) => (
              <Box
                key={`crypto-duplicate-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mx: 2,
                  flexShrink: 0,
                }}
              >
                <Icon icon={crypto.icon} width={16} style={{ marginRight: 8 }} />
                <Typography color="text.secondary" sx={{ mr: 1 }}>
                  {crypto.name}
                </Typography>
                <Typography color="text.primary" sx={{ mr: 0.5 }}>
                  ${crypto.price.toFixed(2)}
                </Typography>
                <Typography color={parseFloat(crypto.change) >= 0 ? 'success.main' : 'error.main'}>
                  {parseFloat(crypto.change) >= 0 ? '+' : ''}{crypto.change}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <IconButton size="small">
          <Icon icon="material-symbols:tune" width={12} />
        </IconButton>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ position: 'relative' }}>
          <Link href="/updates" color="text.secondary" underline="none" variant="caption" sx={{ fontWeight: 'light' }}>
            Coinit updates
          </Link>
          <Icon
            icon="material-symbols:circle"
            color={theme.palette.error.main}
            width={8}
            style={{ position: 'absolute', top: 0, right: -10 }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FooterSliderPrice;