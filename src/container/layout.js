import Complete from "../components/calculation form/complete";
import { Grid } from "../components/tailwind/tailwindVariables";
import { GridOffset } from "../components/tailwind/tailwindVariables";
import { GridContent } from "../components/tailwind/tailwindVariables";
import Antenatal from "../components/calculation form/antenatal";
import { useState } from "react";
import Toggle from "../components/UI/toggle";

const Layout = () => {
  // const [antenatalDisplay, setAntenatalDisplay] = useState(false);

  // const toggleCalculator = () => {
  //   setAntenatalDisplay(!antenatalDisplay);
  // };
  return (
    <Grid>
      <GridOffset />
      <GridContent>
        {/* <Toggle toggle={antenatalDisplay} onToggle={toggleCalculator} /> */}
        {/* {antenatalDisplay ? <Antenatal /> : <Complete />} */}
        <Complete />
        <div className="my-4">
          This calculator is base on the study published here
        </div>
        <h1>HELLO</h1>
      </GridContent>
      <GridOffset />
    </Grid>
  );
};

export default Layout;
