"use client";

import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const QuickBuySellDifferentMethods: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ mt: 12, textAlign: 'center' }}>
      <Typography
        variant="h3"
        fontWeight={700}
        color={isDark ? '#fff' : '#000'}
      >
        Different Methods to Buy Crypto on Coinit
      </Typography>
      <Typography
        variant="body1"
        color={theme.palette.text.secondary}
        sx={{
          mt: 2,
          maxWidth: 700,
          mx: 'auto',
          fontSize: '0.9rem',
          lineHeight: 1.6,
        }}
      >
        Coinit provides a variety of payment options to make your crypto-buying experience as seamless as possible. Whether you prefer using traditional payment methods like credit cards or modern options like Apple Pay, Coinit has a solution for you. Our flexible payment system is designed to cater to the needs of every user, allowing you to buy crypto with ease and confidence.
      </Typography>
    </Box>
  );
};

export default QuickBuySellDifferentMethods;
