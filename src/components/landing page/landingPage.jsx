import React from "react";
import {
  GridInside,
  MainText,
  SmallText,
  GridMain,
  PinkBox,
  WhiteText,
} from "../tailwind/tailwindVariables";
import Layout from "../../container/layout";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Layout grid12>
        <div className="landing-page-main">
          <MainText>VBAC Prediction Calculator</MainText>
          <SmallText>
            This calculator is designed for predicting the chance of success
            when women aim for a vaginal birth after caesarean. It is based on a
            study published{" "}
            <a
              href="https://obgyn.onlinelibrary.wiley.com/doi/10.1111/ajo.13473"
              style={{ color: "#0097a7", textDecoration: "underline" }}
            >
              here
            </a>
          </SmallText>
          <GridMain>
            <GridInside>
              <Link to="/complete">
                <PinkBox>
                  <WhiteText bold>Complete</WhiteText>
                  <WhiteText>Calculator</WhiteText>
                </PinkBox>
              </Link>
            </GridInside>
            <GridInside>
              <Link to="/antenatal">
                <PinkBox low>
                  <WhiteText bold>Antenatal</WhiteText>
                  <WhiteText>Calculator</WhiteText>
                </PinkBox>
              </Link>
            </GridInside>
          </GridMain>
          {/* #fc34c0 */}
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default LandingPage;
