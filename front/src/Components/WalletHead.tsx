import React, { useState, useRef } from 'react';
import { 
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Visibility as EyeIcon,
  ChevronRight as ChevronRightIcon,
  AccountBalanceWallet as WalletIcon,
  MonetizationOn as CoinsIcon,
  Description as FileInvoiceIcon,
  EmojiEmotions as SmileIcon,
  RemoveRedEye as EyeOpenIcon
} from '@mui/icons-material';
import Link from 'next/link';

const WalletDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        ref={buttonRef}
        onClick={handleClick}
        className="nav-link dropdown-toggle fs-8"
        sx={{
          color: 'text.primary',
          textTransform: 'none',
          fontSize: '0.8rem',
          fontWeight: 400,
          px: 1,
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        Wallet
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            p: 1.5,
            width: 300,
            boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }
        }}
      >
        {/* Estimated Balance */}
        <MenuItem sx={{ 
          p: 1,
          '&:hover': { backgroundColor: 'transparent' } 
        }}>
          <ListItemText 
            primary="Estimated Balance" 
            primaryTypographyProps={{ 
              fontSize: '0.8rem',
              color: 'text.secondary'
            }} 
          />
          <EyeIcon sx={{ fontSize: '0.7rem', ml: 1, color: 'text.secondary' }} />
          <ChevronRightIcon sx={{ fontSize: '0.7rem', ml: 3, color: 'text.secondary' }} />
        </MenuItem>
        
        <Divider sx={{ my: 1 }} />
        
        {/* Balance Display */}
        <Box sx={{ py: 1, px: 1.5 }}>
          <Typography variant="h2" sx={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: 'text.primary' 
          }}>
            6.73 <Typography component="span" sx={{ fontWeight: 'bold' }}>USDT</Typography>
          </Typography>
          <Typography variant="body2" sx={{ 
            color: 'text.secondary', 
            fontSize: '0.8rem',
            mt: 0.5
          }}>
            ≈ 6.73 USDT
          </Typography>
        </Box>
        
        {/* Buttons */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          my: 1, 
          px: 0.5 
        }}>
          <Button 
            variant="contained" 
            size="small"
            fullWidth
            sx={{
              borderRadius: '20px',
              fontSize: '0.7rem',
              px: 2,
              mx: 0.3,
              py: 0.5,
              textTransform: 'none'
            }}
          >
            dropdown
          </Button>
          <Button 
            variant="outlined" 
            size="small"
            fullWidth
            sx={{
              borderRadius: '20px',
              fontSize: '0.7rem',
              px: 2,
              mx: 0.3,
              py: 0.5,
              textTransform: 'none',
              borderColor: 'grey.400',
              color: 'text.primary'
            }}
          >
            Withdraw
          </Button>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        {/* Menu Items */}
        {[
          { icon: <WalletIcon sx={{ fontSize: '0.9rem' }} />, text: 'OverView', href: 'Wallet/overview' },
          { icon: <CoinsIcon sx={{ fontSize: '0.9rem' }} />, text: 'Spot', href: 'Wallet/spot' },
          { icon: <CoinsIcon sx={{ fontSize: '0.9rem' }} />, text: 'DEX +', href: 'Wallet/dex' },
          { icon: <FileInvoiceIcon sx={{ fontSize: '0.9rem' }} />, text: 'Futures', href: 'Wallet/futures' },
          { icon: <CoinsIcon sx={{ fontSize: '0.9rem' }} />, text: 'Fiat', href: 'Wallet/fiat' },
          { icon: <SmileIcon sx={{ fontSize: '0.9rem' }} />, text: 'Copy Trade', href: 'Wallet/copy-trade' },
          { icon: <FileInvoiceIcon sx={{ fontSize: '0.9rem' }} />, text: 'Funding History', href: 'Wallet/funding-history' },
          { icon: <EyeOpenIcon sx={{ fontSize: '0.9rem' }} />, text: 'Event Rewards', href: 'Wallet/event-rewards' },
        ].map((item, index) => (
        <Link key={index} href={item.href} style={{color:'inherit',textDecoration:'none'}}>
          <MenuItem sx={{p: 1, borderRadius: '4px',display:'flex'}}>
            <ListItemIcon sx={{ minWidth: '30px', color: 'text.secondary' }}>
                {item.icon}
            </ListItemIcon>
            <ListItemText 
            primary={item.text} 
            primaryTypographyProps={{ 
                fontSize: '0.9rem',
                color: 'text.secondary'
            }} 
            />
          </MenuItem>
        </Link>
        ))}
      </Menu>
    </Box>
  );
};

export default WalletDropdown;