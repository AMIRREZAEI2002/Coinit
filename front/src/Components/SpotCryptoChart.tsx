'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  CircularProgress,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useCryptoContext } from './CryptoContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false, loading: () => <CircularProgress /> });

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

// ✅ داده ساختگی برای قیمت
const generateFakeData = (currency: CryptoData, days: number, step = 1): [number, number][] => {
  const now = Date.now();
  const msPerDay = 24 * 60 * 60 * 1000;
  const basePrice = currency.currentPrice;
  const volatility =
    currency.symbol.toLowerCase() === 'bitcoin'
      ? 2000
      : currency.symbol.toLowerCase() === 'ethereum'
      ? 100
      : 0.05;
  const data: [number, number][] = [];
  for (let i = days * 24; i >= 0; i -= step) {
    const timestamp = now - (i * msPerDay) / 24;
    const variation = Math.sin(i / 10) * volatility + Math.random() * volatility * 0.2;
    const price = i === 0 ? basePrice : basePrice + variation;
    data.push([timestamp, Math.round(price * 100) / 100]);
  }
  return data;
};

// ✅ کندل‌ها
const generateCandleData = (data: [number, number][]) =>
  data.map(([time, price]) => {
    const open = price + (Math.random() - 0.5) * 50;
    const close = price + (Math.random() - 0.5) * 50;
    const high = Math.max(open, close) + Math.random() * 50;
    const low = Math.min(open, close) - Math.random() * 50;
    return { x: new Date(time), y: [open, high, low, close] };
  });

// ✅ Moving Average
const movingAverage = (data: [number, number][], period = 10) =>
  data.map((_, idx) => {
    if (idx < period) return [data[idx][0], null];
    const avg =
      data.slice(idx - period, idx).reduce((acc, [, price]) => acc + price, 0) / period;
    return [data[idx][0], Math.round(avg * 100) / 100];
  });

