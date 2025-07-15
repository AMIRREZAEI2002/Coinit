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
  Divider
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
    { name: 'Security', icon: 'mdi:lock', path: '/panel/security' },
    { name: 'Identification', icon: 'mdi:card-account-details', path: '/panel/identification' },
    { name: 'Referral', icon: 'mdi:account-group', path: '/panel/referral' },
    { name: 'Trading Fees', icon: 'mdi:percent', path: '/panel/TradingFees' },
    { name: 'Withdrawal Addresses/Contacts', icon: 'mdi:wallet-outline', path: '/panel/WithdrawalAddresses' },
    { name: 'Sub-Account Management', icon: 'mdi:account-multiple', path: '/panel/sub-account' },
    { name: 'Settings', icon: 'mdi:cog', path: '/panel/settings' },
  ];

  const renderNavItems = () => (
    <List sx={{backgroundColor: 'transparent'}}>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.path);
        return (
          <ListItem
            key={item.name}
            disablePadding
            sx={{
              backgroundColor: isActive ? theme.palette.action.selected : 'inherit',
              borderLeft: isActive ? `3px solid ${theme.palette.primary.main}` : 'none',
              color: isActive ? `${theme.palette.primary.main}` : 'none',
            }}
          >
            <ListItemButton
              onClick={() => handleLinkClick(item.path)}
              sx={{
                py: 1.5,
                px: 2,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Icon icon={item.icon} width={24} height={24} style={{color: isActive ? `${theme.palette.primary.main}` : 'none'}} />
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9rem'
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
            top: theme.spacing(8),
            left: theme.spacing(2),
            zIndex: theme.zIndex.appBar,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
            width: 48,
            height: 48,
          }}
        >
          <Icon icon="mdi:menu" width={24} height={24} />
        </IconButton>
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
          renderNavItems()
      )}

      {/* Mobile sidebar */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '16px 0 0 0',
            boxShadow: theme.shadows[10],
          },
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
            Menu
          </Typography>
          <IconButton onClick={toggleSidebar} sx={{ color: 'inherit' }}>
            <Icon icon="mdi:close" width={24} height={24} />
          </IconButton>
        </Box>
        <Divider />
        {renderNavItems()}
      </Drawer>
    </>
  );
};

export default NavlinkProfile;
