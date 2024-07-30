import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { usePostData } from "../../hooks/dataApi";
// import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromDrCr } from "../../components/SelectList";
// import InputNumber from "../../components/InputNumber";
import RadioButtons from "../../components/RadioButtons";
import { useGlobalContext } from "../../hooks/context";

const schema = yup.object({
  bankOrCash: yup.string().max(250),
  ledgerName: yup.string().max(250),
  dr: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  cr: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),

  particulars: yup.string().max(250).required("Required"),
});

const JournalVoucherForm = ({
  defaultValues,
  selectPath,
  action,
  btnText,
  path,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const value = useGlobalContext();

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trId: "",
      ledgerBook: "",
      particulars: "",
      dr: 0,
      cr: 0,
    },
    resolver: yupResolver(schema),
  });
  const { ledgerName, bankOrCash, dr, cr, particulars } = errors;

  const cartHandler = (formData) => {
    setSubmitting(true);

    const currentProduct = {
      trId: Math.random() * 100,
      ledgerBook: formData.bankOrCash
        ? formData.bankOrCash
        : formData.ledgerName,
      particulars: formData.particulars,
      dr: formData.dr,
      cr: formData.cr,
    };
    value.addToCart(currentProduct);
    setSubmitting(false);
    setSelectedOption(null);
    reset();
  };


  return (
    <div>
      <form onSubmit={handleSubmit(cartHandler)}>
        <div className="form-col-4 py-2">
          <RadioButtons
            register={register}
            options={["Debit"]}
            label="Select Voucher Type"
            name="type"
            onChange={() => handleOptionChange("Debit")}
          />
          <RadioButtons
            register={register}
            options={["Credit"]}
            label="Select Voucher Type"
            name="type"
            onChange={() => handleOptionChange("Credit")}
          />
        </div>
        {selectedOption === "Debit" && (
          <SelectFromDrCr
            control={control}
            label="Select Account Head Debit"
            path={selectPath}
            name="bankOrCash"
            errorMessage={bankOrCash?.message}
          />
        )}
        {selectedOption === "Credit" && (
          <SelectFromDrCr
            control={control}
            label="Select Account Head Credit"
            path="/acLedger/selectByJournal"
            name="ledgerName"
            errorMessage={ledgerName?.message}
          />
        )}
        <div className="form-col-2 py-2">
          <Input
            name="particulars"
            label="Particulars"
            type="text"
            register={register}
            errorMessage={particulars?.message}
          />
          {selectedOption === "Debit" && (
            <Input
              name="dr"
              label="Amount Dr"
              type="number"
              register={register}
              errorMessage={dr?.message}
            />
          )}
          {selectedOption === "Credit" && (
            <Input
              name="cr"
              label="Amount Cr"
              type="number"
              register={register}
              errorMessage={cr?.message}
            />
          )}
        </div>
        <SaveButton btnText={btnText} disabled={submitting} />
      </form>{" "}
    </div>
  );
};

export default JournalVoucherForm;
