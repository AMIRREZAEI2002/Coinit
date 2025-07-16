'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  styled
} from '@mui/material';
import Image from 'next/image';

const KycCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
}));

const PillButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: theme.spacing(0.8, 3),
  textTransform: 'none',
  fontSize: '0.875rem',
}));

const PrimaryButton = styled(PillButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  }
}));

const OutlineButton = styled(PillButton)(({ theme }) => ({
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  marginLeft: theme.spacing(1.5),
  '&:hover': {
    borderColor: theme.palette.primary.main,
  }
}));

const RecommendedBadge = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  fontSize: '0.75rem',
  borderColor: theme.palette.warning.main,
  color: theme.palette.warning.dark,
  backgroundColor: theme.palette.warning.light,
  marginLeft: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
  }
}));

const UserIdenpanelLI = () => {

  return (
      <KycCard elevation={0}>
        {/* Absolute positioned image */}
        <Box sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          display: { xs: 'none', md: 'block' }
        }}>
          <Image 
            src='/Images/a.webp'
            alt="KYC Verification" 
            width={150}
            height={150}
            style={{ maxWidth: '100%', height: 'auto' }}
          />

        </Box>
        
        {/* Header with recommended badge */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            Advanced KYC
          </Typography>
          <RecommendedBadge variant="outlined" size="small">
            ★ Recommended
          </RecommendedBadge>
        </Box>
        
        <Typography variant="body2" color="textSecondary">
          More benefits, enhanced security trading limits!
        </Typography>
        
        <Typography variant="body1" fontWeight="medium" mt={1}>
          KYC Verification Requirements
        </Typography>
        
        <Box mt={1}>
          <Typography variant="body2" color="textSecondary">ID</Typography>
          <Typography variant="body2" color="textSecondary" mt={0.5}>
            Facial Recognition
          </Typography>
        </Box>
        
        <Box mt={3} display="flex">
          <PrimaryButton variant="contained" size="small">
            Verify via Web
          </PrimaryButton>
          
          <OutlineButton variant="outlined" size="small">
            Verify via App
          </OutlineButton>
        </Box>
      </KycCard>
  );
};

export default UserIdenpanelLI;