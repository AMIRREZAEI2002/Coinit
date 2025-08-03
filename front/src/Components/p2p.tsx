import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Avatar, Select, MenuItem, 
  FormControl, InputLabel, Input, Pagination, Accordion, AccordionSummary, 
  AccordionDetails, Grid, Divider, Stack
} from '@mui/material';
import { 
  AddCircle as AddCircleIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  Mail as MailIcon
} from '@mui/icons-material';

// TypeScript interfaces
interface P2PAdvertisement {
  id: string;
  type: 'Buy' | 'Sell';
  cryptocurrency: string;
  price: number;
  paymentMethod: string;
  minLimit: number;
  maxLimit: number;
  status: 'Active' | 'Paused';
}

interface P2POffer {
  id: string;
  type: 'Buy' | 'Sell';
  cryptocurrency: string;
  price: number;
  paymentMethod: string;
  minLimit: number;
  maxLimit: number;
  trader: {
    name: string;
    avatar: string;
  };
  available: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

const P2P = () => {
  // Sample data
  const advertisements: P2PAdvertisement[] = [
    {
      id: '#P2P1023',
      type: 'Sell',
      cryptocurrency: 'BTC',
      price: 56200,
      paymentMethod: 'Bank Transfer',
      minLimit: 100,
      maxLimit: 5000,
      status: 'Active'
    },
    {
      id: '#P2P1087',
      type: 'Buy',
      cryptocurrency: 'USDT',
      price: 1,
      paymentMethod: 'PayPal',
      minLimit: 50,
      maxLimit: 2000,
      status: 'Active'
    },
    {
      id: '#P2P1150',
      type: 'Sell',
      cryptocurrency: 'ETH',
      price: 3200,
      paymentMethod: 'Local Cash',
      minLimit: 20,
      maxLimit: 1000,
      status: 'Paused'
    }
  ];

  const offers: P2POffer[] = [
    {
      id: '#P2P1201',
      type: 'Buy',
      cryptocurrency: 'BTC',
      price: 56150,
      paymentMethod: 'Bank Transfer',
      minLimit: 200,
      maxLimit: 10000,
      trader: { name: 'CryptoMaster', avatar: '/path/to/avatar1.png' },
      available: true
    },
    {
      id: '#P2P1217',
      type: 'Sell',
      cryptocurrency: 'USDT',
      price: 1,
      paymentMethod: 'PayPal',
      minLimit: 50,
      maxLimit: 5000,
      trader: { name: 'TetherTrader', avatar: '/path/to/avatar2.png' },
      available: true
    },
    {
      id: '#P2P1255',
      type: 'Buy',
      cryptocurrency: 'ETH',
      price: 3180,
      paymentMethod: 'WeChat Pay',
      minLimit: 100,
      maxLimit: 3000,
      trader: { name: 'EtherGuru', avatar: '/path/to/avatar3.png' },
      available: true
    },
    {
      id: '#P2P1302',
      type: 'Sell',
      cryptocurrency: 'BNB',
      price: 420,
      paymentMethod: 'Local Cash',
      minLimit: 20,
      maxLimit: 1500,
      trader: { name: 'BinancePro', avatar: '/path/to/avatar4.png' },
      available: false
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: 'Is P2P trading safe?',
      answer: 'Yes. All funds are held in escrow by CoinIt Exchange until both parties confirm payment and receipt. Never release cryptocurrency before confirming the fiat payment.'
    },
    {
      question: 'How do I create a P2P offer?',
      answer: 'Click "Create New Offer," choose Buy or Sell, set your price, payment method, and trade limits. After submission, your offer will appear in the marketplace once approved.'
    },
    {
      question: 'What fees apply to P2P trades?',
      answer: 'CoinIt Exchange charges a small P2P fee based on your trading volume and market conditions. Fees are clearly displayed before you confirm any trade.'
    }
  ];

  // State
  const [cryptoFilter, setCryptoFilter] = useState<string>('Cryptocurrency');
  const [paymentFilter, setPaymentFilter] = useState<string>('Payment Method');
  const [sortFilter, setSortFilter] = useState<string>('Sort By');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Filtered offers
  const filteredOffers = offers.filter(offer => {
    return (
      (cryptoFilter === 'Cryptocurrency' || offer.cryptocurrency === cryptoFilter) &&
      (paymentFilter === 'Payment Method' || offer.paymentMethod === paymentFilter) &&
      (searchQuery === '' || offer.trader.name.toLowerCase().includes(searchQuery.toLowerCase())))
    }).sort((a, b) => {
    if (sortFilter === 'Price: Low to High') return a.price - b.price;
    if (sortFilter === 'Price: High to Low') return b.price - a.price;
    if (sortFilter === 'Limit: Low to High') return a.minLimit - b.minLimit;
    if (sortFilter === 'Limit: High to Low') return b.minLimit - a.minLimit;
    return 0;
  });

  // Pagination
  const paginatedOffers = filteredOffers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* User Advertisements */}
      <Grid container spacing={3}>
        <Grid size={{xs:12}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Your P2P Advertisements
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddCircleIcon />}
              sx={{ fontWeight: 'bold' }}
            >
              Create New Offer
            </Button>
          </Box>
        </Grid>

