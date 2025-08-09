/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Stack,
  Box,
  Typography,
  IconButton,
  Collapse,
  Tooltip,
  useTheme,
  Fade,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  InstallDesktop as InstallDesktopIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const InstallButton: React.FC = () => {
  const theme = useTheme();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [showUninstallDialog, setShowUninstallDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    const standalone =
      ('standalone' in window.navigator && (window.navigator as any).standalone) ||
      window.matchMedia('(display-mode: standalone)').matches;

    setIsIos(ios);
    setIsInStandaloneMode(standalone);
    setIsInstalled(standalone);

    const onAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    };

    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else if (isIos && !isInStandaloneMode) {
      setShowIosInstructions(true);
    }
  };

  const handleUninstallClick = () => {
    setShowUninstallDialog(true);
  };

  const handleCloseUninstallDialog = () => {
    setShowUninstallDialog(false);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: 'Check out this awesome PWA!',
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  const renderInstallButton = () => (
    <Tooltip
      title={
        isInstallable
          ? 'Install the app for a better experience'
          : isIos
          ? 'Add to home screen'
          : 'Install not available'
      }
      placement="top"
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleInstallClick}
        sx={{
          borderRadius: '50px',
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          boxShadow: theme.shadows[3],
          transition: 'all 0.3s ease',
          background: 'linear-gradient(45deg, #1976d2 0%, #2196f3 100%)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[6],
            background: 'linear-gradient(45deg, #1565c0 0%, #1e88e5 100%)',
          },
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        startIcon={<DownloadIcon />}
      >
        {isInstallable ? 'Install App' : isIos ? 'Add to Home Screen' : 'Install'}
      </Button>
    </Tooltip>
  );

  const renderIosInstructions = () => (
    <Collapse in={showIosInstructions}>
      <Paper
        elevation={3}
        sx={{
          mt: 2,
          p: 2,
          borderRadius: '12px',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Add to Home Screen
          </Typography>
          <IconButton size="small" onClick={() => setShowIosInstructions(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Stack spacing={1.5} mt={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography fontWeight={700} color="primary.main">
                1
              </Typography>
            </Box>
            <Typography variant="body2">
              Tap the <strong>Share</strong> button <ShareIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography fontWeight={700} color="primary.main">
                2
              </Typography>
            </Box>
            <Typography variant="body2">Scroll down and select <strong>Add to Home Screen</strong></Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography fontWeight={700} color="primary.main">
                3
              </Typography>
            </Box>
            <Typography variant="body2">
              Confirm by tapping <strong>Add</strong> in the top right
            </Typography>
          </Box>
        </Stack>

        <Box mt={2} textAlign="center">
          <Button variant="outlined" color="primary" onClick={handleShareClick} startIcon={<ShareIcon />}>
            Open Share Menu
          </Button>
        </Box>
      </Paper>
    </Collapse>
  );

  const renderInstalledState = () => (
    <Fade in={isInstalled}>
      <Stack
        spacing={1}
        sx={{
          backgroundColor: theme.palette.success.light,
          borderRadius: '12px',
          p: 2,
          border: `1px solid ${theme.palette.success.main}`,
          maxWidth: 400,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <CheckCircleIcon color="success" />
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            App Installed
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          The application is installed on your device. You can access it anytime from your home screen.
        </Typography>

        <Button
          variant="outlined"
          color="error"
          onClick={handleUninstallClick}
          startIcon={<DeleteIcon />}
          sx={{
            mt: 1,
            alignSelf: 'flex-start',
            borderRadius: '50px',
          }}
        >
          Remove App
        </Button>
      </Stack>
    </Fade>
  );

  const renderSuccessNotification = () => (
    <Slide direction="up" in={showSuccess} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
          borderRadius: '12px',
          p: 2,
          boxShadow: theme.shadows[10],
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <CheckCircleIcon />
        <Typography variant="body1" fontWeight={500}>
          App installed successfully!
        </Typography>
      </Box>
    </Slide>
  );

  const renderUninstallDialog = () => (
    <Dialog
      open={showUninstallDialog}
      onClose={handleCloseUninstallDialog}
      PaperProps={{
        sx: { borderRadius: '16px', maxWidth: 500 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
        <DeleteIcon color="error" />
        Remove Application?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          To remove this app, you&apos;ll need to uninstall it through your device settings.
        </DialogContentText>

        <Box mt={2} p={2} sx={{ backgroundColor: theme.palette.grey[100], borderRadius: '8px' }}>
          <Typography variant="body2" fontWeight={600} mb={1}>
            How to remove:
          </Typography>

          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li>
              <Typography variant="body2">On Android: Long press the app icon → Uninstall</Typography>
            </li>
            <li>
              <Typography variant="body2">On iOS: Long press the app icon → Remove App → Delete App</Typography>
            </li>
            <li>
              <Typography variant="body2">On Desktop: Use your system&apos;s application manager</Typography>
            </li>
          </ul>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleCloseUninstallDialog} variant="outlined" sx={{ borderRadius: '50px' }}>
          Cancel
        </Button>
        <Button onClick={handleCloseUninstallDialog} variant="contained" color="error" sx={{ borderRadius: '50px' }}>
          I Understand
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '16px',
          p: 4,
          boxShadow: theme.shadows[2],
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <InstallDesktopIcon sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 2 }} />

        <Typography variant="h5" fontWeight={700} gutterBottom>
          Install Our App
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Get the best experience by installing our app to your home screen. Enjoy faster access, offline
          capabilities, and push notifications.
        </Typography>

        {isInstalled ? renderInstalledState() : renderInstallButton()}
        {renderIosInstructions()}
      </Box>

      <Box mt={3} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          {isInstallable
            ? 'Available for installation'
            : isInstalled
            ? 'App is installed'
            : isIos
            ? 'Tap the button to add to home screen'
            : 'Installation not available in this browser'}
        </Typography>
      </Box>

      {renderSuccessNotification()}
      {renderUninstallDialog()}
    </Box>
  );
};

export default InstallButton;
