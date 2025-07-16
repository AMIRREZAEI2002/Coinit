'use client';

import React from 'react';
import NavlinkProfile from '@/Components/navlinkProfile';
import {Grid, Typography } from '@mui/material';
import RotateSubAccont from '@/Components/RotateSubAccont';

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
              Sub Account Managemrnt
            </Typography>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <RotateSubAccont/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
