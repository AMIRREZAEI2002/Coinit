'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Grid, 
  Button, 
  LinearProgress,
  useTheme
} from '@mui/material';
import { Icon } from '@iconify/react';

const UserSecpanelEL = () => {
  const theme = useTheme();
  
  // Security level calculation (for demonstration)
  const securityLevel = 66; // Medium level (out of 100)
  const securityLevelText = securityLevel >= 80 ? 'High' : securityLevel >= 50 ? 'Medium' : 'Low';
  const securityLevelColor = securityLevel >= 80 ? 'success' : securityLevel >= 50 ? 'warning' : 'error';

  return (
    <Box>
      {/* Main Card */}
      <Paper 
        elevation={0} 
        sx={{
          borderRadius: 3,
          backgroundColor: 'background.paper',
          p: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* 2FA Section */}
        <Grid container spacing={2}>
          <Grid size={{xs:12, md:6}}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Two-Factor Authentication (2FA)
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              To protect your account, we recommend that you enable at least one 2FA method
            </Typography>
            
            <Box mt={2}>
              <Typography variant="body2">
                Security Level: <Typography component="span" color="primary" fontWeight="bold">
                  {securityLevelText}
                </Typography>
              </Typography>
              
              <Box display="flex" alignItems="center" mt={1}>
                <LinearProgress 
                  variant="determinate" 
                  value={securityLevel} 
                  color={securityLevelColor}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    flexGrow: 1,
                    mr: 1,
                  }}
                />
                <Typography variant="body2" color="textSecondary">
                  {securityLevel}%
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Email Verification */}
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid size={{xs:12, md:6}}>
            <Box display="flex">
              <Icon 
                icon="mdi:email-outline" 
                style={{ 
                  fontSize: '1.5rem', 
                  color: theme.palette.primary.main,
                  marginRight: theme.spacing(1.5),
                  marginTop: theme.spacing(0.5)
                }} 
              />
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Email Verification
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Connect your email address to secure login, password recovery, and withdrawal verification.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid size={{xs:12, md:6}}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <Icon 
                  icon="mdi:check-circle" 
                  style={{ 
                    fontSize: '1.2rem', 
                    color: theme.palette.success.main,
                    marginRight: theme.spacing(1)
                  }} 
                />
                <Typography variant="body1" fontWeight="bold">
                  ag**m@gmail.com
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{
                  borderRadius: 50,
                  px: 3,
                  textTransform: 'none',
                  borderColor: theme.palette.divider,
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                  }
                }}
              >
                Change
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Mobile Verification */}
        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid size={{xs:12, md:6}}>
            <Box display="flex">
              <Icon 
                icon="mdi:cellphone" 
                style={{ 
                  fontSize: '1.5rem', 
                  color: theme.palette.primary.main,
                  marginRight: theme.spacing(1.5),
                  marginTop: theme.spacing(0.5)
                }} 
              />
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Mobile Verification
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Link your mobile number to receive verification codes via SMS for confirmations on withdrawal, password change, and security settings.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid size={{xs:12, md:6}}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <Icon 
                  icon="mdi:close-circle" 
                  style={{ 
                    fontSize: '1.2rem', 
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1)
                  }} 
                />
                <Typography variant="body1" fontWeight="bold" color="textSecondary">
                  Off
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{
                  borderRadius: 50,
                  px: 3,
                  textTransform: 'none',
                  borderColor: theme.palette.divider,
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                  }
                }}
              >
                Set Up
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Google Authenticator */}
        <Grid container spacing={2} alignItems="center">
          <Grid size={{xs:12, md:6}}>
            <Box display="flex">
              <Icon 
                icon="mdi:shield-account" 
                style={{ 
                  fontSize: '1.5rem', 
                  color: theme.palette.primary.main,
                  marginRight: theme.spacing(1.5),
                  marginTop: theme.spacing(0.5)
                }} 
              />
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Google Authenticator
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Set up Google Authenticator for an extra layer of security when withdrawing funds or configuring security settings.
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid size={{xs:12, md:6}}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                <Icon 
                  icon="mdi:check-circle" 
                  style={{ 
                    fontSize: '1.2rem', 
                    color: theme.palette.success.main,
                    marginRight: theme.spacing(1)
                  }} 
                />
                <Typography variant="body1" fontWeight="bold">
                  On
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{
                  borderRadius: 50,
                  px: 3,
                  textTransform: 'none',
                  borderColor: theme.palette.divider,
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: theme.palette.error.main,
                    color: theme.palette.error.main,
                  }
                }}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserSecpanelEL;