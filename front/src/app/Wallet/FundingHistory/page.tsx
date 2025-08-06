'use client';

import React from 'react';
import NavlinkWallet from '@/Components/navlinkWallet';
import {Grid } from '@mui/material';
import WalletFundingRouter from '@/Components/WalletFundingRouter';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:1 ,md: 2}} sx={{p:{xs:1,md:3}}}>
        <NavlinkWallet />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ p:{xs:1,md:3}}}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}}>
            <WalletFundingRouter/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;