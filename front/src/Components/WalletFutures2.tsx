import React, { forwardRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Link as MuiLink,
  useTheme,
  styled,
} from '@mui/material';
import { Icon } from '@iconify/react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

// تعریف نوع برای داده‌های کارمزد فیوچرز
interface FuturesFeesData {
  marketFee: string;
  takerFee: string;
  availableMX: string;
  discountText: string;
}

// داده‌های نمونه
const futuresFeesData: FuturesFeesData = {
  marketFee: '0%',
  takerFee: '0.05%',
  availableMX: '0.00000',
  discountText: 'Pay with MX to enjoy 20% off trading fees',
};

// تعریف Link سازگار با MUI
const LinkBehavior = forwardRef<HTMLAnchorElement, NextLinkProps>(
  ({ href, ...props }, ref) => (
    <NextLink href={href} ref={ref} {...props} />
  )
);
LinkBehavior.displayName = 'LinkBehavior';

// Styled Components
const SectionCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(4),
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 100%, ${theme.palette.background.default} 100%)`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: theme.palette.action.hover,
  marginRight: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    '& svg': {
      color: theme.palette.primary.contrastText,
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: 20,
    height: 20,
    '& svg': {
      width: 14,
      height: 14,
    },
  },
}));

const DetailsLink = styled(MuiLink)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  textDecoration: 'underline',
  textDecorationStyle: 'dotted',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
}));

const WalletFutures2: React.FC = () => {
  const theme = useTheme();

  return (
    <SectionCard>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Futures Trading Fees
          </Typography>
          <IconWrapper>
            <Icon icon="mdi:information-outline" width={16} height={16} style={{ color: theme.palette.text.secondary }} />
          </IconWrapper>
        </Box>
        <DetailsLink href="/fees-details" as={LinkBehavior}>
          Details
          <Icon icon="mdi:chevron-right" width={16} height={16} style={{ color: theme.palette.text.secondary }} />
        </DetailsLink>
      </Box>

      {/* Content */}
      <Grid container spacing={2}>
        {/* Left Section: Fees */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Market Fee */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconWrapper>
                <Icon icon="mdi:clipboard-list-outline" width={16} height={16} style={{ color: theme.palette.text.secondary }} />
              </IconWrapper>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Market Fee:
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  {futuresFeesData.marketFee}
                </Typography>
              </Box>
            </Box>

            {/* Taker Fee */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconWrapper>
                <Icon icon="mdi:clipboard-list-outline" width={16} height={16} style={{ color: theme.palette.text.secondary }} />
              </IconWrapper>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Taker Fee:
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  {futuresFeesData.takerFee}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Section: MX Discount and Available MX */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                {futuresFeesData.discountText}
              </Typography>
              <IconWrapper>
                <Icon icon="mdi:information-outline" width={16} height={16} style={{ color: theme.palette.text.secondary }} />
              </IconWrapper>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, textAlign: { xs: 'left', md: 'right' } }}
            >
              Available MX: {futuresFeesData.availableMX}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </SectionCard>
  );
};

export default WalletFutures2;