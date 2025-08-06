/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from 'react';
import { 
  Box, Container, Typography, Avatar, Button, 
  Stack, Divider, IconButton, Paper, useTheme,
  Tooltip, Fade, Dialog, DialogTitle, DialogContent, 
  DialogActions, DialogContentText
} from '@mui/material';
import { 
  Add as AddIcon, 
  Logout as LogoutIcon, 
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { Icon } from '@iconify/react';

// Data types
type AccountType = 'personal' | 'work' | 'business';

interface Account {
  id: string;
  name: string;
  email: string;
  type: AccountType;
  avatar?: string;
  active?: boolean;
}

const page = () => {
  const theme = useTheme();
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      type: 'personal',
      active: true
    },
    {
      id: '2',
      name: 'Tech Solutions Inc.',
      email: 'info@techsolutions.com',
      type: 'business'
    },
    {
      id: '3',
      name: 'Jane Doe',
      email: 'j.doe@company.com',
      type: 'work'
    }
  ]);
  
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [newAccountType, setNewAccountType] = useState<AccountType>('personal');

  // Switch active account
  const switchAccount = (id: string) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      active: acc.id === id
    })));
  };

  // Remove account
  const removeAccount = (id: string) => {
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  // Add new account
  const addNewAccount = () => {
    const newAccount: Account = {
      id: `acc-${Date.now()}`,
      name: newAccountType === 'personal' ? 'New Personal Account' : 
            newAccountType === 'work' ? 'New Work Account' : 'New Business Account',
      email: newAccountType === 'personal' ? 'new.personal@email.com' : 
             newAccountType === 'work' ? 'new.work@company.com' : 'new.business@enterprise.com',
      type: newAccountType,
      active: false
    };
    
    setAccounts([...accounts, newAccount]);
    setShowAddAccount(false);
  };

  // Sign out from all accounts
  const handleLogoutAll = () => {
    setShowLogoutDialog(false);
    // Implement sign out logic here
  };

  // Get account avatar based on type
  const getAccountAvatar = (type: AccountType) => {
    switch (type) {
      case 'personal': return (
        <Avatar sx={{ 
          bgcolor: theme.palette.primary.light,
          width: 56, 
          height: 56,
          fontSize: 24
        }}>
          <Icon icon="mdi:user" />
        </Avatar>
      );
      case 'work': return (
        <Avatar sx={{ 
          bgcolor: theme.palette.secondary.light, 
          width: 56, 
          height: 56,
          fontSize: 24
        }}>
          <Icon icon="mdi:briefcase" />
        </Avatar>
      );
      case 'business': return (
        <Avatar sx={{ 
          bgcolor: theme.palette.success.light, 
          width: 56, 
          height: 56,
          fontSize: 24
        }}>
          <Icon icon="mdi:office-building" />
        </Avatar>
      );
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.palette.background.default,
      p: 2
    }}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          boxShadow: theme.shadows[10],
          background: theme.palette.background.paper
        }}>
          {/* Page header */}
          <Box sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            p: 3,
            textAlign: 'center',
            position: 'relative'
          }}>
            {showAddAccount ? (
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  left: 16, 
                  top: 16,
                  color: 'inherit'
                }}
                onClick={() => setShowAddAccount(false)}
              >
                <ArrowBackIcon />
              </IconButton>
            ) : null}
            
            <Typography variant="h5" fontWeight="bold">
              {showAddAccount ? "Add Account" : "Choose an Account"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
              {showAddAccount 
                ? "Select account type to add" 
                : "Select an account to continue"}
            </Typography>
          </Box>
          
          {/* Main content */}
          <Box sx={{ p: 3 }}>
            {showAddAccount ? (
              // Add account mode
              <Stack spacing={3}>
                <Button
                  variant={newAccountType === 'personal' ? 'contained' : 'outlined'}
                  color="primary"
                  size="large"
                  startIcon={<Icon icon="mdi:user" width={24} />}
                  onClick={() => setNewAccountType('personal')}
                  sx={{ 
                    justifyContent: 'flex-start',
                    py: 2,
                    borderRadius: 2
                  }}
                >
                  Personal Account
                </Button>
                
                <Button
                  variant={newAccountType === 'work' ? 'contained' : 'outlined'}
                  color="secondary"
                  size="large"
                  startIcon={<Icon icon="mdi:briefcase" width={24} />}
                  onClick={() => setNewAccountType('work')}
                  sx={{ 
                    justifyContent: 'flex-start',
                    py: 2,
                    borderRadius: 2
                  }}
                >
                  Work Account
                </Button>
                
                <Button
                  variant={newAccountType === 'business' ? 'contained' : 'outlined'}
                  color="success"
                  size="large"
                  startIcon={<Icon icon="mdi:office-building" width={24} />}
                  onClick={() => setNewAccountType('business')}
                  sx={{ 
                    justifyContent: 'flex-start',
                    py: 2,
                    borderRadius: 2
                  }}
                >
                  Business Account
                </Button>
                
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={addNewAccount}
                  sx={{ mt: 2, py: 1.5 }}
                >
                  Add Account
                </Button>
              </Stack>
            ) : (
              // Account list mode
              <>
                <Stack spacing={2}>
                  {accounts.map(account => (
                    <Fade in={true} key={account.id}>
                      <Paper 
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: account.active 
                            ? `2px solid ${theme.palette.primary.main}` 
                            : `1px solid ${theme.palette.divider}`,
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[2]
                          }
                        }}
                        onClick={() => switchAccount(account.id)}
                      >
                        {getAccountAvatar(account.type)}
                        
                        <Box sx={{ flexGrow: 1, ml: 2 }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {account.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {account.email}
                          </Typography>
                        </Box>
                        
                        {account.active && (
                          <Box sx={{ color: theme.palette.success.main, ml: 1 }}>
                            <CheckCircleIcon />
                          </Box>
                        )}
                        
                        <Tooltip title="Remove account">
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              removeAccount(account.id);
                            }}
                            sx={{ 
                              color: theme.palette.error.main,
                              '&:hover': {
                                bgcolor: theme.palette.error.light
                              }
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      </Paper>
                    </Fade>
                  ))}
                </Stack>
                
                <Divider sx={{ my: 3 }} />
                
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => setShowAddAccount(true)}
                    sx={{ 
                      justifyContent: 'flex-start',
                      py: 1.5,
                      borderRadius: 2
                    }}
                  >
                    Add Another Account
                  </Button>
                  
                  <Button
                    variant="text"
                    color="error"
                    size="large"
                    startIcon={<LogoutIcon />}
                    onClick={() => setShowLogoutDialog(true)}
                    sx={{ 
                      justifyContent: 'flex-start',
                      py: 1.5,
                      borderRadius: 2
                    }}
                  >
                    Sign Out All Accounts
                  </Button>
                </Stack>
              </>
            )}
          </Box>
        </Paper>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
          Visit settings to manage privacy and security for your accounts
        </Typography>
      </Container>
      
      {/* Sign out confirmation dialog */}
      <Dialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
      >
        <DialogTitle>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            By confirming this action, you&apos;ll be signed out of all accounts.
            You&apos;ll need to sign in again to access your accounts.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowLogoutDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLogoutAll}
            color="error"
            variant="contained"
            startIcon={<LogoutIcon />}
          >
            Sign Out All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default page;