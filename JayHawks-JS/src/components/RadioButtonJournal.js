import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const RadioButtonJournal = ({
  register,
  options,
  label,
  name,
  checked,
  onChange,
  id,
  errorMessage,
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      {options.map((value) => (
        <label htmlFor={id + value} key={value}>
          {" "}
          <input
            {...register(name)}
            type="radio"
            value={value}
            id={id + value}
            checked={checked}
            onChange={onChange}
          />{" "}
          {value}
        </label>
      ))}

      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default RadioButtonJournal;
