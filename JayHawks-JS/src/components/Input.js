import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const Input = ({
  name,
  label,
  type = "text",
  register,
  errorMessage = "",
  isAutoFocus = false,
  isReadOnly = false,
  showPlaceHolder = false,
}) => {
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
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Input;
