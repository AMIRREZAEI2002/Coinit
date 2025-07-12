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
  width: '35px',
  height: '35px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
}));
const TokenDropdown = styled('div')({
  position: 'relative',
  width: '100%',
});
const TokenSelected = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[100],
  borderRadius: '8px',
  padding: '10px 16px',
  cursor: 'pointer',
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
}));
const TokenOption = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));
const TokenItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '4px',
  width: '1000px',
  height: '50px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
  }
}));
const CircleInactive = styled('div')(({ theme }) => ({
  width: '35px',
  height: '35px',
  backgroundColor: theme.palette.grey[500],
  borderRadius: '50%',
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
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CircleActive />
        <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
          Select Crypto
        </Typography>
      </Box>

      <Box sx={{
        py: 3,
        pl: 3,
        ml: 2,
        mt: 2,
        borderLeft: `2px solid ${theme.palette.primary.main}`,
        mb: 0
      }}>
        <TokenDropdown>
          <TokenSelected sx={{ bgcolor: 'background.paper' }} onClick={() => setCryptoDropdownOpen(!cryptoDropdownOpen)}>
            <Icon icon={`cryptocurrency-color:${selectedCrypto.symbol.toLowerCase()}`} width={30} height={30} />
            <Typography variant="body1" fontWeight="bold" sx={{ mx: 1 }}>
              {selectedCrypto.symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
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
                  <Icon icon={`cryptocurrency-color:${token.symbol.toLowerCase()}`} width={30} height={30} />
                  <Typography variant="body1" fontWeight="bold" sx={{ mx: 1 }}>
                    {token.symbol}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {token.name}
                  </Typography>
                </TokenOption>
              ))}
            </TokenOptions>
          )}
        </TokenDropdown>
      </Box>

      <Box sx={{
        display: 'flex',
        py: 2,
        pl: 3,
        ml: 2,
        mb: 2,
        borderLeft: `2px solid ${theme.palette.primary.main}`,
        mt: 0,
        }}>
        {quickTokens.map((token, index) => (
            <TokenItem
            key={index}
            sx={{ ml: index > 0 ? 2 : 0 }}
            onClick={() => {
                setSelectedCrypto(token);
                setCryptoDropdownOpen(false); // بستن لیست دراپ‌دان در صورت باز بودن
            }}
            >
            <Icon icon={`cryptocurrency-color:${token.symbol.toLowerCase()}`} width={30} height={30} />
            <Typography variant="caption" sx={{ mt: 0.5 }}>{token.symbol}</Typography>
            </TokenItem>
        ))}
        </Box>


      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 4 }}>
        <CircleActive />
        <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
          Select Network
        </Typography>
      </Box>

      <Box sx={{
        py: 3,
        pl: 3,
        ml: 2,
        mt: 2,
        borderLeft: `1px solid ${theme.palette.grey[500]}`,
        mb: 0
      }}>
        <TokenDropdown>
          <TokenSelected sx={{ bgcolor: 'background.paper' }} onClick={() => setNetworkDropdownOpen(!networkDropdownOpen)}>
            <Icon icon={getNetworkIcon(selectedNetwork.name)} width={30} height={30} />
            <Typography variant="body1" fontWeight="bold" sx={{ mx: 1 }}>
              {selectedNetwork.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
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
                  <Icon icon={getNetworkIcon(network.name)} width={30} height={30} />
                  <Typography variant="body1" fontWeight="bold" sx={{ mx: 1 }}>
                    {network.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {network.type}
                  </Typography>
                </TokenOption>
              ))}
            </TokenOptions>
          )}
        </TokenDropdown>
      </Box>

      <Box sx={{
        display: 'flex',
        py: 2,
        pl: 3,
        ml: 2,
        mb: 2,
        borderLeft: `1px solid ${theme.palette.grey[500]}`,
        mt: 0,
        }}>
        {networkOptions.map((network, index) => (
            <TokenItem
            key={index}
            sx={{ ml: index > 0 ? 2 : 0 }}
            onClick={() => {
                setSelectedNetwork(network);
                setNetworkDropdownOpen(false);
            }}
            >
            <Icon icon={getNetworkIcon(network.name)} width={30} height={30} />
            <Typography variant="caption" sx={{ mt: 0.5 }}>{network.name}</Typography>
            </TokenItem>
        ))}
        </Box>



      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 4 }}>
        <CircleInactive />
        <Typography variant="h6" fontWeight="bold" color="text.secondary" sx={{ ml: 2 }}>
          Select Network
        </Typography>
      </Box>
    </>
  );
};

export default SelectDeposite;
