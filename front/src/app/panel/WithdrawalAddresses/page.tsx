'use client';

import {
  Settings as SettingsIcon,
} from '@mui/icons-material';
import React from 'react';
import NavlinkProfile from '@/Components/navlinkProfile';
import {Grid , Typography , Box} from '@mui/material';
import UserpanelWitDra from '@/Components/UserpanelWitDra';
import Link from 'next/link';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:12 ,md: 2}} sx={{p:3}}>
        <NavlinkProfile />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{pt:{xs:2,md:3},px:{xs:1,md:3}}}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}}>
            <Box sx={{ display: 'flex', alignItems: {xs:'flex-start',sm:'center'},flexDirection:{xs:'column',sm:'row'}, mb: 2 }}>
              <SettingsIcon sx={{ mr: 1,display:{xs:'none',sm:'block'} }} />
              <Typography variant="h6" fontWeight="bold">Withdrawal Addresses/Contacts</Typography>
            </Box>

            <Box sx={{ bgcolor: "Background.paper", p: {xs:0,sm:4}, borderRadius: 1, mb: 3 }}>
              <Typography variant="body2" color="text.secondary">Withdrawal whitelist has been disabled</Typography>
              <Typography variant="body2" color="text.secondary">You can manage your withdrawal addresses below</Typography>
              <Link href="settings" style={{ marginTop: 1, display: 'inline-block', textDecorationLine: 'none', color: 'inherit' }}>
                <Typography variant="body2" color="primary">Go to Settings</Typography>
              </Link>
            </Box>
          </Grid>
          <Grid bgcolor="background.paper" size={{xs: 12, md: 12}}>
            <UserpanelWitDra/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
