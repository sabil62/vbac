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

const LandingPage = ({ setPath }) => {
  const [leftValue, setLeftValue] = useState("0px");
  const [topValue, setTopValue] = useState("30px");

  useEffect(() => {
    const handleLeftValue = () => {
      if (window.innerWidth < 640) {
        setLeftValue("100px");
        setTopValue("0px");
      } else {
        setLeftValue("0px");
        setTopValue("30px");
      }
    };

    window.addEventListener("resize", handleLeftValue);
    return () => {
      window.removeEventListener("resize", handleLeftValue);
    };
  }, [leftValue]);

  useEffect(() => {
    setPath("app");
    // console.log(props);
  });

  let toolTipStyle = {
    top: topValue,
    left: leftValue,
    opacity: 0.9,
    verticalAlign: "top",
    "--tooltip-color": "rgb(50,60,70)",
    "--tooltip-down-color": "transparent",
  };
  let text = {
    cursor: "pointer",
    fontSize: "0.8rem",
    margin: "0 0 1rem 1rem",
  };
  const goToResearchPaper = () => {
    window.open("https://obgyn.onlinelibrary.wiley.com/doi/10.1111/ajo.13473");
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
              onClick={goToResearchPaper}
              style={{
                color: "#0097a7",
                textDecoration: "underline",
                cursor: "pointer",
              }}
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
              <div className="large-text mb-5" style={text}>
                <span className="hover:text-blue-800 text-gray-800">
                  <span className="text-[1.2rem] pr-1"> &#x1F6C8;</span> What is
                  this?
                </span>
                <div className="tooltiptitle" style={toolTipStyle}>
                  The complete calculator is designed for use
                  <span className="text-[0.8rem] font-extrabold tracking-[0.3px]">
                    {" "}
                    in labour and includes more variables
                  </span>
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
              <div className="large-text mb-5" style={text}>
                <span className="hover:text-blue-800 text-gray-800">
                  <span className="text-[1.2rem] pr-1"> &#x1F6C8;</span> What is
                  this?
                </span>
                <div className="tooltiptitle" style={toolTipStyle}>
                  The antenatal calculator is designed for use
                  <span className="font-extrabold text-[0.8rem] tracking-[0.3px]">
                    {" "}
                    during the pregnancy prior to labour
                  </span>
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
