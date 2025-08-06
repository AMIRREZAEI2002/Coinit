'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  styled,
  useTheme,
  IconButton,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

// Interface for table data
interface TransactionRow {
  id: number;
  crypto: string;
  network: string;
  time: string;
  status: string;
  amount: number;
  txid: string;
  destinationAddress: string;
  fee: number;
}

// Sample data (diverse)
const rows: TransactionRow[] = [
  {
    id: 1,
    crypto: 'SOL/USDT',
    network: 'ZKLINK',
    time: '2025-07-18 17:30:00',
    status: 'Completed',
    amount: 50,
    txid: '0xabc12...34e5',
    destinationAddress: '0x123...7890',
    fee: 0.05,
  },
  {
    id: 2,
    crypto: 'BTC/USDT',
    network: 'Bitcoin',
    time: '2025-07-18 11:45:20',
    status: 'Pending',
    amount: 0.01,
    txid: '0xdef34...56f7',
    destinationAddress: '0x456...1234',
    fee: 0.0005,
  },
  {
    id: 3,
    crypto: 'ETH/USDT',
    network: 'Ethereum',
    time: '2025-07-17 10:20:15',
    status: 'Failed',
    amount: 1.5,
    txid: '0xghi56...78g8',
    destinationAddress: '0x789...4567',
    fee: 0.002,
  },
  {
    id: 4,
    crypto: 'ADA/USDT',
    network: 'Cardano',
    time: '2025-07-17 19:10:40',
    status: 'Completed',
    amount: 1000,
    txid: '0xjkl78...90h9',
    destinationAddress: '0xabc...8901',
    fee: 0.1,
  },
  {
    id: 5,
    crypto: 'DOT/USDT',
    network: 'Polkadot',
    time: '2025-07-16 12:15:30',
    status: 'Processing',
    amount: 120,
    txid: '0xmno90...12i0',
    destinationAddress: '0xdef...2345',
    fee: 0.08,
  },
  {
    id: 6,
    crypto: 'XRP/USDT',
    network: 'Ripple',
    time: '2025-07-16 14:50:25',
    status: 'Cancelled',
    amount: 300,
    txid: '0xpqr12...34j1',
    destinationAddress: '0xghi...5678',
    fee: 0.01,
  },
  {
    id: 7,
    crypto: 'BNB/USDT',
    network: 'Binance Smart Chain',
    time: '2025-07-15 13:25:45',
    status: 'Completed',
    amount: 8,
    txid: '0xstu34...56k2',
    destinationAddress: '0xjkl...7890',
    fee: 0.03,
  },
  {
    id: 8,
    crypto: 'LINK/USDT',
    network: 'Ethereum',
    time: '2025-07-15 09:30:10',
    status: 'Pending',
    amount: 40,
    txid: '0xvwx56...78l3',
    destinationAddress: '0xmno...1234',
    fee: 0.0015,
  },
];

// Styled Components
const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(2),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
  marginTop: theme.spacing(3),
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,
    backgroundColor: theme.palette.action.hover,
    fontSize: '0.85rem',
    height: 32,
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: 8,
  backgroundColor: theme.palette.action.hover,
  fontSize: '0.85rem',
  height: 32,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 20,
  padding: theme.spacing(0.5, 1.5),
  fontSize: '0.75rem',
  fontWeight: 500,
  height: 30,
  boxShadow: 'none',
  backgroundColor: theme.palette.background.paper,
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  '&:hover': {
    boxShadow: theme.shadows[2],
    borderColor: theme.palette.primary.main,
  },
}));

const TransactionCard = styled(motion(Box))(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.1)',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
  },
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.up('md')]: {
    marginBottom: 0,
  },
}));

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

