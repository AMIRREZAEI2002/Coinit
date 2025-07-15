import React from 'react';
import { 
  Box, Typography, List, ListItem, ListItemText, ListItemIcon, 
  useTheme, Paper, Divider,Button
} from '@mui/material';
import { 
  FiberManualRecord as FiberManualRecordIcon,
  Info as InfoIcon,
  Discount as DiscountIcon,
  Paid as PaidIcon
} from '@mui/icons-material';

const UserpanelUnderFee = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      mt: 4, 
      p: 3,
      backgroundColor: theme.palette.mode === 'dark' 
        ? theme.palette.background.paper 
        : theme.palette.grey[100],
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Understanding Coinit Fees
      </Typography>
      
      {/* Maker Order Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoIcon color="primary" sx={{ mr: 1.5, fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">Maker Order</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          An order placed at a specified goal that enters the order book instead of matching immediately.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ 
          fontStyle: 'italic',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.03)',
          p: 2,
          borderRadius: 1
        }}>
          Example: Current fees ask 14 to 1020. A buy order placed at 90 USD1 enters the order book until matched. When filled, maker fees apply.
        </Typography>
      </Paper>
      
      {/* Taker Order Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoIcon color="primary" sx={{ mr: 1.5, fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">Taker Order</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          An order that matches immediately with existing orders on the book.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ 
          fontStyle: 'italic',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.03)',
          p: 2,
          borderRadius: 1
        }}>
          Example: Current fees ask 14 to 1020. A buy order placed at 100 USD1 matches immediately. When filled, taker fees apply.
        </Typography>
      </Paper>
      
      <Divider sx={{ my: 4 }} />
      
      {/* Coinit Holdings Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DiscountIcon color="primary" sx={{ mr: 1.5, fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">Coinit Holdings</Typography>
        </Box>
        <List>
          {[
            "Hold ≥ $50 Coinit in Spot or ≥ 1M Coinit to enjoy 95% discount in spot and Futures trading fees. Benefits for the main account and sub-account are independent and cannot be shared.",
            "Holdings will be verified through three monthly random snapshots. The lowest quantity from these snapshots will determine whether daily requirements have been met.",
            "Once the required quantity has been maintained for the specified number of days, benefits will automatically activate at 16:00 UTC the following day. Please note there may be slight delays in data processing.",
            "Coinit holdings fee discount in your Spot account cannot be used in conjunction with Coinit deduction. Priority is given to the Coinit Spot holding discount.",
            "Some trading pairs are excluded from Coinit fee deductions. For details, please refer to the fee rate page."
          ].map((item, index) => (
            <ListItem key={index} sx={{ alignItems: 'flex-start', py: 1 }}>
              <ListItemIcon sx={{ minWidth: 32, mt: '6px' }}>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item}
                primaryTypographyProps={{ variant: 'body1', color: 'text.secondary' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      
      {/* Coinit Deduction Section */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PaidIcon color="primary" sx={{ mr: 1.5, fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">Coinit Deduction</Typography>
        </Box>
        <List>
          {[
            { 
              text: "Spot Fee Deduction: Once enabled, Coinit tokens will be prioritized for fee deductions on Spot trades, granting a 20% discount. The discount becomes invalid once Coinit tokens are depleted.",
              highlight: true
            },
            { 
              text: "Futures Fee Deduction: Once enabled, users must transfer Coinit tokens to their Futures wallet. Coinit will then be prioritized for fee deductions on Futures trades, granting a 20% discount. The discount becomes invalid once Coinit tokens are depleted.",
              highlight: true
            },
            { 
              text: "Discount & Deduction Policy: The Coinit holder discount and Coinit deduction cannot be combined. Users will automatically receive the higher of the two discount rates.",
              highlight: false
            },
            { 
              text: "Some trading pairs are excluded from Coinit fee deductions. For details, please refer to the fee schedule.",
              highlight: false
            }
          ].map((item, index) => (
            <ListItem key={index} sx={{ alignItems: 'flex-start', py: 1 }}>
              <ListItemIcon sx={{ minWidth: 32, mt: '6px' }}>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    fontWeight={item.highlight ? 'bold' : 'normal'}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ 
        backgroundColor: theme.palette.primary.light, 
        p: 3, 
        borderRadius: 2,
        textAlign: 'center',
        mt: 4
      }}>
        <Typography variant="h6" fontWeight="bold">
          Need more help understanding fees?
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Visit our comprehensive fee schedule or contact support for assistance
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: '50px', 
              textTransform: 'none',
              px: 3
            }}
          >
            View Fee Schedule
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            sx={{ 
              borderRadius: '50px', 
              textTransform: 'none',
              px: 3
            }}
          >
            Contact Support
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserpanelUnderFee;