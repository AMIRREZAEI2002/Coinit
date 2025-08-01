import BuySellCrypto from '@/Components/BuySellCrypto'
import { CryptoProvider } from '@/Components/CryptoContext'
import SpotBuySellPriceCoin from '@/Components/SpotBuySellPriceCoin'
import SpotCryptoChart from '@/Components/SpotCryptoChart'
import SpotPriceCrypto from '@/Components/SpotPriceCrypto'
import SpotTable from '@/Components/SpotTable'
import SpotWallet from '@/Components/SpotWallet'
import {Button, Grid } from '@mui/material'
import React from 'react'

export default function page() {
  return (
    <>
    <CryptoProvider>
      <Grid container spacing={1} p={1}>
        <Grid size={{xs:12,md:8,lg:9}}>
            <Grid container spacing={1}>
                <Grid size={{xs: 12,md:12,lg:9}}>
                    <Grid container spacing={0.8}>
                        <Grid size={{xs:12}} sx={{position: 'relative', mt:1}}>
                            <SpotPriceCrypto/>
                            <Button sx={{position: 'absolute', top: 0, right: 0}}></Button>
                        </Grid>
                        <Grid size={{xs:12}}>
                            <SpotCryptoChart/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={{xs:12,md:12,lg:3}} sx={{p:1}}>
                    <BuySellCrypto/>
                </Grid>
                <Grid size={{xs:12}}>
                    <SpotTable/>
                </Grid>
            </Grid>
        </Grid>
        <Grid size={{xs:12,md:4,lg:3}}>
            <Grid container spacing={1}>
                <Grid size={{xs:12}}>
                    <SpotBuySellPriceCoin/>
                </Grid>
                <Grid size={{xs:12}} sx={{mb:{xs:10,md:0}}}>
                    <SpotWallet/>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
      </CryptoProvider>
    </>
  )
}