'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  Tooltip,
  Paper,
  Slide,
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useCryptoContext } from './CryptoContext';
import MarketOrderFuture from './MarketOrderFuture';
import LimitOrderFuture from './LimitOrderFuture';
import TriggerOrderFuture from './TriggerOrderFuture';

// Styled components
const FuturesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: theme.spacing(0),
  fontSize: 12,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.5),
    height: 'auto',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
}));

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0),
  margin: theme.spacing(0),
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
    margin: theme.spacing(0),
  },
  '& .scroll-thin': {
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[200]}`,
  },
}));

const MobileBottomBar = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '16px 16px 0 0',
  boxShadow: theme.shadows[10],
  background: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const SlideUpPanel = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '85vh',
  zIndex: 1100,
  overflowY: 'auto',
  borderRadius: '16px 16px 0 0',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[16],
}));

const FutureOpenClose: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { selectedCurrency } = useCryptoContext();

  const [activeTab, setActiveTab] = useState<'limit' | 'market' | 'trigger'>('limit');
  const [isOpen, setIsOpen] = useState(true);
  const [, setIsIsolated] = useState(true);
  const [, setLeverage] = useState('20X');
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [priceInfo, setPriceInfo] = useState({
    current: 0,
    change: 0,
    changePercent: 0,
  });

  // Update price info when selectedCurrency changes
  useEffect(() => {
    if (selectedCurrency) {
      setPriceInfo({
        current: selectedCurrency.currentPrice || 0,
        change: selectedCurrency.change || 0,
        changePercent: selectedCurrency.currentPrice
          ? (selectedCurrency.change / selectedCurrency.currentPrice) * 100
          : 0,
      });
    } else {
      setPriceInfo({
        current: 0,
        change: 0,
        changePercent: 0,
      });
    }
  }, [selectedCurrency]);

  const handleTabChange = useCallback((tab: 'limit' | 'market' | 'trigger') => {
    setActiveTab(tab);
  }, []);

  const handleOpenCloseToggle = useCallback((type: 'open' | 'close') => {
    setIsOpen(type === 'open');
  }, []);

  const toggleMobilePanel = useCallback(() => {
    setMobilePanelOpen((prev) => !prev);
  }, []);
  const renderForm = () => {
    switch (activeTab) {
      case 'market':
        return <MarketOrderFuture isBuy={isOpen} />;
      case 'limit':
        return <LimitOrderFuture isBuy={isOpen} />;
      case 'trigger':
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <TriggerOrderFuture isBuy={isOpen} />;
      default:
        return null;
    }
  };

  // Mobile bottom bar content
  const renderMobileBottomBar = () => (
    <MobileBottomBar>
      <Box>
        <Typography variant="body2" fontWeight="bold">
          {selectedCurrency?.symbol || '---'} / USDT
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" fontWeight="bold">
            ${priceInfo.current.toFixed(2)}asdas
          </Typography>
          <Typography
            variant="caption"
            color={priceInfo.change >= 0 ? 'success.main' : 'error.main'}
            sx={{
              bgcolor: priceInfo.change >= 0
                ? 'rgba(76, 175, 80, 0.1)'
                : 'rgba(244, 67, 54, 0.1)',
              px: 1,
              borderRadius: 1,
            }}
          >
            {priceInfo.change >= 0 ? '+' : ''}{priceInfo.change.toFixed(2)} (
            {priceInfo.changePercent.toFixed(2)}%)
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        color={isOpen ? 'success' : 'error'}
        onClick={toggleMobilePanel}
        endIcon={mobilePanelOpen ? <Icon icon="mdi:chevron-down" /> : <Icon icon="mdi:chevron-up" />}
        sx={{ borderRadius: 50, px: 2 }}
      >
        {isOpen ? 'Open' : 'Close'} {selectedCurrency?.symbol || ''}
      </Button>
    </MobileBottomBar>
  );

  // Mobile slide-up panel
  const renderMobilePanel = () => (
    <SlideUpPanel>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <IconButton onClick={toggleMobilePanel}>
          <Icon icon="mdi:chevron-down" />
        </IconButton>
      </Box>

      <Box display="flex" bgcolor={theme.palette.background.default} p={0}>
        <Button
          fullWidth
          onClick={() => handleOpenCloseToggle('open')}
          sx={{
            borderRadius: 0,
            borderBottom: isOpen ? `2px solid ${theme.palette.primary.main}` : 'none',
            bgcolor: isOpen ? theme.palette.background.paper : 'transparent',
            color: isOpen ? theme.palette.primary.main : theme.palette.text.secondary,
            '&:hover': {
              bgcolor: isOpen ? theme.palette.background.paper : theme.palette.action.hover,
            },
          }}
        >
          Open
        </Button>
        <Button
          fullWidth
          onClick={() => handleOpenCloseToggle('close')}
          sx={{
            borderRadius: 0,
            borderBottom: !isOpen ? `2px solid ${theme.palette.primary.main}` : 'none',
            bgcolor: !isOpen ? theme.palette.background.paper : 'transparent',
            color: !isOpen ? theme.palette.primary.main : theme.palette.text.secondary,
            '&:hover': {
              bgcolor: !isOpen ? theme.palette.background.paper : theme.palette.action.hover,
            },
          }}
        >
          Close
        </Button>
        <IconButton size="small">
          <Icon icon="mdi:book-outline" fontSize={16} color={theme.palette.text.secondary} />
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="center" mt={2} gap={1}>
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '.6rem',
            fontWeight: 'medium',
            borderRadius: 0,
            flex: 1,
            py: 0.5,
            '&:hover': {
              bgcolor: theme.palette.background.default,
            },
          }}
          onClick={() => setIsIsolated(true)}
        >
          Isolated
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '0.6rem',
            fontWeight: 'medium',
            borderRadius: 0,
            flex: 1,
            py: 0.5,
            '&:hover': {
              bgcolor: theme.palette.background.paper,
            },
          }}
          onClick={() => setLeverage('20X')}
        >
          20X
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={2} position="relative">
        <Box display="flex" width="100%" position="relative">
          <Button
            onClick={() => handleTabChange('limit')}
            sx={{
              borderBottom: activeTab === 'limit' ? `2px solid ${theme.palette.primary.main}` : 'none',
              borderRadius: 0,
              textTransform: 'none',
              color: activeTab === 'limit' ? theme.palette.primary.main : theme.palette.text.secondary,
              fontWeight: 'medium',
              fontSize: '0.9rem',
              px: 1,
              flex: 1,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Limit
          </Button>
          <Button
            onClick={() => handleTabChange('market')}
            sx={{
              borderBottom: activeTab === 'market' ? `2px solid ${theme.palette.primary.main}` : 'none',
              borderRadius: 0,
              textTransform: 'none',
              color: activeTab === 'market' ? theme.palette.primary.main : theme.palette.text.secondary,
              fontWeight: 'medium',
              fontSize: '0.9rem',
              px: 1,
              flex: 1,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Market
          </Button>
          <Button
            onClick={() => handleTabChange('trigger')}
            sx={{
              borderBottom: activeTab === 'trigger' ? `2px solid ${theme.palette.primary.main}` : 'none',
              borderRadius: 0,
              textTransform: 'none',
              color: activeTab === 'trigger' ? theme.palette.primary.main : theme.palette.text.secondary,
              fontWeight: 'medium',
              fontSize: '0.9rem',
              px: 1,
              flex: 1,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Trigger
          </Button>
          <Tooltip title="Trading information">
            <IconButton size="small">
              <Icon icon="mdi:information-outline" fontSize={16} color={theme.palette.text.secondary} />
            </IconButton>
          </Tooltip>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              bgcolor: theme.palette.background.paper,
            }}
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={1}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="caption" color="text.secondary">
            Available:
          </Typography>
          <Typography variant="body2">0.0000 USDT</Typography>
          <Icon icon="mdi:swap-horizontal" color={theme.palette.primary.main} fontSize={12} />
        </Box>
        <Tooltip title="Information about available balance">
          <IconButton size="small">
            <Icon icon="mdi:information-outline" fontSize={16} color={theme.palette.text.secondary} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flexGrow: 1 }} className="scroll-thin">
        <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
      </Box>
    </SlideUpPanel>
  );

  return (
    <FuturesContainer>

      {!isMobile && (
        <FormBox>
          <Box display="flex" bgcolor={theme.palette.background.default} p={0}>
            <Button
              fullWidth
              onClick={() => handleOpenCloseToggle('open')}
              sx={{
                fontSize: 13,
                borderRadius: 0,
                borderBottom: isOpen ? `2px solid ${theme.palette.primary.main}` : 'none',
                bgcolor: isOpen ? theme.palette.background.paper : 'transparent',
                color: isOpen ? theme.palette.primary.main : theme.palette.text.secondary,
                '&:hover': {
                  bgcolor: isOpen ? theme.palette.background.paper : theme.palette.action.hover,
                },
              }}
            >
              Open
            </Button>
            <Button
              fullWidth
              onClick={() => handleOpenCloseToggle('close')}
              sx={{
                fontSize: 13,
                borderRadius: 0,
                borderBottom: !isOpen ? `2px solid ${theme.palette.primary.main}` : 'none',
                bgcolor: !isOpen ? theme.palette.background.paper : 'transparent',
                color: !isOpen ? theme.palette.primary.main : theme.palette.text.secondary,
                '&:hover': {
                  bgcolor: !isOpen ? theme.palette.background.paper : theme.palette.action.hover,
                },
              }}
            >
              Close
            </Button>
            <IconButton size="small">
              <Icon icon="mdi:book-outline" fontSize={18} color={theme.palette.text.secondary} />
            </IconButton>
          </Box>

          <Box display="flex" justifyContent="center" mt={2} gap={1}>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '0.6rem',
                fontWeight: 'medium',
                borderRadius: 0,
                flex: 1,
                py: 0.5,
                '&:hover': {
                  bgcolor: theme.palette.background.default,
                },
              }}
              onClick={() => setIsIsolated(true)}
            >
              Isolated
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '0.6rem',
                fontWeight: 'medium',
                borderRadius: 0,
                flex: 1,
                py: 0.5,
                '&:hover': {
                  bgcolor: theme.palette.background.default,
                },
              }}
              onClick={() => setLeverage('20X')}
            >
              20X
            </Button>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={2} position="relative">
            <Box display="flex" width="100%" position="relative">
              <Button
                onClick={() => handleTabChange('limit')}
                sx={{
                  borderBottom: activeTab === 'limit' ? `2px solid ${theme.palette.primary.main}` : 'none',
                  borderRadius: 0,
                  textTransform: 'none',
                  color: activeTab === 'limit' ? theme.palette.primary.main : theme.palette.text.secondary,
                  fontWeight: 'medium',
                  fontSize: '0.7rem',
                  px: 1,
                  flex: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                Limit
              </Button>
              <Button
                onClick={() => handleTabChange('market')}
                sx={{
                  borderBottom: activeTab === 'market' ? `2px solid ${theme.palette.primary.main}` : 'none',
                  borderRadius: 0,
                  textTransform: 'none',
                  color: activeTab === 'market' ? theme.palette.primary.main : theme.palette.text.secondary,
                  fontWeight: 'medium',
                  fontSize: '0.7rem',
                  px: 1,
                  flex: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                Market
              </Button>
              <Button
                onClick={() => handleTabChange('trigger')}
                sx={{
                  borderBottom: activeTab === 'trigger' ? `2px solid ${theme.palette.primary.main}` : 'none',
                  borderRadius: 0,
                  textTransform: 'none',
                  color: activeTab === 'trigger' ? theme.palette.primary.main : theme.palette.text.secondary,
                  fontWeight: 'medium',
                  fontSize: '0.7rem',
                  px: 1,
                  flex: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                Trigger
              </Button>
              <Tooltip title="Trading information">
                <IconButton size="small">
                  <Icon icon="mdi:information-outline" fontSize={20} color={theme.palette.text.secondary} />
                </IconButton>
              </Tooltip>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  bgcolor: theme.palette.grey[200],
                }}
              />
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={0} pl={2} pt={1.5}>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Typography variant="caption" color="text.secondary">
                Available:
              </Typography>
              <Typography variant="body2">0.0000 USDT</Typography>
              <Icon icon="mdi:swap-horizontal" color={theme.palette.primary.main} fontSize={18} />
            </Box>
            <Tooltip title="Information about available balance">
              <IconButton size="small">
                <Icon icon="mdi:information-outline" fontSize={18} color={theme.palette.text.secondary} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 1,p:1 }} className="scroll-thin">
            <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
          </Box>
        </FormBox>
      )}

      {isMobile && (
        <>
          <Box
            display={{ xs: 'none', md: 'flex' }}
            sx={{ flexGrow: 1, mb: 8 }}
          >
            <Typography variant="body1" textAlign="center" mt={4} color="text.secondary">
              Open trading panel to open or close positions
            </Typography>
          </Box>

          {renderMobileBottomBar()}

          <Slide in={mobilePanelOpen} direction="up">
            {renderMobilePanel()}
          </Slide>
        </>
      )}
    </FuturesContainer>
  );
};

export default FutureOpenClose;