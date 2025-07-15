'use client';
import React from 'react';
import { Box, Typography, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import { Bolt, SwapHoriz, BarChart, AccountBalanceWallet } from '@mui/icons-material';
import { motion } from 'framer-motion';

const DexPlusPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: isMobile ? 2 : 4,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)',
        zIndex: 0,
      }} />
      
      <Box sx={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
        zIndex: 0,
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: '10%',
        left: '15%',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        zIndex: 0,
      }} />
      
      {/* Content container */}
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 800,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Animated logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          <Box sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: 'rgba(99, 102, 241, 0.1)',
            border: '2px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <Bolt sx={{ fontSize: 50, color: '#818cf8' }} />
          </Box>
        </motion.div>
        
        {/* Title with animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Typography 
            variant={isMobile ? "h4" : "h2"} 
            sx={{ 
              fontWeight: 900, 
              mb: 2,
              background: 'linear-gradient(90deg, #818cf8 0%, #c7d2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DEX+ PLATFORM
          </Typography>
        </motion.div>
        
        {/* Subtitle with animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            sx={{ 
              fontWeight: 300, 
              mb: 4,
              maxWidth: 600,
              color: '#cbd5e1'
            }}
          >
            Next-generation decentralized exchange with advanced trading tools and lightning-fast execution
          </Typography>
        </motion.div>
        
        {/* Feature cards */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{xs:12 , md:4}}>
              <Box sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                backdropFilter: 'blur(10px)',
                height: '100%',
                transition: 'transform 0.3s, border-color 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  borderColor: 'rgba(99, 102, 241, 0.4)',
                }
              }}>
                <SwapHoriz sx={{ fontSize: 40, color: '#818cf8', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Instant Swaps</Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Trade assets instantly with minimal slippage and competitive fees
                </Typography>
              </Box>
            </Grid>
            
            <Grid size={{xs:12 , md:4}}>
              <Box sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                backdropFilter: 'blur(10px)',
                height: '100%',
                transition: 'transform 0.3s, border-color 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  borderColor: 'rgba(99, 102, 241, 0.4)',
                }
              }}>
                <BarChart sx={{ fontSize: 40, color: '#818cf8', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Advanced Charts</Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Professional trading tools with real-time market data and indicators
                </Typography>
              </Box>
            </Grid>
            
            <Grid size={{xs:12 , md:4}}>
              <Box sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                backdropFilter: 'blur(10px)',
                height: '100%',
                transition: 'transform 0.3s, border-color 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  borderColor: 'rgba(99, 102, 241, 0.4)',
                }
              }}>
                <AccountBalanceWallet sx={{ fontSize: 40, color: '#818cf8', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Secure Wallet</Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Non-custodial solution with military-grade encryption
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
        
        {/* CTA Button with animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #6366f1 0%, #818cf8 100%)',
              borderRadius: 50,
              fontWeight: 700,
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)',
              '&:hover': {
                boxShadow: '0 15px 25px rgba(99, 102, 241, 0.4)',
              }
            }}
          >
            Launch DEX+
          </Button>
        </motion.div>
        
        {/* Stats section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ width: '100%', marginTop: '3rem' }}
        >
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>
            <Grid size={{xs:4 , md:4}}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#818cf8' }}>10M+</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>Users</Typography>
            </Grid>
            <Grid size={{xs:4 , md:4}}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#818cf8' }}>$5B+</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>Volume</Typography>
            </Grid>
            <Grid size={{xs:4 , md:4}}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#818cf8' }}>500+</Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>Assets</Typography>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'rgba(129, 140, 248, 0.5)',
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </Box>
  );
};

export default DexPlusPage;