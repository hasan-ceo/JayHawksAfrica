import React from "react";
// import { Link } from "react-router-dom";
import Signin from "./Signin";

export default function Landing() {
  return (
    <div className="max-w-full px-2 sm:px-8 lg:px-[120px] grid grid-cols-1 md:grid-cols-2">
      <div className="text-white grid">
        <p className="uppercase tracking-loose">All in one place</p>
        <h1 className="font-bold text-2xl lg:text-4xl my-4 text-umojayellow">
          MyUmoja
        </h1>
        <p className="leading-normal mb-4 text-md break-words">
          Smart online Human Resources, Accounting, Microfinance, Monitoring,
          Auditing and Customer Relationship Management Software.
        </p>
        <Signin />
        <div className="grid place-content-center mt-2">
          {/* <Link
            to="/forgot-password"
            className="px-4 py-2 text-white rounded-lg hover:text-umojayellow tracking-wider cursor-pointer font-semibold text-sm"
          >
            Forgot Password?
          </Link> */}
        </div>
      </div>
    </div>
  );
}
