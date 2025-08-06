import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Modal,
  Fade,
  Backdrop,
  Grid,
  Card,
  CardContent,
  Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';

// -------------------- Types --------------------
interface P2POffer {
  id: string;
  trader: string;
  crypto: string;
  fiat: string;
  amount: number;
  price: number;
  paymentMethod: string;
  status: 'open' | 'completed' | 'cancelled';
}

interface TradeFormData {
  tradeAmount: string;
  paymentMethod: string;
}

// -------------------- Mock Data --------------------
const mockOffers: P2POffer[] = [
  { id: '1', trader: 'Alice', crypto: 'BTC', fiat: 'USD', amount: 0.5, price: 60000, paymentMethod: 'Bank Transfer', status: 'open' },
  { id: '2', trader: 'Bob', crypto: 'ETH', fiat: 'USD', amount: 2, price: 3000, paymentMethod: 'PayPal', status: 'open' },
  { id: '3', trader: 'Charlie', crypto: 'BTC', fiat: 'EUR', amount: 0.3, price: 55000, paymentMethod: 'Credit Card', status: 'open' },
  { id: '4', trader: 'David', crypto: 'ETH', fiat: 'EUR', amount: 1.5, price: 3200, paymentMethod: 'Bank Transfer', status: 'open' },
  { id: '5', trader: 'Eve', crypto: 'BTC', fiat: 'USD', amount: 0.7, price: 58000, paymentMethod: 'PayPal', status: 'open' },
  { id: '6', trader: 'Frank', crypto: 'ETH', fiat: 'USD', amount: 3, price: 3100, paymentMethod: 'Credit Card', status: 'open' }
];

// -------------------- Styled Components --------------------
const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  borderRadius: 50,
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  color: theme.palette.primary.contrastText,
}));

const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 400,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 50,
  boxShadow: theme.shadows[10],
  padding: theme.spacing(3),
}));

// -------------------- Component --------------------
const P2P: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [cryptoFilter, setCryptoFilter] = useState('all');
  const [fiatFilter, setFiatFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<P2POffer | null>(null);
  const [formData, setFormData] = useState<TradeFormData>({ tradeAmount: '', paymentMethod: '' });

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // -------------------- Handlers --------------------
  const handleCryptoChange = (event: SelectChangeEvent) => setCryptoFilter(event.target.value);
  const handleFiatChange = (event: SelectChangeEvent) => setFiatFilter(event.target.value);

  const handleOpenModal = (offer: P2POffer) => {
    setSelectedOffer(offer);
    setFormData({ tradeAmount: offer.amount.toString(), paymentMethod: offer.paymentMethod });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOffer(null);
    setFormData({ tradeAmount: '', paymentMethod: '' });
  };

  const handleTradeSubmit = () => {
    console.log('Trade submitted:', { ...formData, offer: selectedOffer });
    handleCloseModal();
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // -------------------- Filtering --------------------
  const filteredOffers = mockOffers.filter((offer) => {
    const matchesCrypto = cryptoFilter === 'all' || offer.crypto === cryptoFilter;
    const matchesFiat = fiatFilter === 'all' || offer.fiat === fiatFilter;
    const matchesSearch = offer.trader.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCrypto && matchesFiat && matchesSearch;
  });

  const paginatedOffers = filteredOffers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // -------------------- Render --------------------
  return (
    <Container maxWidth="lg" sx={{ p:0 }}>
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', color: 'primary.main' }}
      >
        P2P Cryptocurrency Exchange
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel>Cryptocurrency</InputLabel>
          <Select value={cryptoFilter} onChange={handleCryptoChange}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Fiat</InputLabel>
          <Select value={fiatFilter} onChange={handleFiatChange}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search by Trader"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Offers Table or Cards */}
      {isMobile ? (
        <Grid container spacing={2}>
          {paginatedOffers.map((offer) => (
            <Grid size={{xs:12}} key={offer.id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1"><b>{offer.trader}</b></Typography>
                  <Typography>{offer.crypto} → {offer.fiat}</Typography>
                  <Typography>Amount: {offer.amount}</Typography>
                  <Typography>Price: {offer.price.toLocaleString()}</Typography>
                  <Typography>Payment: {offer.paymentMethod}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <StyledButton fullWidth onClick={() => handleOpenModal(offer)}>Trade</StyledButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Trader</b></TableCell>
                <TableCell><b>Cryptocurrency</b></TableCell>
                <TableCell><b>Fiat</b></TableCell>
                <TableCell><b>Amount</b></TableCell>
                <TableCell><b>Price</b></TableCell>
                <TableCell><b>Payment Method</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>{offer.trader}</TableCell>
                  <TableCell>{offer.crypto}</TableCell>
                  <TableCell>{offer.fiat}</TableCell>
                  <TableCell>{offer.amount}</TableCell>
                  <TableCell>{offer.price.toLocaleString()}</TableCell>
                  <TableCell>{offer.paymentMethod}</TableCell>
                  <TableCell>
                    <StyledButton onClick={() => handleOpenModal(offer)}>Trade</StyledButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredOffers.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={openModal}>
          <StyledModalBox>
            <Typography variant="h6" gutterBottom>Place Trade with {selectedOffer?.trader}</Typography>
            <Grid container spacing={2}>
              <Grid size={{xs:12}}><TextField fullWidth label="Cryptocurrency" value={selectedOffer?.crypto || ''} disabled /></Grid>
              <Grid size={{xs:12}}><TextField fullWidth label="Fiat" value={selectedOffer?.fiat || ''} disabled /></Grid>
              <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Trade Amount"
                value={formData.tradeAmount}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value < 0) {
                    setFormData({ ...formData, tradeAmount: '0' });
                  } else if (selectedOffer && value > selectedOffer.amount) {
                    setFormData({ ...formData, tradeAmount: selectedOffer.amount.toString() });
                  } else {
                    setFormData({ ...formData, tradeAmount: e.target.value });
                  }
                }}
                type="number"
                inputProps={{
                  min: 0,
                  max: selectedOffer?.amount ?? undefined,
                  step: 0.1
                }}
              />

              </Grid>
              <Grid size={{xs:12}}>
                <TextField
                  fullWidth
                  disabled
                  label="Payment Method"
                  value={formData.paymentMethod}
                />
              </Grid>
              <Grid size={{xs:12}} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <StyledButton fullWidth onClick={handleTradeSubmit}>Confirm Trade</StyledButton>
                <Button fullWidth variant="outlined" onClick={handleCloseModal}>Cancel</Button>
              </Grid>
            </Grid>
          </StyledModalBox>
        </Fade>
      </Modal>
    </Container>
  );
};

export default P2P;
