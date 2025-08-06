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
  Modal,
  Fade,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
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
  padding: theme.spacing(1),
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

const FutureOpenClose: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { selectedCurrency } = useCryptoContext();

  const [activeTab, setActiveTab] = useState<'limit' | 'market' | 'trigger'>('limit');
  const [isOpen, setIsOpen] = useState(true);
  const [isIsolated, setIsIsolated] = useState(true);
  const [leverage, setLeverage] = useState('20X');
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [priceInfo, setPriceInfo] = useState({
    current: 0,
    change: 0,
    changePercent: 0,
  });

  // New state for leverage modal
  const [leverageModalOpen, setLeverageModalOpen] = useState(false);
  const [tempLeverage, setTempLeverage] = useState(20);
  const [tempIsolated, setTempIsolated] = useState(true);

  // Initialize temp values when modal opens
  useEffect(() => {
    if (leverageModalOpen) {
      const currentLeverage = parseInt(leverage.replace('X', ''), 10) || 20;
      setTempLeverage(currentLeverage);
      setTempIsolated(isIsolated);
    }
  }, [leverageModalOpen, leverage, isIsolated]);

  // Handle leverage change
  const handleLeverageChange = useCallback((event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setTempLeverage(newValue);
    }
  }, []);

  // Handle margin type change
  const handleMarginTypeChange = useCallback((event: React.MouseEvent<HTMLElement>, newType: boolean) => {
    if (newType !== null) {
      setTempIsolated(newType);
    }
  }, []);

  // Apply leverage and margin settings
  const applyLeverageSettings = useCallback(() => {
    setIsIsolated(tempIsolated);
    setLeverage(`${tempLeverage}X`);
    setLeverageModalOpen(false);
  }, [tempIsolated, tempLeverage]);

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

  const values = [5, 10, 20, 50, 100];
  // Leverage Modal component
  const renderLeverageModal = () => (
    <Modal
      open={leverageModalOpen}
      onClose={() => setLeverageModalOpen(false)}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      {isMobile ? (
        <Slide in={leverageModalOpen} direction="up">
          <Paper sx={{
            width: '100%',
            borderRadius: '16px 16px 0 0',
            p: 2,
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: theme.shadows[24],
            touchAction: 'none',
          }}>
            <LeverageModalContent />
          </Paper>
        </Slide>
      ) : (
        <Fade in={leverageModalOpen}>
          <Paper sx={{
            width: 400,
            borderRadius: '16px',
            p: 3,
            boxShadow: theme.shadows[24],
            outline: 'none',
          }}>
            <LeverageModalContent />
          </Paper>
        </Fade>
      )}
    </Modal>
  );

  const LeverageModalContent = () => (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} px={2}>
        <Typography variant="h6" fontWeight="bold">
          Leverage & Margin
        </Typography>
        <IconButton onClick={() => setLeverageModalOpen(false)}>
          <Icon icon="mdi:close" fontSize={20} />
        </IconButton>
      </Box>

      <Box mb={4}>
        <Typography variant="subtitle1" fontWeight="medium" mb={2}>
          Margin Type
        </Typography>
        <ToggleButtonGroup
          value={tempIsolated}
          exclusive
          onChange={handleMarginTypeChange}
          fullWidth
          sx={{ gap: 1 }}
        >
          <ToggleButton 
            value={true} 
            sx={{
              flex: 1,
              py: 1.5,
              borderRadius: '12px !important',
              border: `1px solid ${theme.palette.divider}`,
              '&.Mui-selected': {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.common.white,
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            Isolated
          </ToggleButton>
          <ToggleButton 
            value={false} 
            sx={{
              flex: 1,
              py: 1.5,
              borderRadius: '12px !important',
              border: `1px solid ${theme.palette.divider}`,
              '&.Mui-selected': {
                bgcolor: theme.palette.primary.main,
                color: theme.palette.common.white,
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            Cross
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" fontWeight="medium">
            Leverage
          </Typography>
          <Box 
            sx={{
              bgcolor: theme.palette.action.selected,
              px: 1.5,
              py: 0.5,
              borderRadius: 4,
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            {tempLeverage}X
          </Box>
        </Box>
        
        <Slider
          value={tempLeverage}
          onChange={handleLeverageChange}
          min={1}
          max={125}
          step={1}
          sx={{
            color: theme.palette.primary.main,
            height: 6,
            '& .MuiSlider-thumb': {
              width: 20,
              height: 20,
              boxShadow: theme.shadows[2],
            },
          }}
        />

        <Grid container spacing={1} justifyContent="center" mt={2}>
          {values.map((value, index) => (
            <Grid size={{xs:6}} key={value}
              sx={{
                display: 'flex',
                justifyContent: index === 4 ? 'center' : 'flex-start',
              }}
            >
              <Button
                variant={tempLeverage === value ? 'contained' : 'outlined'}
                onClick={() => setTempLeverage(value)}
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  py: 0.5,
                  fontSize: 12,
                  fontWeight: 'bold',
                  border:
                    tempLeverage === value
                      ? 'none'
                      : `1px solid ${theme.palette.divider}`,
                }}
              >
                {value}X
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={applyLeverageSettings}
        sx={{
          py: 1.5,
          borderRadius: 3,
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        Apply Settings
      </Button>
    </>
  );

  // Mobile bottom bar content
  const renderMobileBottomBar = () => (
    <MobileBottomBar>
      <Box>
        <Typography variant="caption" fontWeight="bold">
          {selectedCurrency?.symbol || '---'} / USDT
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="caption" fontWeight="bold">
            ${priceInfo.current.toFixed(2)}
          </Typography>
          <Typography
            color={priceInfo.change >= 0 ? 'success.main' : 'error.main'}
            sx={{
              fontSize: {xs:10,md:14},
              bgcolor: priceInfo.change >= 0
                ? 'rgba(76, 175, 80, 0.1)'
                : 'rgba(244, 67, 54, 0.1)',
              px: 1,
              borderRadius: 1,
            }}
          >
            {priceInfo.change >= 0 ? '+' : ''}{priceInfo.change.toFixed(2)}({priceInfo.changePercent.toFixed(2)}%)
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        color={isOpen ? 'success' : 'error'}
        onClick={toggleMobilePanel}
        endIcon={mobilePanelOpen ? <Icon icon="mdi:chevron-down" /> : <Icon icon="mdi:chevron-up" />}
        sx={{ borderRadius: 50, px: 1,fontSize:{xs:12,md:15} }}
      >
        {isOpen ? 'Open' : 'Close'} {selectedCurrency?.symbol || ''}
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

      <Box display="flex" bgcolor={theme.palette.background.default} px={2} pt={2}>
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
        <Tooltip title="Order book">
          <IconButton size="small">
            <Icon icon="mdi:book-outline" fontSize={16} color={theme.palette.text.secondary} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box display="flex" justifyContent="center" mt={2} gap={1} px={2}>
        <Button
          variant="contained"
          size="small"
          onClick={() => setLeverageModalOpen(true)}
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '0.7rem',
            fontWeight: 'medium',
            borderRadius: 1,
            flex: 1,
            py: 0.8,
            '&:hover': {
              bgcolor: theme.palette.action.hover,
            },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box component="span">
            {isIsolated ? 'Isolated' : 'Cross'}
          </Box>
          <Box component="span" fontWeight="bold" ml={0.5}>
            {leverage}
          </Box>
          <Icon 
            icon="mdi:chevron-down" 
            fontSize={16} 
            style={{ marginLeft: '4px' }} 
          />
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="flex-end" mt={2} position="relative" px={2}>
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
              bgcolor: theme.palette.divider,
            }}
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={1} px={2}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="caption" color="text.secondary">
            Available:
          </Typography>
          <Typography variant="body2">0.0000 USDT</Typography>
          <Icon icon="mdi:swap-horizontal" color={theme.palette.primary.main} fontSize={16} />
        </Box>
        <Tooltip title="Information about available balance">
          <IconButton size="small">
            <Icon icon="mdi:information-outline" fontSize={16} color={theme.palette.text.secondary} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flexGrow: 1 }} className="scroll-thin" px={2}>
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
            <Tooltip title="Order book">
              <IconButton size="small">
                <Icon icon="mdi:book-outline" fontSize={18} color={theme.palette.text.secondary} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box display="flex" justifyContent="center" mt={2} gap={1}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setLeverageModalOpen(true)}
              sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: '0.7rem',
                fontWeight: 'medium',
                borderRadius: 1,
                flex: 1,
                py: 0.8,
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box component="span">
                {isIsolated ? 'Isolated' : 'Cross'}
              </Box>
              <Box component="span" fontWeight="bold" ml={0.5}>
                {leverage}
              </Box>
              <Icon 
                icon="mdi:chevron-down" 
                fontSize={16} 
                style={{ marginLeft: '4px' }} 
              />
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
                  bgcolor: theme.palette.divider,
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

          <Box sx={{ flexGrow: 1, p:1 }} className="scroll-thin">
            <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
          </Box>
        </FormBox>
      )}

      {isMobile && (
        <>
          <Box
            display={{ xs: 'flex', md: 'none' }}
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

      {renderLeverageModal()}
    </FuturesContainer>
  );
};

export default FutureOpenClose;