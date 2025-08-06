'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Grid, 
  Button, 
  Switch,
  useTheme,
  styled,
  useMediaQuery
} from '@mui/material';
import { Icon } from '@iconify/react';


const SecurityItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(2, 0),
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
  }
}));

const SecurityToggle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  }
}));

const LinkedAccountCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  borderRadius: 8,
  width: "100%",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  marginBottom: theme.spacing(1),
}));

const PillButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: theme.spacing(0.5, 3),
  textTransform: 'none',
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  width: '100%',
  marginTop: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    marginTop: 0,
  }
}));

const UserSecpanelSV = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        {/* Header */}
        <Box mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Advanced Security
          </Typography>
        </Box>
        <Divider />

        {/* Anti-Phishing Section */}
        <SecurityItem>
          <Box display="flex" width="100%" mb={isMobile ? 1 : 0}>
            <Box mr={2} mt={0.5}>
              <Icon icon="mdi:email-outline" fontSize={20} color={theme.palette.primary.main} />
            </Box>
            <Box flexGrow={1}>
              <Typography fontWeight="bold">Anti-Phishing Code</Typography>
              <Typography variant="body2" color="textSecondary">
                Emails sent to you will include the Anti-Phishing code to protect against phishing attacks
              </Typography>
            </Box>
          </Box>
          <Box display="flex" width="100%" alignItems="center" flexDirection={{xs:'column',md:'row'}} justifyContent="space-between">
            <Box display="flex" alignItems="center" mr={isMobile ? 0 : 2}>
              <Icon icon="mdi:check-circle" fontSize={18} color={theme.palette.success.main} />
              <Typography fontWeight="bold" ml={1}>Default</Typography>
            </Box>
            <PillButton variant="outlined" size="small">Change</PillButton>
          </Box>
        </SecurityItem>
        <Divider />

        {/* Login Password Section */}
        <SecurityItem>
          <Box display="flex" width="100%" mb={isMobile ? 1 : 0}>
            <Box mr={2} mt={0.5}>
              <Icon icon="mdi:cellphone" fontSize={20} color={theme.palette.primary.main} />
            </Box>
            <Box flexGrow={1}>
              <Typography fontWeight="bold">Login Password</Typography>
              <Typography variant="body2" color="textSecondary">
                Increase your password strength to enhance account security
              </Typography>
            </Box>
          </Box>
          <PillButton variant="outlined" size="small">Add</PillButton>
        </SecurityItem>
        <Divider />

        {/* Fund Security Settings */}
        <Box mt={3}>
          <SecurityItem>
            <Box mr={2} mt={0.5}>
              <Icon icon="mdi:shield-outline" fontSize={20} color={theme.palette.primary.main} />
            </Box>
            <Typography fontWeight="bold">Fund Security Settings</Typography>
          </SecurityItem>

          {/* Security Toggles */}
          {[1, 2, 3].map((item) => (
            <SecurityToggle key={item}>
              <Box width={isMobile ? '100%' : 'auto'}>
                <Typography fontWeight="bold">Fast Withdrawal</Typography>
                <Typography variant="body2" color="textSecondary">
                  No security verification required for small withdrawals to whitelisted addresses
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" width={isMobile ? '100%' : 'auto'} justifyContent="space-between">
                <Box display="flex" alignItems="center" mr={isMobile ? 0 : 2}>
                  <Icon icon="mdi:check-circle" fontSize={18} color={theme.palette.success.main} />
                  <Typography fontWeight="bold" ml={1}>Default</Typography>
                </Box>
                <Switch color="primary" />
              </Box>
            </SecurityToggle>
          ))}
          
          <Divider sx={{ my: 2 }} />
          
          {/* Linked Accounts */}
          <SecurityItem>
            <Box display="flex" width="100%" mb={isMobile ? 1 : 0}>
              <Box mr={2} mt={0.5}>
                <Icon icon="mdi:shield-link-variant" fontSize={20} color={theme.palette.primary.main} />
              </Box>
              <Box flexGrow={1}>
                <Typography fontWeight="bold">Linked Accounts</Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Link third-party accounts for login authentication
                </Typography>
              </Box>
            </Box>
            
            <Grid container spacing={1} mt={1} width="100%">
              {['Google', 'Facebook', 'Apple', 'Twitter'].map((platform) => (
                <Grid size={{xs:12, sm:6, md:3}} key={platform}>
                  <LinkedAccountCard>
                    <Box width="100%" display="flex" justifyContent="space-between" flexDirection={{xs:'row',md:'column'}} alignItems="center">
                      <Box display="flex" alignItems="center">
                        <Icon 
                          icon={
                            platform === 'Google' ? 'mdi:google' :
                            platform === 'Facebook' ? 'mdi:facebook' :
                            platform === 'Apple' ? 'mdi:apple' : 'mdi:twitter'
                          } 
                          fontSize={18}
                          style={{ marginRight: theme.spacing(1) }}
                        />
                        <Typography fontWeight="bold">{platform}</Typography>
                      </Box>
                      <Typography color="error">Unlink</Typography>
                    </Box>
                  </LinkedAccountCard>
                </Grid>
              ))}
            </Grid>
          </SecurityItem>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserSecpanelSV;