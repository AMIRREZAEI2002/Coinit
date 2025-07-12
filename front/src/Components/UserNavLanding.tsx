'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Link, 
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { AccountCircle as UserIcon } from '@mui/icons-material';

const UserNavLanding = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  const userData = {
    name: 'Mahyar Baher',
    credit: '$412,000.33',
    date: new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  };

  return (
    <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)', p: 3, width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: { xs: 1, sm: 3, md: 5 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" fontWeight={600} sx={{ mr: 1 }}>
            Welcome
          </Typography>
          <Typography variant="h6" color="error" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
            {userData.name}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" fontWeight={600} sx={{ mr: 1 }}>
            Today
          </Typography>
          <Typography variant="body1" color="error">
            {userData.date}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" fontWeight={600} sx={{ mr: 1 }}>
            Your credit
          </Typography>
          <Typography variant="body1" color="error">
            {userData.credit}
          </Typography>
        </Box>
        
        <Link href="#" underline="none" color="inherit">
          <Box sx={{ display: 'flex', alignItems: 'center', '&:hover': { color: 'primary.main' } }}>
            <IconButton size="small" sx={{ p: 0, mr: 1 }}>
              <UserIcon />
            </IconButton>
            {isLargeScreen && (
              <Typography variant="body1" fontWeight={600}>
                View My Profile
              </Typography>
            )}
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default UserNavLanding;
