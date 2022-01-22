import Complete from "../components/calculation form/complete";
import { Grid } from "../components/tailwind/tailwindVariables";
import { GridOffset } from "../components/tailwind/tailwindVariables";
import { GridContent } from "../components/tailwind/tailwindVariables";
import Antenatal from "../components/calculation form/antenatal";
import { useState } from "react";
import Toggle from "../components/UI/toggle";

const Layout = () => {
  const [antenatalDisplay, setAntenatalDisplay] = useState(false);
  //   let antenatalDisplay = false;

  const toggleCalculator = () => {
    setAntenatalDisplay(!antenatalDisplay);
  };
  return (
    <Grid>
      <GridOffset />
      <GridContent>
        <Toggle toggle={antenatalDisplay} onToggle={toggleCalculator} />
        {antenatalDisplay ? <Antenatal /> : <Complete />}
      </GridContent>
      <GridOffset />
    </Grid>
  );
};

export default Layout;
