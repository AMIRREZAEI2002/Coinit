"use client";

import React from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const QuickBuySellHowToBuy: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const steps = [
    { text: 'Select your preferred crypto and choose the amount' },
    { text: 'Select your payment method' },
    { text: 'Complete your payment and receive your tokens' },
  ];

  return (
    <Box sx={{ display: { xs: 'none', lg: 'block' }, mt: 12, textAlign: 'center' }}>
      <Typography
        variant="h3"
        fontWeight={700}
        color={isDark ? '#fff' : '#000'}
      >
        How to Buy Cryptocurrencies
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          mt: 5,
          gap: 3,
        }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mx: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  mb: 2,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                }}
              >
                {index + 1}
              </Box>
              <Typography
                variant="body1"
                color={isDark ? '#fff' : '#000'}
                sx={{ maxWidth: 180, textAlign: 'center', fontSize: '0.9rem' }}
              >
                {step.text}
              </Typography>
            </Box>

            {index < steps.length - 1 && (
              <Divider
                sx={{
                  width: 60,
                  borderTop: '2px solid',
                  borderColor: isDark
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(0, 0, 0, 0.2)',
                  alignSelf: 'center',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default QuickBuySellHowToBuy;
