import React, { useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  List, 
  ListItem, 
  Divider, 
  IconButton,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const Footer = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLargeScreen || !marqueeRef.current) return;

    const container = marqueeRef.current;
    const speedPxPerSec = 70;
    let isPaused = false;
    let lastTimestamp: number | null = null;
    let scrollPosition = 0;
    
    const createNavItem = () => {
      const wrapper = document.createElement('div');
      wrapper.className = 'crypto-item';
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.marginRight = '16px';
      
      const symbol = document.createElement('span');
      symbol.style.color = theme.palette.text.secondary;
      symbol.textContent = 'BTCUSDT';
      
      const change = document.createElement('span');
      change.style.color = theme.palette.success.main;
      change.style.marginLeft = '4px';
      change.textContent = '+0.05%';
      
      wrapper.appendChild(symbol);
      wrapper.appendChild(change);
      return wrapper;
    };

    // Create initial items
    const items = Array.from({ length: 22 }, createNavItem);
    items.forEach(item => container.appendChild(item));

    // Duplicate items to create seamless loop
    const viewportWidth = container.clientWidth;
    while (container.scrollWidth < viewportWidth * 2) {
      items.forEach(item => {
        container.appendChild(item.cloneNode(true));
      });
    }

    const step = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPaused) {
        scrollPosition += (speedPxPerSec * elapsed) / 1000;
        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition -= container.scrollWidth / 2;
        }
        container.scrollLeft = scrollPosition;
      }
      requestAnimationFrame(step);
    };

    const handleMouseEnter = () => (isPaused = true);
    const handleMouseLeave = () => (isPaused = false);

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    const animationId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isLargeScreen, theme]);

  const FooterLink = ({ children, href }: { children: React.ReactNode, href: string }) => (
    <ListItem sx={{ py: 0.5, justifyContent: 'center' }}>
      <Link href={href} color="text.primary" underline="none" sx={{ 
        '&:hover': { color: 'primary.main' } 
      }}>
        {children}
      </Link>
    </ListItem>
  );

  const FooterSection = ({ title, links }: { 
    title: string; 
    links: { label: string; href: string }[] 
  }) => (
    <Grid size={{xs: 6 ,md: 2}} sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight="bold" textAlign="center" mb={1}>
        {title}
      </Typography>
      <List dense sx={{ p: 0 }}>
        {links.map((link, index) => (
          <FooterLink key={index} href={link.href}>{link.label}</FooterLink>
        ))}
      </List>
    </Grid>
  );

  // Community icons from Iconify
  const communityIcons = [
    'simple-icons:instagram',
    'simple-icons:twitter',
    'simple-icons:facebook',
    'simple-icons:linkedin',
    'simple-icons:telegram',
    'simple-icons:whatsapp',
    'simple-icons:youtube',
    'simple-icons:reddit',
    'simple-icons:discord',
    'simple-icons:tiktok',
  ];

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pb: isLargeScreen ? 7 : 0 }}>
      {/* Fixed bottom status bar */}
      {isLargeScreen && (
        <Box sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          bgcolor: 'background.paper',
          borderTop: `1px solid ${theme.palette.divider}`,
          py: 0,
          px: 1,
          zIndex: theme.zIndex.appBar
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Icon icon="material-symbols:signal-cellular-4-bar" color={theme.palette.primary.main} width={16} />
              <Typography variant="caption" color="primary">Network Normal</Typography>
              <Typography variant="caption" color="text.secondary">
                Line 1 <Icon icon="material-symbols:keyboard-arrow-down" width={12} />
              </Typography>
            </Box>
            
            <Divider orientation="vertical" flexItem />
            
            <IconButton size="small">
              <Icon icon="material-symbols:format-align-left" width={16} />
            </IconButton>
            <IconButton size="small">
              <Icon icon="material-symbols:whatshot" color={theme.palette.primary.main} width={16} />
            </IconButton>
            
            <Box 
              ref={marqueeRef}
              sx={{ 
                width: '75%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': { height: 3 },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400' }
              }}
            >
              {/* Crypto items will be injected by JS */}
            </Box>
            
            <Link href="#" color="text.secondary" underline="none" variant="caption">
              Connected <Icon icon="material-symbols:keyboard-arrow-right" width={12} />
            </Link>
            
            <IconButton size="small">
              <Icon icon="material-symbols:tune" width={16} />
            </IconButton>
            
            <Divider orientation="vertical" flexItem />
            
            <Box sx={{ position: 'relative' }}>
              <Link href="#" color="text.secondary" underline="none" variant="caption">
                Coinit updates
              </Link>
              <Icon 
                icon="material-symbols:circle" 
                color={theme.palette.error.main} 
                width={8}
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  right: -10,
                }} 
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Main footer content */}
      <Container sx={{ py:4 }}>
        <Box sx={{ px: { xs: 2, lg: 3 }, mb: 4 }}>
          <Box sx={{ 
            bgcolor: 'primary.light', 
            p: 4, 
            borderRadius: 2, 
            mb: 4 
          }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid  size={{xs: 12 ,md: 6}}>
                <Typography variant="h5" mb={1}>
                  Download App
                </Typography>
                <Typography variant="body2" color="text.paper">
                  You can download with QR code or use Google Play and App Store
                </Typography>
              </Grid>
              
              <Grid  size={{xs: 12 ,md: 6}} sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 2
              }}>
                <Button href="#" sx={{ p: 0 }}>
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    width={135}
                    height={40}
                  />
                </Button>
                
                <Button href="#" sx={{ p: 0 }}>
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="Apple Store"
                    width={120}
                    height={40}
                  />
                </Button>
                
                <Button href="#" sx={{ p: 0 }}>
                  <IconButton href="#" sx={{ color: 'text.primary' }}>
                      <Icon icon="unjs:image-meta" width={102} height={102} />
                  </IconButton>
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          <Grid container spacing={2}>
            {/* Community Section */}
            <Grid size={{xs: 12 ,md: 4, xl:2}} sx={{ mt: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Community
              </Typography>
              <Grid container spacing={2}>
                {communityIcons.map((icon, i) => (
                  <Grid size={{xs: 3}} key={i}>
                    <IconButton href="#" sx={{ color: 'text.primary' }}>
                      <Icon icon={icon} width={24} />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            
            {/* Footer Sections */}
            <FooterSection 
              title="About"
              links={[
                { label: "About", href: "#" },
                { label: "Asset Security", href: "#" },
                { label: "User Agreement", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Risk Disclosure", href: "#" },
                { label: "Coinit Ventures", href: "#" },
                { label: "Why Coinit", href: "#" },
                { label: "Sitemap", href: "#" },
                { label: "Contact Us", href: "#" }
              ]}
            />
            
            <FooterSection 
              title="Products"
              links={[
                { label: "Buy Crypto", href: "#" },
                { label: "P2P", href: "#" },
                { label: "Convert", href: "#" },
                { label: "Spot", href: "#" },
                { label: "Futures", href: "#" },
                { label: "Demo Trade", href: "#" },
                { label: "Copy Trade", href: "#" },
                { label: "Coinit Loans", href: "#" },
                { label: "Fees", href: "#" }
              ]}
            />
            
            <FooterSection 
              title="Support"
              links={[
                { label: "Customer Services", href: "#" },
                { label: "VIP Benefits", href: "#" },
                { label: "Submit an Inquiry", href: "#" },
                { label: "Improvement Suggestions", href: "#" },
                { label: "Report Abnormal Funds", href: "#" },
                { label: "Judicial Assistance", href: "#" },
                { label: "Coinit Verify", href: "#" }
              ]}
            />
            
            <FooterSection 
              title="Partnerships"
              links={[
                { label: "Listing Application", href: "#" },
                { label: "P2P Merchant Application", href: "#" },
                { label: "Institutional Services", href: "#" },
                { label: "Affiliate Program", href: "#" }
              ]}
            />
            
            <FooterSection 
              title="Resources"
              links={[
                { label: "Help Center", href: "#" },
                { label: "Coinit Earn", href: "#" },
                { label: "Coinit Blog", href: "#" },
                { label: "Crypto News", href: "#" },
                { label: "All Crypto Prices", href: "#" },
                { label: "How to Buy", href: "#" }
              ]}
            />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;