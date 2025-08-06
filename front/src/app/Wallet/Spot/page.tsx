'use client';

import React from 'react';
import NavlinkWallet from '@/Components/navlinkWallet';
import {Grid } from '@mui/material';
import WalletSpot2 from '@/Components/WalletSpot2';
import WalletSpot3 from '@/Components/WalletSpot3';
import WalletHeader from '@/Components/WalletHeader';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:1 ,md: 2}} sx={{p:{xs:1,md:3}}}>
        <NavlinkWallet />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ p:{xs:1,md:3} }}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}}>
            <WalletHeader/>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <WalletSpot2/>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <WalletSpot3/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
