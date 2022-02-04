import React from "react";
import "./App.css";
import Complete from "./components/calculation form/complete";
import LandingPage from "./components/landing page/landingPage";
import Antenatal from "./components/calculation form/antenatal";
import { Route, Routes } from "react-router-dom";

function App() {
  let a = true;
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={a && <LandingPage />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/antenatal" element={<Antenatal />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
