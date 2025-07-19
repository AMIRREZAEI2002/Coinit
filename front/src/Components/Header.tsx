'use client';

import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Button, Tooltip, MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { ThemeModeContext } from '../app/providers';
import ToggleSwitch from './ToggleSwitch';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ArrowDropDown } from '@mui/icons-material';
import SearchHead from './SearchHead';
import WalletHead from './WalletHead';
import { Icon } from '@iconify/react/dist/iconify.js';

const pages = [
  {
    page: 'BuyCrypto',
    children: [
      { page: 'Quick Buy and Sell', link: '/quick-buy-sell' },
      { page: 'P2P', link: '/p2p' },
      { page: 'Transfer', link: '/transfer' }
    ],
  },
  { page: 'Markets', link: '/Markets' },
  { page: 'Spot', link: '/Spot' },
  { page: 'Future', link: '/future' },
  { page: 'Reward Hub', link: '/Wallet/EventRewards' },
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
    { name: 'Switch Account', icon: 'mdi:switch', path: '/SwitchAccount' },
    { name: 'Log Out', icon: 'mdi:log-out', path: '/LogOut' },

];

function Header() {
  const { darkMode, toggleDarkMode } = useContext(ThemeModeContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElDropdown, setAnchorElDropdown] = useState<null | HTMLElement>(null);
  const [dropdownItems, setDropdownItems] = useState<{ page: string, link: string }[]>([]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);
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

  return (
    <AppBar position="sticky" sx={{backgroundColor: darkMode ? '#121212' : 'rgba(248, 249, 250,1)', color: darkMode ? '#fff' : '#000e' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo - Desktop */}
          <Link href="/" style={{color: 'inherit', textDecoration: 'none',}} passHref>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 1,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 200,
              }}
            >
              Coinit
            </Typography>
          </Link>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
            <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) =>
                 page.children ? (
                  <Button
                    key={page.page}
                    onClick={(e) => handleDropdownOpen(e, page.children!)}
                    sx={{ my: 2, color: 'text.primary', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {page.page}
                    <KeyboardArrowDownIcon fontSize="small" />
                  </Button>
                ) : (
                  <Link href={page.link!} key={page.page} passHref>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.page}</Typography>
                    </MenuItem>
                  </Link>
                )
              )}
              <ToggleSwitch />
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          
          <Link href="/" style={{color: 'inherit', textDecoration: 'none'}} passHref>   
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                fontFamily: 'monospace',
              }}
            >
              Coinit
            </Typography>  
          </Link>

          {/* Desktop Nav Buttons */}
          <Box sx={{  flexGrow: 1, display: { xs: 'none', lg: 'flex' },justifyContent: 'space-between' ,alignItems: 'center', pr:2}}>
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
                      onClick={handleCloseNavMenu}
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
            <Link href="/Order" style={{color: 'inherit',textDecoration: 'none'}} passHref>
              <Button variant="text" sx={{borderRadius: 50,fontSize: 10, color: 'text.primary'}}>
                Order
              </Button>
            </Link>
          </Box>

          {/* User Menu + Dark Mode */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Icon icon="mdi:user" color="text.primary" fontSize={25} />
              </IconButton>
            </Tooltip>

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
                  minWidth: '120px',
                  overflow: 'scroll',
                  animation: 'fadeIn 0.8s ease-out',
                  '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                  }
                }
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem>
                <Typography sx={{px:1}} fontWeight={700}>
                  user.email Mahyar.baher@gmail.com
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography sx={{px:1}} fontWeight={500}>
                  UID: user.ID
                </Typography>
              </MenuItem>
              <MenuItem sx={{transition: 'all 0.3s ease',background: 'linear-gradient(90deg,rgba(2, 0, 36, 0.62) 0%, rgba(9, 9, 121, 0.75) 35%, rgba(0, 212, 255, 0.75) 100%)',borderRadius: 6 ,mx: 2, py: 1, px:1,'&:hover': {transform: 'translateY(-1px)'}}}>
                <Link href="Trade" passHref style={{display: 'flex', color : 'white',textDecoration: 'none', alignItems: 'center' , fontSize: 13, justifyContent: 'flex-start'}}>
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
                      transform: 'translateY(-1px)'
                    }
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

            {/* دارک مود */}
            <IconButton sx={{ ml: 1}} onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
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
