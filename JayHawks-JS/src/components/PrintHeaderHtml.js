import React from "react";
import { AiFillPrinter } from "react-icons/ai";
import ReactToPrint from "react-to-print";

const PrintHeaderHtml = ({ title, componentRef }) => {
  return (
    <div className="flex justify-between py-2">
      <div className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
        {title}
      </div>
      <div className="flex space-x-5 transition hover:-translate-y-1">
        <ReactToPrint
          trigger={() => (
            <button className="rounded-md px-4 py-2 text-black">
              <AiFillPrinter size={30} />{" "}
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
};

export default PrintHeaderHtml;
