'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  styled,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

// Type definitions
interface FooterLinkProps {
  children: React.ReactNode;
  href: string;
  isExternal?: boolean;
}

interface CommunityIconProps {
  icon: string;
  href: string;
  isExternal?: boolean;
}

interface FooterSectionProps {
  title: string;
  links: { label: string; href: string; isExternal?: boolean }[];
}

// Social media links
const communityIcons: CommunityIconProps[] = [
  { icon: 'simple-icons:instagram', href: 'https://www.instagram.com/binance', isExternal: true },
  { icon: 'simple-icons:x', href: 'https://x.com/binance', isExternal: true },
  { icon: 'simple-icons:facebook', href: 'https://www.facebook.com/binance', isExternal: true },
  { icon: 'simple-icons:linkedin', href: 'https://www.linkedin.com/company/binance', isExternal: true },
  { icon: 'simple-icons:telegram', href: 'https://t.me/BinanceExchange', isExternal: true },
  { icon: 'simple-icons:whatsapp', href: 'https://wa.me/binance', isExternal: true },
  { icon: 'simple-icons:youtube', href: 'https://www.youtube.com/c/binance', isExternal: true },
  { icon: 'simple-icons:reddit', href: 'https://www.reddit.com/r/binance', isExternal: true },
  { icon: 'simple-icons:discord', href: 'https://discord.com/invite/binance', isExternal: true },
  { icon: 'simple-icons:tiktok', href: 'https://www.tiktok.com/@binance', isExternal: true },
];

// Footer sections
const footerSections: FooterSectionProps[] = [
  {
    title: 'About',
    links: [
      { label: 'About', href: '/about', isExternal: false },
      { label: 'Asset Security', href: 'https://www.binance.com/en/security', isExternal: true },
      { label: 'User Agreement', href: 'https://www.binance.com/en/terms', isExternal: true },
      { label: 'Privacy Policy', href: 'https://www.binance.com/en/privacy', isExternal: true },
      { label: 'Risk Disclosure', href: 'https://www.binance.com/en/risk-warning', isExternal: true },
      { label: 'Coinit Ventures', href: 'https://www.binance.com/en/ventures', isExternal: true },
      { label: 'Why Coinit', href: '/why-coinit', isExternal: false },
      { label: 'Sitemap', href: '/sitemap', isExternal: false },
      { label: 'Contact Us', href: '/contact', isExternal: false },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Buy Crypto', href: '/buy-crypto', isExternal: false },
      { label: 'P2P', href: '/p2p', isExternal: false },
      { label: 'Convert', href: '/convert', isExternal: false },
      { label: 'Spot', href: '/spot', isExternal: false },
      { label: 'Futures', href: '/futures', isExternal: false },
      { label: 'Demo Trade', href: 'https://testnet.binancefuture.com', isExternal: true },
      { label: 'Copy Trade', href: '/copy-trading', isExternal: false },
      { label: 'Coinit Loans', href: '/loan', isExternal: false },
      { label: 'Fees', href: '/fees', isExternal: false },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Customer Services', href: '/support', isExternal: false },
      { label: 'VIP Benefits', href: '/vip', isExternal: false },
      { label: 'Submit an Inquiry', href: '/support/inquiry', isExternal: false },
      { label: 'Improvement Suggestions', href: '/feedback', isExternal: false },
      { label: 'Report Abnormal Funds', href: '/support/abnormal-funds', isExternal: false },
      { label: 'Judicial Assistance', href: '/legal', isExternal: false },
      { label: 'Coinit Verify', href: '/verify', isExternal: false },
    ],
  },
  {
    title: 'Partnerships',
    links: [
      { label: 'Listing Application', href: '/listing', isExternal: false },
      { label: 'P2P Merchant Application', href: '/p2p/merchant', isExternal: false },
      { label: 'Institutional Services', href: '/institutional', isExternal: false },
      { label: 'Affiliate Program', href: '/affiliate', isExternal: false },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '/support/faq', isExternal: false },
      { label: 'Coinit Earn', href: '/earn', isExternal: false },
      { label: 'Coinit Blog', href: '/blog', isExternal: false },
      { label: 'Crypto News', href: '/news', isExternal: false },
      { label: 'All Crypto Prices', href: '/prices', isExternal: false },
      { label: 'How to Buy', href: '/how-to-buy', isExternal: false },
    ],
  },
];

