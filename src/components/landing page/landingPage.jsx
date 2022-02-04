import React from "react";
import { MainText, SmallText } from "../tailwind/tailwindVariables";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="landing-page-main">
        <MainText>VBAC Prediction Calculator</MainText>
        <SmallText>
          This calculator is designed for predicting the chance of success when
          women aim for a vaginal birth after caesarean. It is based on a study
          published{" "}
          <a
            href="https://obgyn.onlinelibrary.wiley.com/doi/10.1111/ajo.13473"
            style={{ color: "#0097a7", textDecoration: "underline" }}
          >
            here
          </a>
        </SmallText>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
