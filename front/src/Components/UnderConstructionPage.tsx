'use client'
import { Box, Button, Container, Typography, useTheme, styled } from '@mui/material';
import { Icon } from '@iconify/react';
import Head from 'next/head';
import React from 'react';

const UnderConstructionPage = () => {
  const theme = useTheme();
  
  return (
    <>
      <Head>
        <title>Under Construction | Next-Level Experience Coming Soon</title>
        <meta name="description" content="We're building something amazing for you. Our team is working hard to create an exceptional experience. Stay tuned for updates!" />
        <meta name="keywords" content="under construction, coming soon, website development, new features" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/under-construction" />
      </Head>

      <MainContainer>
        <Box sx={{ 
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 800,
          mx: 'auto',
          py: 10,
          px: { xs: 2, sm: 4 },
        }}>
          <ConstructionIcon>
            <Icon 
              icon="mdi:construction" 
              width={64} 
              height={64} 
              color={theme.palette.primary.main} 
            />
          </ConstructionIcon>
          
          <Typography 
            variant="h1" 
            component="h1"
            sx={{ 
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Crafting Digital Excellence
          </Typography>
          
          <Typography 
            variant="h5" 
            component="h2"
            sx={{ 
              color: 'text.secondary',
              mb: 4,
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              lineHeight: 1.6,
            }}
          >
            We're building something extraordinary for you. Our team is working tirelessly to create an unparalleled experience that exceeds expectations.
          </Typography>
          
          <CountdownContainer>
            <CountdownItem>
              <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                14
              </Typography>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Days
              </Typography>
            </CountdownItem>
            
            <CountdownItem>
              <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                08
              </Typography>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Hours
              </Typography>
            </CountdownItem>
            
            <CountdownItem>
              <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                42
              </Typography>
              <Typography variant="body2" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Minutes
              </Typography>
            </CountdownItem>
          </CountdownContainer>
          
          <Box sx={{ mt: 5 }}>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              Subscribe to get notified when we launch
            </Typography>
            
            <SubscribeForm>
              <input 
                type="email" 
                placeholder="Enter your email" 
                aria-label="Your email address"
                required
              />
              <Button 
                variant="contained" 
                color="primary"
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                }}
              >
                Notify Me
              </Button>
            </SubscribeForm>
          </Box>
        </Box>
        
        <BackgroundPattern />
      </MainContainer>
    </>
  );
};

// Styled Components
const MainContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const ConstructionIcon = styled('div')({
  marginBottom: '2rem',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  },
});

const CountdownContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '1.5rem',
  marginBottom: '2rem',
});

const CountdownItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1.5rem',
  minWidth: '100px',
  borderRadius: '12px',
  background: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'rgba(0, 0, 0, 0.03)',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
}));

const SubscribeForm = styled('div')({
  display: 'flex',
  maxWidth: '500px',
  margin: '0 auto',
  gap: '1rem',
  
  'input': {
    flex: 1,
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    '&:focus': {
      outline: '2px solid #1976d2',
    },
  },
  
  '@media (max-width: 600px)': {
    flexDirection: 'column',
  }
});

const BackgroundPattern = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: theme.palette.mode === 'dark'
    ? `radial-gradient(${theme.palette.grey[800]} 1px, transparent 1px)`
    : `radial-gradient(${theme.palette.grey[300]} 1px, transparent 1px)`,
  backgroundSize: '30px 30px',
  opacity: 0.15,
  zIndex: 0,
  pointerEvents: 'none',
}));

export default UnderConstructionPage;