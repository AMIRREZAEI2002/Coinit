'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  useTheme,
  alpha,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  CardActions,
  Stack
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon
} from '@mui/icons-material';

interface FuturesAccount {
  id: number;
  serialNumber: number;
  subAccount: string;
  date: string;
  status: 'Active' | 'Inactive';
  emailVerification: boolean;
  mobileVerification: boolean;
  authenticatorCode: boolean;
  futures: 'Enabled' | 'Disabled';
}

const AddressManagement = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const initialAccounts: FuturesAccount[] = [
    {
      id: 1,
      serialNumber: 1,
      subAccount: 'Main Trading Account',
      date: '2023-10-15',
      status: 'Active',
      emailVerification: true,
      mobileVerification: true,
      authenticatorCode: true,
      futures: 'Enabled'
    },
    {
      id: 2,
      serialNumber: 2,
      subAccount: 'Arbitrage Account',
      date: '2023-10-16',
      status: 'Active',
      emailVerification: true,
      mobileVerification: false,
      authenticatorCode: true,
      futures: 'Enabled'
    },
    {
      id: 3,
      serialNumber: 3,
      subAccount: 'Long-term Investment',
      date: '2023-10-17',
      status: 'Inactive',
      emailVerification: false,
      mobileVerification: true,
      authenticatorCode: false,
      futures: 'Disabled'
    },
    {
      id: 4,
      serialNumber: 4,
      subAccount: 'High Frequency Trading',
      date: '2023-10-18',
      status: 'Active',
      emailVerification: true,
      mobileVerification: true,
      authenticatorCode: true,
      futures: 'Enabled'
    },
    {
      id: 5,
      serialNumber: 5,
      subAccount: 'Test Account',
      date: '2023-10-19',
      status: 'Inactive',
      emailVerification: false,
      mobileVerification: false,
      authenticatorCode: true,
      futures: 'Disabled'
    }
  ];

  const [accounts, setAccounts] = useState<FuturesAccount[]>(initialAccounts);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<FuturesAccount | null>(null);
  const [formData, setFormData] = useState<Omit<FuturesAccount, 'id' | 'serialNumber'>>({
    subAccount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Active',
    emailVerification: false,
    mobileVerification: false,
    authenticatorCode: false,
    futures: 'Enabled'
  });

  const handleOpen = (account: FuturesAccount | null = null) => {
    if (account) {
      setCurrentAccount(account);
      setFormData({
        subAccount: account.subAccount,
        date: account.date,
        status: account.status,
        emailVerification: account.emailVerification,
        mobileVerification: account.mobileVerification,
        authenticatorCode: account.authenticatorCode,
        futures: account.futures
      });
    } else {
      setCurrentAccount(null);
      setFormData({
        subAccount: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Active',
        emailVerification: false,
        mobileVerification: false,
        authenticatorCode: false,
        futures: 'Enabled'
      });
    }
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setCurrentAccount(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (!formData.subAccount || !formData.date) return;

    if (currentAccount) {
      setAccounts(prev =>
        prev.map(acc =>
          acc.id === currentAccount.id
            ? {
                ...currentAccount,
                ...formData,
                serialNumber: currentAccount.serialNumber
              }
            : acc
        )
      );
    } else {
      const newAccount: FuturesAccount = {
        id: Date.now(),
        serialNumber: accounts.length + 1,
        ...formData
      };
      setAccounts(prev => [...prev, newAccount]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setAccounts(prev => 
      prev
        .filter(account => account.id !== id)
        .map((acc, index) => ({ ...acc, serialNumber: index + 1 }))
    );
  };

  // Card view for mobile
  const renderMobileCards = () => (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {accounts.map(account => (
        <Grid size={{xs:12}} key={account.id}>
          <Card 
            sx={{ 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" fontWeight={600} noWrap sx={{ maxWidth: '70%' }}>
                  {account.subAccount}
                </Typography>
                <Chip 
                  label={account.status} 
                  color={account.status === 'Active' ? 'success' : 'error'} 
                  size="small"
                  sx={{ 
                    fontWeight: 500,
                    borderRadius: '4px',
                  }}
                />
              </Box>
              
              <Typography variant="body2" color="textSecondary" gutterBottom>
                #{account.serialNumber} • Created: {account.date}
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon 
                    color={account.emailVerification ? "success" : "disabled"} 
                    fontSize="small"
                    sx={{ mr: 0.5 }}
                  />
                  <Typography variant="caption">Email</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon 
                    color={account.mobileVerification ? "success" : "disabled"} 
                    fontSize="small"
                    sx={{ mr: 0.5 }}
                  />
                  <Typography variant="caption">Mobile</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon 
                    color={account.authenticatorCode ? "success" : "disabled"} 
                    fontSize="small"
                    sx={{ mr: 0.5 }}
                  />
                  <Typography variant="caption">2FA</Typography>
                </Box>
              </Stack>
              
              <Chip 
                label={`Futures: ${account.futures}`} 
                color={account.futures === 'Enabled' ? 'primary' : 'default'} 
                size="small"
                sx={{ 
                  fontWeight: 500,
                  borderRadius: '4px',
                  mt: 1
                }}
              />
            </CardContent>
            
            <CardActions sx={{ justifyContent: 'flex-end', borderTop: `1px solid ${theme.palette.divider}`, pt: 1 }}>
              <IconButton 
                color="primary" 
                onClick={() => handleOpen(account)}
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                color="error" 
                onClick={() => handleDelete(account.id)}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Table view for desktop
  const renderDesktopTable = () => {
    // Responsive column configuration
    const getColumnVisibility = () => {
      if (isSmallScreen) return {
        serialNumber: false,
        date: false,
        emailVerification: false,
        mobileVerification: false,
        authenticatorCode: false
      };
      
      if (isMediumScreen) return {
        serialNumber: true,
        date: true,
        emailVerification: false,
        mobileVerification: false,
        authenticatorCode: false
      };
      
      return {
        serialNumber: true,
        date: true,
        emailVerification: true,
        mobileVerification: true,
        authenticatorCode: true
      };
    };

    const columnVisibility = getColumnVisibility();

    return (
      <TableContainer 
        component={Paper} 
        sx={{ 
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          overflowX: 'auto',
          maxWidth: '100vw'
        }}
      >
        <Table sx={{ 
          minWidth: isSmallScreen ? 600 : '100%',
          tableLayout: 'fixed'
        }}>
          <TableHead sx={{ bgcolor: alpha(theme.palette.primary.light, 0.1) }}>
            <TableRow>
              {columnVisibility.serialNumber && (
                <TableCell sx={{ fontWeight: 600, width: '5%' }}>#</TableCell>
              )}
              <TableCell sx={{ fontWeight: 600, width: columnVisibility.serialNumber ? '20%' : '25%' }}>Sub-Account</TableCell>
              {columnVisibility.date && (
                <TableCell sx={{ fontWeight: 600, width: '15%' }}>Date</TableCell>
              )}
              <TableCell sx={{ fontWeight: 600, width: '10%' }}>Status</TableCell>
              {columnVisibility.emailVerification && (
                <TableCell sx={{ fontWeight: 600, width: '8%' }} align="center">Email</TableCell>
              )}
              {columnVisibility.mobileVerification && (
                <TableCell sx={{ fontWeight: 600, width: '8%' }} align="center">Mobile</TableCell>
              )}
              {columnVisibility.authenticatorCode && (
                <TableCell sx={{ fontWeight: 600, width: '10%' }} align="center">2FA</TableCell>
              )}
              <TableCell sx={{ fontWeight: 600, width: '10%' }}>Futures</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '15%' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(account => (
              <TableRow 
                key={account.id}
                hover
                sx={{ 
                  '&:nth-of-type(even)': { bgcolor: theme.palette.action.hover },
                  '&:hover': { bgcolor: alpha(theme.palette.primary.light, 0.05) }
                }}
              >
                {columnVisibility.serialNumber && (
                  <TableCell>{account.serialNumber}</TableCell>
                )}
                <TableCell>
                  <Typography fontWeight={500} noWrap>
                    {account.subAccount}
                  </Typography>
                </TableCell>
                {columnVisibility.date && (
                  <TableCell>{account.date}</TableCell>
                )}
                <TableCell>
                  <Chip 
                    label={account.status} 
                    color={account.status === 'Active' ? 'success' : 'error'} 
                    size="small"
                    sx={{ 
                      fontWeight: 500,
                      borderRadius: '4px',
                      minWidth: 80
                    }}
                  />
                </TableCell>
                {columnVisibility.emailVerification && (
                  <TableCell align="center">
                    <CheckCircleIcon 
                      color={account.emailVerification ? "success" : "disabled"} 
                      fontSize="medium"
                    />
                  </TableCell>
                )}
                {columnVisibility.mobileVerification && (
                  <TableCell align="center">
                    <CheckCircleIcon 
                      color={account.mobileVerification ? "success" : "disabled"} 
                      fontSize="medium"
                    />
                  </TableCell>
                )}
                {columnVisibility.authenticatorCode && (
                  <TableCell align="center">
                    <CheckCircleIcon 
                      color={account.authenticatorCode ? "success" : "disabled"} 
                      fontSize="medium"
                    />
                  </TableCell>
                )}
                <TableCell>
                  <Chip 
                    label={account.futures} 
                    color={account.futures === 'Enabled' ? 'primary' : 'default'} 
                    size="small"
                    sx={{ 
                      fontWeight: 500,
                      borderRadius: '4px',
                      minWidth: 80
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleOpen(account)}
                      size="medium"
                      sx={{ 
                        mr: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                      }}
                    >
                      <EditIcon fontSize="medium" />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(account.id)}
                      size="medium"
                      sx={{ 
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
                      }}
                    >
                      <DeleteIcon fontSize="medium" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Futures Account Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage your sub-accounts for futures trading
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpen(null)}
          sx={{ height: 'fit-content' }}
        >
          Add Account
        </Button>
      </Box>

      {isLargeScreen ? renderDesktopTable() : renderMobileCards()}

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, borderBottom: `1px solid ${theme.palette.divider}`, pb: 2 }}>
          {currentAccount ? 'Edit Account' : 'Create New Account'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'grid', gap: 1 }}>
          <TextField
            name="subAccount"
            label="Sub-Account Name"
            value={formData.subAccount}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          
          <TextField
            name="date"
            label="Creation Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              margin="dense"
              select
              size="small"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
            
            <TextField
              name="futures"
              label="Futures"
              value={formData.futures}
              onChange={handleChange}
              fullWidth
              margin="dense"
              select
              size="small"
            >
              <MenuItem value="Enabled">Enabled</MenuItem>
              <MenuItem value="Disabled">Disabled</MenuItem>
            </TextField>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <TextField
              name="emailVerification"
              label="Email Verified"
              value={formData.emailVerification}
              onChange={handleChange}
              fullWidth
              margin="dense"
              select
              size="small"
            >
              <MenuItem value="true">Verified</MenuItem>
              <MenuItem value="false">Not Verified</MenuItem>
            </TextField>
            
            <TextField
              name="mobileVerification"
              label="Mobile Verified"
              value={formData.mobileVerification}
              onChange={handleChange}
              fullWidth
              margin="dense"
              select
              size="small"
            >
              <MenuItem value="true">Verified</MenuItem>
              <MenuItem value="false">Not Verified</MenuItem>
            </TextField>
            
            <TextField
              name="authenticatorCode"
              label="2FA Enabled"
              value={formData.authenticatorCode}
              onChange={handleChange}
              fullWidth
              margin="dense"
              select
              size="small"
            >
              <MenuItem value="true">Enabled</MenuItem>
              <MenuItem value="false">Disabled</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button 
            onClick={handleClose} 
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{ minWidth: 100 }}
          >
            {currentAccount ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddressManagement;