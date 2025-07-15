'use client';
import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Button, 
  IconButton, 
  Select, 
  MenuItem, 
  FormControl,
  useTheme,
  SelectChangeEvent
} from '@mui/material';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const UserpanelTValue = () => {
  const theme = useTheme();
  const [currency, setCurrency] = useState('USDT');
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
  };

  return (
    <Box 
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 3,
        p: 3,
        height: { xs: 'auto', md: 200 },
        maxHeight: 200,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Grid container>
        {/* Header row */}
        <Grid size={{ xs: 6 }}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Total Value
            </Typography>
            <IconButton 
              size="small" 
              onClick={toggleVisibility}
              sx={{ ml: 1, color: 'text.secondary' }}
            >
              <Icon 
                icon={isVisible ? "mdi:eye" : "mdi:eye-off"} 
                width={16} 
              />
            </IconButton>
          </Box>
        </Grid>
        <Grid size={{ xs: 6 }} textAlign="right">
          <Typography 
            variant="body2" 
            color="primary"
            sx={{ 
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Asset Details
          </Typography>
        </Grid>
        
        {/* Value row */}
        <Grid size={{ xs: 12 }} mt={1}>
          <Box display="flex" alignItems="center">
            <Typography variant="h4" fontWeight="bold">
              {isVisible ? '6.73' : '****'}
            </Typography>
            <FormControl variant="standard" sx={{ ml: 1 }}>
              <Select
                value={currency}
                onChange={handleChange}
                disableUnderline
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  '& .MuiSelect-select': { 
                    padding: 0,
                    paddingRight: '24px !important',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.5rem',
                  }
                }}
              >
                <MenuItem value="USDT">USDT</MenuItem>
                <MenuItem value="BTC">BTC</MenuItem>
                <MenuItem value="ETH">ETH</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        
        {/* Conversion row */}
        <Grid size={{ xs: 12 }} mt={0.5}>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              ≈ {isVisible ? '6.73' : '****'}
            </Typography>
            <FormControl variant="standard" sx={{ ml: 0.5 }}>
              <Select
                value={currency}
                onChange={handleChange}
                disableUnderline
                sx={{
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                  '& .MuiSelect-select': { 
                    padding: 0,
                    paddingRight: '20px !important',
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '1rem',
                  }
                }}
              >
                <MenuItem value="USDT">USDT</MenuItem>
                <MenuItem value="BTC">BTC</MenuItem>
                <MenuItem value="ETH">ETH</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        
        {/* Button row */}
        <Grid size={{ xs: 12 }} mt={1}>
          <Link href="/Deposit" passHref style={{ color: "inherit", textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: 50,
                py: 1,
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: 'none',
                maxWidth: 150,
              }}
            >
              Deposit
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserpanelTValue;
