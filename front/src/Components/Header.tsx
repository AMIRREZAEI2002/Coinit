'use client';

import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Button, Tooltip, MenuItem, Badge
} from '@mui/material';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { ThemeModeContext } from '../app/providers';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ArrowDropDown } from '@mui/icons-material';
import SearchHead from './SearchHead';
import WalletHead from './WalletHead';
import HeaderNotif from './HeaderNotif';
import HeaderMobile from './HeaderMobile';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from 'framer-motion';
import ToggleSwitch from './ToggleSwitch';
import Image from 'next/image';

const pages = [
  {
    page: 'BuyCrypto',
    children: [
      { page: 'Quick Buy and Sell', link: '/BQPT/QuickBuySell' },
      { page: 'P2P', link: '/BQPT/P2P' },
      { page: 'Transfer', link: '/BQPT/Transfer' }
    ],
  },
  { page: 'Markets', link: '/Markets' },
  { page: 'Spot', link: '/Spot' },
  { page: 'Future', link: '/Future' },
  { page: 'Reward Hub', link: '/EventRewards' },
  {
    page: 'More',
    children: [
      { page: 'Terms And Policy', link: '/Terms_policy' },
      { page: 'Support', link: '/Support' },
      { page: 'FAQ', link: '/FAQ' }
    ],
  },
];

const settings = [
  { name: 'Profile', icon: 'mdi:account', path: '/panel/profile' },
  { name: 'Security', icon: 'mdi:lock', path: '/panel/Security' },
  { name: 'Identification', icon: 'mdi:card-account-details', path: '/panel/Identification' },
  { name: 'Referral', icon: 'mdi:account-group', path: '/panel/Referral' },
  { name: 'Trading Fees', icon: 'mdi:percent', path: '/panel/TradingFees' },
  { name: 'Withdrawal Address', icon: 'mdi:wallet-outline', path: '/panel/WithdrawalAddresses' },
  { name: 'SubAccount', icon: 'mdi:user-plus', path: '/panel/SubAccount' },
  { name: 'Settings', icon: 'mdi:cog', path: '/panel/Settings' },
  // { name: 'Switch Account', icon: 'mdi:switch', path: '/SwitchAccount' },
  { name: 'Log Out', icon: 'mdi:log-out', path: '/LogOut' },
];

