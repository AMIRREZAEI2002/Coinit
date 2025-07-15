'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  useTheme,
  List,
  ListItem,
  ListItemIcon
} from '@mui/material';
import { Icon } from '@iconify/react';

const UserpanelRef = () => {
  const theme = useTheme();
  
  // Sample referral data
  const referralItems = [
    { title: 'Referral', description: 'Lorem ipsum dolor sit amet.' },
    { title: 'Bonus Program', description: 'Consectetur adipiscing elit sed do.' },
    { title: 'Rewards', description: 'Eiusmod tempor incididunt ut labore.' },
  ];

  return (
    <Box 
      sx={{
        backgroundColor: 'background.default',
        borderRadius: 3,
        p: 2,
        height: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <List disablePadding>
        {referralItems.map((item, index) => (
          <ListItem 
            key={index} 
            disableGutters
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: 'background.paper',
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[1],
                borderColor: theme.palette.primary.light,
              }
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center"
                mb={1}
              >
                <Box display="flex" alignItems="center">
                  <ListItemIcon sx={{ minWidth: 30, color: 'text.secondary' }}>
                    <Icon icon="mdi:chevron-right" />
                  </ListItemIcon>
                  <Typography variant="body1" fontWeight="500">
                    {item.title}
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <Icon icon="mdi:chevron-right" />
                </IconButton>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  pl: 4,
                  fontSize: '0.85rem'
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserpanelRef;