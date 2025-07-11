"use client"; // Add this directive at the very top

import React, { useState } from 'react';
import { 
  Container, Grid, Box, Typography, Accordion, AccordionSummary, 
  AccordionDetails, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, LinearProgress, Chip, IconButton,
  useTheme, styled
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Link as LinkIcon,
  ContentCopy as ContentCopyIcon,
  CurrencyBitcoin as BitcoinIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';

// Define types
type Token = {
  symbol: string;
  name: string;
};

type Network = {
  name: string;
  type: string;
};

type Deposit = {
  id: string;
  crypto: Token;
  network: Network;
  time: string;
  status: 'success' | 'pending' | 'failed';
  amount: number;
  txd: string;
  progress: number;
};

// Styled components with proper theme access
const CircleActive = styled('div')(({ theme }) => ({
  width: '35px',
  height: '35px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
}));

const CircleInactive = styled('div')(({ theme }) => ({
  width: '35px',
  height: '35px',
  backgroundColor: theme.palette.grey[500],
  borderRadius: '50%',
}));

const TokenDropdown = styled('div')({
  position: 'relative',
  width: '100%',
});

const TokenSelected = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '8px',
  padding: '10px 16px',
  cursor: 'pointer',
}));

const TokenOptions = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  marginTop: '4px',
  zIndex: 100,
  boxShadow: theme.shadows[3],
}));

const TokenOption = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const TokenItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '4px',
  width: '60px',
  height: '35px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  }
}));

const DepositPage: React.FC = () => {
  const theme = useTheme();
  const [cryptoDropdownOpen, setCryptoDropdownOpen] = useState(false);
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Token>({
    symbol: 'USDT',
    name: 'Tether',
  });
  const [selectedNetwork, setSelectedNetwork] = useState<Network>({
    name: 'ZKLINK',
    type: 'ZKLINK'
  });
  
  // Available tokens
  const cryptoOptions: Token[] = [
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'SOL', name: 'Solana' },
  ];
  
  const networkOptions: Network[] = [
    { name: 'ZKLINK', type: 'ZKLINK' },
    { name: 'Ethereum', type: 'ERC20' },
    { name: 'Binance', type: 'BEP20' },
    { name: 'Polygon', type: 'MATIC' },
  ];
  
  // Quick select tokens
  const quickTokens: Token[] = [
    { symbol: 'ZKL', name: 'ZKLINK' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'DAI', name: 'Dai Stablecoin' },
    { symbol: 'UNI', name: 'Uniswap' },
  ];
  
  // Deposit history data
  const deposits: Deposit[] = [
    {
      id: '1',
      crypto: { symbol: 'SOL', name: 'Solana' },
      network: { name: 'ZKLINK', type: 'ZKLINK' },
      time: '2025-05-01 22:03:12',
      status: 'success',
      amount: 75,
      txd: '0xbgs...47c2',
      progress: 80
    },
    {
      id: '2',
      crypto: { symbol: 'ETH', name: 'Ethereum' },
      network: { name: 'Ethereum', type: 'ERC20' },
      time: '2025-05-02 15:24:33',
      status: 'pending',
      amount: 2.5,
      txd: '0x3a9...f8d1',
      progress: 45
    },
    {
      id: '3',
      crypto: { symbol: 'BTC', name: 'Bitcoin' },
      network: { name: 'Binance', type: 'BEP20' },
      time: '2025-05-03 09:17:54',
      status: 'success',
      amount: 0.25,
      txd: '0x7c2...9e4f',
      progress: 100
    },
    {
      id: '4',
      crypto: { symbol: 'USDT', name: 'Tether' },
      network: { name: 'Polygon', type: 'MATIC' },
      time: '2025-05-04 18:42:11',
      status: 'failed',
      amount: 150,
      txd: '0xe5f...a8b3',
      progress: 0
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Select Crypto */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CircleActive />
            <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
              Select Crypto
            </Typography>
          </Box>
          
          <Box sx={{ 
            py: 3, 
            pl: 3, 
            mt: 2, 
            borderLeft: `2px solid ${theme.palette.primary.main}`,
            mb: 0 
          }}>
            <TokenDropdown>
              <TokenSelected onClick={() => setCryptoDropdownOpen(!cryptoDropdownOpen)}>
                <BitcoinIcon fontSize="small" />
                <Typography variant="body1" fontWeight="bold" sx={{ mx: 1 }}>
                  {selectedCrypto.symbol}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                  {selectedCrypto.name}
                </Typography>
                <ExpandMoreIcon fontSize="small" />
              </TokenSelected>
              
              {cryptoDropdownOpen && (
                <TokenOptions>
                  {cryptoOptions.map((token) => (
                    <TokenOption 
                      key={token.symbol}
                      onClick={() => {
                        setSelectedCrypto(token);
                        setCryptoDropdownOpen(false);
                      }}
                    >
                      <BitcoinIcon fontSize="small" />
                      <Typography variant="body1" fontWeight="bold" sx={{ mx: 1 }}>
                        {token.symbol}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {token.name}
                      </Typography>
                    </TokenOption>
                  ))}
                </TokenOptions>
              )}
            </TokenDropdown>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            py: 2,
            pl: 3,
            mb: 2,
            borderLeft: `2px solid ${theme.palette.primary.main}`,
            mt: 0,
          }}>
            {quickTokens.map((token, index) => (
              <TokenItem key={index} sx={{ ml: index > 0 ? 2 : 0 }}>
                <BitcoinIcon fontSize="small" />
                <Typography variant="caption" sx={{ mt: 0.5 }}>{token.symbol}</Typography>
              </TokenItem>
            ))}
          </Box>
          
          {/* Select Network */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 4 }}>
            <CircleActive />
            <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
              Select Network
            </Typography>
          </Box>
          
          <Box sx={{ 
            py: 3, 
            pl: 3, 
            mt: 2, 
            borderLeft: `2px solid ${theme.palette.grey[500]}`,
            mb: 0 
          }}>
            <TokenDropdown>
              <TokenSelected onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}>
                <BitcoinIcon fontSize="small" />
                <Typography variant="body1" fontWeight="bold" sx={{ mx: 1 }}>
                  {selectedNetwork.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                  {selectedNetwork.type}
                </Typography>
                <ExpandMoreIcon fontSize="small" />
              </TokenSelected>
              
              {networkDropdownOpen && (
                <TokenOptions>
                  {networkOptions.map((network) => (
                    <TokenOption 
                      key={network.name}
                      onClick={() => {
                        setSelectedNetwork(network);
                        setNetworkDropdownOpen(false);
                      }}
                    >
                      <BitcoinIcon fontSize="small" />
                      <Typography variant="body1" fontWeight="bold" sx={{ mx: 1 }}>
                        {network.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {network.type}
                      </Typography>
                    </TokenOption>
                  ))}
                </TokenOptions>
              )}
            </TokenDropdown>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            py: 2,
            pl: 3,
            mb: 2,
            borderLeft: `2px solid ${theme.palette.grey[500]}`,
            mt: 0,
          }}>
            {quickTokens.map((token, index) => (
              <TokenItem key={index} sx={{ ml: index > 0 ? 2 : 0 }}>
                <BitcoinIcon fontSize="small" />
                <Typography variant="caption" sx={{ mt: 0.5 }}>{token.symbol}</Typography>
              </TokenItem>
            ))}
          </Box>
          
          {/* Inactive Step */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 4 }}>
            <CircleInactive />
            <Typography variant="h6" fontWeight="bold" color="text.secondary" sx={{ ml: 2 }}>
              Select Network
            </Typography>
          </Box>
        </Grid>
        
        {/* Right Column */}
        <Grid item xs={12} md={4}>
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
        </Grid>
      </Grid>
      
      {/* Recent Deposits */}
      <Box sx={{ mt: 5 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" fontWeight="bold">Recent Deposit</Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: 'text.secondary',
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.main'
            }
          }}>
            <Typography variant="body2">History</Typography>
            <ChevronRightIcon fontSize="small" sx={{ ml: 0.5 }} />
          </Box>
        </Box>
        
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Table sx={{ minWidth: 650 }} aria-label="recent deposits">
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell>Crypto</TableCell>
                <TableCell>Network</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>TxD</TableCell>
                <TableCell>Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deposits.map((deposit) => (
                <TableRow key={deposit.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BitcoinIcon fontSize="small" />
                      <Typography sx={{ ml: 1 }}>
                        {deposit.crypto.symbol}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography>{deposit.network.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {deposit.network.type}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{deposit.time}</TableCell>
                  <TableCell>
                    <Chip 
                      label={deposit.status === 'success' ? 'Deposit successful' : 
                             deposit.status === 'pending' ? 'Processing' : 'Failed'} 
                      color={
                        deposit.status === 'success' ? 'success' : 
                        deposit.status === 'pending' ? 'warning' : 'error'
                      } 
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{deposit.amount} {deposit.crypto.symbol}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2">{deposit.txd}</Typography>
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <LinkIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 1, minWidth: 40 }}>
                        {deposit.progress}%
                      </Typography>
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
    </Container>
  );
};

export default DepositPage;