'use client';

import * as React from 'react';
import {
  Box, IconButton, Typography, Drawer, List,
  ListItemButton, ListItemText, Divider,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Collapse } from '@mui/material';

interface HeaderMobileProps {
  darkMode: boolean;
  mobileOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  toggleSubMenu: (page: string) => void;
  expandedMenu: string | null;
  pages: {
    page: string;
    link?: string;
    children?: { page: string; link: string }[];
  }[];
}

function HeaderMobile({ darkMode, mobileOpen, toggleDrawer, toggleSubMenu, expandedMenu, pages }: HeaderMobileProps) {
  const drawerContent = () => (
    <Box
      sx={{
        width: 280,
        height: '100%',
        bgcolor: darkMode ? 'background.default' : '#f8f9fa',
        color: darkMode ? '#fff' : '#000e',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0'
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ px: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography variant="h6" fontWeight={700}>
            Coinit
          </Typography>
        </Link>
        <IconButton onClick={toggleDrawer(false)}>
          <Icon icon="mdi:close" fontSize={24} />
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <List sx={{ flexGrow: 1 }}>
        {pages.map((item) => (
          <React.Fragment key={item.page}>
            {item.children ? (
              <>
                <ListItemButton onClick={() => toggleSubMenu(item.page)}>
                  <ListItemText 
                    primary={item.page} 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }} 
                  />
                  {expandedMenu === item.page ? 
                    <KeyboardArrowUpIcon /> : 
                    <KeyboardArrowDownIcon />}
                </ListItemButton>
                <Collapse in={expandedMenu === item.page} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <Link href={child.link} key={child.page} passHref>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText 
                            primary={child.page} 
                            primaryTypographyProps={{ 
                              fontSize: '0.9rem',
                              color: darkMode ? 'text.secondary' : 'text.primary'
                            }} 
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <Link href={item.link!} key={item.page} passHref>
                <ListItemButton>
                  <ListItemText 
                    primary={item.page} 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }} 
                  />
                </ListItemButton>
              </Link>
            )}
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ px: 2, display: 'flex', gap: 1, mb: 2 }}>
        <Link href="/Deposit" passHref>
          <Button 
            variant="contained" 
            fullWidth
            sx={{
              borderRadius: 50,
              fontWeight: 600,
              py: 1,
              background: 'linear-gradient(90deg, #3b82f6, #6366f1)'
            }}
          >
            Deposit
          </Button>
        </Link>
        <Link href="/Order" passHref>
          <Button 
            variant="outlined" 
            fullWidth
            sx={{
              borderRadius: 50,
              fontWeight: 600,
              py: 1,
              borderColor: darkMode ? '#333' : '#ddd',
              color: darkMode ? '#fff' : '#000'
            }}
          >
            Orders
          </Button>
        </Link>
      </Box>
      
      <Box sx={{ px: 2, mb: 2 }}>
        <Button 
          fullWidth
          variant="contained"
          sx={{
            background: 'linear-gradient(90deg, rgba(2, 0, 36, 0.62) 0%, rgba(9, 9, 121, 0.75) 35%, rgba(0, 212, 255, 0.75) 100%)',
            borderRadius: 6,
            py: 1.5,
            fontWeight: 600
          }}
        >
          <Icon icon="mdi:coins" fontSize={20} style={{ marginRight: 8 }} />
          Trade to Earn Up to 80,000$
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Box sx={{ display: { xs: 'flex', lg: 'none' }, mr: 1 }}>
        <IconButton
          size="large"
          color="inherit"
          aria-label="open menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Logo - Mobile */}
      <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }} passHref>
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: '.05rem',
            flexGrow: { xs: 1, lg: 0 },
            textAlign: { xs: 'left', lg: 'center' },
            display: { xs: 'flex', md: 'none' }
          }}
        >
          Coinit
        </Typography>
      </Link>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: darkMode ? 'background.default' : '#f8f9fa',
            color: darkMode ? '#fff' : '#000e'
          }
        }}
      >
        {drawerContent()}
      </Drawer>
    </>
  );
}

export default HeaderMobile;