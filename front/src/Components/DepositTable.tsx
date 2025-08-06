"use client";
import React, { useState, useMemo } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, LinearProgress, Chip, IconButton, TextField, MenuItem,
  TableSortLabel, InputAdornment, Button, Stack, Grid, Card, CardContent,
  useMediaQuery, Collapse, Divider, CardHeader, Avatar,
  useTheme
} from '@mui/material';
import {
  Link as LinkIcon,
  ContentCopy as ContentCopyIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { deposits as initialDeposits } from '../data/data';
import { Icon } from '@iconify/react';

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

type Order = 'asc' | 'desc';
type SortField = 'crypto' | 'network' | 'status' | 'amount' | 'progress' | 'time';

const DepositTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filters, setFilters] = useState({
    crypto: '',
    network: '',
    status: ''
  });
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortField>('time');
  const [searchText, setSearchText] = useState('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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

  const toggleCardExpand = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const renderMobileCard = (deposit: typeof initialDeposits[0]) => (
    <Card key={deposit.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'transparent' }}>
            <Icon 
              icon={`cryptocurrency-color:${deposit.crypto.symbol.toLowerCase()}`} 
              width={24} 
              height={24} 
            />
          </Avatar>
        }
        action={
          <IconButton onClick={() => toggleCardExpand(deposit.id)}>
            {expandedCard === deposit.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" fontWeight={500}>
            {deposit.amount} {deposit.crypto.symbol}
          </Typography>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Chip
              label={deposit.status === 'success' ? 'Success' :
                     deposit.status === 'pending' ? 'Processing' : 'Failed'}
              color={deposit.status === 'success' ? 'success' :
                     deposit.status === 'pending' ? 'warning' : 'error'}
              size="small"
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              {deposit.time}
            </Typography>
          </Box>
        }
      />

      <Collapse in={expandedCard === deposit.id} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={1.5}>
            <Grid size={{xs:12}}>
              <Divider sx={{ mb: 1 }} />
            </Grid>
            
            <Grid size={{xs:6}}>
              <Typography variant="caption" color="text.secondary">Network</Typography>
              <Typography>{deposit.network.name}</Typography>
              <Typography variant="caption" color="text.secondary">{deposit.network.type}</Typography>
            </Grid>
            
            <Grid size={{xs:6}}>
              <Typography variant="caption" color="text.secondary">Progress</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
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
                <Typography variant="body2">{deposit.progress}%</Typography>
              </Box>
            </Grid>
            
            <Grid size={{xs:12}}>
              <Typography variant="caption" color="text.secondary">Transaction ID</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ 
                  fontFamily: 'monospace',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flexGrow: 1
                }}>
                  {deposit.txd.substring(0, 12)}...{deposit.txd.substring(deposit.txd.length - 6)}
                </Typography>
                <IconButton size="small" onClick={() => window.open(`https://explorer.com/tx/${deposit.txd}`, '_blank')}>
                  <LinkIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => copyToClipboard(deposit.txd)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );

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

      {/* فیلترها - برای موبایل و دسکتاپ */}
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
                width: isMobile ? '100%' : 220 
              }
            }}
            sx={{ flexGrow: isMobile ? 1 : 0 }}
          />
          
          <TextField
            select 
            label="Crypto"
            size="small"
            variant="outlined"
            value={filters.crypto}
            onChange={(e) => setFilters(prev => ({ ...prev, crypto: e.target.value }))}
            sx={{ minWidth: isMobile ? '100%' : 180, flexGrow: isMobile ? 1 : 0 }}
          >
            <MenuItem value="">All Cryptos</MenuItem>
            {[...new Set(initialDeposits.map(d => d.crypto.symbol))].map((crypto) => (
              <MenuItem key={crypto} value={crypto}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon 
                    icon={`cryptocurrency-color:${crypto.toLowerCase()}`} 
                    width={20} 
                    height={20} 
                    style={{ marginRight: 8 }}
                  />
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
            sx={{ minWidth: isMobile ? '100%' : 180, flexGrow: isMobile ? 1 : 0 }}
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
            sx={{ minWidth: isMobile ? '100%' : 180, flexGrow: isMobile ? 1 : 0 }}
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

      {/* حالت دسکتاپ - جدول */}
      {!isMobile && (
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
      )}

      {/* حالت موبایل - کارت‌ها */}
      {isMobile && (
        <Box sx={{ mt: 2 }}>
          {filteredDeposits.length > 0 ? (
            filteredDeposits.map(renderMobileCard)
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="body1" color="text.secondary">
                No deposits found with current filters
              </Typography>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DepositTable;