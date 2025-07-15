'use client';
import React from 'react';
import { 
  Box, 
  Button,
  Typography, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled
} from '@mui/material';

const BenefitsCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  marginTop: theme.spacing(3),
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  padding: theme.spacing(0),
}));

const HighlightCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  textAlign: 'center',
  padding: theme.spacing(2),
  position: 'relative',
}));

const FeatureCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'start',
  color: theme.palette.text.secondary,
  fontWeight: 'bold',
  padding: theme.spacing(0),
}));
const RecommendedBadge = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  fontSize: '0.75rem',
  borderColor: theme.palette.warning.main,
  color: theme.palette.warning.dark,
  backgroundColor: theme.palette.warning.light,
  marginLeft: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
  }
}));


const UserIdenpanelBT = () => {

  const tableData = [
    {
      feature: 'Crypto Deposit',
      unverified: 'Unlimited',
      primary: 'Unlimited',
      advanced: 'Unlimited'
    },
    {
      feature: 'Crypto Withdrawal',
      unverified: '10 BTC per day',
      primary: '80 BTC per day',
      advanced: (
        <Box>
          200 BTC per day <Box component="span" color="success.main">⬆</Box>
        </Box>
      )
    },
    {
      feature: 'Fiat Trading',
      unverified: <Box color="error.main">✗</Box>,
      primary: <Box color="error.main">✗</Box>,
      advanced: (
        <Box>
          20,000 USD per day <Box component="span" color="success.main">⬆</Box>
        </Box>
      )
    },
    {
      feature: 'Spot/Futures Trading',
      unverified: <Box color="success.main">✓</Box>,
      primary: <Box color="success.main">✓</Box>,
      advanced: <Box color="success.main">✓</Box>
    },
    {
      feature: 'Platform Events',
      unverified: <Box color="success.main">✓</Box>,
      primary: <Box color="success.main">✓</Box>,
      advanced: <Box color="success.main">✓</Box>
    }
  ];

  return (
    <BenefitsCard elevation={0}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Account Benefits
      </Typography>
      
      <Table>
        <TableHead>
          <TableRow>
            <FeatureCell>KYC Level:</FeatureCell>
            <HeaderCell>
              Unverified
            </HeaderCell>
            <HeaderCell>Primary KYC</HeaderCell>
            <HighlightCell sx={{ 
              borderRadius: '10px 10px 0 0',
              fontWeight: 'bold'
            }}>
              Advanced KYC
              <RecommendedBadge variant="outlined" size="small" sx={{ 
                  position: 'absolute',
                  top: -20,
                  left: '47%',
                  transform: 'translateX(-50%)',
                  bgcolor: 'warning.light',
                  color: 'warning.dark',
                  fontWeight: 'bold'
                }} >
                ★ Recommended
              </RecommendedBadge>
            </HighlightCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <FeatureCell>{row.feature}</FeatureCell>
              <TableCell align="center">{row.unverified}</TableCell>
              <TableCell align="center">{row.primary}</TableCell>
              <HighlightCell sx={{ 
                borderRadius: index === tableData.length - 1 ? '0 0 10px 10px' : 0
              }}>
                {row.advanced}
              </HighlightCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BenefitsCard>
  );
};

export default UserIdenpanelBT;