'use client';

import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, styled, useTheme } from '@mui/material';
import WalletFundingSectionDeposit from './WalletFundingSectionDeposit';
import WalletFundingSectionWithdrawal from './WalletFundingSectionWithdrawal';
import WalletFundingSectionTransfer from './WalletFundingSectionTransfer';
import WalletFundingSectionSend from './WalletFundingSectionSend';
import WalletFundingSectionOthres from './WalletFundingSectionOthres';

// Interface for tab data
interface TabData {
  id: string;
  label: string;
  component: React.ReactNode;
}

// Styled Components
const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(1),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
  marginTop: theme.spacing(3),
  overflow: 'hidden',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: '1px solid transparent',
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  minWidth: 'max-content',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    borderBottom: `3px solid ${theme.palette.primary.main}`,
    fontWeight: 700,
  },
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

// Tab data
const tabs: TabData[] = [
  { id: 'deposit', label: 'Deposit', component: <WalletFundingSectionDeposit /> },
  { id: 'withdrawal', label: 'Withdrawal', component: <WalletFundingSectionWithdrawal /> },
  { id: 'transfer', label: 'Transfer', component: <WalletFundingSectionTransfer /> }, // Placeholder
  { id: 'send', label: 'Send', component: <WalletFundingSectionSend /> }, // Placeholder
  { id: 'others', label: 'Others', component: <WalletFundingSectionOthres /> }, // Placeholder
];

const WalletFundingRouter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('deposit'); // Default to 'deposit'
  const theme = useTheme();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <SectionCard>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '4px',
          },
          mb: 3,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
          sx={{ minHeight: 'auto' }}
        >
          {tabs.map((tab) => (
            <StyledTab key={tab.id} label={tab.label} value={tab.id} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ mt: 2 }}>
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </Box>
    </SectionCard>
  );
};

export default WalletFundingRouter;