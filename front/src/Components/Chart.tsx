'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePair } from './PairContext';
import { 
  Box, 
  IconButton, 
  Tooltip, 
  useTheme, 
  Paper, 
  Typography,
  Stack,
  Grid,
  ButtonGroup,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Fullscreen, 
  FullscreenExit, 
  CandlestickChart, 
  ShowChart,
  Timeline,
  Settings,
  Refresh
} from '@mui/icons-material';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Chart: React.FC = () => {
  const { pair } = usePair();
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [series, setSeries] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<any>({});
  const [fullscreen, setFullscreen] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');
  const [timeframe, setTimeframe] = useState('5m');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatFullDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${date.getFullYear()} ${hours}:${minutes}`;
  };

  const toggleFullscreen = () => {
    if (!fullscreen && chartRef.current) {
      if (chartRef.current.requestFullscreen) {
        chartRef.current.requestFullscreen();
      }
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setFullscreen(false);
    }
  };

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleChartTypeChange = (type: 'line' | 'candlestick') => {
    setChartType(type);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const generateCryptoData = () => {
    const now = Date.now();
    const data = [];
    const ohlcData = [];
    let currentPrice = 50000;
    
    for (let i = 0; i < 100; i++) {
      const change = (Math.random() - 0.5) * 300;
      currentPrice += change;
      
      data.push({
        x: now - (100 - i) * 60000,
        y: currentPrice
      });
      
      const open = currentPrice;
      const high = currentPrice + Math.random() * 100;
      const low = currentPrice - Math.random() * 100;
      const close = currentPrice + (Math.random() - 0.5) * 50;
      
      ohlcData.push({
        x: now - (100 - i) * 60000,
        y: [open, high, low, close]
      });
    }
    
    return { lineData: data, candlestickData: ohlcData };
  };

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const { lineData, candlestickData } = generateCryptoData();
      
      const trendColor = lineData[lineData.length - 1].y > lineData[0].y 
        ? theme.palette.success.main 
        : theme.palette.error.main;
      
      const commonOptions = {
        chart: {
          id: 'crypto-chart',
          type: chartType,
          height: 500,
          background: 'transparent',
          foreColor: theme.palette.text.secondary,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
            type: 'x',
            autoScaleYaxis: true
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
        grid: {
          borderColor: theme.palette.divider,
          strokeDashArray: 3,
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: theme.palette.text.secondary,
              fontSize: '11px'
            },
            formatter: (value: number) => formatTime(value)
          },
          axisBorder: {
            show: true,
            color: theme.palette.divider
          },
          axisTicks: {
            show: true,
            color: theme.palette.divider
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: theme.palette.text.secondary
            },
            formatter: (val: number) => `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          },
          opposite: true,
          tooltip: {
            enabled: true
          }
        },
        tooltip: {
          enabled: true,
          theme: theme.palette.mode,
          x: {
            show: true,
            formatter: (val: number) => formatFullDateTime(val)
          },
          y: {
            formatter: (val: number) => `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            title: {
              formatter: () => 'Price'
            }
          }
        },
        stroke: {
          width: 2
        },
        markers: {
          size: 0,
          hover: {
            size: 5
          }
        }
      };
      
      if (chartType === 'line') {
        setSeries([{
          name: `Price (${pair})`,
          data: lineData
        }]);
        
        setOptions({
          ...commonOptions,
          colors: [trendColor],
          stroke: {
            ...commonOptions.stroke,
            curve: 'smooth'
          }
        });
      } else {
        setSeries([{
          name: `Price (${pair})`,
          data: candlestickData
        }]);
        
        setOptions({
          ...commonOptions,
          plotOptions: {
            candlestick: {
              colors: {
                upward: theme.palette.success.main,
                downward: theme.palette.error.main
              },
              wick: {
                useFillColor: true
              }
            }
          }
        });
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [pair, chartType, timeframe, theme]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Paper 
      ref={chartRef}
      elevation={0}
      sx={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper,
        transition: 'all 0.3s ease',
        ...(fullscreen && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: theme.zIndex.modal + 1,
          borderRadius: 0,
          border: 'none'
        })
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Stack>
          <Typography variant="h6" fontWeight="bold">
            {pair} Price Chart
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {timeframe} • Real-time
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={1}>
          <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => handleTimeframeChange('5m')} 
              variant={timeframe === '5m' ? 'contained' : 'outlined'}>
              5m
            </Button>
            <Button onClick={() => handleTimeframeChange('15m')} 
              variant={timeframe === '15m' ? 'contained' : 'outlined'}>
              15m
            </Button>
            <Button onClick={() => handleTimeframeChange('1h')} 
              variant={timeframe === '1h' ? 'contained' : 'outlined'}>
              1h
            </Button>
            <Button onClick={() => handleTimeframeChange('4h')} 
              variant={timeframe === '4h' ? 'contained' : 'outlined'}>
              4h
            </Button>
            <Button 
              onClick={(e) => setAnchorEl(e.currentTarget)}
              endIcon={<Timeline fontSize="small" />}
            >
              More
            </Button>
          </ButtonGroup>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleTimeframeChange('1d')}>1 Day</MenuItem>
            <MenuItem onClick={() => handleTimeframeChange('1w')}>1 Week</MenuItem>
            <MenuItem onClick={() => handleTimeframeChange('1M')}>1 Month</MenuItem>
            <MenuItem onClick={() => handleTimeframeChange('1y')}>1 Year</MenuItem>
            <MenuItem onClick={() => handleTimeframeChange('all')}>All Time</MenuItem>
          </Menu>
          
          <ButtonGroup variant="outlined" size="small">
            <Tooltip title="Line Chart">
              <IconButton 
                onClick={() => handleChartTypeChange('line')}
                color={chartType === 'line' ? 'primary' : 'default'}
              >
                <ShowChart />
              </IconButton>
            </Tooltip>
            <Tooltip title="Candlestick Chart">
              <IconButton 
                onClick={() => handleChartTypeChange('candlestick')}
                color={chartType === 'candlestick' ? 'primary' : 'default'}
              >
                <CandlestickChart />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
          
          <Tooltip title="Refresh Data">
            <IconButton onClick={() => setIsLoading(true)}>
              <Refresh />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Chart Settings">
            <IconButton>
              <Settings />
            </IconButton>
          </Tooltip>
          
          <Tooltip title={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
            <IconButton onClick={toggleFullscreen}>
              {fullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      
      {isLoading && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          bgcolor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(2px)'
        }}>
          <Typography variant="h6" color="common.white">
            Loading market data...
          </Typography>
        </Box>
      )}
      
      <Box sx={{ 
        flex: 1, 
        minHeight: 0,
        position: 'relative',
        p: 1,
        pt: 0
      }}>
        <ApexChart 
          options={options} 
          series={series} 
          type={chartType} 
          height="100%"
          width="100%"
        />
      </Box>
      
      <Box sx={{
        p: 2,
        bgcolor: theme.palette.background.default
      }}>
        <Grid container spacing={1}>
          <Grid size={{xs:3}}>
            <Typography variant="body2" color="text.secondary">
              Open
            </Typography>
            <Typography fontWeight="medium">
              $50,125.34
            </Typography>
          </Grid>
          <Grid size={{xs:3}}>
            <Typography variant="body2" color="text.secondary">
              High
            </Typography>
            <Typography fontWeight="medium">
              $50,890.67
            </Typography>
          </Grid>
          <Grid size={{xs:3}}>
            <Typography variant="body2" color="text.secondary">
              Low
            </Typography>
            <Typography fontWeight="medium">
              $49,876.12
            </Typography>
          </Grid>
          <Grid size={{xs:3}}>
            <Typography variant="body2" color="text.secondary">
              Volume
            </Typography>
            <Typography fontWeight="medium">
              $2.45B
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Chart;