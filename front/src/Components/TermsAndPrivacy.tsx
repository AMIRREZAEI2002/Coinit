'use client';

import {
  Container,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  List,
  ListItem,
  ListItemIcon,
  useTheme,
  CssBaseline,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import PolicyIcon from '@mui/icons-material/Policy';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppGoodIcon from '@mui/icons-material/GppGood';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// تم سفارشی برای Coinit Exchange
const coinitTheme = createTheme({
  palette: {
    primary: {
      main: '#2962ff',
    },
    secondary: {
      main: '#00c853',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4a4a4a',
    },
    mode: 'light',
  },
  typography: {
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

// تم دارک مود
const darkTheme = createTheme({
  ...coinitTheme,
  palette: {
    ...coinitTheme.palette,
    mode: 'dark',
    primary: {
      main: '#2962ff',
    },
    secondary: {
      main: '#00c853',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
});

export default function TermsAndPrivacy() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <ThemeProvider theme={isDark ? darkTheme : coinitTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: { xs: 3, md: 6 },
          px: { xs: 1, sm: 2 },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="md" sx={{ mb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h1"
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                background: 'linear-gradient(45deg, #2962ff, #00c853)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              Coinit
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary' }}>
              Legal & Compliance
            </Typography>
          </Box>
          
          <Paper
            elevation={isDark ? 0 : 3}
            sx={{ 
              p: { xs: 2, sm: 4 }, 
              bgcolor: 'background.paper',
              borderRadius: 4,
              border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
              boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.36)' : '0 12px 40px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PolicyIcon sx={{ fontSize: 36, mr: 2, color: 'primary.main' }} />
              <Typography variant="h4" sx={{ color: 'text.primary' }}>
                Terms of Service
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              Last updated: July 30, 2025. These Terms of Service govern your use of the Coinit Exchange platform.
            </Typography>

            <Accordion sx={{ mb: 1, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                    1. Introduction & Acceptance
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary' }}>
                  Welcome to Coinit Exchange. By accessing or using our platform, you agree to be bound by these Terms of Service. These terms apply to all users of the platform, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 1, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <VerifiedUserIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                    2. Account Registration
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                  To access certain features of the platform, you must register for an account. When registering, you agree to:
                </Typography>
                <List dense sx={{ py: 0 }}>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Provide accurate and complete information
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Maintain the security of your credentials
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Notify us immediately of any unauthorized use
                    </Typography>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 1, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SecurityIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                    3. User Responsibilities
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                  As a user of Coinit Exchange, you agree to:
                </Typography>
                <List dense sx={{ py: 0 }}>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Comply with all applicable laws and regulations
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Not engage in market manipulation or fraudulent activities
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Maintain the confidentiality of your account credentials
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Report any security vulnerabilities responsibly
                    </Typography>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 1, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LockIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                    4. Prohibited Activities
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                  You are strictly prohibited from:
                </Typography>
                <List dense sx={{ py: 0 }}>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Money laundering or terrorist financing
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Using the platform for illegal activities
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Circumventing security measures
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Creating multiple accounts for abuse
                    </Typography>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 4, borderColor: 'divider' }} />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <GppGoodIcon sx={{ fontSize: 36, mr: 2, color: 'secondary.main' }} />
              <Typography variant="h4" sx={{ color: 'text.primary' }}>
                Privacy Policy
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              Effective: July 30, 2025. This Privacy Policy describes how Coinit Exchange collects, uses, and shares your personal information.
            </Typography>

            <Accordion sx={{ mb: 1, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                  Information We Collect
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary' }}>
                  We collect information that you provide directly to us, such as when you create an account, complete KYC verification, or contact customer support. This includes personal information like your name, email address, phone number, and government-issued identification. We also automatically collect technical information about your device and usage patterns.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 1, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                  How We Use Your Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                  We use the information we collect to:
                </Typography>
                <List dense sx={{ py: 0 }}>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Provide, maintain, and improve our services
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Comply with legal and regulatory requirements
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Detect and prevent fraud and security issues
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Communicate with you about products and services
                    </Typography>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ mb: 1, borderRadius: '8px !important' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                  Data Security & Protection
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary' }}>
                  We implement robust security measures to protect your personal information, including:
                </Typography>
                <List dense sx={{ py: 0 }}>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Advanced encryption of data in transit and at rest
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Multi-factor authentication for all accounts
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Regular security audits and penetration testing
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                    </ListItemIcon>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Cold storage for the majority of digital assets
                    </Typography>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ 
              mt: 4, 
              p: 3, 
              borderRadius: 3,
              bgcolor: isDark ? 'rgba(41, 98, 255, 0.08)' : 'rgba(41, 98, 255, 0.05)',
              borderLeft: '4px solid',
              borderColor: 'primary.main',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ mr: 1.5, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'text.primary' }}>
                  Contact Our Legal Team
                </Typography>
              </Box>
              <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                For any questions regarding our Terms of Service or Privacy Policy:
              </Typography>
              <Link 
                href="mailto:legal@coinit.com" 
                sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
                legal@coinit.com
              </Link>
            </Box>
          </Paper>
          
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 4, 
              textAlign: 'center', 
              color: 'text.secondary',
              opacity: 0.7,
            }}
          >
            © 2025 Coinit Team.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}