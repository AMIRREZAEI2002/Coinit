"use client";
import React from 'react';
import { 
  Container, Grid, Box, Typography, Accordion, AccordionSummary, 
  AccordionDetails, useTheme
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';
import SelectDeposite from '@/Components/SelectDeposite';
import DepositTable from '@/Components/DepositTable';
import Link from 'next/link';
///////////////////
const DepositPage: React.FC = () => {
  const theme = useTheme();
  
  

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{xs: 12,md: 8}}>
          <SelectDeposite/>
        </Grid>
        
        {/* Right Column */}
        <Grid size={{xs:12 , md:4}}>
          {/* Tips Box */}
          <Box 
            sx={{ 
              p: 3, 
              border: 1, 
              borderColor: 'divider', 
              borderRadius: 1,
              mb: 3 
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>Tips</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              • Ensure you&apos;re sending the correct cryptocurrency to the matching network address. 
              Sending to the wrong network may result in permanent loss of funds.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Double-check the wallet address before initiating any transfer. 
              Cryptocurrency transactions are irreversible once confirmed on the blockchain.
            </Typography>
          </Box>
          
          {/* FAQ Accordion */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Question 1: How do I use the exchange?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Answer: Just log into your account and use the Spot or Futures section to start trading.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Question 2: How do I withdraw funds?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                Answer: Go to your wallet, click the withdraw option, and enter your destination wallet address.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          {/* Buy Crypto Box */}
          <Link href="/BQPT/QuickBuySell" prefetch={true} style={{color:'inherit',textDecoration: 'none'}} passHref>
            <Box 
            sx={{ 
              display: 'flex', 
              border: 1, 
              borderColor: 'divider', 
              borderRadius: 1, 
              p: 3, 
              mt: 3,
              alignItems: 'center'
            }}
          >
            <WalletIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            <Box sx={{ ml: 2, flexGrow: 1 }}>
              <Typography fontWeight="bold">Buy Crypto</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Purchase cryptocurrencies with your credit card or bank transfer
                </Typography>
                <ChevronRightIcon sx={{ ml: 1 }} />
              </Box>
            </Box>
          </Box>
          </Link>
        </Grid>
      </Grid>
      
      {/* Recent Deposits */}
      <DepositTable/>
    </Container>
  );
};

export default DepositPage;