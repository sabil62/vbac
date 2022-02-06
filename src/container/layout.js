import React from "react";
import { Grid } from "../components/tailwind/tailwindVariables";
import { GridOffset } from "../components/tailwind/tailwindVariables";
import { GridContent } from "../components/tailwind/tailwindVariables";
// import Antenatal from "../components/calculation form/antenatal";
// import { useState } from "react";
// import Toggle from "../components/UI/toggle";
// import Complete from "../components/calculation form/complete";
// import LandingPage from "../components/landing page/landingPage";

const Layout = (props) => {
  // const [antenatalDisplay, setAntenatalDisplay] = useState(false);

  // const toggleCalculator = () => {
  //   setAntenatalDisplay(!antenatalDisplay);

  let smallGrid12 = props.grid12;
  if (props.grid12 && props.grid8) {
    smallGrid12 = false;
  }
  // };

  return (
    <Grid grid12={props.grid12}>
      <GridOffset />
      <GridContent grid8={props.grid8} grid12={smallGrid12}>
        {/* <Toggle toggle={antenatalDisplay} onToggle={toggleCalculator} /> */}
        {/* {antenatalDisplay ? <Antenatal /> : <Complete />} */}
        {props.children}
      </GridContent>
      <GridOffset />
    </Grid>
  );
};

export default Layout;
