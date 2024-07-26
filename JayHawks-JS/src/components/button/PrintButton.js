import React from "react";
import { AiOutlinePrinter } from "react-icons/ai";

const PrintButton = ({ path }) => {
  return (
    <a
      href={process.env.REACT_APP_REPORT_URL + path}
      className="transition hover:-translate-y-1"
    >
      <AiOutlinePrinter size={40} />
    </a>
  );
};

export default PrintButton;
