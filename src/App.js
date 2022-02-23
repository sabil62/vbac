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

  useEffect(() => {
    ReactGA.initialize("UA-154571472-2");
    ReactGA.pageview(window.location.pathname + window.location.search);

    console.log(window.location.pathname);
  }, []);

  return (
    <React.Fragment>
      <Routes>
        {/* <Route path="/" element={a && <LandingPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/antenatal" element={<Antenatal />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(App);