const SpotCryptoChart: React.FC = () => {
  const theme = useTheme();
  const { selectedCurrency } = useCryptoContext();
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState<[number, number][]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [candleData, setCandleData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<'line' | 'area' | 'candlestick'>('line');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1W');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPrice, setShowPrice] = useState(true);
  const [showMA10, setShowMA10] = useState(false);
  const [showMA50, setShowMA50] = useState(false);
  const [chartKey, setChartKey] = useState(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const daysMap = { '1D': 1, '1W': 7, '1M': 30, '1Y': 365 };
  const stepMap = { '1D': 1, '1W': 2, '1M': 6, '1Y': 24 }; // کمتر شدن نقاط برای موبایل قدیمی

  useEffect(() => {
    setLoading(true);
    const newData = generateFakeData(selectedCurrency, daysMap[timeframe], stepMap[timeframe]);
    setPriceData(newData);
    setCandleData(generateCandleData(newData));
    setLoading(false);
  }, [selectedCurrency, timeframe]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isFull = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(isFull);
      setChartKey((prev) => prev + 1);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!chartContainerRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = chartContainerRef.current as any;
    if (!isFullscreen) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const minTimestamp = priceData[0]?.[0] || Date.now();
  const maxTimestamp = priceData[priceData.length - 1]?.[0] || Date.now();

  const series = useMemo<ApexAxisChartSeries>(
    () =>
      chartType === 'candlestick'
        ? [{ name: 'Price', data: candleData }]
        : [
            ...(showPrice ? [{ name: selectedCurrency.name, data: priceData }] : []),
            ...(showMA10 ? [{ name: 'MA(10)', data: movingAverage(priceData, 10) }] : []),
            ...(showMA50 ? [{ name: 'MA(50)', data: movingAverage(priceData, 50) }] : []),
          ],
    [chartType, priceData, candleData, selectedCurrency.name, showPrice, showMA10, showMA50]
  );

  const options: ApexCharts.ApexOptions = useMemo(
    () => ({
      chart: {
        type: chartType,
        animations: { enabled: false }, // برای گوشی‌های ضعیف
        toolbar: {
          show: true,
          tools: {
            download: false, // غیرفعال کردن دانلود در موبایل برای سادگی
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
          autoSelected: 'zoom',
        },
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: true,
          // حداقل و حداکثر زوم
          minimumZoom: 0.5,
          maximumZoom: 2,
        },
        background: 'transparent',
        events: {
          zoomed: (chartContext, { xaxis }) => {
            // ✅ محدودیت زوم اوت
            if (xaxis.min < minTimestamp || xaxis.max > maxTimestamp) {
              chartContext.zoomX(minTimestamp, maxTimestamp);
            }
          },
        },
        // بهینه‌سازی برای موبایل
        pinchZoom: true, // فعال کردن زوم با دو انگشت
        selection: {
          enabled: true,
          fill: {
            color: theme.palette.primary.light,
            opacity: 0.2,
          },
        },
        touch: {
          enabled: true, // فعال کردن پشتیبانی از تاچ
          pinchZoom: true,
          swipe: true,
          swipeTolerance: 50,
        },
      },
      theme: { mode: theme.palette.mode },
      stroke: { curve: 'smooth', width: chartType === 'candlestick' ? 1 : [3, 2, 2] },
      colors: [theme.palette.primary.main, '#FF9800', '#4CAF50'],
      xaxis: {
        type: 'datetime',
        min: minTimestamp,
        max: maxTimestamp,
        labels: {
          style: { colors: theme.palette.text.secondary },
          // بهینه‌سازی لیبل‌ها برای موبایل
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
        },
      },
      yaxis: {
        labels: {
          style: { colors: theme.palette.text.secondary },
          formatter: (v) => (typeof v === 'number' ? `$${v.toFixed(2)}` : ''),
          // کاهش تعداد لیبل‌ها در موبایل
          maxTicks: 5,
        },
      },
      tooltip: {
        shared: chartType !== 'candlestick',
        theme: theme.palette.mode,
        x: { format: 'dd MMM yyyy HH:mm' },
        // بهینه‌سازی تولتیپ برای موبایل
        followCursor: true,
        intersect: false,
      },
      // پاسخگویی بهتر برای موبایل
      responsive: [
        {
          breakpoint: 600, // برای صفحه‌نمایش‌های کوچک‌تر از 600px
          options: {
            chart: {
              height: 300, // کاهش ارتفاع چارت در موبایل
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: '10px', // کاهش اندازه فونت
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: '10px',
                },
              },
            },
            toolbar: {
              offsetY: 10, // تنظیم موقعیت toolbar
            },
          },
        },
      ],
    }),
    [chartType, theme, minTimestamp, maxTimestamp]
  );

  return (
    <Box>
      {/* کنترل‌ها */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexDirection: 'row' }}>
        <ToggleButtonGroup value={timeframe} exclusive onChange={(e, val) => val && setTimeframe(val)} size="small">
          {['1D', '1W', '1M', '1Y'].map((tf) => (
            <ToggleButton key={tf} value={tf}>
              {tf}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={(e, val) => {
              if (val) {
                setChartType(val);
                setChartKey((prev) => prev + 1);
              }
            }}
            size="small"
          >
            <ToggleButton value="line">Line</ToggleButton>
            <ToggleButton value="area">Area</ToggleButton>
            <ToggleButton value="candlestick">Candle</ToggleButton>
          </ToggleButtonGroup>
          {chartType !== 'candlestick' && (
            <ToggleButtonGroup size="small">
              <ToggleButton
                value="price"
                selected={showPrice}
                onChange={() => setShowPrice(!showPrice)}
              >
                Price
              </ToggleButton>
              <ToggleButton
                value="ma10"
                selected={showMA10}
                onChange={() => setShowMA10(!showMA10)}
              >
                MA10
              </ToggleButton>
              <ToggleButton
                value="ma50"
                selected={showMA50}
                onChange={() => setShowMA50(!showMA50)}
              >
                MA50
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </Box>
      </Box>

      {/* چارت */}
      <Box
        ref={chartContainerRef}
        sx={{
          width: '100%',
          height: isFullscreen ? '100vh' : { xs: 300, md: 500 }, // ارتفاع کمتر برای موبایل
          bgcolor: theme.palette.background.paper,
          borderRadius: isFullscreen ? 0 : 2,
          position: 'relative',
        }}
      >
        <IconButton onClick={toggleFullscreen} sx={{ position: 'absolute', top: 8, left: 8, zIndex: 10 }}>
          <Icon icon={isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'} width={24} height={24} />
        </IconButton>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Chart
            key={chartKey}
            options={options}
            series={series}
            type={chartType}
            style={{height:isFullscreen ? window.innerHeight : { xs: 300, md: 500 }}}
            width="100%"
          />
        )}
      </Box>
    </Box>
  );
};

export default SpotCryptoChart;