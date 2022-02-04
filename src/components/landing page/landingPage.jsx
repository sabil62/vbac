import React, { useEffect, useState } from "react";
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
  const [leftValue, setLeftValue] = useState("0px");

  useEffect(() => {
    const handleLeftValue = () => {
      if (window.innerWidth < 640) {
        setLeftValue("100px");
      } else {
        setLeftValue("0px");
      }
    };

    window.addEventListener("resize", handleLeftValue);
    return () => {
      window.removeEventListener("resize", handleLeftValue);
    };
  }, [leftValue]);

  let toolTipStyle = {
    top: "-30px",
    left: leftValue,
    opacity: 0.9,
    verticalAlign: "top",
    // transform: "scale(0.8)",
  };
  let text = {
    cursor: "pointer",
    fontSize: "0.8rem",
    margin: "0 0 1rem 1rem",
  };
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
              <div className="large-text" style={text}>
                <span className="hover:text-blue-800">
                  <span className="text-2xl pr-1"> &#x1F6C8;</span> What is
                  this?
                </span>
                <div className="tooltiptitle" style={toolTipStyle}>
                  The complete calculator is designed for use in labour and
                  includes more variables
                </div>
              </div>
            </GridInside>
            <GridInside>
              <Link to="/antenatal">
                <PinkBox low>
                  <WhiteText bold>Antenatal</WhiteText>
                  <WhiteText>Calculator</WhiteText>
                </PinkBox>
              </Link>
              <div className="large-text" style={text}>
                <span className="hover:text-blue-800">
                  <span className="text-2xl pr-1"> &#x1F6C8;</span>
                  What is this?
                </span>
                <div className="tooltiptitle" style={toolTipStyle}>
                  The antenatal calculator is designed for use during the
                  pregnancy prior to labour
                </div>
              </div>
            </GridInside>
          </GridMain>
          {/* #fc34c0 */}
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default LandingPage;
