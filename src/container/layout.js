import Complete from "../components/calculation form/complete";
import { Grid } from "../components/tailwind/tailwindVariables";
import { GridOffset } from "../components/tailwind/tailwindVariables";
import { GridContent } from "../components/tailwind/tailwindVariables";

const Layout = () => {
  return (
    <Grid>
      <GridOffset />
      <GridContent>
        <Complete />
      </GridContent>
      <GridOffset />
    </Grid>
  );
};

export default Layout;
