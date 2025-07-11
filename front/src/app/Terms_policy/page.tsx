'use client';
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import DescriptionIcon from '@mui/icons-material/Description';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TermsAndPrivacy = () => {
  const theme = useTheme();
  const [expandedSection, setExpandedSection] = useState<string | false>('terms');

  const handleChange = (section: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSection(isExpanded ? section : false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button 
            startIcon={<ArrowBackIcon />} 
            href="/" 
            sx={{ mb: 1, color: 'text.secondary' }}
          >
            Back to Home
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Terms of Service & Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            Please read these terms and conditions carefully before using CoinIt Exchange services.
          </Typography>
        </Box>
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, 
          alignItems: 'center',
          bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
          borderRadius: 2,
          p: 2
        }}>
          <DescriptionIcon sx={{ fontSize: 40, mr: 1, color: 'primary.main' }} />
          <Typography variant="body2" sx={{ maxWidth: 200 }}>
            Last updated: May 18, 2025
          </Typography>
        </Box>
      </Box>

      {/* Terms of Service Section */}
      <Paper elevation={0} sx={{ 
        mb: 4, 
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}>
        <Accordion 
          expanded={expandedSection === 'terms'} 
          onChange={handleChange('terms')}
          sx={{ bgcolor: 'transparent' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: expandedSection === 'terms' ? 
                (theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light') : 
                'background.paper',
              borderBottom: expandedSection === 'terms' ? 'none' : '1px solid',
              borderColor: 'divider',
              minHeight: '72px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DescriptionIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                1. Terms of Service
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="body1" >
                Welcome to CoinIt Exchange. By accessing or using our website, application, and services (collectively, “Services”), you agree to be bound by these terms and conditions (“Terms”). If you do not agree with any provision of these Terms, you are not authorized to use our Services.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.1. Definition of Services
              </Typography>
              <Typography variant="body1" >
                CoinIt Exchange is a digital currency exchange platform that allows users to buy, sell, and trade various cryptocurrencies, manage digital wallets, and access financial services related to the crypto market.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.2. Acceptance of Terms
              </Typography>
              <Typography variant="body1" >
                By creating an account on CoinIt Exchange and using the Services, you confirm that you are at least 18 years old (or have reached the legal age of majority in your jurisdiction) and have the legal capacity to comply with this agreement. You also agree to comply with all applicable local, national, and international laws and regulations.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.3. Changes to Terms
              </Typography>
              <Typography variant="body1" >
                We reserve the right to update or modify these Terms at any time and without prior notice. Changes will take effect upon publication on the CoinIt Exchange website, and the “Last Updated” date will be displayed at the top. Your continued use of the Services after such changes constitutes acceptance of the revised Terms.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.4. Account Creation and Security
              </Typography>
              <Typography variant="body1" >
                To access most features of CoinIt Exchange, you must create an account. You agree to provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your username, password, and any API keys. In the event of any unauthorized access or misuse of your account, you must notify us immediately.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.5. KYC/AML Verification
              </Typography>
              <Typography variant="body1" >
                To comply with anti-money laundering (AML) and counter-terrorism financing regulations, CoinIt Exchange may require you to submit identification documents (e.g., national ID card or passport) and proof of address (e.g., utility bill or bank statement). Failure to complete the verification process may result in limitations or suspension of your account.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.6. Deposits, Withdrawals, and Fees
              </Typography>
              <Typography variant="body1" >
                You can deposit cryptocurrency or fiat currency into your account and use the equivalent balance for trading. Fees vary depending on the type of transaction (trade, deposit, or withdrawal) and will be displayed prior to confirmation. CoinIt Exchange reserves the right to change the fee structure at any time.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.7. Permitted and Prohibited Activities
              </Typography>
              <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'error.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Using the Services for illegal or fraudulent activities." />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'error.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Creating multiple accounts to bypass restrictions or exploit promotions and bonuses." />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'error.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Attempting to breach CoinIt Exchange’s systems or disrupt platform operations." />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'error.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Publishing false or misleading information regarding trading or cryptocurrency markets." />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'error.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Designing, distributing, or executing any malware or malicious code." />
                </ListItem>
              </List>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.8. Market Risks
              </Typography>
              <Typography variant="body1" >
                The cryptocurrency market is inherently highly volatile. Cryptocurrency prices can rapidly increase or decrease. CoinIt Exchange provides no guarantee of profitability in your trades, and you accept all risks arising from market volatility.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.9. Intellectual Property
              </Typography>
              <Typography variant="body1" >
                All content, brands, logos, trademarks, graphical designs, and software code on CoinIt Exchange are the property of CoinIt or its business partners. Unauthorized use or reproduction of these assets is prohibited.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.10. Limitation of Liability
              </Typography>
              <Typography variant="body1" >
                To the fullest extent permitted by law, CoinIt Exchange and its providers shall not be liable for any direct, indirect, incidental, consequential, or punitive damages, including loss of assets, profits, or data, arising from or related to your use or inability to use the Services.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.11. Account Termination
              </Typography>
              <Typography variant="body1" >
                CoinIt Exchange reserves the right to suspend or block your account without prior notice if you violate these Terms or applicable laws. Upon account termination, your access to the Services will be immediately revoked, and any remaining assets will be managed according to applicable regulations.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                1.12. Governing Law and Dispute Resolution
              </Typography>
              <Typography variant="body1" >
                This agreement is governed by the laws of the Islamic Republic of Iran. Any disputes arising out of these Terms or the use of the Services shall first be resolved through amicable negotiations; otherwise, they will be referred to the competent judicial authorities in Iran.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Privacy Policy Section */}
      <Paper elevation={0} sx={{ 
        mb: 4, 
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}>
        <Accordion 
          expanded={expandedSection === 'privacy'} 
          onChange={handleChange('privacy')}
          sx={{ bgcolor: 'transparent' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              bgcolor: expandedSection === 'privacy' ? 
                (theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light') : 
                'background.paper',
              borderBottom: expandedSection === 'privacy' ? 'none' : '1px solid',
              borderColor: 'divider',
              minHeight: '72px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PrivacyTipIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                2. Privacy Policy
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="body1" >
                Protecting user privacy is of great importance to CoinIt Exchange. This document outlines how we collect, use, store, and disclose your information. By using our Services, you agree to the following practices.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                2.1. Information We Collect
              </Typography>
              <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1">
                        <Box component="span" fontWeight="bold">Personal Data:</Box> Includes your first and last name, email address, phone number, residential address, and identification information (national ID card, birth certificate, or passport) submitted during verification.
                      </Typography>
                    } 
                  />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1">
                        <Box component="span" fontWeight="bold">Financial Data:</Box> Includes details of your transactions, cryptocurrency wallet addresses, and banking information (for fiat transfers).
                      </Typography>
                    } 
                  />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1">
                        <Box component="span" fontWeight="bold">Usage Data:</Box> Includes how you interact with our website or application (pages visited, login times, activities).
                      </Typography>
                    } 
                  />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1">
                        <Box component="span" fontWeight="bold">Device Information:</Box> Includes device type, operating system, browser, IP address, and unique identifiers (Device ID).
                      </Typography>
                    } 
                  />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1">
                        <Box component="span" fontWeight="bold">Cookies & Tracking Technologies:</Box> We use cookies, pixels, and similar technologies to enhance user experience and analyze behavior.
                      </Typography>
                    } 
                  />
                </ListItem>
              </List>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                2.2. How We Use Your Information
              </Typography>
              <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'success.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Provide, maintain, and improve CoinIt Exchange Services." />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'success.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Perform identity verification and KYC/AML checks." />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'success.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Process and manage your financial and cryptocurrency transactions." />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'success.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Send notifications, transaction alerts, confirmations, and security warnings." />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'success.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Personalize your experience and display content and advertisements relevant to your interests." />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <CheckIcon sx={{ color: 'success.main', fontSize: 16, mt: '4px', mr: 1.5 }} />
                  <ListItemText primary="Analyze user behavior to enhance security and prevent fraud." />
                </ListItem>
              </List>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                2.3. Information Sharing
              </Typography>
              <Typography variant="body1" >
                We may share your information with third parties under the following circumstances:
              </Typography>
              <List dense sx={{ pl: 2 }}>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1">
                        <Box component="span" fontWeight="bold">Service Providers:</Box> Companies and third parties that help us provide our Services (e.g., payment processors, email services, cloud hosting).
                      </Typography>
                    } 
                  />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1">
                        <Box component="span" fontWeight="bold">Legal Requirements:</Box> If required by law or in response to valid requests from governmental or judicial authorities, we will disclose the relevant information.
                      </Typography>
                    } 
                  />
                </ListItem>
                <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1">
                        <Box component="span" fontWeight="bold">Business Transfers:</Box> In the event of a merger, acquisition, or sale of CoinIt Exchange assets, your information may be transferred to the acquiring entity.
                      </Typography>
                    } 
                  />
                </ListItem>
              </List>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                2.4. Cookies and Tracking Technologies
              </Typography>
              <Typography variant="body1" >
                CoinIt Exchange uses cookies to store your preferences, analyze traffic, and improve site performance. You can configure your browser to limit or disable cookies; however, some features and sections of the site may not function properly as a result.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                2.5. Data Security
              </Typography>
              <Typography variant="body1" >
                We are committed to protecting your information and employ technical and organizational measures such as data encryption, firewalls, access controls, and traffic monitoring systems to safeguard your data. However, no system is completely infallible, and we cannot guarantee 100% security.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                2.6. Children’s Privacy
              </Typography>
              <Typography variant="body1" >
                CoinIt Exchange services are not intended for individuals under 18 years old. We do not intentionally collect personal information from individuals under 18. If you become aware that a minor has provided us with personal data, please contact us so we can remove it.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                2.7. Your Rights
              </Typography>
              <Typography variant="body1" >
                Depending on your jurisdiction, you may have the right to access, correct, update, or delete your personal information. You may also have the right to request restriction or objection to certain processing of your data. To exercise these rights, please contact us using the information below.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                2.8. Changes to This Policy
              </Typography>
              <Typography variant="body1" >
                CoinIt Exchange may update this Privacy Policy. In the event of material changes, we will publish the new version on this page and update the “Last Updated” date. Your continued use of the Services after such changes constitutes acceptance of the updated Policy.
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1.5, fontWeight: 600 }}>
                2.9. Contact Information
              </Typography>
              <Typography variant="body1" >
                If you have any questions or suggestions regarding the Terms of Service or Privacy Policy, please contact us using the following information:
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Email: support@coinit.com" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Address: Example mercury planet near pizza ploto" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText primary="Phone: +0000000000000" />
                </ListItem>
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Acceptance Section */}
      {/* <Box sx={{ textAlign: 'center', mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          By using our services, you acknowledge that you have read and understood these Terms and Privacy Policy.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          sx={{ mt: 1, px: 4, fontWeight: 600 }}
          href="/signup"
        >
          I Understand and Agree
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          If you do not agree with these terms, please do not use our services.
        </Typography>
      </Box> */}
    </Container>
  );
};

export default TermsAndPrivacy;