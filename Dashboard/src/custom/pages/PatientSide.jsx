import React from "react";
import Header from "../components/vSlider Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer/Footer";

function PatientSide() {
  return (
    <>
    <div className="light">
      <Header />
      <Outlet />
      <Footer />
      </div>
    </>
  );
}

export default PatientSide;
