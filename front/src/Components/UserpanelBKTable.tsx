import React, { useState } from 'react';
import { 
  Box, Typography, Tabs, Tab, Paper, Link, 
  useTheme, Card, CardContent, Stack, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TablePagination, useMediaQuery
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

const UserpanelBKTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 3 : 5);
  
  const exchangeData = [
    {
      name: 'Binance',
      source: '#',
      fees: [
        { volume: 'Up to 50,000', maker: '0.10%', taker: '0.15%', remarks: 'Base rate; 25% discount with BNB → 0.075% maker, 0.1125% taker' },
        { volume: '50,000 – 100,000', maker: '0.09%', taker: '0.14%', remarks: '50k tier; BNB discount applies' },
        { volume: '100,000 – 250,000', maker: '0.08%', taker: '0.13%', remarks: '100k tier; BNB discount applies' },
        { volume: '250,000 – 500,000', maker: '0.07%', taker: '0.12%', remarks: '250k tier; BNB discount applies' },
        { volume: '500,000 – 1,000,000', maker: '0.05%', taker: '0.10%', remarks: '500k tier; BNB discount applies' },
        { volume: 'Above 1,000,000', maker: '0.02%', taker: '0.04%', remarks: 'VIP 0; BNB discount applies' }
      ]
    },
    {
      name: 'Coinbase',
      source: '#',
      fees: [
        { volume: 'Up to 1,000', maker: '0.60%', taker: '1.20%', remarks: 'Entry level; no token discounts' },
        { volume: '1,000 – 10,000', maker: '0.50%', taker: '1.00%', remarks: 'Tier 1 volume' },
        { volume: '10,000 – 50,000', maker: '0.35%', taker: '0.60%', remarks: 'Tier 2; 30 day volume ≥ 10k' },
        { volume: '50,000 – 100,000', maker: '0.25%', taker: '0.40%', remarks: 'Tier 3' },
        { volume: '100,000 – 1,000,000', maker: '0.20%', taker: '0.35%', remarks: 'Tier 4; volume ≥ 100k' },
        { volume: 'Above 1,000,000', maker: '0.10%', taker: '0.25%', remarks: 'Top tier; ≥ 1M 30 day volume' }
      ]
    },
    {
      name: 'Kraken',
      source: '#',
      fees: [
        { volume: 'Up to 50,000', maker: '0.16%', taker: '0.26%', remarks: 'Base tier; convert small balances @ 3% fee' },
        { volume: '50,000 – 100,000', maker: '0.14%', taker: '0.24%', remarks: 'Tier 1' },
        { volume: '100,000 – 250,000', maker: '0.12%', taker: '0.22%', remarks: 'Tier 2' },
        { volume: '250,000 – 500,000', maker: '0.10%', taker: '0.20%', remarks: 'Tier 3' },
        { volume: '500,000 – 1,000,000', maker: '0.08%', taker: '0.18%', remarks: 'Tier 4' },
        { volume: '1,000,000 – 10,000,000', maker: '0.00%', taker: '0.10%', remarks: 'Premium tier; volume ≥ 1M' }
      ]
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentExchange = exchangeData[activeTab];
  const currentFees = currentExchange.fees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: {xs:1,md:3} }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Trading Fees</Typography>
      </Box>
      
      <Paper sx={{ p: 1, mb: 3, borderRadius: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Below is a comparative view of maker and taker fees across Binance, Coinbase, and Kraken. 
          Fees are based on 30‑day rolling trading volume in USD. Discounts such as BNB usage (Binance) 
          or promotional rebates (Coinbase) are noted in the remarks.
        </Typography>
      </Paper>
      
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ 
            backgroundColor: "Background.paper",
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          {exchangeData.map((exchange, index) => (
            <Tab 
              key={index}
              label={exchange.name}
              sx={{ 
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                py: 2,
                color: activeTab === index ? theme.palette.primary.main : 'inherit'
              }}
            />
          ))}
        </Tabs>
        
        <Box sx={{ p: 2 }}>
          {isMobile ? (
            <Stack spacing={2}>
              {currentFees.map((fee, index) => (
                <Card key={index} sx={{ borderRadius: 3, boxShadow: 2, p: 2 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                      30‑Day Volume: {fee.volume}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Maker Fee: <strong>{fee.maker}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Taker Fee: <strong>{fee.taker}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {fee.remarks}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{backgroundColor: theme.palette.background.paper }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>30‑Day Volume (USD)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Maker Fee <small>(%)</small></TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Taker Fee <small>(%)</small></TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentFees.map((fee, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{fee.volume}</TableCell>
                      <TableCell>{fee.maker}</TableCell>
                      <TableCell>{fee.taker}</TableCell>
                      <TableCell>{fee.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={currentExchange.fees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ 
              borderTop: `1px solid ${theme.palette.divider}`,
              mt: 2
            }}
          />
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Source: <Link href={currentExchange.source} target="_blank" rel="noopener">
              {currentExchange.name} Fee Schedule
            </Link> (accessed May 2025).
          </Typography>
        </Box>
      </Paper>
      
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <InfoIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="body1" fontWeight="bold">Important Note</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          All fees are based on 30‑day rolling USD volumes, calculated daily. Maker orders add liquidity; 
          taker orders remove liquidity. Always check the official fee pages for up‑to‑date rates and 
          promotional discounts.
        </Typography>
      </Paper>
    </Box>
  );
};

export default UserpanelBKTable;
