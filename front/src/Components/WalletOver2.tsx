'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid,
  useTheme,
  styled
} from '@mui/material';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

// Dynamic import for ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Styled button for period selection
const PeriodButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: number }>(({ theme, active }) => ({
  textTransform: 'none',
  fontSize: '0.7rem',
  padding: '4px 8px',
  borderRadius: '4px',
  margin: '0 4px',
  backgroundColor: active ? theme.palette.primary.light : 'transparent',
  color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
  border: active ? 'none' : `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: active 
      ? theme.palette.primary.main 
      : theme.palette.action.hover,
    color: active 
      ? theme.palette.primary.contrastText 
      : theme.palette.text.primary,
  },
}));

const WalletOver2: React.FC = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState<'30d' | '7d'>('30d');
  const [chartOptions, setChartOptions] = useState<ApexOptions | null>(null);
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  const generateMockData = (days: number, initialValue: number = 3000): number[] => {
    const data: number[] = [];
    let lastValue = initialValue;
    for (let i = 0; i < days; i++) {
      lastValue *= 1 + (Math.random() * 0.02 - 0.01);
      data.push(parseFloat(lastValue.toFixed(2)));
    }
    return data;
  };

  const generateDateLabels = (days: number, shortFormat: boolean = false): string[] => {
    const labels: string[] = [];
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = shortFormat
      ? { month: 'short', day: 'numeric' }
      : { month: 'short', day: 'numeric', year: '2-digit' };

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(date);
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString('en-US', options));
    }

    return labels;
  };

  useEffect(() => {
    const days = period === '7d' ? 7 : 30;
    const shortFormat = period === '7d';

    const options: ApexOptions = {
      chart: {
        type: 'area',
        height: 250,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
        zoom: { enabled: true },
        animations: { enabled: true },
        fontFamily: 'inherit',
        foreColor: theme.palette.text.secondary,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
        colors: [theme.palette.primary.main],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: generateDateLabels(days, shortFormat),
        labels: {
          rotate: -45,
          style: { fontSize: '10px' },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => `$${value.toFixed(0)}`,
          style: { fontSize: '10px' },
        },
      },
      colors: [theme.palette.primary.main],
      grid: {
        show: false,
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
      tooltip: {
        y: {
          formatter: (value: number) => `$${value.toFixed(2)}`,
        },
        theme: theme.palette.mode,
        x: {
          show: true,
        },
      },
      markers: {
        size: 3,
        strokeWidth: 0,
        hover: { size: 5 },
      },
    };

    const chartSeries = [
      {
        name: 'Equity',
        data: generateMockData(days),
      },
    ];

    setChartOptions(options);
    setSeries(chartSeries);
  }, [period, theme]);

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 3,
        pt: 3,
        height: '100%',
        boxShadow: 1,
      }}
    >
      <Grid container sx={{ px: 3 }}>
        <Grid size={{xs:12 ,md: 8}}>
          <Typography variant="body1" fontWeight="bold" textAlign="left">
            Equity Trend
          </Typography>
        </Grid>
        <Grid size={{xs:12 ,md: 4}}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            mt: { xs: 1, md: 0 },
          }}
        >
          <PeriodButton
            variant={period === '30d' ? 'contained' : 'outlined'}
            active={period === '30d' ? 1 : 0}
            onClick={() => setPeriod('30d')}
          >
            last 30 days
          </PeriodButton>
          <PeriodButton
            variant={period === '7d' ? 'contained' : 'outlined'}
            active={period === '7d' ? 1 : 0}
            onClick={() => setPeriod('7d')}
          >
            last 7 days
          </PeriodButton>
        </Grid>
        <Grid size={{xs:12}} sx={{ mt: 3 }}>
          {chartOptions && series && (
            <Chart options={chartOptions} series={series} type="area" height={300} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default WalletOver2;
