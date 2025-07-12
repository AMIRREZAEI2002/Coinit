'use client';

import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Avatar, Button, Tooltip, MenuItem
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

const pages = [
  {
    page: 'BuyCrypto',
    children: [
      { page: 'Quick Buy and Sell', link: '/quick-buy-sell' },
      { page: 'P2P', link: '/p2p' },
      { page: 'Transfer', link: '/transfer' }
    ],
  },
  { page: 'Markets', link: '/markets' },
  { page: 'Spot', link: '/spot' },
  { page: 'Future', link: '/future' },
  { page: 'Reward Hub', link: '/rewards' },
  {
    page: 'More',
    children: [
      { page: 'Terms And Policy', link: '/Terms_policy' },
      { page: 'Support', link: '/Support' },
      { page: 'FAQ', link: '/FAQ' }
    ],
  },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
          <Box sx={{  flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent: 'space-between' ,alignItems: 'center', pr:2}}>
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
          </Box>

          {/* User Menu + Dark Mode */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: '45px' }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography color='text.primary' textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* دارک مود */}
            <IconButton sx={{ ml: 2 }} onClick={toggleDarkMode} color="inherit">
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