const WalletFundingSectionWithdrawal: React.FC = () => {
  const theme = useTheme();
  const today = new Date().toISOString().split('T')[0]; // Current date: 2025-07-18
  const [startDate, setStartDate] = useState<string>('2025-07-15'); // Set to earliest data date
  const [endDate, setEndDate] = useState<string>(today);
  const [filter, setFilter] = useState<string>('All');

  // Debug filtering
  useEffect(() => {
    console.log('Filtered Rows:', filteredRows.length, filteredRows);
    console.log('Filter State:', { startDate, endDate, filter });
  }, [startDate, endDate, filter]);

  // Button handlers
  const handleReset = () => {
    setStartDate('2025-07-15');
    setEndDate(today);
    setFilter('All');
  };

  const handleRefresh = () => {
    console.log('Refreshing withdrawal data...');
    // Placeholder for API call to refresh data
  };

  const handleExport = () => {
    console.log('Exporting withdrawal data...');
    // Placeholder for export functionality (e.g., download CSV)
  };

  const handleCopyTxid = (txid: string) => {
    navigator.clipboard.writeText(txid).then(() => {
      console.log(`Copied TxID: ${txid}`);
      // Could add a toast notification here
    }).catch((err) => {
      console.error('Failed to copy TxID:', err);
    });
  };

  const handleLinkTxid = (txid: string) => {
    window.open(`https://explorer.example.com/tx/${txid}`, '_blank');
    // Placeholder URL for blockchain explorer
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      console.log(`Copied Address: ${address}`);
      // Could add a toast notification here
    }).catch((err) => {
      console.error('Failed to copy Address:', err);
    });
  };

  // Filtering logic with date validation
  const filteredRows = rows.filter((row) => {
    const matchesFilter = filter === 'All' || (filter === 'Crypto' && row.crypto.includes('/USDT'));
    const rowDate = new Date(row.time);
    const start = new Date(startDate);
    const end = new Date(endDate + 'T23:59:59'); // Include full end day
    const matchesDate = rowDate >= start && rowDate <= end && start <= end; // Ensure valid date range
    return matchesFilter && matchesDate;
  });

  return (
    <SectionCard>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Date Range Picker */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Time
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <StyledInput
                type="date"
                size="small"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Typography variant="body2" color="text.secondary">
                →
              </Typography>
              <StyledInput
                type="date"
                size="small"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
          </Box>
        </Box>

        {/* Filter and Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Crypto
              </Typography>
              <StyledSelect
                value={filter}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange={(e: SelectChangeEvent<string>) => setFilter(e.target.value)}
                size="small"
                sx={{ minWidth: 120, mt: 1 }}
                name="crypto-filter"
                aria-label="Filter withdrawals by type"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Crypto">Crypto</MenuItem>
                <MenuItem value="Fiat">Fiat</MenuItem>
              </StyledSelect>
            </Box>
            <StyledButton onClick={handleReset} style={{border: '1px solid black'}}>
              <Icon icon="mdi:refresh" width={12} height={12} style={{ marginRight: theme.spacing(0.5) }} />
              Reset
            </StyledButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StyledButton onClick={handleRefresh} style={{border: '1px solid black'}}>
              <Icon icon="mdi:refresh" width={12} height={12} style={{ marginRight: theme.spacing(0.5) }} />
              Refresh
            </StyledButton>
            <StyledButton onClick={handleExport} style={{border: '1px solid black'}}>
              <Icon icon="mdi:export" width={12} height={12} style={{ marginRight: theme.spacing(0.5) }} />
              Export
            </StyledButton>
          </Box>
        </Box>

        {/* Transaction Cards */}
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {filteredRows.length > 0 ? (
            filteredRows.map((row) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <TransactionCard key={row.id} variants={cardVariants} initial="hidden" animate="visible" aria-label={`Withdrawal ${row.id}`}>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                  <FieldLabel>Crypto</FieldLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon
                      icon={
                        ['sol', 'btc', 'eth', 'ada', 'dot', 'xrp', 'bnb', 'link'].includes(row.crypto.split('/')[0].toLowerCase())
                          ? `cryptocurrency-color:${row.crypto.split('/')[0].toLowerCase()}`
                          : 'mdi:currency-usd'
                      }
                      width={24}
                      height={24}
                      style={{ marginRight: theme.spacing(1) }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {row.crypto}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.network}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                  <FieldLabel>Time</FieldLabel>
                  <Typography variant="body2">{row.time}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 100 }}>
                  <FieldLabel>Status</FieldLabel>
                  <Typography
                    sx={{
                      display: 'inline-block',
                      bgcolor:
                        row.status === 'Completed'
                          ? 'success.main'
                          : row.status === 'Pending' || row.status === 'Processing'
                          ? 'warning.main'
                          : 'error.main',
                      color: 'success.contrastText',
                      px: 1,
                      py: 0.5,
                      borderRadius: 4,
                      fontSize: '0.7rem',
                    }}
                  >
                    {row.status}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
                  <FieldLabel>Amount</FieldLabel>
                  <Typography variant="body2">{row.amount}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                  <FieldLabel>TxID</FieldLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">{row.txid}</Typography>
                    <IconButton size="small" onClick={() => handleLinkTxid(row.txid)} aria-label="View transaction">
                      <Icon icon="mdi:link" width={12} height={12} />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleCopyTxid(row.txid)} aria-label="Copy transaction ID">
                      <Icon icon="mdi:content-copy" width={12} height={12} />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
                  <FieldLabel>Destination Address</FieldLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">{row.destinationAddress}</Typography>
                    <IconButton size="small" onClick={() => handleCopyAddress(row.destinationAddress)} aria-label="Copy destination address">
                      <Icon icon="mdi:content-copy" width={12} height={12} />
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 80 }}>
                  <FieldLabel>Fee</FieldLabel>
                  <Typography variant="body2">{row.fee}</Typography>
                </Box>
              </TransactionCard>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="body2" color="text.secondary">
                No withdrawals found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </SectionCard>
  );
};

export default WalletFundingSectionWithdrawal;