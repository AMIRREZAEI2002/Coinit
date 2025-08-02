'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Box, CircularProgress, IconButton, Typography, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import { useCryptoContext } from './CryptoContext';

// چون ApexCharts نیاز به window داره
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

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

// تولید داده فیک برای 7 روز
const generateFakeData = (currency: CryptoData): [number, number][] => {
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  const days = 7;
  const basePrice = currency.currentPrice;
  const volatility = currency.symbol.toLowerCase() === 'bitcoin' ? 2000 : currency.symbol.toLowerCase() === 'ethereum' ? 100 : 0.05;
  const data: [number, number][] = [];

  for (let i = days * 24; i >= 0; i--) {
    const timestamp = now - i * msPerDay / 24;
    const variation = Math.sin(i / 10) * volatility + Math.random() * volatility * 0.2;
    const price = i === 0 ? basePrice : basePrice + variation;
    data.push([timestamp, Math.round(price * 100) / 100]);
  }

  return data;
};

// محاسبه سطوح فیبوناچی
const calculateFibonacciLevels = (data: [number, number][]): number[] => {
  if (!data.length) return [];
  const prices = data.map(([, price]) => price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const diff = maxPrice - minPrice;
  return [
    maxPrice,
    maxPrice - 0.236 * diff,
    maxPrice - 0.382 * diff,
    maxPrice - 0.5 * diff,
    maxPrice - 0.618 * diff,
    minPrice,
  ];
};

const SpotCryptoChart: React.FC = () => {
  const theme = useTheme();
  const { selectedCurrency } = useCryptoContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [seriesData, setSeriesData] = useState<[number, number][]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // تولید داده فیک
  useEffect(() => {
    console.log('Selected Currency in SpotCryptoChart:', selectedCurrency);
    setLoading(true);
    const data = generateFakeData(selectedCurrency);
    console.log('Generated fake data:', data);
    setSeriesData(data);
    setCategories(data.map(([timestamp]) => new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));
    setLoading(false);
  }, [selectedCurrency]);

  // مدیریت رویداد تغییر حالت فول‌اسکرین
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      console.log('Fullscreen state:', !!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // تابع برای تغییر حالت فول‌اسکرین
  const toggleFullscreen = () => {
    if (!chartContainerRef.current) return;

    if (!isFullscreen) {
      chartContainerRef.current.requestFullscreen().catch((err) => {
        console.error('Failed to enter fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Failed to exit fullscreen:', err);
      });
    }
  };

  // محاسبه سطوح فیبوناچی
  const fibLevels = calculateFibonacciLevels(seriesData);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: true, tools: { zoom: true, pan: true } },
      zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
      background: 'transparent',
    },
    theme: {
      mode: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: [theme.palette.primary.main],
    grid: {
      borderColor: theme.palette.divider,
    },
    xaxis: {
      categories,
      type: 'datetime',
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
        datetimeUTC: false,
        format: 'dd MMM HH:mm',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
    tooltip: {
      theme: theme.palette.mode,
      x: {
        format: 'dd MMM yyyy HH:mm',
      },
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
    annotations: {
      yaxis: fibLevels.map((level, index) => ({
        y: level,
        borderColor: theme.palette.mode === 'dark' ? '#ffeb3b' : '#fbc02d',
        label: {
          borderColor: theme.palette.mode === 'dark' ? '#ffeb3b' : '#fbc02d',
          style: {
            color: theme.palette.text.primary,
            background: theme.palette.background.paper,
          },
          text: `${[0, 23.6, 38.2, 50, 61.8, 100][index]}%`,
        },
      })),
    },
  };

  const series = [
    {
      name: selectedCurrency.name,
      data: seriesData,
    },
  ];

  return (
    <Box
      ref={chartContainerRef}
      sx={{
        width: '100%',
        height: isFullscreen ? '100vh' : 500,
        p: 1,
        bgcolor: theme.palette.background.paper,
        borderRadius: isFullscreen ? 0 : 2,
        boxShadow: isFullscreen ? 'none' : theme.shadows[2],
        transition: 'all 0.3s ease',
        position: 'relative',
        '&:hover': {
          boxShadow: isFullscreen ? 'none' : theme.shadows[4],
        },
      }}
    >
      <IconButton
        onClick={toggleFullscreen}
        sx={{
          position: 'absolute',
          top: 0,
          left: 8,
          zIndex: 10,
          '&:hover': {
            backgroundColor: theme.palette.action.selected,
          },
        }}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        <Icon
          icon={isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'}
          width={24}
          height={24}
          style={{ color: theme.palette.text.secondary }}
        />
      </IconButton>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : seriesData.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography color="error" align="center">
            No data available for {selectedCurrency.name}
          </Typography>
        </Box>
      ) : (
        <Chart options={options} series={series} type="line" height="100%" width="100%" />
      )}
    </Box>
  );
};

export default SpotCryptoChart;