'use client';

import React from 'react';
import NavlinkProfile from '@/Components/navlinkProfile';
import {Grid, Typography } from '@mui/material';
import UserSecpanelEL from '@/Components/UserSecpanelEL';
import UserSecpanelSV from '@/Components/UserSecpanelSV';
import UserSecpanelDA from '@/Components/UserSecpanelDA';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:12 ,md: 2}} sx={{p:3}}>
        <NavlinkProfile />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="h5">
              Security
            </Typography>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <UserSecpanelEL/>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <UserSecpanelSV/>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <UserSecpanelDA/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
