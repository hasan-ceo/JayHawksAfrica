import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import { SelectFromDb } from "../../components/SelectList";
import RadioButtons from "../../components/RadioButtons";
import { useGlobalContext } from "../../hooks/context";

const schema = yup.object({
  ledgerId: yup.string().max(250),
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

const JournalVoucherForm = ({ selectPath, btnText }) => {
  const [selectedOption, setSelectedOption] = useState(null);

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
      ledgerId: "",
      particulars: "",
      dr: 0,
      cr: 0,
    },
    resolver: yupResolver(schema),
  });
  const { ledgerId, dr, cr, particulars } = errors;

  const cartHandler = (formData) => {
    const currentProduct = {
      trId: Math.random() * 100,
      ledgerId: formData.ledgerId,
      particulars: formData.particulars,
      dr: formData.dr,
      cr: formData.cr,
    };

    value.addToCart(currentProduct);

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

        <div className="form-col-4 py-2">
          {selectedOption === "Debit" && (
            <SelectFromDb
              control={control}
              name="ledgerId"
              label="Select Ledger"
              path="/acLedger/selectByJournal"
              errorMessage={ledgerId?.message}
            />
          )}
          {selectedOption === "Credit" && (
            <SelectFromDb
              control={control}
              name="ledgerId"
              label="Select Ledger"
              path="/acLedger/selectByJournal"
              errorMessage={ledgerId?.message}
            />
          )}
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
          <div className="my-auto md:pt-5">
            <button
              className="w-28 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>

        {/* <SaveButton btnText={btnText} disabled={submitting} /> */}
      </form>{" "}
    </div>
  );
};

export default JournalVoucherForm;
