'use client';
import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
  Avatar
} from '@mui/material';
import { Icon } from '@iconify/react';
import { usePathname, useRouter } from 'next/navigation';

const NavlinkProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (path: string) => {
    router.push(path);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const navItems = [
    { name: 'Profile', icon: 'mdi:account', path: '/panel/profile' },
    { name: 'Security', icon: 'mdi:lock', path: '/panel/Security' },
    { name: 'Identification', icon: 'mdi:card-account-details', path: '/panel/Identification' },
    { name: 'Referral', icon: 'mdi:account-group', path: '/panel/Referral' },
    { name: 'Trading Fees', icon: 'mdi:percent', path: '/panel/TradingFees' },
    { name: 'Withdrawal Addresses', icon: 'mdi:wallet-outline', path: '/panel/WithdrawalAddresses' },
    { name: 'Sub-Accounts', icon: 'mdi:account-multiple', path: '/panel/SubAccount' },
    { name: 'Settings', icon: 'mdi:cog', path: '/panel/Settings' },
  ];

  const renderNavItems = () => (
    <List sx={{ backgroundColor: 'transparent', pt: 1 }}>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.path);
        return (
          <ListItem
            key={item.name}
            disablePadding
            sx={{
              backgroundColor: isActive ? theme.palette.primary.light : 'inherit',
              borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : 'none',
              borderRadius: '0 12px 12px 0',
              mb: 0.5,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemButton
              onClick={() => handleLinkClick(item.path)}
              sx={{
                p: 0.5,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Icon 
                  icon={item.icon} 
                  width={24} 
                  height={24} 
                  style={{
                    color: isActive ? theme.palette.primary.dark : theme.palette.text.secondary
                  }} 
                />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.95rem',
                  color: isActive ? theme.palette.primary.dark : theme.palette.text.primary
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: 'fixed',
            top: theme.spacing(9),
            left: theme.spacing(2),
            zIndex: theme.zIndex.appBar + 1,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[6],
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: `1px solid ${theme.palette.divider}`,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          <Icon 
            icon={isSidebarOpen ? "mdi:close" : "mdi:menu"} 
            width={24} 
            height={24} 
            style={{ color: theme.palette.primary.main }} 
          />
        </IconButton>
      )}

      {/* Desktop sidebar */}
      {!isMobile && renderNavItems()}

      {/* Mobile sidebar */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: '85%',
            maxWidth: 320,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[16],
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {/* Header with user info */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.light,
            opacity: 0.2,
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, zIndex: 1 }}>
            <Avatar 
              sx={{ 
                width: 56, 
                height: 56, 
                mr: 2,
                backgroundColor: theme.palette.primary.light,
              }}
            >
              <Icon icon="mdi:account" width={28} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>Silba Baher</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>mahyar.baher@gmail.com</Typography>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 2,
            p: 1,
            my: 1,
            zIndex: 1
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography fontSize={12}>Verified</Typography>
              <Typography fontSize={12} fontWeight={600}>Level 2</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography fontSize={12}>Member Since</Typography>
              <Typography fontSize={12} fontWeight={600}>2023</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography fontSize={12}>Referrals</Typography>
              <Typography fontSize={12} fontWeight={600}>12</Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Navigation items */}
        <Box sx={{ overflowY: 'auto', height: '100%', p: 0 }}>
          {renderNavItems()}
        </Box>
      </Drawer>
      
      {/* Semi-transparent overlay for mobile drawer */}
      {isMobile && isSidebarOpen && (
        <Box 
          onClick={toggleSidebar}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: theme.zIndex.drawer,
            backdropFilter: 'blur(4px)',
          }}
        />
      )}
    </>
  );
};

export default NavlinkProfile;