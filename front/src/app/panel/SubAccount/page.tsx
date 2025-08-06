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

      <Grid size={{xs:12,md:10}} sx={{pt:{xs:2,md:3},px:{xs:1,md:3}}}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}}>
            <Typography variant="h6">
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
