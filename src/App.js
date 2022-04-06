import React, { useEffect, useState } from "react";
import "./App.css";
import Complete from "./components/calculation form/complete";
import LandingPage from "./components/landing page/landingPage";
import Antenatal from "./components/calculation form/antenatal";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/UI/footer";
import ReactGA from "react-ga";
import { withRouter } from "./withrouter";

function App() {
  // let a = true;
  const [path, setPath] = useState("App");

  useEffect(() => {
    // ReactGA.initialize("UA-154571472-2");
    ReactGA.initialize("UA-219875149-1");
    ReactGA.pageview(window.location.pathname + window.location.search);

    console.log(window.location.pathname);
  }, [path]);

  return (
    <React.Fragment>
      <Routes>
        {/* <Route path="/" element={a && <LandingPage />} /> */}
        <Route path="/" element={<LandingPage setPath={setPath} />} />
        <Route path="/complete" element={<Complete setPath={setPath} />} />
        <Route path="/antenatal" element={<Antenatal setPath={setPath} />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(App);
