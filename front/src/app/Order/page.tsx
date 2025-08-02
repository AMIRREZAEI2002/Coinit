import React from 'react';
import { Grid } from '@mui/material';
import { PairProvider } from '@/Components/PairContext';
import Chart from '@/Components/Chart';
import OrderForm from '@/Components/OrderForm';

export const dynamic = 'force-dynamic';


export default async function Page() {
  return (
    <PairProvider>
        <Grid container spacing={3} p={2}>
            <Grid size={{xs:12, md:8}}>
            <Chart/>
            </Grid>
            <Grid size={{xs:12, md:4}}>
            <OrderForm/>
            </Grid>
        </Grid>
    </PairProvider>
    );
};