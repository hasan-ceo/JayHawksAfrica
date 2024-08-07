import React from "react";

const Footer = () => {
  return (
    <div className="bg-white flex justify-center items-center text-center text-sm">
      <p className="text-uppercase font-weight-bold text-black">
        {/* Copyright © {new Date().getFullYear()}{" "} */}
        <a href="https://grapestl.com/" className="font-bold">
          Developed by Grapes Technology Limited
        </a>
      </p>
    </div>
  );
};

export default Footer;
