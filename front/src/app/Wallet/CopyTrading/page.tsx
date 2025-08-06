'use client';

import React from 'react';
import NavlinkWallet from '@/Components/navlinkWallet';
import {Grid } from '@mui/material';
import WalletHeader from '@/Components/WalletHeader';
import WalletCopyTrade2 from '@/Components/WalletCopyTrade2';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:1 ,md: 2}} sx={{p:{xs:1,md:3}}}>
        <NavlinkWallet />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ p:{xs:1,md:3}}}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}}>
            <WalletHeader/>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <WalletCopyTrade2/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
