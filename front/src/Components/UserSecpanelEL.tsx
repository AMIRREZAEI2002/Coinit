'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider,
  Button, 
  LinearProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Icon } from '@iconify/react';

const UserSecpanelEL = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Security level calculation
  const securityLevel = 66;
  const securityLevelText = securityLevel >= 80 ? 'High' : securityLevel >= 50 ? 'Medium' : 'Low';
  const securityLevelColor = securityLevel >= 80 ? 'success' : securityLevel >= 50 ? 'warning' : 'error';

  return (
    <Box>
      <Paper 
        elevation={0} 
        sx={{
          borderRadius: 3,
          backgroundColor: 'background.paper',
          p: isMobile ? 1.5 : 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* 2FA Section */}
        <Box mb={3}>
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
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Email Verification */}
        <Box mb={3}>
          <Box display="flex" mb={isMobile ? 2 : 0}>
            <Icon 
              icon="mdi:email-outline" 
              style={{ 
                fontSize: '1.5rem', 
                color: theme.palette.primary.main,
                marginRight: theme.spacing(1.5),
                marginTop: theme.spacing(0.5)
              }} 
            />
            <Box flexGrow={1}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Email Verification
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Connect your email address to secure login, password recovery, and withdrawal verification.
              </Typography>
            </Box>
          </Box>
          
          <Box 
            display="flex" 
            justifyContent={isMobile ? 'flex-start' : 'space-between'} 
            alignItems="center"
            flexDirection={isMobile ? 'column' : 'row'}
            gap={1}
            mt={isMobile ? 2 : 0}
          >
            <Box display="flex" alignItems="center" mb={isMobile ? 1 : 0}>
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
              fullWidth={isMobile}
              sx={{
                borderRadius: 50,
                px: 3,
                textTransform: 'none',
                borderColor: theme.palette.divider,
                color: 'text.primary',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                },
                alignSelf: isMobile ? 'stretch' : 'auto'
              }}
            >
              Change
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Mobile Verification */}
        <Box mb={3}>
          <Box display="flex" mb={isMobile ? 2 : 0}>
            <Icon 
              icon="mdi:cellphone" 
              style={{ 
                fontSize: '1.5rem', 
                color: theme.palette.primary.main,
                marginRight: theme.spacing(1.5),
                marginTop: theme.spacing(0.5)
              }} 
            />
            <Box flexGrow={1}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Mobile Verification
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Link your mobile number to receive verification codes via SMS for confirmations on withdrawal, password change, and security settings.
              </Typography>
            </Box>
          </Box>
          
          <Box 
            display="flex" 
            justifyContent={isMobile ? 'flex-start' : 'space-between'} 
            alignItems="center"
            flexDirection={isMobile ? 'column' : 'row'}
            gap={1}
            mt={isMobile ? 2 : 0}
          >
            <Box display="flex" alignItems="center" mb={isMobile ? 1 : 0}>
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
              fullWidth={isMobile}
              sx={{
                borderRadius: 50,
                px: 3,
                textTransform: 'none',
                borderColor: theme.palette.divider,
                color: 'text.primary',
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                },
                alignSelf: isMobile ? 'stretch' : 'auto'
              }}
            >
              Set Up
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Google Authenticator */}
        <Box>
          <Box display="flex" mb={isMobile ? 2 : 0}>
            <Icon 
              icon="mdi:shield-account" 
              style={{ 
                fontSize: '1.5rem', 
                color: theme.palette.primary.main,
                marginRight: theme.spacing(1.5),
                marginTop: theme.spacing(0.5)
              }} 
            />
            <Box flexGrow={1}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Google Authenticator
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Set up Google Authenticator for an extra layer of security when withdrawing funds or configuring security settings.
              </Typography>
            </Box>
          </Box>
          
          <Box 
            display="flex" 
            justifyContent={isMobile ? 'flex-start' : 'space-between'} 
            alignItems="center"
            flexDirection={isMobile ? 'column' : 'row'}
            gap={1}
            mt={isMobile ? 2 : 0}
          >
            <Box display="flex" alignItems="center" mb={isMobile ? 1 : 0}>
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
              fullWidth={isMobile}
              sx={{
                borderRadius: 50,
                px: 3,
                textTransform: 'none',
                borderColor: theme.palette.divider,
                color: 'text.primary',
                '&:hover': {
                  borderColor: theme.palette.error.main,
                  color: theme.palette.error.main,
                },
                alignSelf: isMobile ? 'stretch' : 'auto'
              }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserSecpanelEL;