'use client';

import React from 'react';
import NavlinkProfile from '@/Components/navlinkProfile';
import {Grid } from '@mui/material';
import UserpanelInfo from '@/Components/UserpanelInfo';
import UserpanelTValue from '@/Components/UserpanelTValue';
import UserpanelRef from '@/Components/UserpanelRef';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:12 ,md: 2}} sx={{p:{xs:1,md:3}}}>
        <NavlinkProfile />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ pt:{xs:6,md:3},px:{xs:1,md:3} }}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}}>
            <UserpanelInfo/>
          </Grid>
          <Grid size={{xs: 12, md: 9}}>
            <UserpanelTValue/>
          </Grid>
          <Grid size={{xs: 12, md: 3}}>
            <UserpanelRef/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