function Header() {
  const { darkMode, toggleDarkMode } = useContext(ThemeModeContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElDropdown, setAnchorElDropdown] = useState<null | HTMLElement>(null);
  const [dropdownItems, setDropdownItems] = useState<{ page: string, link: string }[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleDropdownOpen = (
    event: React.MouseEvent<HTMLElement>,
    items: { page: string, link: string }[]
  ) => {
    setDropdownItems(items);
    setAnchorElDropdown(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorElDropdown(null);
    setDropdownItems([]);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setMobileOpen(open);
    setExpandedMenu(null);
  };

  const toggleSubMenu = (page: string) => {
    setExpandedMenu(expandedMenu === page ? null : page);
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{
        backgroundColor: darkMode ? '#121212' : 'rgba(248, 249, 250,1)', 
        color: darkMode ? '#000e' : '#000e',
        boxShadow: darkMode ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '64px !important' }}>
          {/* Logo - Desktop */}
          <Box display={{xs:'none', md:'flex'}}><Link href="/" style={{color: 'inherit', textDecoration: 'none', padding:1,display:'flex', alignContent:'center'}} passHref>
            <Image src="/Images/logo.webp" alt='Coinit' width={80} height={32} />
          </Link></Box>

          {/* Mobile Header */}
          <HeaderMobile
            darkMode={darkMode}
            mobileOpen={mobileOpen}
            toggleDrawer={toggleDrawer}
            toggleSubMenu={toggleSubMenu}
            expandedMenu={expandedMenu}
            pages={pages}
          />

          {/* Desktop Nav Buttons */}
          <Box sx={{  
            flexGrow: 1, 
            display: { xs: 'none', lg: 'flex' },
            justifyContent: 'space-between',
            alignItems: 'center',
            pr: 0
          }}>
            <Box sx={{ flexGrow: 1, display:'flex',alignItems: 'center'}}>
              <ToggleSwitch />
              {pages.map((page) =>
                page.children ? (
                  <Button
                    key={page.page}
                    onClick={(e) => handleDropdownOpen(e, page.children!)}
                    sx={{ fontSize: 11, my: 2, color: 'text.primary', display: 'flex' }}
                  >
                    {page.page}
                    <ArrowDropDown/>
                  </Button>
                ) : (
                  <Link href={page.link!} style={{color:'inherit', textDecoration: 'none'}} passHref key={page.page}>
                    <Button
                      onClick={handleDropdownClose}
                      sx={{fontSize: 11, my: 2, color: 'text.primary', display: 'block' }}
                    >
                      {page.page}
                    </Button>
                  </Link>
                )
              )}
            </Box>
            <SearchHead/>
            <Link href="/Deposit" style={{color: 'inherit',textDecoration: 'none'}} passHref>
              <Button variant="contained" sx={{borderRadius: 50,fontSize: 10}}>
                Deposit
              </Button>
            </Link>
            <WalletHead/>
          </Box>

          {/* User Menu + Notifications + Dark Mode */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center',ml:'auto' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Badge 
                  color="primary" 
                  variant="dot" 
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon 
                      icon="mdi:user" 
                      color={darkMode ? '#fff' : '#000'} 
                      fontSize={28} 
                    />
                  </motion.div>
                </Badge>
              </IconButton>
            </Tooltip>
            <HeaderNotif />
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ 
                px: 5,
                mt: '45px',
                '& .MuiPaper-root': {
                  background: 'Background.paper',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  minWidth: '250px',
                  overflow: 'scroll',
                  animation: 'fadeIn 0.8s ease-out',
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  }
                }
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem>
                <Typography sx={{px:1}} fontWeight={700}>
                  Mahyar.baher@gmail.com
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography sx={{px:1}} fontWeight={500}>
                  UID: 12345678
                </Typography>
              </MenuItem>
              <MenuItem sx={{transition: 'all 0.3s ease',background: 'linear-gradient(90deg,rgba(2, 0, 36, 0.62) 0%, rgba(9, 9, 121, 0.75) 35%, rgba(0, 212, 255, 0.75) 100%)',borderRadius: 6 ,mx: 2, py:{xs:0, md :1}, px:1,'&:hover': {transform: 'translateY(-1px)'}}}>
                <Link href="/Spot" passHref style={{display: 'flex', color : 'white',textDecoration: 'none', alignItems: 'center' , fontSize: 13, justifyContent: 'flex-start'}}>
                  <Icon icon="mdi:coins" color="text.primary" fontSize={15} />
                  Trade to Earn Up to 80,000$
                  <Icon icon="mdi:chevron-right" color="text.primary" fontSize={21} />
                </Link>
              </MenuItem>
              {settings.map((setting) => (
                <MenuItem
                    key={setting.name}
                    onClick={handleCloseUserMenu}
                    sx={{
                      py: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        color: darkMode ? '#000' : '#000',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
              
                  <Link 
                    href={setting.path} 
                    passHref 
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <Icon 
                      icon={setting.icon} 
                      width={16} 
                      height={16} 
                      style={{
                        color: "text.primary",
                        marginLeft: 8,
                        marginRight: 12
                      }} 
                    />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {setting.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>

            {/* Dark Mode Toggle */}
            <IconButton 
              sx={{ ml: 0 }} 
              onClick={toggleDarkMode} 
              color="inherit"
            >
              {darkMode ? <Icon icon="line-md:light-dark" width="24" height="24" color='white' /> : <Icon icon="line-md:light-dark" width="24" height="24" />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Dropdown children menu (for desktop) */}
      <Menu
        anchorEl={anchorElDropdown}
        open={Boolean(anchorElDropdown)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {dropdownItems.map((item) => (
          <Link href={item.link} style={{color:'text.primary', textDecoration:'none'}} key={item.link} passHref >
            <MenuItem onClick={handleDropdownClose}>
              <Typography sx={{color:'text.primary',fontSize: 14}}>{item.page}</Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </AppBar>
  );
}

export default Header;