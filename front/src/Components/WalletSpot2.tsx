import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  IconButton, 
  Paper,
  useTheme,
  styled,
  Tooltip
} from '@mui/material';
import {
  Info as InfoIcon,
  ChevronRight as ChevronRightIcon,
  ListAlt as ListIcon
} from '@mui/icons-material';

const FeeCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.1)'
  }
}));

const FeeItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  backgroundColor: theme.palette.background.default,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.02)'
  }
}));

const FeeIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  color: "text.primary",
  marginRight: theme.spacing(1.5),
  fontSize: '1.2rem'
}));

const WalletSpot2 = () => {
  const theme = useTheme();
  
  const fees = [
    { id: 1, title: "Market Fee", value: "0%", icon: <ListIcon /> },
    { id: 2, title: "Taker Fee", value: "0.05%", icon: <ListIcon /> }
  ];

  return (
    <FeeCard>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            fontWeight={700}
            sx={{ color: 'text.primary' }}
          >
            Spot Trading Fees
          </Typography>
          <Tooltip 
            title="Competitive trading fees with discounts for high-volume traders" 
            arrow
          >
            <IconButton sx={{ ml: 1, color: 'text.secondary' }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            color: 'text.secondary',
            transition: 'all 0.2s',
            '&:hover': {
              color: 'primary.main',
              transform: 'translateX(3px)'
            }
          }}
        >
          <Typography variant="body2" fontWeight={500}>
            Details
          </Typography>
          <ChevronRightIcon fontSize="small" />
        </Box>
      </Box>
      
      {/* Fee Items */}
      <Grid container spacing={2}>
        {fees.map((fee) => (
          <Grid size={{xs:12,md:6}} key={fee.id}>
            <FeeItem>
              <FeeIcon>
                {fee.icon}
              </FeeIcon>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {fee.title}
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>
                  {fee.value}
                </Typography>
              </Box>
            </FeeItem>
          </Grid>
        ))}
      </Grid>
      
      {/* Additional Info */}
      <Box 
        sx={{ 
          mt: 3, 
          p: 2, 
          borderRadius: 2,
          backgroundColor: theme.palette.success.light,
          borderLeft: `4px solid ${theme.palette.success.main}`
        }}
      >
        <Typography variant="body2" sx={{ color: theme.palette.success.dark }}>
          <Box component="span" fontWeight={700}>VIP Discounts:</Box> Higher trading volumes 
          qualify for reduced fees. Check our fee schedule for details.
        </Typography>
      </Box>
    </FeeCard>
  );
};

export default WalletSpot2;