'use client';

import React from 'react';
import NavlinkProfile from '@/Components/navlinkProfile';
import {Grid, Typography } from '@mui/material';
import Link from 'next/link';
import UserIdenpanelRI from '@/Components/UserIdenpanelRI';
import UserIdenpanelLI from '@/Components/UserIdenpanelLI';
import UserIdenpanelBT from '@/Components/UserIdenpanel‌BT';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:12 ,md: 2}} sx={{p:3}}>
        <NavlinkProfile />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h5">
              Identification
            </Typography>
            <Link href="#" style={{color:'text.primary',textDecoration: 'none'}}>Swithc to instituional verfrification</Link>
          </Grid>
          <Grid size={{xs: 12, md: 5}}>
            <UserIdenpanelRI/>
          </Grid>
          <Grid size={{xs: 12, md: 7}}>
            <UserIdenpanelLI/>
          </Grid>
          <Grid size={{xs: 12, md: 12}}>
            <UserIdenpanelBT/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Page;