// Custom styles
const StyledButton = styled(Button)({
  padding: 0,
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.2s ease-in-out',
  },
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: 'scale(1.1)',
    transition: 'all 0.2s ease-in-out',
  },
}));

const FooterLink: React.FC<FooterLinkProps> = ({ children, href, isExternal }) => (
  <ListItem sx={{ py: 0.5, justifyContent: 'flex-start' }}>
    {isExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Typography
          color="text.primary"
          sx={{
            fontSize: '0.875rem',
            '&:hover': { 
              color: theme => theme.palette.primary.main,
              textDecoration: 'none',
            },
          }}
        >
          {children}
        </Typography>
      </a>
    ) : (
      <Link href={href} passHref style={{textDecoration: 'none'}}>
        <Typography
          component="a"
          color="text.primary"
          sx={{
            fontSize: '0.875rem',
            textDecoration: 'none',
            '&:hover': { 
              color: theme => theme.palette.primary.main,
              textDecoration: 'none',
            },
          }}
        >
          {children}
        </Typography>
      </Link>
    )}
  </ListItem>
);

const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => (
  <Grid size={{xs:12, sm: 6,md: 4, lg: 2}} sx={{ mt: 3 }}>
    <Typography variant="h5" fontWeight="bold" textAlign="left" mb={2}>
      {title}
    </Typography>
    <List dense sx={{ p: 0 }}>
      {links.map((link, index) => (
        <FooterLink key={index} href={link.href} isExternal={link.isExternal}>
          {link.label}
        </FooterLink>
      ))}
    </List>
  </Grid>
);

const FooterLinkAndApp: React.FC = () => {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ bgcolor: 'background.default', py: 4 }}>
      <Container sx={{ px: { xs: 2, lg: 3 } }}>
        {/* Download App Section */}
        <Box sx={{ 
          bgcolor: 'background.paper', 
          p: 4, 
          borderRadius: 2, 
          mb: 4,
          textAlign: 'center'
        }}>
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Grid size={{xs:12, md: 6}} textAlign="center">
              <Typography variant="h5" mb={1} sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                Download App
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You can download with QR code or use Google Play and App Store
              </Typography>
            </Grid>

            <Grid size={{xs:12, md: 6}}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <StyledButton href="https://play.google.com/store/apps/details?id=com.binance.dev">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  width={135}
                  height={40}
                />
              </StyledButton>

              <StyledButton href="https://apps.apple.com/app/binance/id1436799971">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Apple Store"
                  width={120}
                  height={40}
                />
              </StyledButton>

              <StyledButton href="https://www.binance.com/en/download">
                <StyledIconButton>
                  <Icon color={theme.palette.secondary.main} icon="mdi:qrcode-scan" width={40} height={40} />
                </StyledIconButton>
              </StyledButton>
            </Grid>
          </Grid>
        </Box>

        {/* Footer Sections */}
        <Grid 
          container 
          spacing={2} 
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* Community Section */}
          <Grid size={{xs:12, sm: 6,md: 4, lg: 2}} sx={{ mt: 3 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="left" mb={2}>
              Community
            </Typography>
            <Grid
              container
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'flex-start'
              }}
            >
              {communityIcons.map((item, i) => (
                <StyledIconButton 
                  key={i} 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Icon icon={item.icon} width={24} height={24} />
                </StyledIconButton>
              ))}
            </Grid>
          </Grid>

          {/* Other Footer Sections */}
          {footerSections.map((section, index) => (
            <FooterSection key={index} title={section.title} links={section.links} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterLinkAndApp;