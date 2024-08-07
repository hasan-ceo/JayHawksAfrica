import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const RadioButtons = ({ register, options, label, name, errorMessage }) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      {options.map((value) => (
        <label htmlFor={value} key={value} className="cursor-pointer">
          <input {...register(name)} type="radio" value={value} id={value} />{" "}
          {value}
        </label>
      ))}

      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default RadioButtons;
