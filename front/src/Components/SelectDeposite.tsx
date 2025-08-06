"use client";
import React, { useState } from 'react';
import {
  Box, Typography, styled, useTheme
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  cryptoOptions,
  networkOptions,
  quickTokens, Token, Network
} from "../data/data";
import { Icon } from '@iconify/react';

const CircleActive = styled('div')(({ theme }) => ({
  width: '28px',
  height: '28px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  [theme.breakpoints.up('sm')]: {
    width: '35px',
    height: '35px',
  }
}));

const CircleInactive = styled('div')(({ theme }) => ({
  width: '28px',
  height: '28px',
  backgroundColor: theme.palette.grey[500],
  borderRadius: '50%',
  [theme.breakpoints.up('sm')]: {
    width: '35px',
    height: '35px',
  }
}));

const TokenDropdown = styled('div')({
  position: 'relative',
  width: '100%',
});

const TokenSelected = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  padding: '8px 12px',
  cursor: 'pointer',
  [theme.breakpoints.up('sm')]: {
    padding: '10px 16px',
  }
}));

const TokenOptions = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  marginTop: '4px',
  zIndex: 100,
  boxShadow: theme.shadows[3],
  maxHeight: '250px',
  overflowY: 'auto',
}));

const TokenOption = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.up('sm')]: {
    padding: '10px 16px',
  }
}));

const TokenItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '4px',
  minWidth: '70px',
  height: '60px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  flexShrink: 0,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  },
  [theme.breakpoints.up('sm')]: {
    minWidth: '80px',
    height: '70px',
  }
}));

const ScrollContainer = styled('div')({
  display: 'flex',
  overflowX: 'auto',
  paddingBottom: '8px',
  gap: '8px',
  '&::-webkit-scrollbar': {
    height: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '2px',
  }
});

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '8px 0 8px 16px',
  marginLeft: '16px',
  borderLeft: `2px solid ${theme.palette.primary.main}`,
  [theme.breakpoints.up('sm')]: {
    padding: '16px 0 16px 24px',
    marginLeft: '24px',
  }
}));

const SectionTitle = styled(Typography)(({ theme })=>({
  fontSize: '1rem',
  fontWeight: 600,
  [theme.breakpoints.up('sm')]: {
    minWidth: '80px',
    height: '70px',
  }
}));

const SelectDeposite = () => {
  const theme = useTheme();
  const [cryptoDropdownOpen, setCryptoDropdownOpen] = useState(false);
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<Token>(cryptoOptions[0]);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networkOptions[0]);

  const getNetworkIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'ethereum':
        return 'logos:ethereum';
      case 'binance':
        return 'cryptocurrency-color:bnb';
      case 'polygon':
        return 'token-branded:polygon';
      case 'tron':
        return 'token-branded:tron';
      default:
        return 'mdi:lan';
    }
  };

  return (
    <Box sx={{ px: 1.5, maxWidth: '100vw', overflow: 'hidden' }}>
      {/* Crypto Selection */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <CircleActive />
        <SectionTitle sx={{ ml: 1.5 }}>
          Select Crypto
        </SectionTitle>
      </Box>

      <SectionContainer>
        <TokenDropdown>
          <TokenSelected onClick={() => setCryptoDropdownOpen(!cryptoDropdownOpen)}>
            <Icon 
              icon={`cryptocurrency-color:${selectedCrypto.symbol.toLowerCase()}`} 
              width={24} 
              height={24} 
            />
            <Typography variant="body1" fontWeight="bold" sx={{ mx: 1, fontSize: '0.875rem' }}>
              {selectedCrypto.symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, fontSize: '0.75rem' }}>
              {selectedCrypto.name}
            </Typography>
            <ExpandMoreIcon fontSize="small" />
          </TokenSelected>

          {cryptoDropdownOpen && (
            <TokenOptions>
              {cryptoOptions.map((token) => (
                <TokenOption
                  key={token.symbol}
                  onClick={() => {
                    setSelectedCrypto(token);
                    setCryptoDropdownOpen(false);
                  }}
                >
                  <Icon 
                    icon={`cryptocurrency-color:${token.symbol.toLowerCase()}`} 
                    width={24} 
                    height={24} 
                  />
                  <Typography variant="body1" fontWeight="bold" sx={{ mx: 1, fontSize: '0.875rem' }}>
                    {token.symbol}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    {token.name}
                  </Typography>
                </TokenOption>
              ))}
            </TokenOptions>
          )}
        </TokenDropdown>
      </SectionContainer>

      <SectionContainer sx={{ py: 1.5 }}>
        <ScrollContainer>
          {quickTokens.map((token, index) => (
            <TokenItem
              key={index}
              onClick={() => {
                setSelectedCrypto(token);
                setCryptoDropdownOpen(false);
              }}
            >
              <Icon 
                icon={`cryptocurrency-color:${token.symbol.toLowerCase()}`} 
                width={24} 
                height={24} 
              />
              <Typography variant="caption" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                {token.symbol}
              </Typography>
            </TokenItem>
          ))}
        </ScrollContainer>
      </SectionContainer>

      {/* Network Selection */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, mt: 3 }}>
        <CircleActive />
        <SectionTitle sx={{ ml: 1.5 }}>
          Select Network
        </SectionTitle>
      </Box>

      <SectionContainer sx={{ borderColor: theme.palette.grey[500] }}>
        <TokenDropdown>
          <TokenSelected onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}>
            <Icon 
              icon={getNetworkIcon(selectedNetwork.name)} 
              width={24} 
              height={24} 
            />
            <Typography variant="body1" fontWeight="bold" sx={{ mx: 1, fontSize: '0.875rem' }}>
              {selectedNetwork.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, fontSize: '0.75rem' }}>
              {selectedNetwork.type}
            </Typography>
            <ExpandMoreIcon fontSize="small" />
          </TokenSelected>

          {networkDropdownOpen && (
            <TokenOptions>
              {networkOptions.map((network) => (
                <TokenOption
                  key={network.name}
                  onClick={() => {
                    setSelectedNetwork(network);
                    setNetworkDropdownOpen(false);
                  }}
                >
                  <Icon 
                    icon={getNetworkIcon(network.name)} 
                    width={24} 
                    height={24} 
                  />
                  <Typography variant="body1" fontWeight="bold" sx={{ mx: 1, fontSize: '0.875rem' }}>
                    {network.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                    {network.type}
                  </Typography>
                </TokenOption>
              ))}
            </TokenOptions>
          )}
        </TokenDropdown>
      </SectionContainer>

      <SectionContainer sx={{ 
        borderColor: theme.palette.grey[500],
        py: 1.5 
      }}>
        <ScrollContainer>
          {networkOptions.map((network, index) => (
            <TokenItem
              key={index}
              onClick={() => {
                setSelectedNetwork(network);
                setNetworkDropdownOpen(false);
              }}
            >
              <Icon 
                icon={getNetworkIcon(network.name)} 
                width={24} 
                height={24} 
              />
              <Typography variant="caption" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
                {network.name}
              </Typography>
            </TokenItem>
          ))}
        </ScrollContainer>
      </SectionContainer>

      {/* Inactive Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, mt: 3 }}>
        <CircleInactive />
        <SectionTitle color="text.secondary" sx={{ ml: 1.5 }}>
          Select Network
        </SectionTitle>
      </Box>
    </Box>
  );
};

export default SelectDeposite;