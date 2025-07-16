'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Box, Typography, Grid, Select, MenuItem, Button, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Checkbox, IconButton, useTheme, TextField, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl,
  InputLabel, FormControlLabel, Switch, FormHelperText
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';
import ContactManagemen from './ContactManagemen';

interface Network {
  name: string;
  type: string;
}

interface WithdrawalAddress {
  id: string;
  crypto: string;
  network: Network;
  label: string;
  address: string;
  memo: string;
  onWhitelist: boolean;
}

const PER_PAGE = 5;
const SUPPORTED_CRYPTOS = ['BTC', 'ETH', 'SOL', 'USDT', 'XRP'];
const NETWORK_TYPES = {
  BTC: [{ name: 'BTC', type: 'Bitcoin' }],
  ETH: [{ name: 'ETH', type: 'Ethereum' }, { name: 'OP', type: 'Optimism' }],
  SOL: [{ name: 'SOL', type: 'Solana' }],
  USDT: [{ name: 'ETH', type: 'Ethereum' }, { name: 'TRX', type: 'Tron' }],
  XRP: [{ name: 'XRP', type: 'Ripple' }]
};

const UserpanelWithdrawal = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addresses, setAddresses] = useState<WithdrawalAddress[]>([
    {
      id: '1', crypto: 'SOL', network: { name: 'OP', type: 'Optimism' },
      label: 'ferferi', address: 'A13ASDASDGASDASDASDASDASDASDASDASD', memo: '---', onWhitelist: false
    }, {
      id: '2', crypto: 'BTC', network: { name: 'BTC', type: 'Bitcoin' },
      label: 'cold storage', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', memo: '---', onWhitelist: true
    }, {
      id: '3', crypto: 'ETH', network: { name: 'ETH', type: 'Ethereum' },
      label: 'my wallet', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', memo: '---', onWhitelist: false
    }, {
      id: '4', crypto: 'USDT', network: { name: 'TRX', type: 'Tron' },
      label: 'exchange', address: 'TQ5N7VY1XrBkLSUdY1sVg2s3Gk3PZgq5oJ', memo: '---', onWhitelist: true
    }, {
      id: '5', crypto: 'XRP', network: { name: 'XRP', type: 'Ripple' },
      label: 'backup', address: 'rP4PY2VeZfr9W1hjab4wC4i8UK97QeZbzW', memo: '123456', onWhitelist: false
    }
  ]);

  // Modal states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<WithdrawalAddress | null>(null);
  
  // Form states
  const [crypto, setCrypto] = useState('');
  const [network, setNetwork] = useState('');
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');
  const [onWhitelist, setOnWhitelist] = useState(false);
  const [bulkAddresses, setBulkAddresses] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter and paginate data
  const filteredData = useMemo(() => {
    return addresses.filter(item =>
      (selectedCrypto ? item.crypto === selectedCrypto : true) &&
      (selectedNetwork ? item.network.name === selectedNetwork : true) &&
      (selectedLabel ? item.label.toLowerCase().includes(selectedLabel.toLowerCase()) : true) &&
      (searchTerm ? (
        item.crypto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.address.toLowerCase().includes(searchTerm.toLowerCase())
      ) : true)
    );
  }, [addresses, selectedCrypto, selectedNetwork, selectedLabel, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PER_PAGE;
    return filteredData.slice(startIndex, startIndex + PER_PAGE);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / PER_PAGE);

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue);

  // Address selection
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddresses(event.target.checked ? paginatedData.map(a => a.id) : []);
  };

  const handleSelectAddress = (id: string) => {
    setSelectedAddresses(prev => prev.includes(id)
      ? prev.filter(i => i !== id)
      : [...prev, id]
    );
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  // Pagination
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Reset form
  const resetForm = () => {
    setCrypto('');
    setNetwork('');
    setLabel('');
    setAddress('');
    setMemo('');
    setOnWhitelist(false);
    setErrors({});
  };

  // Open add modal
  const openAddModal = () => {
    resetForm();
    setAddDialogOpen(true);
  };

  // Open edit modal
  const openEditModal = (addr: WithdrawalAddress) => {
    setEditingAddress(addr);
    setCrypto(addr.crypto);
    setNetwork(addr.network.name);
    setLabel(addr.label);
    setAddress(addr.address);
    setMemo(addr.memo);
    setOnWhitelist(addr.onWhitelist);
    setEditDialogOpen(true);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!crypto) newErrors.crypto = 'Crypto is required';
    if (!network) newErrors.network = 'Network is required';
    if (!label) newErrors.label = 'Label is required';
    if (!address) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add new address
  const handleAddAddress = () => {
    if (!validateForm()) return;
    
    const newAddress: WithdrawalAddress = {
      id: Date.now().toString(),
      crypto,
      network: NETWORK_TYPES[crypto as keyof typeof NETWORK_TYPES]
        .find(n => n.name === network) || { name: network, type: network },
      label,
      address,
      memo,
      onWhitelist
    };
    
    setAddresses(prev => [...prev, newAddress]);
    setAddDialogOpen(false);
    resetForm();
  };

  // Update address
  const handleUpdateAddress = () => {
    if (!editingAddress || !validateForm()) return;
    
    const updatedAddress: WithdrawalAddress = {
      ...editingAddress,
      crypto,
      network: NETWORK_TYPES[crypto as keyof typeof NETWORK_TYPES]
        .find(n => n.name === network) || { name: network, type: network },
      label,
      address,
      memo,
      onWhitelist
    };
    
    setAddresses(prev => 
      prev.map(a => a.id === editingAddress.id ? updatedAddress : a)
    );
    setEditDialogOpen(false);
  };

  // Handle bulk import
  const handleBulkImport = () => {
    if (!bulkAddresses.trim()) return;
    
    const newAddresses = bulkAddresses.split('\n')
      .filter(line => line.trim())
      .map((line, index) => {
        const [crypto, label, address, memo] = line.split(',');
        return {
          id: `bulk-${Date.now()}-${index}`,
          crypto: crypto || 'NEW',
          network: { name: crypto || 'NEW', type: `${crypto || 'New'} Network` },
          label: label || 'Bulk Import',
          address: address || '',
          memo: memo || '---',
          onWhitelist: false
        };
      });
    
    setAddresses(prev => [...prev, ...newAddresses]);
    setBulkDialogOpen(false);
    setBulkAddresses('');
  };

  // Handle crypto change - reset network
  useEffect(() => {
    if (crypto) {
      setNetwork(NETWORK_TYPES[crypto as keyof typeof NETWORK_TYPES][0]?.name || '');
    }
  }, [crypto]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab 
            label="Address Management" 
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              minWidth: 'auto',
              mr: 2,
              color: activeTab === 0 ? 'text.primary' : 'inherit',
            }}
          />
          <Tab 
            label="Contact Management" 
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              minWidth: 'auto',
              color: activeTab === 1 ? 'text.primary' : 'inherit',
            }}
          />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <>
          {/* Filters */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{xs:12, md : 12,lg:3}}>
                <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
                  Crypto
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value as string)}
                  displayEmpty
                  sx={{ borderRadius: '50px' }}
                >
                  <MenuItem value="">All Cryptos</MenuItem>
                  {SUPPORTED_CRYPTOS.map((crypto) => (
                    <MenuItem key={crypto} value={crypto}>{crypto}</MenuItem>
                  ))}
                </Select>
              </Grid>
              
              <Grid size={{xs:12, md : 12,lg:3}}>
                <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
                  Network
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value as string)}
                  displayEmpty
                  sx={{ borderRadius: '50px' }}
                >
                  <MenuItem value="">All Networks</MenuItem>
                  {[...new Set(addresses.map(a => a.network.name))].map((network) => (
                    <MenuItem key={network} value={network}>{network}</MenuItem>
                  ))}
                </Select>
              </Grid>
              
              <Grid size={{xs:12, md : 12,lg:3}}>
                <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
                  Label
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  value={selectedLabel}
                  onChange={(e) => setSelectedLabel(e.target.value as string)}
                  displayEmpty
                  sx={{ borderRadius: '50px' }}
                >
                  <MenuItem value="">All Labels</MenuItem>
                  {[...new Set(addresses.map(a => a.label))].map((label) => (
                    <MenuItem key={label} value={label}>{label}</MenuItem>
                  ))}
                </Select>
              </Grid>
              
              <Grid size={{xs:12, md : 12,lg:3}} sx={{ 
                display: 'flex', 
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                gap: 1
              }}>
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ 
                    p:2,
                    borderRadius: '50px',
                    textTransform: 'none',
                    height: '40px', fontSize: '80%',
                  }}
                  onClick={() => setBulkDialogOpen(true)}
                >
                  Bulk Adding
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ 
                    p:2,
                    borderRadius: '50px',
                    textTransform: 'none',
                    textWrap: 'nowrap',
                    height: '40px', fontSize: '77%',
                  }}
                  onClick={openAddModal}
                >
                  Add Address
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Search */}
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
                height: '40px',
                mb: 3
              }
            }}
            variant="outlined"
          />

          {/* Address Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
            <Table>
              <TableHead sx={{ bgcolor: "Background.paper" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    <Checkbox 
                      size="small" 
                      checked={selectedAddresses.length === paginatedData.length && paginatedData.length > 0}
                      indeterminate={selectedAddresses.length > 0 && selectedAddresses.length < paginatedData.length}
                      onChange={handleSelectAll}
                    />
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
                {paginatedData.map((address) => (
                  <TableRow key={address.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox 
                          size="small" 
                          sx={{ mr: 1 }} 
                          checked={selectedAddresses.includes(address.id)}
                          onChange={() => handleSelectAddress(address.id)}
                        />
                        <Box sx={{
                          width: 24,
                          height: 24,
                          mr: 1,
                          borderRadius: '50%',
                          bgcolor: "Background.paper",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: 12
                        }}>
                          {address.crypto.substring(0, 2)}
                        </Box>
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
                        <Typography variant="body1" sx={{ 
                          maxWidth: 120, 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {address.address}
                        </Typography>
                        <IconButton size="small" onClick={() => copyToClipboard(address.address)}>
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
                        onClick={() => openEditModal(address)}
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
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}
              onClick={() => changePage(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            
            {[...Array(totalPages)].map((_, i) => (
              <Button 
                key={i} 
                variant={currentPage === i + 1 ? 'contained' : 'outlined'} 
                size="small" 
                sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ borderRadius: '50%', minWidth: 32, height: 32 }}
              onClick={() => changePage(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              &gt;
            </Button>
          </Box>
        </>
      )}

      {activeTab === 1 && <ContactManagemen />}

      {/* Add Address Modal */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add New Withdrawal Address
          <IconButton onClick={() => setAddDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{xs:12, md : 6}}>
              <FormControl fullWidth error={!!errors.crypto}>
                <InputLabel>Crypto</InputLabel>
                <Select
                  value={crypto}
                  onChange={(e) => setCrypto(e.target.value as string)}
                  label="Crypto"
                >
                  {SUPPORTED_CRYPTOS.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
                {errors.crypto && <FormHelperText>{errors.crypto}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid size={{xs:12, md : 6}}>
              <FormControl fullWidth error={!!errors.network}>
                <InputLabel>Network</InputLabel>
                <Select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value as string)}
                  label="Network"
                  disabled={!crypto}
                >
                  {crypto && NETWORK_TYPES[crypto as keyof typeof NETWORK_TYPES]?.map((n) => (
                    <MenuItem key={n.name} value={n.name}>{n.name} ({n.type})</MenuItem>
                  ))}
                </Select>
                {errors.network && <FormHelperText>{errors.network}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                error={!!errors.label}
                helperText={errors.label}
              />
            </Grid>
            
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Memo/Tag (Optional)"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </Grid>
            
            <Grid size={{xs:12}}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={onWhitelist} 
                    onChange={(e) => setOnWhitelist(e.target.checked)} 
                  />
                }
                label="Add to Whitelist"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button variant="outlined" onClick={() => setAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddAddress}>
            Add Address
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Address Modal */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Edit Withdrawal Address
          <IconButton onClick={() => setEditDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{xs:12, md: 6}}>
              <FormControl fullWidth>
                <InputLabel>Crypto</InputLabel>
                <Select
                  value={crypto}
                  onChange={(e) => setCrypto(e.target.value as string)}
                  label="Crypto"
                >
                  {SUPPORTED_CRYPTOS.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid size={{xs:12, md: 6}}>
              <FormControl fullWidth>
                <InputLabel>Network</InputLabel>
                <Select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value as string)}
                  label="Network"
                >
                  {crypto && NETWORK_TYPES[crypto as keyof typeof NETWORK_TYPES]?.map((n) => (
                    <MenuItem key={n.name} value={n.name}>{n.name} ({n.type})</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </Grid>
            
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Memo/Tag"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </Grid>
            
            <Grid size={{xs:12}}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={onWhitelist} 
                    onChange={(e) => setOnWhitelist(e.target.checked)} 
                  />
                }
                label="On Whitelist"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => {
              if (editingAddress) {
                setAddresses(addresses.filter(a => a.id !== editingAddress.id));
                setEditDialogOpen(false);
              }
            }}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleUpdateAddress}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bulk Add Modal */}
      <Dialog open={bulkDialogOpen} onClose={() => setBulkDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Bulk Add Addresses
          <IconButton onClick={() => setBulkDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Add multiple addresses at once. Format each address as:
          </Typography>
          <Box component="pre" sx={{ 
            p: 2, 
            bgcolor: "Background.paper", 
            borderRadius: 1,
            mb: 3,
            fontFamily: 'monospace'
          }}>
            crypto,label,address,memo
          </Box>
          
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={bulkAddresses}
            onChange={(e) => setBulkAddresses(e.target.value)}
            placeholder={`BTC,Cold Wallet,1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa,\nETH,Hot Wallet,0x742d35Cc6634C0532925a3b844Bc454e4438f44e,\n...`}
          />
          
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              startIcon={<UploadIcon />}
              component="label"
              sx={{ mr: 2 }}
            >
              Upload CSV
              <input type="file" hidden accept=".csv" />
            </Button>
            <Typography variant="body2" color="text.secondary">
              Supports .csv files
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button variant="outlined" onClick={() => setBulkDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleBulkImport}>
            Import Addresses
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserpanelWithdrawal;