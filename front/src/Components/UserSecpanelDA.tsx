'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Button,
  useTheme,
  styled
} from '@mui/material';
import { Icon } from '@iconify/react';

const SecurityCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  border: `1px solid ${theme.palette.divider}`,
}));

const SecurityItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(2, 0),
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

const DangerButton = styled(PillButton)(({ theme }) => ({
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
  '&:hover': {
    borderColor: theme.palette.error.dark,
    backgroundColor: theme.palette.error.light,
  }
}));

const UserSecpanelDA = () => {
  const theme = useTheme();

  // Security items data
  const securityItems = [
    {
      icon: 'mdi:clipboard-text-outline',
      title: 'Account Activities',
      description: 'View login and security activity history.',
      buttonText: 'View',
      buttonVariant: 'outlined',
      color: theme.palette.primary.main
    },
    {
      icon: 'mdi:devices',
      title: 'Device Management',
      description: 'Manage devices that are allowed to access your account.',
      buttonText: 'Manage',
      buttonVariant: 'outlined',
      color: theme.palette.primary.main
    },
    {
      icon: 'mdi:lock-alert',
      title: 'Freeze Account',
      description: 'Freeze your account all functions immediately.',
      buttonText: 'Freeze',
      buttonVariant: 'danger',
      color: theme.palette.error.main
    }
  ];

  return (
    <SecurityCard>
      {/* Header */}
      <Box mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Device and Activity
        </Typography>
      </Box>
      <Divider />

      {/* Security Items */}
      {securityItems.map((item, index) => (
        <React.Fragment key={index}>
          <SecurityItem>
            <Box mr={2} mt={0.5}>
              <Icon 
                icon={item.icon} 
                fontSize={20} 
                color={item.color}
              />
            </Box>
            <Box flexGrow={1}>
              <Typography fontWeight="bold">{item.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {item.description}
              </Typography>
            </Box>
            <Box>
              {item.buttonVariant === 'danger' ? (
                <DangerButton variant="outlined" size="small">
                  {item.buttonText}
                </DangerButton>
              ) : (
                <PillButton variant="outlined" size="small">
                  {item.buttonText}
                </PillButton>
              )}
            </Box>
          </SecurityItem>
          
          {index < securityItems.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </SecurityCard>
  );
};

export default UserSecpanelDA;