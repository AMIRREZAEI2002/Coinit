import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material'
import React from 'react'

const AssetManagement = () => {
  return (
    <Box>
    <Typography variant="h5" gutterBottom>Asset Management</Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      View and manage your cryptocurrency assets across all accounts.
    </Typography>
    
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
          <TableRow>
            <TableCell>Bitcoin (BTC)</TableCell>
            <TableCell>1.234</TableCell>
            <TableCell>$42,123.45</TableCell>
            <TableCell sx={{ color: 'success.main' }}>+2.3%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ethereum (ETH)</TableCell>
            <TableCell>12.345</TableCell>
            <TableCell>$21,678.90</TableCell>
            <TableCell sx={{ color: 'success.main' }}>+1.2%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Solana (SOL)</TableCell>
            <TableCell>120.45</TableCell>
            <TableCell>$12,345.67</TableCell>
            <TableCell sx={{ color: 'error.main' }}>-0.8%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  )
}

export default AssetManagement  