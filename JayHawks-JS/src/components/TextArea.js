import React from "react";
import ErrorMessage from "./Error/ErrorMessage";
import { Controller } from "react-hook-form";

const TextArea = ({
  control,
  name,
  label,
  areaHeight = "h-36",
  errorMessage = "",
  isAutoFocus = false,
  isReadOnly = false,
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            className={
              errorMessage
                ? areaHeight + " form-control input-border-danger"
                : areaHeight + " form-control input-border-primary"
            }
            {...field}
            autoFocus={isAutoFocus}
            readOnly={isReadOnly}
          />
        )}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default TextArea;
