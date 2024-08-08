import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
// import FooterArea from "./FooterArea";

const Layout = () => {
  return (
    <div className="bg-white bg-no-repeat bg-fixed w-screen h-screen grid grid-cols-1 grid-rows-threeRows  xl:max-w-screen-3xl  mx-auto">
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
