'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import AddressManagement from './AddressManagement';
import AssetManagement from './AssetManagement';
import TransferHistory from './TransferHistory';
import LoginHistory from './LoginHistory';

type TabNavigationProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

// Tab navigation component
const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tabs = [
    { label: 'Address Management', value: 'address' },
    { label: 'Asset Management', value: 'asset' },
    { label: 'Transfer History', value: 'transfer' },
    { label: 'Login History', value: 'login' }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        gap: isMobile ? 1 : 2,
        borderBottom: '1px solid #e0e0e0',
        mb: 3
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant={activeTab === tab.value ? 'text' : 'outlined'}
          onClick={() => setActiveTab(tab.value)}
          sx={{
            borderRadius: 0,
            borderTop: 0,
            borderRight: 0,
            borderLeft: 0,
            justifyContent: 'flex-start',
            whiteSpace: 'nowrap',
            width: isMobile ? '100%' : 'auto',
            borderBottom: activeTab === tab.value ? '2px solid' : 'none',
            borderColor: 'primary.main',
            fontWeight: 'normal',
            fontSize: {xs:12,md:15},
            color: activeTab === tab.value ? 'primary.main' : 'text.primary',
            '&:hover': {
              borderBottom: '2px solid',
              borderColor: 'primary.main'
            }
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
};

// Main component
const RotateSubAccount = () => {
  const [activeTab, setActiveTab] = useState('address');

  return (
    <Box sx={{ p: { xs: 0, md: 3 } }}>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'address' && <AddressManagement />}
      {activeTab === 'asset' && <AssetManagement />}
      {activeTab === 'transfer' && <TransferHistory />}
      {activeTab === 'login' && <LoginHistory />}
    </Box>
  );
};

export default RotateSubAccount;
