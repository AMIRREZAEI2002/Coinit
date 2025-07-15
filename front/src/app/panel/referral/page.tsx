'use client';

import React from 'react';
import NavlinkProfile from '@/Components/navlinkProfile';
import {Grid} from '@mui/material';
import UserpanelHoldMX from '@/Components/UserpanelHoldMX';
import UserpanelHoldTable from '@/Components/UserpanelHoldTable';
import UserpanelUnderFee from '@/Components/UserpanelUnderFee';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:12 ,md: 2}} sx={{p:3}}>
        <NavlinkProfile />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid bgcolor="background.paper" size={{xs: 12, md: 12}}>
            <UserpanelHoldMX/>
            <UserpanelHoldTable/>
          </Grid>
          <Grid bgcolor="background.paper" size={{xs: 12, md: 12}}>
            <UserpanelUnderFee/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