        <Grid size={{xs:12}}>
          <Paper sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 3, p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              My Active Offers <ChevronRightIcon fontSize="small" />
            </Typography>
            
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="advertisements table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', borderRadius: '16px 0 0 16px' }}>Offer ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Cryptocurrency</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Price (USD)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Limits (USD)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', borderRadius: '0 16px 16px 0' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {advertisements.map((ad) => (
                    <TableRow key={ad.id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' } }}>
                      <TableCell sx={{ borderRadius: '16px 0 0 16px' }}>{ad.id}</TableCell>
                      <TableCell>{ad.type}</TableCell>
                      <TableCell>{ad.cryptocurrency}</TableCell>
                      <TableCell>${ad.price.toLocaleString()}</TableCell>
                      <TableCell>{ad.paymentMethod}</TableCell>
                      <TableCell>${ad.minLimit}–${ad.maxLimit}</TableCell>
                      <TableCell>
                        <Typography 
                          color={ad.status === 'Active' ? 'success.main' : 'error.main'}
                          fontWeight="bold"
                        >
                          {ad.status}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderRadius: '0 16px 16px 0' }}>
                        <Stack direction="row" spacing={1}>
                          <Button variant="outlined" color="warning" size="small">Edit</Button>
                          {ad.status === 'Active' ? (
                            <Button variant="outlined" color="error" size="small">Deactivate</Button>
                          ) : (
                            <Button variant="outlined" color="success" size="small">Activate</Button>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Marketplace Header */}
      <Grid container spacing={3}>
        <Grid size={{xs:12}}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            P2P Marketplace
          </Typography>
          <Typography color="text.secondary">
            Browse and trade with other users directly. Filter offers by cryptocurrency, payment method, and limits.
          </Typography>
        </Grid>

        {/* Filters */}
        <Grid size={{xs:12}}>
          <Grid container spacing={2}>
            <Grid size={{xs:12,md:3}}>
              <FormControl fullWidth>
                <InputLabel>Search Trader</InputLabel>
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by trader username"
                />
              </FormControl>
            </Grid>
            
            <Grid size={{xs:12,md:3}}>
              <FormControl fullWidth>
                <InputLabel>Crypto</InputLabel>
                <Select
                  value={cryptoFilter}
                  onChange={(e) => setCryptoFilter(e.target.value as string)}
                  label="Cryptocurrency"
                >
                  <MenuItem value="Cryptocurrency">Cryptocurrency</MenuItem>
                  <MenuItem value="BTC">BTC</MenuItem>
                  <MenuItem value="ETH">ETH</MenuItem>
                  <MenuItem value="USDT">USDT</MenuItem>
                  <MenuItem value="BNB">BNB</MenuItem>
                  <MenuItem value="XRP">XRP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid size={{xs:12,md:3}}>
              <FormControl fullWidth>
                <InputLabel>Payment</InputLabel>
                <Select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value as string)}
                  label="Payment Method"
                >
                  <MenuItem value="Payment Method">Payment Method</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="PayPal">PayPal</MenuItem>
                  <MenuItem value="Alipay">Alipay</MenuItem>
                  <MenuItem value="WeChat Pay">WeChat Pay</MenuItem>
                  <MenuItem value="Local Cash">Local Cash</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid size={{xs:12,md:3}}>
              <FormControl fullWidth>
                <InputLabel>Sort</InputLabel>
                <Select
                  value={sortFilter}
                  onChange={(e) => setSortFilter(e.target.value as string)}
                  label="Sort By"
                >
                  <MenuItem value="Sort By">Sort By</MenuItem>
                  <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
                  <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
                  <MenuItem value="Limit: Low to High">Limit: Low to High</MenuItem>
                  <MenuItem value="Limit: High to Low">Limit: High to Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        {/* Offers Table */}
        <Grid size={{xs:12}}>
          <Paper sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 3, p: 3 }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="offers table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', borderRadius: '16px 0 0 16px' }}>Offer ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Cryptocurrency</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Price (USD)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Limits (USD)</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Trader</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', borderRadius: '0 16px 16px 0' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedOffers.map((offer) => (
                    <TableRow key={offer.id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' } }}>
                      <TableCell sx={{ borderRadius: '16px 0 0 16px' }}>{offer.id}</TableCell>
                      <TableCell>{offer.type}</TableCell>
                      <TableCell>{offer.cryptocurrency}</TableCell>
                      <TableCell>${offer.price.toLocaleString()}</TableCell>
                      <TableCell>{offer.paymentMethod}</TableCell>
                      <TableCell>${offer.minLimit}–${offer.maxLimit}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar src={offer.trader.avatar} sx={{ width: 30, height: 30, mr: 1 }} />
                          <Typography fontWeight="bold">{offer.trader.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ borderRadius: '0 16px 16px 0' }}>
                        <Button 
                          variant="contained" 
                          color="success" 
                          size="small"
                          disabled={!offer.available}
                        >
                          {offer.available ? 'Trade' : 'Unavailable'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={Math.ceil(filteredOffers.length / itemsPerPage)}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* How It Works */}
      <Grid container spacing={3} mt={2}>
        <Grid size={{xs:12}}>
          <Paper sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 3, p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              How P2P Trading Works
            </Typography>
            <Box component="ol" pl={2}>
              <Box component="li" mb={2}>
                <Typography>
                  <strong>1. Choose an Offer:</strong> Browse available buy/sell offers and select one that meets your price and limit criteria.
                </Typography>
              </Box>
              <Box component="li" mb={2}>
                <Typography>
                  <strong>2. Initiate Trade:</strong> Click &quot;Trade&quot; to open a secure trade window where you can chat with the counterparty.
                </Typography>
              </Box>
              <Box component="li" mb={2}>
                <Typography>
                  <strong>3. Transfer Funds:</strong> Follow the seller&apos;s payment instructions (e.g., Bank Transfer, PayPal). Confirm payment has been made.
                </Typography>
              </Box>
              <Box component="li" mb={2}>
                <Typography>
                  <strong>4. Confirm Receipt:</strong> Once the seller confirms receipt of your payment, the cryptocurrency will be released to your P2P wallet.
                </Typography>
              </Box>
              <Box component="li">
                <Typography>
                  <strong>5. Leave Feedback:</strong> After completing the transaction, rate and review your trading partner to help maintain trust within the community.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* FAQ */}
      <Grid container spacing={3} mt={2}>
        <Grid size={{xs:12}}>
          <Paper sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 3, p: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Frequently Asked Questions
            </Typography>
            
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 1, boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="bold">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Support */}
      <Grid container justifyContent="center" mt={4}>
        <Grid size={{xs:12,md:8}}>
          <Paper sx={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.05)', 
            borderRadius: 3, 
            p: 4,
            textAlign: 'center'
          }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Need Help?
            </Typography>
            <Typography mb={3}>
              If you have questions or encounter issues with P2P trading, our support team is here to help.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<MailIcon />}
              sx={{ fontWeight: 'bold' }}
              href="mailto:support@coinit.com"
            >
              Contact Support
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default P2P;