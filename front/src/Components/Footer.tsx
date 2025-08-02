import React from 'react';
import { 
  Box
} from '@mui/material';
import FooterSliderPrice from './FooterSliderPrice';
import FooterLinkAndApp from './FooterLinkAndApp';
const Footer = () => {

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper'}}>
      <FooterSliderPrice/>
      <FooterLinkAndApp/>
      
    </Box>
  );
};

export default Footer;