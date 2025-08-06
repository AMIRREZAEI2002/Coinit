'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Box, Button, Grid, InputAdornment, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, TextField, 
  Typography, useTheme, Stack, Divider
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import { Icon } from '@iconify/react';
import { useMediaQuery } from '@mui/material';

type TradingPair = {
  id: string;
  name: string;
  makerFee: string;
  takerFee: string;
  feeDiscount: 'none' | 'zero' | 'mx20' | 'mx50';
  tabType: 'spot' | 'future' | 'deposit';
};

const UserpanelHoldTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState<'spot' | 'future' | 'deposit'>('spot');
  const [activeFilter] = useState<'all' | 'zero' | 'mx20' | 'mx50'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const tradingPairs: TradingPair[] = [
    { id: 's1', name: 'SOL/USDT', makerFee: '0.000000%', takerFee: '0.000000%', feeDiscount: 'zero', tabType: 'spot' },
    { id: 's2', name: 'BTC/USDT', makerFee: '0.000100%', takerFee: '0.000200%', feeDiscount: 'mx20', tabType: 'spot' },
    { id: 's3', name: 'ETH/USDT', makerFee: '0.000150%', takerFee: '0.000250%', feeDiscount: 'mx50', tabType: 'spot' },
    { id: 's4', name: 'ADA/USDT', makerFee: '0.000200%', takerFee: '0.000300%', feeDiscount: 'none', tabType: 'spot' },
    { id: 's5', name: 'DOT/USDT', makerFee: '0.000180%', takerFee: '0.000280%', feeDiscount: 'mx20', tabType: 'spot' },
    { id: 'f1', name: 'XRP-PERP', makerFee: '0.000220%', takerFee: '0.000320%', feeDiscount: 'mx50', tabType: 'future' },
    { id: 'f2', name: 'DOGE-PERP', makerFee: '0.000250%', takerFee: '0.000350%', feeDiscount: 'none', tabType: 'future' },
    { id: 'f3', name: 'LTC-PERP', makerFee: '0.000170%', takerFee: '0.000270%', feeDiscount: 'zero', tabType: 'future' },
    { id: 'f4', name: 'BNB-PERP', makerFee: '0.000120%', takerFee: '0.000220%', feeDiscount: 'mx50', tabType: 'future' },
    { id: 'f5', name: 'LINK-PERP',makerFee: '0.000190%', takerFee: '0.000290%', feeDiscount: 'mx20', tabType: 'future' },
    { id: 'd1', name: 'BTC Deposit', makerFee: '0.000000%', takerFee: '0.000000%', feeDiscount: 'zero', tabType: 'deposit' },
    { id: 'd2', name: 'ETH Deposit', makerFee: '0.000000%', takerFee: '0.000000%', feeDiscount: 'zero', tabType: 'deposit' },
    { id: 'd3', name: 'USDT Deposit', makerFee: '0.000000%', takerFee: '0.000000%', feeDiscount: 'zero', tabType: 'deposit' },
    { id: 'd4', name: 'BTC Withdrawal', makerFee: '0.000100%', takerFee: '0.000200%', feeDiscount: 'mx20', tabType: 'deposit' },
    { id: 'd5', name: 'ETH Withdrawal', makerFee: '0.000150%', takerFee: '0.000250%', feeDiscount: 'mx50', tabType: 'deposit' },
  ];

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

  const paginatedPairs = filteredPairs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleTabChange = (tab: 'spot' | 'future' | 'deposit') => {
    setActiveTab(tab);
    setPage(1);
  };


  const getTabTitle = () => {
    switch(activeTab) {
      case 'spot': return 'Spot Trading Fees';
      case 'future': return 'Futures Trading Fees';
      case 'deposit': return 'Deposit/Withdrawal Fees';
      default: return 'Trading Fees';
    }
  };

  const getActionButtonText = () => {
    switch(activeTab) {
      case 'spot': return 'Trade';
      case 'future': return 'Trade';
      case 'deposit': return 'Manage';
      default: return 'Action';
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getActionButtonLink = (pair: TradingPair) => {
    switch(activeTab) {
      case 'spot': return `/Spot`;
      case 'future': return `/Future`;
      case 'deposit': return `/Deposit`;
      default: return '#';
    }
  };

  return (
    <Box sx={{ mt: 3, p: 2 }}>
      {/* Tabs */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid size={{xs:12, md:6}} sx={{ mb: { xs: 2, md: 0 } }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button sx={{p:0.5,fontSize:{xs:11,md:15}}} variant={activeTab === 'spot' ? 'contained' : 'outlined'} onClick={() => handleTabChange('spot')}>Spot</Button>
            <Button sx={{p:0.5,fontSize:{xs:11,md:15}}} variant={activeTab === 'future' ? 'contained' : 'outlined'} onClick={() => handleTabChange('future')}>Future</Button>
            <Button sx={{p:0.5,fontSize:{xs:11,md:15}}} variant={activeTab === 'deposit' ? 'contained' : 'outlined'} onClick={() => handleTabChange('deposit')}>Deposit/Withdrawal</Button>
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
              sx: { borderRadius: '50px', height: '40px' }
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        {getTabTitle()}
      </Typography>

      {/* Table or Mobile View */}
      {!isMobile ? (
        <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{activeTab === 'deposit' ? 'Asset' : 'Trading Pair'}</TableCell>
                <TableCell>Maker</TableCell>
                <TableCell>Taker</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPairs.length > 0 ? (
                paginatedPairs.map((pair) => (
                  <TableRow key={pair.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon={`cryptocurrency:${pair.name.split('/')[0].toLowerCase()}`} width={24} height={24} style={{ marginRight: 8 }} />
                        {pair.name}
                      </Box>
                    </TableCell>
                    <TableCell>{pair.makerFee}</TableCell>
                    <TableCell>{pair.takerFee}</TableCell>
                    <TableCell align="center">
                      <Button
                        component={Link}
                        href={getActionButtonLink(pair)}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: '50px', textTransform: 'none' }}
                      >
                        {getActionButtonText()}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No {activeTab} pairs found matching your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack spacing={2}>
          {paginatedPairs.map((pair) => (
            <Box key={pair.id} sx={{ p: 1, borderRadius: 2, backgroundColor: theme.palette.background.paper, boxShadow: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon={`cryptocurrency:${pair.name.split('/')[0].toLowerCase()}`} width={24} height={24} style={{ marginRight: 8 }} />
                  <Typography variant="subtitle1" fontWeight={700}>{pair.name}</Typography>
                </Box>
                <Button
                  component={Link}
                  href={getActionButtonLink(pair)}
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 30, textTransform: 'none' }}
                >
                  {getActionButtonText()}
                </Button>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <Box display="flex" justifyContent="space-between"><Typography>Maker</Typography><Typography>{pair.makerFee}</Typography></Box>
              <Box display="flex" justifyContent="space-between"><Typography>Taker</Typography><Typography>{pair.takerFee}</Typography></Box>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UserpanelHoldTable;
