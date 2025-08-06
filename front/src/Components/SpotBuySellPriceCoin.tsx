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
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Info as InfoIcon,
  SwapHoriz as SwapHorizIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';
import MarketOrder from './MarketOrder';
import LimitOrder from './LimitOrder';
import StopLimitOrder from './StopLimitOrder';
import { useCryptoContext } from './CryptoContext';

// Styled components
const SpotContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: theme.spacing(1),
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
    margin: theme.spacing(0.5),
  },
  '& .scroll-thin': {
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[200]}`,
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
      borderRadius: '2px',
    },
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
  paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)',
}));

const SlideUpPanel = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '85vh',
  maxHeight: '85vh',
  zIndex: 1100,
  overflowY: 'auto',
  borderRadius: '16px 16px 0 0',
  padding: theme.spacing(0),
  boxShadow: theme.shadows[16],
  WebkitOverflowScrolling: 'touch',
  paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)',
  touchAction: 'pan-y',
  overscrollBehavior: 'contain',
  '&:before': {
    content: '""',
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: theme.palette.divider,
    marginBottom: theme.spacing(1),
  },
}));

const SpotBuySellPriceCoin: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { selectedCurrency } = useCryptoContext();

  const [activeTab, setActiveTab] = useState<'limit' | 'market' | 'stop-limit'>('limit');
  const [isBuy, setIsBuy] = useState(true);
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
      // Reset price info if no currency is selected
      setPriceInfo({
        current: 0,
        change: 0,
        changePercent: 0,
      });
    }
  }, [selectedCurrency]);

  // Close mobile panel when switching to desktop view
  useEffect(() => {
    if (!isMobile && mobilePanelOpen) {
      setMobilePanelOpen(false);
    }
  }, [isMobile, mobilePanelOpen]);

  // Prevent body scroll when mobile panel is open
  useEffect(() => {
    if (isMobile && mobilePanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, mobilePanelOpen]);

  const handleTabChange = useCallback((tab: 'limit' | 'market' | 'stop-limit') => {
    setActiveTab(tab);
  }, []);

  const handleBuySellToggle = useCallback((type: 'buy' | 'sell') => {
    setIsBuy(type === 'buy');
  }, []);

  const toggleMobilePanel = useCallback(() => {
    setMobilePanelOpen(prev => !prev);
  }, []);

  const renderForm = () => {
    switch (activeTab) {
      case 'market':
        return <MarketOrder isBuy={isBuy} />;
      case 'limit':
        return <LimitOrder isBuy={isBuy} />;
      case 'stop-limit':
        return <StopLimitOrder isBuy={isBuy} />;
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
            ${priceInfo.current.toFixed(2)}
          </Typography>
          <Typography 
            variant="caption" 
            color={priceInfo.change >= 0 ? 'success.main' : 'error.main'}
            sx={{ 
              bgcolor: priceInfo.change >= 0 ? 
                'rgba(76, 175, 80, 0.1)' : 
                'rgba(244, 67, 54, 0.1)',
              px: 1,
              borderRadius: 1
            }}
          >
            {priceInfo.change >= 0 ? '+' : ''}{priceInfo.change.toFixed(2)} 
            ({priceInfo.changePercent.toFixed(2)}%)
          </Typography>
        </Box>
      </Box>
      
      <Button 
        variant="contained" 
        color={isBuy ? 'success' : 'error'}
        onClick={toggleMobilePanel}
        endIcon={mobilePanelOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
        sx={{ borderRadius: 50, px: 2 ,fontSize:{xs:10,md:15}}}
      >
        {isBuy ? 'Buy' : 'Sell'}{selectedCurrency?.symbol || ''}
      </Button>
    </MobileBottomBar>
  );

  // Mobile slide-up panel
  const renderMobilePanel = () => (
    <SlideUpPanel>
      <Box display="flex" sx={{cursor: 'pointer'}} onClick={toggleMobilePanel}  justifyContent="center" position="sticky" top={-20} bgcolor="background.paper" width="100%" zIndex={999} pt={2} pb={2} >
        <Box 
          sx={{ 
            width: 100, 
            height: 5, 
            bgcolor: 'divider', 
            borderRadius: 2,
            touchAction: 'none'
          }} 
        />
      </Box>
      
      <Box display="flex" justifyContent="center" mb={2} px={2} pt={2}>
        <Box
          display="flex"
          bgcolor={theme.palette.background.default}
          borderRadius="50px"
          p={0}
          width="100%"
          position="relative"
        >
          <motion.div
            initial={false}
            animate={{
              x: isBuy ? 0 : "100%",
              backgroundColor: isBuy ? theme.palette.success.main : theme.palette.error.main,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 60 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              borderRadius: 50,
              zIndex: 0,
            }}
          />

          <Button
            fullWidth
            onClick={() => handleBuySellToggle('buy')}
            sx={{
              zIndex: 1,
              borderRadius: 50,
              color: isBuy ? '#fff' : theme.palette.text.primary,
            }}
          >
            Buy
          </Button>
          <Button
            fullWidth
            onClick={() => handleBuySellToggle('sell')}
            sx={{
              zIndex: 1,
              borderRadius: 50,
              color: !isBuy ? '#fff' : theme.palette.text.primary,
            }}
          >
            Sell
          </Button>
        </Box>
      </Box>

      {/* Tabs for order types */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={1} px={2}>
        <Box display="flex" borderBottom={`1px solid ${theme.palette.primary.main}`} sx={{justifyContent: 'space-between',width: '100%'}}>
          <Button
            onClick={() => handleTabChange('limit')}
            sx={{
              borderBottom: activeTab === 'limit' ? `1px solid ${theme.palette.primary.main}` : 'none',
              borderRadius: 0,
              textTransform: 'none',
              color: activeTab === 'limit' ? theme.palette.primary.main : theme.palette.text.secondary,
              fontWeight: 'medium',
              px: 1,
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
              px: 1,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            >
            Market
          </Button>
          <Button
            onClick={() => handleTabChange('stop-limit')}
            sx={{
              borderBottom: activeTab === 'stop-limit' ? `2px solid ${theme.palette.primary.main}` : 'none',
              borderRadius: 0,
              textTransform: 'none',
              color: activeTab === 'stop-limit' ? theme.palette.primary.main : theme.palette.text.secondary,
              fontWeight: 'medium',
              px: 1,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Stop-Limit
          </Button>
          <Tooltip title="Trading information">
            <IconButton size="small">
              <InfoIcon fontSize="small" color="action" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={2} px={2}>
        <Box display='flex' justifyContent='space-between' width="100%">
          <Typography variant="caption" color="text.secondary">
            Available:
          </Typography>
          <Typography variant="body2">0.0000 USDT</Typography>
          <SwapHorizIcon color="primary" fontSize="small" />
        </Box>
        <Tooltip title="Information about available balance">
          <IconButton size="small">
            <InfoIcon fontSize="small" color="action" />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Dynamic order form */}
      <Box sx={{ flexGrow: 1 }} className="scroll-thin" px={2}>
        <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
      </Box>
    </SlideUpPanel>
  );

  return (
    <SpotContainer>
      {/* Price header */}
      <Box 
        sx={{ 
          p: 1, 
          mb: 1, 
          borderRadius: 1, 
          bgcolor: theme.palette.background.default,
          display: {xs:'none',md:'flex'},
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Spot
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {selectedCurrency?.name || 'Select a currency'}
          </Typography>
        </Box>
        
        <Box textAlign="right">
          <Typography variant="h6" fontWeight="bold">
            ${priceInfo.current.toFixed(2)}
          </Typography>
          <Typography 
            variant="caption" 
            color={priceInfo.change >= 0 ? 'success.main' : 'error.main'}
          >
            {priceInfo.change >= 0 ? '+' : ''}{priceInfo.change.toFixed(2)} 
            ({priceInfo.changePercent.toFixed(2)}%)
          </Typography>
        </Box>
      </Box>

      {!isMobile && (
        <FormBox>
          {/* Buy/Sell Toggle */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Box
              display="flex"
              bgcolor={theme.palette.background.default}
              borderRadius="50px"
              p={0}
              width="100%"
              position="relative"
            >
              <motion.div
                initial={false}
                animate={{
                  x: isBuy ? 0 : "100%",
                  backgroundColor: isBuy ? theme.palette.success.main : theme.palette.error.main,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 60 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  borderRadius: 50,
                  zIndex: 0,
                }}
              />

              <Button
                fullWidth
                onClick={() => handleBuySellToggle('buy')}
                sx={{
                  zIndex: 1,
                  borderRadius: 50,
                  color: isBuy ? '#fff' : theme.palette.text.primary,
                }}
              >
                Buy
              </Button>
              <Button
                fullWidth
                onClick={() => handleBuySellToggle('sell')}
                sx={{
                  zIndex: 1,
                  borderRadius: 50,
                  color: !isBuy ? '#fff' : theme.palette.text.primary,
                }}
              >
                Sell
              </Button>
            </Box>
          </Box>

          {/* Tabs for order types */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={1}>
            <Box display="flex" borderBottom={`1px solid ${theme.palette.primary.main}`} sx={{justifyContent: 'space-between',width: '100%'}}>
              <Button
                onClick={() => handleTabChange('limit')}
                sx={{
                  borderBottom: activeTab === 'limit' ? `1px solid ${theme.palette.primary.main}` : 'none',
                  borderRadius: 0,
                  textTransform: 'none',
                  color: activeTab === 'limit' ? theme.palette.primary.main : theme.palette.text.secondary,
                  fontWeight: 'medium',
                  px: 1,
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
                  px: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                Market
              </Button>
              <Button
                onClick={() => handleTabChange('stop-limit')}
                sx={{
                  borderBottom: activeTab === 'stop-limit' ? `2px solid ${theme.palette.primary.main}` : 'none',
                  borderRadius: 0,
                  textTransform: 'none',
                  color: activeTab === 'stop-limit' ? theme.palette.primary.main : theme.palette.text.secondary,
                  fontWeight: 'medium',
                  px: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                Stop-Limit
              </Button>
              <Tooltip title="Trading information">
                <IconButton size="small">
                  <InfoIcon fontSize="small" color="action" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={2}>
            <Box display='flex' justifyContent='space-between' width="100%">
              <Typography variant="caption" color="text.secondary">
                Available:
              </Typography>
              <Typography variant="body2">0.0000 USDT</Typography>
              <SwapHorizIcon color="primary" fontSize="small" />
            </Box>
            <Tooltip title="Information about available balance">
              <IconButton size="small">
                <InfoIcon fontSize="small" color="action" />
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Dynamic order form */}
          <Box sx={{ flexGrow: 1 }} className="scroll-thin">
            <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
          </Box>
        </FormBox>
      )}

      {/* Mobile components */}
      {isMobile && (
        <>
          <Box display={{xs:'none',md:'none'}} sx={{ flexGrow: 1, mb: 8 }}>
            <Typography variant="body1" textAlign="center" mt={4} color="text.secondary">
              Open trading panel to buy or sell
            </Typography>
          </Box>
          
          {renderMobileBottomBar()}
          
          <Slide in={mobilePanelOpen} direction="up">
            {renderMobilePanel()}
          </Slide>
        </>
      )}
    </SpotContainer>
  );
};

export default SpotBuySellPriceCoin;