import React, { useState } from 'react';
import { 
  Box, Button, Grid, InputAdornment, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, TextField, 
  Typography, useTheme, Stack, Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

// Define type for trading pair
type TradingPair = {
  id: string;
  name: string;
  makerFee: string;
  takerFee: string;
  feeDiscount: 'none' | 'zero' | 'mx20' | 'mx50';
  tabType: 'spot' | 'future' | 'deposit';
};
import { Icon } from '@iconify/react';

const UserpanelHoldTable = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'spot' | 'future' | 'deposit'>('spot');
  const [activeFilter, setActiveFilter] = useState<'all' | 'zero' | 'mx20' | 'mx50'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  
  // Mock data for trading pairs with tab-specific data
  const tradingPairs: TradingPair[] = [
    // Spot trading pairs
    { id: 's1', name: 'SOL/USDT', makerFee: '0.000000%', takerFee: '0.000000%', feeDiscount: 'zero', tabType: 'spot' },
    { id: 's2', name: 'BTC/USDT', makerFee: '0.000100%', takerFee: '0.000200%', feeDiscount: 'mx20', tabType: 'spot' },
    { id: 's3', name: 'ETH/USDT', makerFee: '0.000150%', takerFee: '0.000250%', feeDiscount: 'mx50', tabType: 'spot' },
    { id: 's4', name: 'ADA/USDT', makerFee: '0.000200%', takerFee: '0.000300%', feeDiscount: 'none', tabType: 'spot' },
    { id: 's5', name: 'DOT/USDT', makerFee: '0.000180%', takerFee: '0.000280%', feeDiscount: 'mx20', tabType: 'spot' },
    
    // Futures trading pairs
    { id: 'f1', name: 'XRP-PERP', makerFee: '0.000220%', takerFee: '0.000320%', feeDiscount: 'mx50', tabType: 'future' },
    { id: 'f2', name: 'DOGE-PERP', makerFee: '0.000250%', takerFee: '0.000350%', feeDiscount: 'none', tabType: 'future' },
    { id: 'f3', name: 'LTC-PERP', makerFee: '0.000170%', takerFee: '0.000270%', feeDiscount: 'zero', tabType: 'future' },
    { id: 'f4', name: 'BNB-PERP', makerFee: '0.000120%', takerFee: '0.000220%', feeDiscount: 'mx50', tabType: 'future' },
    { id: 'f5', name: 'LINK-PERP',makerFee: '0.000190%', takerFee: '0.000290%', feeDiscount: 'mx20', tabType: 'future' },
    
    // Deposit/Withdrawal pairs
    { id: 'd1', name: 'BTC Deposit', makerFee: '0.000000%', takerFee: '0.000000%', feeDiscount: 'zero', tabType: 'deposit' },
    { id: 'd2', name: 'ETH Deposit', makerFee: '0.000000%', takerFee: '0.000000%', feeDiscount: 'zero', tabType: 'deposit' },
    { id: 'd3', name: 'USDT Deposit', makerFee: '0.000000%', takerFee: '0.000000%', feeDiscount: 'zero', tabType: 'deposit' },
    { id: 'd4', name: 'BTC Withdrawal', makerFee: '0.000100%', takerFee: '0.000200%', feeDiscount: 'mx20', tabType: 'deposit' },
    { id: 'd5', name: 'ETH Withdrawal', makerFee: '0.000150%', takerFee: '0.000250%', feeDiscount: 'mx50', tabType: 'deposit' },
  ];
  
  // Filter trading pairs based on active tab, active filter, and search term
  const filteredPairs = tradingPairs.filter(pair => {
    const matchesTab = pair.tabType === activeTab;
    const matchesSearch = pair.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesTab) return false;
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'zero') return pair.feeDiscount === 'zero' && matchesSearch;
    if (activeFilter === 'mx20') return pair.feeDiscount === 'mx20' && matchesSearch;
    if (activeFilter === 'mx50') return pair.feeDiscount === 'mx50' && matchesSearch;
    
    return matchesSearch;
  });
  
  // Pagination logic
  const pageCount = Math.ceil(filteredPairs.length / rowsPerPage);
  const paginatedPairs = filteredPairs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  
  // Handle tab change
  const handleTabChange = (tab: 'spot' | 'future' | 'deposit') => {
    setActiveTab(tab);
    setPage(1);
  };
  
  // Handle filter change
  const handleFilterChange = (filter: 'all' | 'zero' | 'mx20' | 'mx50') => {
    setActiveFilter(filter);
    setPage(1);
  };
  
  // Get tab-specific title
  const getTabTitle = () => {
    switch(activeTab) {
      case 'spot': return 'Spot Trading Fees';
      case 'future': return 'Futures Trading Fees';
      case 'deposit': return 'Deposit/Withdrawal Fees';
      default: return 'Trading Fees';
    }
  };
  
  // Get tab-specific action button text
  const getActionButtonText = () => {
    switch(activeTab) {
      case 'spot': return 'Trade';
      case 'future': return 'Trade';
      case 'deposit': return 'Manage';
      default: return 'Action';
    }
  };

  return (
    <Box sx={{ mt: 3, p: 2 }}>
      {/* Tabs and Search Section */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid size={{xs:12, md:6}} sx={{ mb: { xs: 2, md: 0 } }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={activeTab === 'spot' ? 'contained' : 'outlined'}
              onClick={() => handleTabChange('spot')}
              sx={{
                borderRadius: 0,
                borderBottom: activeTab === 'spot' ? `2px solid ${theme.palette.primary.main}` : 'none',
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: activeTab === 'spot' ? theme.palette.primary.main : 'transparent',
                }
              }}
            >
              Spot
            </Button>
            <Button
              variant={activeTab === 'future' ? 'contained' : 'outlined'}
              onClick={() => handleTabChange('future')}
              sx={{
                borderRadius: 0,
                borderBottom: activeTab === 'future' ? `2px solid ${theme.palette.primary.main}` : 'none',
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: activeTab === 'future' ? theme.palette.primary.main : 'transparent',
                }
              }}
            >
              Future
            </Button>
            <Button
              variant={activeTab === 'deposit' ? 'contained' : 'outlined'}
              onClick={() => handleTabChange('deposit')}
              sx={{
                borderRadius: 0,
                borderBottom: activeTab === 'deposit' ? `2px solid ${theme.palette.primary.main}` : 'none',
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: activeTab === 'deposit' ? theme.palette.primary.main : 'transparent',
                }
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="body2" fontWeight="bold">
                  Deposit/Withdrawal
                </Typography>
              </Box>
            </Button>
          </Box>
        </Grid>
        
        <Grid size={{xs:12, md : 6}}>
          <TextField
            fullWidth
            placeholder={`Search ${activeTab} pairs`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
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
        </Grid>
      </Grid>
      
      {/* Tab-specific title */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        {getTabTitle()}
      </Typography>
      
      {/* Filter Chips */}
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Chip
          label="All"
          onClick={() => handleFilterChange('all')}
          color={activeFilter === 'all' ? 'primary' : 'default'}
          sx={{ borderRadius: '4px' }}
        />
        <Chip
          label="0 Fee"
          onClick={() => handleFilterChange('zero')}
          color={activeFilter === 'zero' ? 'primary' : 'default'}
          sx={{ borderRadius: '4px' }}
        />
        <Chip
          label="20$ MX Discount"
          onClick={() => handleFilterChange('mx20')}
          color={activeFilter === 'mx20' ? 'primary' : 'default'}
          sx={{ borderRadius: '4px' }}
        />
        <Chip
          label="50% off for MX Holder"
          onClick={() => handleFilterChange('mx50')}
          color={activeFilter === 'mx50' ? 'primary' : 'default'}
          sx={{ borderRadius: '4px' }}
        />
      </Box>
      
      {/* Trading Pairs Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1, mb: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
                {activeTab === 'deposit' ? 'Asset' : 'Trading Pair'}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
                Maker
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
                Taker
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPairs.length > 0 ? (
              paginatedPairs.map((pair) => (
                <TableRow key={pair.id} hover>
                    <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Icon
                            icon={`cryptocurrency:${pair.name.split('/')[0].toLowerCase()}`}
                            width={24}
                            height={24}
                            style={{ marginRight: 8 }}
                            />
                            <Typography variant="body1" fontWeight="medium">
                            {pair.name}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell>
                        <Typography 
                        variant="body1" 
                        color={pair.feeDiscount === 'zero' ? theme.palette.success.main : 'inherit'}
                        >
                        {pair.makerFee}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography 
                        variant="body1" 
                        color={pair.feeDiscount === 'zero' ? theme.palette.success.main : 'inherit'}
                        >
                        {pair.takerFee}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ 
                            borderRadius: '50px', 
                            textTransform: 'none',
                            minWidth: 80,
                            height: 30
                        }}
                        >
                        {getActionButtonText()}
                        </Button>
                    </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No {activeTab} pairs found matching your search
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button 
            variant="outlined" 
            size="small" 
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            sx={{ 
              borderRadius: '50%', 
              minWidth: 32, 
              height: 32,
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.03)',
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </Button>
          
          {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
            let pageNum = i + 1;
            if (pageCount > 5) {
              if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= pageCount - 2) {
                pageNum = pageCount - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
            }
            
            return (
              <Button
                key={pageNum}
                variant={pageNum === page ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setPage(pageNum)}
                sx={{ 
                  borderRadius: '50%', 
                  minWidth: 32, 
                  height: 32,
                  ...(pageNum === page ? {} : {
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.03)',
                  })
                }}
              >
                {pageNum}
              </Button>
            );
          })}
          
          {pageCount > 5 && page < pageCount - 2 && (
            <Typography sx={{ mx: 1 }}>...</Typography>
          )}
          
          {pageCount > 5 && page < pageCount - 2 && (
            <Button
              variant={page === pageCount ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setPage(pageCount)}
              sx={{ 
                borderRadius: '50%', 
                minWidth: 32, 
                height: 32,
                ...(pageCount === page ? {} : {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.03)',
                })
              }}
            >
              {pageCount}
            </Button>
          )}
          
          <Button 
            variant="outlined" 
            size="small" 
            disabled={page === pageCount}
            onClick={() => setPage(p => Math.min(pageCount, p + 1))}
            sx={{ 
              borderRadius: '50%', 
              minWidth: 32, 
              height: 32,
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.03)',
            }}
          >
            <ChevronRightIcon fontSize="small" />
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserpanelHoldTable;