import CryptoMarketLanding from "@/Components/CryptoMarketLanding";
import GainerLoserLanding from "@/Components/GainerLoserLanding";
import UserNavLanding from "@/Components/UserNavLanding";
import { Grid } from "@mui/material";

export default function Home() {
  return (
    <>
    <Grid container>
      <Grid size={{xs:12, md:12}}><UserNavLanding/></Grid>
      <Grid size={{xs:12, md:12}}><CryptoMarketLanding/></Grid>
      <Grid size={{xs:12, md:12}}><GainerLoserLanding/></Grid>
    </Grid>
    </>
  );
}
