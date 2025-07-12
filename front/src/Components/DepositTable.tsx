"use client";
import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, LinearProgress, Chip, IconButton, TextField, MenuItem,
  TableSortLabel, InputAdornment, Button, Stack
} from '@mui/material';
import {
  Link as LinkIcon,
  ContentCopy as ContentCopyIcon,
  CurrencyBitcoin as BitcoinIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { deposits as initialDeposits } from '../data/data';
import { Icon } from '@iconify/react';
//////////////////

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

// ترتیب فیلدهای قابل مرتب‌سازی
type Order = 'asc' | 'desc';
type SortField = 'crypto' | 'network' | 'status' | 'amount' | 'progress' | 'time';

const DepositTable = () => {
  const [filters, setFilters] = useState({
    crypto: '',
    network: '',
    status: ''
  });
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortField>('time');
  const [searchText, setSearchText] = useState('');

  const handleSort = (field: SortField) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const filteredDeposits = useMemo(() => {
    return initialDeposits
      .filter(dep =>
        (!filters.crypto || dep.crypto.symbol === filters.crypto) &&
        (!filters.network || dep.network.name === filters.network) &&
        (!filters.status || dep.status === filters.status) &&
        (searchText === '' || 
          dep.crypto.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
          dep.network.name.toLowerCase().includes(searchText.toLowerCase()) ||
          dep.txd.toLowerCase().includes(searchText.toLowerCase()))
      )
      .sort((a, b) => {
        const aVal = orderBy === 'crypto' ? a.crypto.symbol :
                     orderBy === 'network' ? a.network.name :
                     orderBy === 'amount' ? a.amount :
                     orderBy === 'progress' ? a.progress :
                     orderBy === 'status' ? a.status :
                     orderBy === 'time' ? new Date(a.time).getTime() : 0;

        const bVal = orderBy === 'crypto' ? b.crypto.symbol :
                     orderBy === 'network' ? b.network.name :
                     orderBy === 'amount' ? b.amount :
                     orderBy === 'progress' ? b.progress :
                     orderBy === 'status' ? b.status :
                     orderBy === 'time' ? new Date(b.time).getTime() : 0;

        return (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) * (order === 'asc' ? 1 : -1);
      });
  }, [filters, order, orderBy, searchText]);

  const handleResetFilters = () => {
    setFilters({ crypto: '', network: '', status: '' });
    setSearchText('');
  };

  const hasFilters = filters.crypto || filters.network || filters.status || searchText;

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">Recent Deposit</Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'text.secondary',
          cursor: 'pointer',
          '&:hover': { color: 'primary.main' }
        }}>
          <Typography variant="body2">History</Typography>
          <ChevronRightIcon fontSize="small" sx={{ ml: 0.5 }} />
        </Box>
      </Box>

      {/* فیلترهای جدید */}
      <Paper elevation={0} sx={{ 
        p: 2, 
        mb: 3, 
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography variant="subtitle1" fontWeight={500} sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
            Filters
          </Typography>
          
          {hasFilters && (
            <Button 
              variant="text" 
              size="small" 
              startIcon={<ClearIcon />}
              onClick={handleResetFilters}
              sx={{ ml: 'auto' }}
            >
              Clear all
            </Button>
          )}
        </Stack>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { 
                borderRadius: 1,
                width: 220 
              }
            }}
          />
          
          <TextField
            select 
            label="Crypto"
            size="small"
            variant="outlined"
            value={filters.crypto}
            onChange={(e) => setFilters(prev => ({ ...prev, crypto: e.target.value }))}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All Cryptos</MenuItem>
            {[...new Set(initialDeposits.map(d => d.crypto.symbol))].map((crypto) => (
              <MenuItem key={crypto} value={crypto}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BitcoinIcon fontSize="small" sx={{ mr: 1 }} />
                  {crypto}
                </Box>
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select 
            label="Network"
            size="small"
            variant="outlined"
            value={filters.network}
            onChange={(e) => setFilters(prev => ({ ...prev, network: e.target.value }))}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All Networks</MenuItem>
            {[...new Set(initialDeposits.map(d => d.network.name))].map((net) => (
              <MenuItem key={net} value={net}>{net}</MenuItem>
            ))}
          </TextField>

          <TextField
            select 
            label="Status"
            size="small"
            variant="outlined"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="success">Success</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </TextField>
        </Box>

        {/* نشانگر فیلترهای فعال */}
        {hasFilters && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {filters.crypto && (
              <Chip 
                label={`Crypto: ${filters.crypto}`} 
                onDelete={() => setFilters(prev => ({ ...prev, crypto: '' }))}
                size="small"
              />
            )}
            {filters.network && (
              <Chip 
                label={`Network: ${filters.network}`} 
                onDelete={() => setFilters(prev => ({ ...prev, network: '' }))}
                size="small"
              />
            )}
            {filters.status && (
              <Chip 
                label={`Status: ${filters.status === 'success' ? 'Success' : filters.status === 'pending' ? 'Pending' : 'Failed'}`} 
                onDelete={() => setFilters(prev => ({ ...prev, status: '' }))}
                size="small"
                color={filters.status === 'success' ? 'success' : filters.status === 'pending' ? 'warning' : 'error'}
              />
            )}
            {searchText && (
              <Chip 
                label={`Search: ${searchText}`} 
                onDelete={() => setSearchText('')}
                size="small"
              />
            )}
          </Box>
        )}
      </Paper>

      {/* جدول */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="recent deposits">
          <TableHead sx={{ bgcolor: 'background.paper' }}>
            <TableRow>
              {[
                { id: 'crypto', label: 'Crypto' },
                { id: 'network', label: 'Network' },
                { id: 'time', label: 'Time' },
                { id: 'status', label: 'Status' },
                { id: 'amount', label: 'Amount' },
                { id: 'txd', label: 'TxD' },
                { id: 'progress', label: 'Progress' },
              ].map((col) => (
                <TableCell key={col.id}>
                  {['txd'].includes(col.id) ? col.label : (
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? order : 'asc'}
                      onClick={() => handleSort(col.id as SortField)}
                    >
                      {col.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDeposits.map((deposit) => (
              <TableRow key={deposit.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon 
                        icon={`cryptocurrency-color:${deposit.crypto.symbol.toLowerCase()}`} 
                        width={20} 
                        height={20} 
                        onError={(e) => e.currentTarget.style.display = 'none'} // fallback optional
                    />
                    <Typography sx={{ ml: 1 }}>{deposit.crypto.symbol}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography>{deposit.network.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{deposit.network.type}</Typography>
                </TableCell>
                <TableCell>{deposit.time}</TableCell>
                <TableCell>
                  <Chip
                    label={deposit.status === 'success' ? 'Deposit successful' :
                           deposit.status === 'pending' ? 'Processing' : 'Failed'}
                    color={deposit.status === 'success' ? 'success' :
                           deposit.status === 'pending' ? 'warning' : 'error'}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{deposit.amount} {deposit.crypto.symbol}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {deposit.txd.substring(0, 6)}...{deposit.txd.substring(deposit.txd.length - 4)}
                    </Typography>
                    <IconButton size="small" onClick={() => window.open(`https://explorer.com/tx/${deposit.txd}`, '_blank')}>
                      <LinkIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => copyToClipboard(deposit.txd)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1, minWidth: 40 }}>{deposit.progress}%</Typography>
                    <Box sx={{ width: '100%', maxWidth: 150 }}>
                      <LinearProgress
                        variant="determinate"
                        value={deposit.progress}
                        color={
                          deposit.status === 'success' ? 'success' :
                          deposit.status === 'pending' ? 'warning' : 'error'
                        }
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DepositTable;