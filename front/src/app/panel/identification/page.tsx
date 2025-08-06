'use client';

import React from 'react';
import NavlinkProfile from '@/Components/navlinkProfile';
import {Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import UserIdenpanelRI from '@/Components/UserIdenpanelRI';
import UserIdenpanelLI from '@/Components/UserIdenpanelLI';
import UserIdenpanelBT from '@/Components/UserIdenpanel‌BT';

const Page = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid size={{xs:12 ,md: 2}} sx={{p:{xs:1,md:3}}}>
        <NavlinkProfile />
      </Grid>

      <Grid size={{xs:12,md:10}} sx={{ pt:{xs:6,md:3},px:{xs:1,md:3} }}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 12}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: {xs:'self-start',md:'center'}, flexDirection:{xs:'column',md:'row'}}}>
              <Typography variant="h5">
                Identification
              </Typography>
              <Link href="#" style={{color:'text.primary',textDecoration: 'none', fontSize: 12}}>Swithc to instituional verfrification</Link>
            </Box>
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
