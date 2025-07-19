'use client';

import React from 'react';
import NavlinkWallet from '@/Components/navlinkWallet';
import {Grid } from '@mui/material';
import WalletOver2 from '@/Components/WalletOver2';
import WalletOver3 from '@/Components/WalletOver3';
import WalletOver4 from '@/Components/WalletOver4';
import WalletHeader from '@/Components/WalletHeader';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:1 ,md: 2}} sx={{p:3}}>
        <NavlinkWallet />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}}>
            <WalletHeader/>
          </Grid>
          <Grid size={{xs: 12, md: 7}}>
            <WalletOver2/>
          </Grid>
          <Grid size={{xs: 12, md: 5}}>
            <WalletOver3/>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <WalletOver4/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
