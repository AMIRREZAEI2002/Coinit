'use client';

import React from 'react';
import NavlinkWallet from '@/Components/navlinkWallet';
import {Grid } from '@mui/material';
import WalletFutures3 from '@/Components/WalletFutures3';
import WalletFutures2 from '@/Components/WalletFutures2';
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
          <Grid size={{xs: 12, md: 12}}>
            <WalletFutures2/>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <WalletFutures3/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
