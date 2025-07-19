import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Link, 
  Alert,
  useTheme,
  styled,
  Stack
} from '@mui/material';
import { 
  ArrowDownward as DepositIcon, 
  ArrowUpward as WithdrawIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';


const TransactionStatus = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '0.7rem',
  padding: theme.spacing(0.3, 1),
  borderRadius: 12,
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.dark,
  fontWeight: 500
}));

const WalletOver3 = () => {
  const theme = useTheme();
  
  // Sample transaction data
  const transactions = [
    { 
      id: 1, 
      type: 'deposit', 
      amount: '+75 ZKL', 
      date: '2025-05-01 22:34:52', 
      status: 'successful',
      currency: 'ZKL'
    },
    { 
      id: 2, 
      type: 'deposit', 
      amount: '+120 BTC', 
      date: '2025-04-28 14:22:10', 
      status: 'successful',
      currency: 'BTC'
    },
    { 
      id: 3, 
      type: 'deposit', 
      amount: '+350 ETH', 
      date: '2025-04-25 09:45:33', 
      status: 'successful',
      currency: 'ETH'
    },
    { 
      id: 4, 
      type: 'withdraw', 
      amount: '-0.00113311 ETH', 
      date: '2025-04-22 18:30:15', 
      status: 'successful',
      currency: 'ETH'
    },
    { 
      id: 5, 
      type: 'withdraw', 
      amount: '-2.5 BTC', 
      date: '2025-04-20 11:15:42', 
      status: 'successful',
      currency: 'BTC'
    }
  ];

  return (
    <Box 
      sx={{ 
        backgroundColor: 'background.paper', 
        borderRadius: 3,
        height: '100%',
        minHeight: '400px',
        maxHeight:'410px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        px: 3, 
        py: 2, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default
      }}>
        <Grid container alignItems="center">
          <Grid size={{xs: 8}}>
            <Typography variant="h6" fontWeight="bold">
              Recent Transactions
            </Typography>
          </Grid>
          <Grid size={{xs: 4}} sx={{ textAlign: 'right' }}>
            <Link 
              href="#" 
              sx={{ 
                fontSize: '0.8rem', 
                textDecoration: 'none',
                color: theme.palette.primary.main,
                display: 'inline-flex',
                alignItems: 'center',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                }
              }}
            >
              View All <span style={{ marginLeft: 4, fontWeight: 'bold' }}>&gt;</span>
            </Link>
          </Grid>
        </Grid>
      </Box>
      
      {/* Info Alert */}
      <Box sx={{ px: 2, py: 1.5 }}>
        <Alert 
          severity="info" 
          icon={<InfoIcon fontSize="small" />}
          sx={{ 
            backgroundColor: theme.palette.info.light,
            color: theme.palette.info.dark,
            fontSize: '0.8rem',
            borderRadius: 2,
            py: 0.5,
            '& .MuiAlert-icon': {
              color: theme.palette.info.main,
              alignItems: 'center'
            }
          }}
        >
          Low Withdrawal fees Globally
        </Alert>
      </Box>
      
      {/* Transactions List */}
      <Box sx={{ 
        flex: 1, 
        overflowY: 'auto', 
        px: 2, 
        py: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.divider,
          borderRadius: '4px',
        }
      }}>
        <Stack spacing={0}>
          {transactions.map((transaction) => (
            <Box key={transaction.id}>
              <Grid container display='flex' justifyContent='space-between' alignItems="center">
                {/* Left side - Type and Date */}
                <Grid size={{xs:6, lg:7}}>
                  <Box display="flex" alignItems="top">
                    {transaction.type === 'deposit' ? (
                      <DepositIcon 
                        sx={{ 
                          color: 'success.main', 
                          fontSize: '1.4rem', 
                          mr: 1.5,
                          backgroundColor: theme.palette.success.light,
                          borderRadius: '50%',
                          p: 0.5
                        }} 
                      />
                    ) : (
                      <WithdrawIcon 
                        sx={{ 
                          color: 'error.main', 
                          fontSize: '1.4rem', 
                          mr: 1.5,
                          backgroundColor: theme.palette.error.light,
                          borderRadius: '50%',
                          p: 0.5
                        }} 
                      />
                    )}
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {transaction.type === 'deposit' ? 'Deposit' : 'Withdraw'}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ display: 'block', mt: 0.2 }}
                      >
                        {transaction.date}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                {/* Right side - Amount and Status */}
                <Grid size={{xs: 6, lg:5}} sx={{display: 'flex',justifyContent: 'end' , alignItems:'center' }}>
                  <Typography 
                    variant="body2" 
                    fontWeight={600}
                    fontSize={12}
                    color={transaction.type === 'deposit' ? 'success.main' : 'error.main'}
                    sx={{ mb: 0.5 }}
                  >
                    {transaction.amount}
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center'
                    }}
                  >
                    <SuccessIcon 
                      sx={{ 
                        color: 'success.main', 
                        fontSize: '0.6rem', 
                        mr: 0.5 
                      }} 
                    />
                    <TransactionStatus>
                      {transaction.status}
                    </TransactionStatus>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Stack>
      </Box>
      
      {/* Footer */}
      <Box sx={{ 
        px: 2, 
        py: 1.5, 
        backgroundColor: theme.palette.background.default,
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: 'center'
      }}>
        <Typography variant="caption" color="text.secondary">
          5 transactions displayed
        </Typography>
      </Box>
    </Box>
  );
};

export default WalletOver3;