'use client';
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider
} from '@mui/material';

const assetData = [
  { asset: 'Bitcoin (BTC)', balance: '1.234', value: '$42,123.45', change: '+2.3%', positive: true },
  { asset: 'Ethereum (ETH)', balance: '12.345', value: '$21,678.90', change: '+1.2%', positive: true },
  { asset: 'Solana (SOL)', balance: '120.45', value: '$12,345.67', change: '-0.8%', positive: false },
];

const AssetManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Asset Management
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        View and manage your cryptocurrency assets across all accounts.
      </Typography>

      {isMobile ? (
        // ✅ موبایل: نمایش به صورت کارت
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {assetData.map((item, index) => (
            <Card key={index} variant="outlined" sx={{ borderRadius: 2, boxShadow: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.asset}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Balance
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {item.balance}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Value (USD)
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {item.value}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    24h Change
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: item.positive ? 'success.main' : 'error.main' }}
                  >
                    {item.change}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        // ✅ دسکتاپ: جدول کامل
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Value (USD)</TableCell>
                <TableCell>24h Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assetData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.asset}</TableCell>
                  <TableCell>{item.balance}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell sx={{ color: item.positive ? 'success.main' : 'error.main' }}>
                    {item.change}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AssetManagement;
