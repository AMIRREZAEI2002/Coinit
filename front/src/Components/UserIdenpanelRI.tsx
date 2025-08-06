'use client';
import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  styled
} from '@mui/material';

const KycCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const PillButton = styled(Button)(({ theme }) => ({
  borderRadius: 50,
  padding: theme.spacing(0.8, 3),
  textTransform: 'none',
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
  '&:hover': {
    borderColor: theme.palette.primary.main,
  }
}));

const UserIdenpanelRI = () => {

  return (
    <Box sx={{ 
      width: '100%',
      pl: { xs: 0, md: 0 },
      pr: { xs: 0, md: 2 },
      mb: { xs: 3, md: 0 }
    }}>
      <KycCard elevation={0}>
        <Typography variant="h6" fontWeight="bold">
          Primary KYC
        </Typography>
        
        <Typography variant="body2" color="textSecondary" mt={1.5}>
          Complete KYC and kickstart your crypto journey
        </Typography>
        
        <Typography variant="body2" fontWeight="medium" mt={3}>
          KYC Verification Requirements
        </Typography>
        
        <Typography variant="body2" color="textSecondary" mt={1}>
          ID
        </Typography>
        
        <Box mt={4} display="flex" justifyContent="flex-start" flexDirection={{xs:'column',md:'row'}}>
          <PrimaryButton variant="contained" size="small" sx={{fontSize:{xs:12, md: 14}}}>
            Verify via Web
          </PrimaryButton>
          
          <OutlineButton sx={{mt:{xs:2, md:0} , mr:{xs:0,md:2},fontSize:{xs:12, md: 14}}} variant="outlined" size="small">
            Verify via App
          </OutlineButton>
        </Box>
      </KycCard>
    </Box>
  );
};

export default UserIdenpanelRI;