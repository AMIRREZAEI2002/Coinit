import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Button,
  styled,
  Paper
} from '@mui/material';
import Image from 'next/image';

const PromoCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  borderRadius: 16,
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #1a3c8f 0%, #4a7eaa 100%)',
  boxShadow: '0px 10px 30px rgba(26, 60, 143, 0.3)',
  color: theme.palette.common.white,
  transition: 'all 0.4s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 15px 40px rgba(26, 60, 143, 0.5)'
  }
}));

const WalletOver4 = () => {
  return (
    <PromoCard elevation={0}>
      <Box sx={{ p: 3, position: 'relative', zIndex: 2 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid size={{xs:12, md:8}}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                color: 'rgba(255, 255, 255, 0.8)',
                letterSpacing: '0.5px',
                mb: 0.5
              }}
            >
              New User Perk
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800, 
                lineHeight: 1.3,
                mb: 2,
                maxWidth: 500,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Want to maximize your assets? Trade to earn up to 80,000$
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{
                borderRadius: 50,
                px: 4,
                py: 1,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                '&:hover': {
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                }
              }}
            >
              Start Trading Now
            </Button>
          </Grid>
          <Grid size={{xs:12, md: 4}}
            sx={{ 
              display: 'flex', 
              justifyContent: { xs: 'center', md: 'flex-end' },
              mt: { xs: 2, md: 0 }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 230,
                height: 220,
                animation: 'float 4s ease-in-out infinite',
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-15px)' },
                  '100%': { transform: 'translateY(0px)' }
                }
              }}
            >
              <Image
                src="/Images/a.webp"
                alt="Trading Perks"
                fill
                style={{ 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
        zIndex: 1
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 250,
        height: 250,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        zIndex: 1
      }} />
      <Box sx={{
        position: 'absolute',
        top: '20%',
        right: '30%',
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.3)',
        boxShadow: '0 0 20px 10px rgba(255,255,255,0.3)',
        animation: 'pulse 3s infinite',
        '@keyframes pulse': {
          '0%': { transform: 'scale(0.8)', opacity: 0.7 },
          '50%': { transform: 'scale(1.2)', opacity: 0.4 },
          '100%': { transform: 'scale(0.8)', opacity: 0.7 }
        }
      }} />
    </PromoCard>
  );
};

export default WalletOver4;