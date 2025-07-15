'use client';
import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  useTheme,
  Theme,
} from '@mui/material';
import { topGainers, topLosers, type CryptoData } from '@/data/data';

// تعریف استایل‌ها
const StyledTableContainer = styled(TableContainer)(({ theme }: { theme: Theme }) => ({
  borderRadius: '16px',
  padding: '0px',
  width: '100%',
  margin: '10px auto',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'rgba(0, 0, 0, 0.08)',
}));

const StyledTable = styled(Table)({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 12px',
});

const StyledTableHead = styled(TableHead)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#e0f4ff',
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
  textAlign: 'left',
  padding: '12px',
  fontWeight: 600,
  fontSize: '14px',
  color: theme.palette.text.primary,
  '&:first-of-type': {
    borderRadius: '16px 0 0 16px',
  },
  '&:last-child': {
    borderRadius: '0 16px 16px 0',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
  padding: '8px 6px',
  verticalAlign: 'middle',
  fontSize: '14px',
  color: theme.palette.text.primary,
}));

const ProgressBarContainer = styled('div')(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eefdf0',
  borderRadius: '12px',
  height: '24px',
  position: 'relative',
}));

const GainProgressBar = styled('div')(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.success.main,
  height: '100%',
  borderRadius: '12px',
}));

const LossProgressBar = styled('div')(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.error.main,
  height: '100%',
  borderRadius: '12px',
}));

const ProgressLabel = styled('div')({
  position: 'absolute',
  left: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '13px',
  fontWeight: 'bold',
  color: 'white',
});

const CryptoInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const CryptoIcon = styled('img')({
  width: '28px',
  height: '28px',
  borderRadius: '50%',
});

const CryptoName = styled('div')(({ theme }: { theme: Theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const CryptoCategory = styled('div')(({ theme }: { theme: Theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
}));

const GainerLoserLanding = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          Quick check
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', pl: 0.5 }}>
          Check Top Gainers And Top Losers
        </Typography>
      </Box>

      {/* Tables */}
      <Grid container spacing={2}>
        <Grid  size={{xs:12, md:6}}>
          <StyledTableContainer as={Paper}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Top Gainers <span style={{ float: 'right' }}>&gt;</span>
              </Typography>
              <StyledTable>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Price</StyledTableHeaderCell>
                    <StyledTableHeaderCell>7D Price Performance</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Market Cap</StyledTableHeaderCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {topGainers.map((crypto: CryptoData) => (
                    <StyledTableRow key={crypto.id}>
                      <StyledTableCell>
                        <CryptoInfo>
                          <CryptoIcon src="https://via.placeholder.com/28" alt="icon" />
                          <Box>
                            <CryptoName>{crypto.name}</CryptoName>
                            <CryptoCategory>{crypto.category}</CryptoCategory>
                          </Box>
                        </CryptoInfo>
                      </StyledTableCell>
                      <StyledTableCell>{crypto.price}</StyledTableCell>
                      <StyledTableCell>
                        <ProgressBarContainer>
                          <GainProgressBar style={{ width: `${crypto.performance}%` }} />
                          <ProgressLabel>+{crypto.performance}%</ProgressLabel>
                        </ProgressBarContainer>
                      </StyledTableCell>
                      <StyledTableCell>{crypto.marketCap}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </Box>
          </StyledTableContainer>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <StyledTableContainer as={Paper}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Top Losers <span style={{ float: 'right' }}>&gt;</span>
              </Typography>
              <StyledTable>
                <StyledTableHead>
                  <TableRow>
                    <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Price</StyledTableHeaderCell>
                    <StyledTableHeaderCell>7D Price Performance</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Market Cap</StyledTableHeaderCell>
                  </TableRow>
                </StyledTableHead>
                <TableBody>
                  {topLosers.map((crypto: CryptoData) => (
                    <StyledTableRow key={crypto.id}>
                      <StyledTableCell>
                        <CryptoInfo>
                          <CryptoIcon src="https://via.placeholder.com/28" alt="icon" />
                          <Box>
                            <CryptoName>{crypto.name}</CryptoName>
                            <CryptoCategory>{crypto.category}</CryptoCategory>
                          </Box>
                        </CryptoInfo>
                      </StyledTableCell>
                      <StyledTableCell>{crypto.price}</StyledTableCell>
                      <StyledTableCell>
                        <ProgressBarContainer>
                          <LossProgressBar style={{ width: `${Math.abs(crypto.performance)}%` }} />
                          <ProgressLabel>{crypto.performance}%</ProgressLabel>
                        </ProgressBarContainer>
                      </StyledTableCell>
                      <StyledTableCell>{crypto.marketCap}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </Box>
          </StyledTableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GainerLoserLanding;