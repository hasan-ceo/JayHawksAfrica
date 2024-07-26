// import React, { useState } from "react";
// import ErrorMessage from "./Error/ErrorMessage";

// const InputNumber = ({
//   name,
//   label,
//   type = "text",
//   register,
//   errorMessage = "",
//   isAutoFocus = false,
//   isReadOnly = false,
//   showPlaceHolder = false,
// }) => {
//   const [inputNumber, setInputNumber] = useState("");

//   const handleChange = (event) => {
//     const { value } = event.target;
//     const formattedNumber = Number(value.replace(/,/g, "")).toLocaleString();
//     value && setInputNumber(formattedNumber);
//   };

//   return (
//     <div className="form-row w-full">
//       {showPlaceHolder === false && <label>{label}</label>}
//       <input
//         type={type}
//         className={
//           "form-control " +
//           (errorMessage ? "input-border-danger " : "input-border-primary ") +
//           (isReadOnly === true ? "bg-gray-100" : "bg-white")
//         }
//         {...register(name)}
//         autoFocus={isAutoFocus}
//         readOnly={isReadOnly}
//         placeholder={showPlaceHolder === true ? label : ""}
//         value={inputNumber}
//         onChange={handleChange}
//       />
//       <ErrorMessage message={errorMessage} />
//     </div>
//   );
// };

// export default InputNumber;

import React, { useState, useEffect } from "react";
import ErrorMessage from "./Error/ErrorMessage";

const InputNumber = ({
  name,
  label,
  type = "text",
  register,
  errorMessage = "",
  isAutoFocus = false,
  isReadOnly = false,
  showPlaceHolder = false,
  defaultValue = "",
}) => {
  const [inputNumber, setInputNumber] = useState(defaultValue);

  useEffect(() => {
    // Set the default value in the state when it changes
    setInputNumber(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    const { value } = event.target;
    // Remove non-numeric characters and format the number
    const formattedNumber = value
      .replace(/[^\d]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setInputNumber(formattedNumber);
  };

  return (
    <div className="form-row w-full">
      {showPlaceHolder === false && <label>{label}</label>}
      <input
        type={type}
        className={
          "form-control " +
          (errorMessage ? "input-border-danger " : "input-border-primary ") +
          (isReadOnly === true ? "bg-gray-100" : "bg-white")
        }
        {...register(name)}
        autoFocus={isAutoFocus}
        readOnly={isReadOnly}
        placeholder={showPlaceHolder === true ? label : ""}
        value={inputNumber}
        onChange={handleChange}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default InputNumber;
