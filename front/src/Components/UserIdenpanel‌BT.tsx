'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { styled } from '@mui/system';

const BenefitsCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  padding: theme.spacing(1),
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
  padding: theme.spacing(1),
}));

const RecommendedChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 'bold',
  backgroundColor: theme.palette.warning.light,
  color: theme.palette.warning.dark,
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1.5),
  }
}));

const UserIdenpanelBT = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tableData = [
    {
      feature: 'Crypto Deposit',
      unverified: 'Unlimited',
      primary: 'Unlimited',
      advanced: 'Unlimited'
    },
    {
      feature: 'Crypto Withdrawal',
      unverified: '10 BTC/day',
      primary: '80 BTC/day',
      advanced: '200 BTC/day'
    },
    {
      feature: 'Fiat Trading',
      unverified: <Box color="error.main">✗</Box>,
      primary: <Box color="error.main">✗</Box>,
      advanced: '20,000 USD/day'
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

  const levels = [
    { key: 'unverified', label: 'Unverified' },
    { key: 'primary', label: 'Primary KYC' },
    { key: 'advanced', label: 'Advanced KYC', recommended: true }
  ];

  return (
    <BenefitsCard elevation={0}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Account Benefits
      </Typography>

      {!isMobile ? (
        // ✅ Desktop View (Table)
        <Table>
          <TableHead>
            <TableRow>
              <FeatureCell>KYC Level:</FeatureCell>
              {levels.map((level, idx) => (
                <HeaderCell key={idx}>
                  {level.recommended && (
                    <Box mt={1}>
                      <RecommendedChip label="★ Recommended" />
                    </Box>
                  )}
                  {level.label}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <FeatureCell>{row.feature}</FeatureCell>
                {levels.map((level, idx) => (
                  <HighlightCell key={idx}>
                    {row[level.key as keyof typeof row]}
                  </HighlightCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        // ✅ Mobile View (Capsule Cards)
        <Stack spacing={3}>
          {levels.map((level, idx) => (
            <Box
              key={idx}
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2]
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1" fontWeight={700} component="span">
                  {level.label}
                </Typography>
                <Typography component="span">{level.recommended && <RecommendedChip label="★ Recommended" />}</Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              {tableData.map((row, i) => (
                <Box
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={0.5}
                >
                  <Typography variant="body2" color="text.secondary" component="span">
                    {row.feature}
                  </Typography>
                  <Typography variant="body2" fontWeight={600} component="span">
                    {row[level.key as keyof typeof row]}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Stack>
      )}
    </BenefitsCard>
  );
};

export default UserIdenpanelBT;
