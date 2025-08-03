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
  styled
} from '@mui/material';
import { Icon } from '@iconify/react';

const SecurityCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  border: `1px solid ${theme.palette.divider}`,
}));

const SecurityItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(2, 0),
}));

const SecurityToggle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const LinkedAccountCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  borderRadius: 4,
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
  }
}));

const UserSecpanelSV = () => {
  const theme = useTheme();

  return (
    <Box>
      <SecurityCard>
        {/* Header */}
        <Box mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Advanced Security
          </Typography>
        </Box>
        <Divider />

        {/* Anti-Phishing Section */}
        <SecurityItem>
          <Box mr={2} mt={0.5}>
            <Icon icon="mdi:email-outline" fontSize={20} color={theme.palette.primary.main} />
          </Box>
          <Box flexGrow={1}>
            <Typography fontWeight="bold">Anti-Phishing Code</Typography>
            <Typography variant="body2" color="textSecondary">
              Emails sent to you will include the Anti-Phishing code to protect against phishing attacks
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center" mr={2}>
              <Icon icon="mdi:check-circle" fontSize={18} color={theme.palette.success.main} />
              <Typography fontWeight="bold" ml={1}>Default</Typography>
            </Box>
            <PillButton variant="outlined" size="small">Change</PillButton>
          </Box>
        </SecurityItem>
        <Divider />

        {/* Login Password Section */}
        <SecurityItem>
          <Box mr={2} mt={0.5}>
            <Icon icon="mdi:cellphone" fontSize={20} color={theme.palette.primary.main} />
          </Box>
          <Box flexGrow={1}>
            <Typography fontWeight="bold">Login Password</Typography>
            <Typography variant="body2" color="textSecondary">
              Increase your password strength to enhance account security
            </Typography>
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
              <Box>
                <Typography fontWeight="bold">Fast Withdrawal</Typography>
                <Typography variant="body2" color="textSecondary">
                  No security verification required for small withdrawals to whitelisted addresses
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center" mr={2}>
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
            <Box mr={2} mt={0.5}>
              <Icon icon="mdi:shield-link-variant" fontSize={20} color={theme.palette.primary.main} />
            </Box>
            <Box flexGrow={1}>
              <Typography fontWeight="bold">Linked Accounts</Typography>
              <Typography variant="body2" color="textSecondary" mt={1}>
                Link third-party accounts for login authentication
              </Typography>
              
              <Grid container spacing={1} mt={1}>
                {['Google', 'Facebook', 'Apple', 'Twitter'].map((platform) => (
                  <Grid size={{xs:6, md:3}} key={platform}>
                    <LinkedAccountCard>
                      <Box width="100%" display="flex" justifyContent="space-between" flexDirection={{xs:'column',md:'row'}} alignItems="center">
                        <Box  display="flex" justifyContent="space-between" alignItems='center'>
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
            </Box>
          </SecurityItem>
        </Box>
      </SecurityCard>
    </Box>
  );
};

export default UserSecpanelSV;