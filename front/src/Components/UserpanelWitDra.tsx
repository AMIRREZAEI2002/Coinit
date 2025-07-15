import React, { useState } from 'react';
import {
  Box, Typography, Grid, Select, MenuItem, Button, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, IconButton, useTheme, Link, Divider, InputAdornment,
  TextField
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const UserpanelWitDra = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for withdrawal addresses
  const withdrawalAddresses = [
    {
      id: '1',
      crypto: 'SOL',
      icon: 'solana.webp',
      network: { name: 'OP', type: 'Optimism(OP)' },
      label: 'ferferi',
      address: 'A13ASDAS...',
      memo: '---',
      onWhitelist: false
    },
    {
      id: '2',
      crypto: 'BTC',
      icon: 'bitcoin.webp',
      network: { name: 'BTC', type: 'Bitcoin' },
      label: 'cold storage',
      address: '1A1zP1eP5...',
      memo: '---',
      onWhitelist: true
    },
    {
      id: '3',
      crypto: 'ETH',
      icon: 'ethereum.webp',
      network: { name: 'ETH', type: 'Ethereum' },
      label: 'my wallet',
      address: '0x742d35Cc...',
      memo: '---',
      onWhitelist: false
    },
    {
      id: '4',
      crypto: 'USDT',
      icon: 'tether.webp',
      network: { name: 'TRX', type: 'Tron' },
      label: 'exchange',
      address: 'TQ5N7VY1...',
      memo: '---',
      onWhitelist: true
    },
    {
      id: '5',
      crypto: 'XRP',
      icon: 'ripple.webp',
      network: { name: 'XRP', type: 'Ripple' },
      label: 'backup',
      address: 'rP4PY2Ve...',
      memo: '123456',
      onWhitelist: false
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <SettingsIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
        <Typography variant="h5" fontWeight="bold">
          Withdrawal Addresses/Contacts
        </Typography>
      </Box>
      
      {/* Status Messages */}
      <Box sx={{ 
        backgroundColor: theme.palette.grey[100], 
        p: 2, 
        borderRadius: 1,
        mb: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Withdrawal whitelist has been disabled
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Withdrawal whitelist has been disabled
          </Typography>
        </Box>
        <Link href="#" sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="primary">
            Go to Settings
          </Typography>
        </Link>
      </Box>
      
      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
              Crypto
            </Typography>
            <Select
              fullWidth
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              displayEmpty
              size="small"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="SOL">Solana (SOL)</MenuItem>
              <MenuItem value="BTC">Bitcoin (BTC)</MenuItem>
              <MenuItem value="ETH">Ethereum (ETH)</MenuItem>
              <MenuItem value="USDT">Tether (USDT)</MenuItem>
              <MenuItem value="XRP">Ripple (XRP)</MenuItem>
            </Select>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
              Network
            </Typography>
            <Select
              fullWidth
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              displayEmpty
              size="small"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="OP">Optimism (OP)</MenuItem>
              <MenuItem value="BTC">Bitcoin Network</MenuItem>
              <MenuItem value="ETH">Ethereum Network</MenuItem>
              <MenuItem value="TRX">Tron Network</MenuItem>
              <MenuItem value="XRP">Ripple Network</MenuItem>
            </Select>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
              Label
            </Typography>
            <Select
              fullWidth
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value)}
              displayEmpty
              size="small"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="ferferi">ferferi</MenuItem>
              <MenuItem value="cold">Cold Storage</MenuItem>
              <MenuItem value="wallet">My Wallet</MenuItem>
              <MenuItem value="exchange">Exchange</MenuItem>
              <MenuItem value="backup">Backup</MenuItem>
            </Select>
          </Grid>
          
          <Grid item xs={12} md={3} sx={{ 
            display: 'flex', 
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            gap: 1
          }}>
            <Button 
              variant="outlined" 
              fullWidth
              sx={{ 
                borderRadius: '50px',
                textTransform: 'none',
                height: '40px'
              }}
            >
              Bulk Adding
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<AddIcon />}
              fullWidth
              sx={{ 
                borderRadius: '50px',
                textTransform: 'none',
                height: '40px'
              }}
            >
              Add Address
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="management tabs">
          <Tab 
            label="Address Management" 
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: activeTab === 0 ? theme.palette.primary.main : 'inherit',
              borderBottom: activeTab === 0 ? `2px solid ${theme.palette.primary.main}` : 'none'
            }}
          />
          <Tab 
            label="Contact Management" 
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: activeTab === 1 ? theme.palette.primary.main : 'inherit',
              borderBottom: activeTab === 1 ? `2px solid ${theme.palette.primary.main}` : 'none'
            }}
          />
        </Tabs>
      </Box>
      
      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search addresses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '50px',
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.03)',
              paddingLeft: '12px',
              height: '40px'
            }
          }}
          variant="outlined"
        />
      </Box>
      
      {/* Address Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Checkbox size="small" />
                Crypto
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Network</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Label</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Memo/Tag</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>On Whitelist</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawalAddresses.map((address) => (
              <TableRow key={address.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox size="small" sx={{ mr: 1 }} />
                    <Box
                      component="img"
                      src={address.icon}
                      alt={address.crypto}
                      sx={{ width: 24, height: 24, mr: 1, borderRadius: '50%' }}
                    />
                    <Typography variant="body1">{address.crypto}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" fontWeight="medium">
                    {address.network.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {address.network.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{address.label}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                      {address.address}
                    </Typography>
                    <IconButton size="small">
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{address.memo}</Typography>
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body1" 
                    color={address.onWhitelist ? theme.palette.success.main : theme.palette.error.main}
                  >
                    {address.onWhitelist ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ 
                      borderRadius: '50px', 
                      textTransform: 'none',
                      minWidth: 100,
                      height: 30
                    }}
                  >
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
        <Button variant="outlined" size="small" sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}>
          &lt;
        </Button>
        <Button variant="contained" size="small" sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}>
          1
        </Button>
        <Button variant="outlined" size="small" sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}>
          2
        </Button>
        <Button variant="outlined" size="small" sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}>
          3
        </Button>
        <Button variant="outlined" size="small" sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}>
          4
        </Button>
        <Button variant="outlined" size="small" sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}>
          5
        </Button>
        <Typography variant="body1" sx={{ mx: 1, display: 'flex', alignItems: 'center' }}>...</Typography>
        <Button variant="outlined" size="small" sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}>
          315
        </Button>
        <Button variant="outlined" size="small" sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}>
          &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default UserpanelWitDra;