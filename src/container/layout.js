import Complete from "../components/calculation form/complete";
import { Grid } from "../components/tailwind/tailwindVariables";
import { GridOffset } from "../components/tailwind/tailwindVariables";
import { GridContent } from "../components/tailwind/tailwindVariables";
import Antenatal from "../components/calculation form/antenatal";
import { useState } from "react";

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
        <button
          onClick={toggleCalculator}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Change to {antenatalDisplay ? "Complete VBAC" : "Antenatal"}
        </button>
        {antenatalDisplay ? <Antenatal /> : <Complete />}
      </GridContent>
      <GridOffset />
    </Grid>
  );
};

export default Layout;
