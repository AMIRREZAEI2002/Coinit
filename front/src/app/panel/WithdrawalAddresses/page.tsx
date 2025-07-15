'use client';

import React from 'react';
import NavlinkProfile from '@/Components/navlinkProfile';
import {Grid} from '@mui/material';
import UserpanelWitDra from '@/Components/UserpanelWitDra';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:12 ,md: 2}} sx={{p:3}}>
        <NavlinkProfile />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid bgcolor="background.paper" size={{xs: 12, md: 12}}>
            <UserpanelWitDra/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
