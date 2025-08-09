import React from 'react';
import { 
  Box
} from '@mui/material';
import FooterSliderPrice from './FooterSliderPrice';
import FooterLinkAndApp from './FooterLinkAndApp';
import InstallButton from './InstallButton';
const Footer = () => {

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper'}}>
      <FooterSliderPrice/>
      <FooterLinkAndApp/>
      <InstallButton/>
      
    </Box>
  );
};

export default Footer;