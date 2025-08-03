'use client';

import * as React from 'react';
import {
  Box, IconButton, Typography, Drawer, List,
  ListItemButton, ListItemText, Divider,
  Button, useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Collapse } from '@mui/material';
import { motion } from 'framer-motion';

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
  const theme = useTheme();
  const primaryColor = darkMode ? theme.palette.primary.light : theme.palette.primary.main;
  const secondaryColor = darkMode ? theme.palette.secondary.light : theme.palette.secondary.main;
  const textPrimary = darkMode ? '#fff' : '#1a1a1a';
  const textSecondary = darkMode ? '#b0b0b0' : '#555';
  const background = darkMode ? '#121826' : '#f8fafc';

  const drawerContent = () => (
    <Box
      sx={{
        width: 280,
        height: '100%',
        bgcolor: background,
        color: textPrimary,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0',
        overflowY: 'auto'
      }}
      role="presentation"
    >
      <Box sx={{ px: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: textPrimary, textDecoration: 'none' }}>
          <Typography variant="h6" fontWeight={700} sx={{ 
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Coinit
          </Typography>
        </Link>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: textPrimary }}>
          <Icon icon="mdi:close" fontSize={24} />
        </IconButton>
      </Box>
      
      <Divider sx={{ 
        mb: 2, 
        bgcolor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
      }} />
      
      <List sx={{ flexGrow: 1 }}>
        {pages.map((item) => (
          <React.Fragment key={item.page}>
            {item.children ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ListItemButton 
                  onClick={() => toggleSubMenu(item.page)}
                  sx={{
                    '&:hover': {
                      backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    }
                  }}
                >
                  <ListItemText 
                    primary={item.page} 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: textPrimary
                    }} 
                  />
                  {expandedMenu === item.page ? 
                    <KeyboardArrowUpIcon sx={{ color: textPrimary }} /> : 
                    <KeyboardArrowDownIcon sx={{ color: textPrimary }} />}
                </ListItemButton>
                <Collapse in={expandedMenu === item.page} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <Link href={child.link} key={child.page} style={{textDecoration: 'none',color:'inherit'}} passHref>
                        <ListItemButton sx={{ 
                          pl: 4,
                          '&:hover': {
                            backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                          }
                        }}>
                          <ListItemText 
                            primary={child.page} 
                            primaryTypographyProps={{ 
                              fontSize: '0.9rem',
                              color: textSecondary
                            }} 
                          />
                        </ListItemButton>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link href={item.link!} key={item.page} style={{textDecoration:'none',color:'inherit'}} passHref>
                  <ListItemButton
                    sx={{
                      '&:hover': {
                        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                      }
                    }}
                  >
                    <ListItemText 
                      primary={item.page} 
                      primaryTypographyProps={{ 
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        color: textPrimary
                      }} 
                    />
                  </ListItemButton>
                </Link>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ px: 2, display: 'flex', gap: 1, mb: 2 }}>
        <Link href="/Deposit" style={{textDecoration:'none',color:'inherit'}} passHref>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="contained" 
              fullWidth
              sx={{
                borderRadius: 50,
                fontWeight: 600,
                py: 1,
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                color: darkMode ? '#fff' : '#fff',
                textTransform: 'none',
                letterSpacing: '0.5px'
              }}
            >
              Deposit
            </Button>
          </motion.div>
        </Link>
        <Link href="/Order" passHref>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button 
              variant="outlined" 
              fullWidth
              sx={{
                borderRadius: 50,
                fontWeight: 600,
                py: 1,
                borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                color: textPrimary,
                textTransform: 'none',
                letterSpacing: '0.5px'
              }}
            >
              Orders
            </Button>
          </motion.div>
        </Link>
      </Box>
      
      <Box sx={{ px: 2, mb: 2 }}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button 
            fullWidth
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, rgba(2, 0, 36, 0.82) 0%, rgba(9, 9, 121, 0.85) 35%, rgba(0, 212, 255, 0.85) 100%)',
              borderRadius: 6,
              py: 1.5,
              fontWeight: 600,
              color: '#fff',
              textTransform: 'none',
              letterSpacing: '0.5px'
            }}
          >
            <Icon icon="mdi:coins" fontSize={20} style={{ marginRight: 8 }} />
            Trade to Earn Up to 80,000$
          </Button>
        </motion.div>
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
          sx={{ color: textPrimary }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Logo - Mobile */}
      <Link href="/" style={{ color: textPrimary, textDecoration: 'none' }} passHref>
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: '.05rem',
            flexGrow: { xs: 1, lg: 0 },
            textAlign: { xs: 'left', lg: 'center' },
            display: { xs: 'flex', md: 'none' },
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
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
            bgcolor: background,
            color: textPrimary,
            boxShadow: darkMode ? '0 0 30px rgba(100, 100, 255, 0.2)' : '0 0 30px rgba(0, 0, 100, 0.1)'
          }
        }}
      >
        {drawerContent()}
      </Drawer>
    </>
  );
}

export default HeaderMobile;