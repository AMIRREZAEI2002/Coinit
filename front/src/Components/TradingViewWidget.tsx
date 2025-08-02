'use client';
import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

export default function TradingViewWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    widgetRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "COINBASE:BTCUSD",
      interval: "60",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: true,
      hide_legend: false
    });
    widgetRef.current.appendChild(script);
  }, []);

  return (
    <Box
      ref={widgetRef}
      sx={{
        height: 430,
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 1,
        bgcolor: 'background.paper',
      }}
    />
  );
}
