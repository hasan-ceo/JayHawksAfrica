import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../components/Input";
import { SelectFromDb } from "../../../components/SelectList";
import { useGlobalContext } from "../../../hooks/context";
import InputNumber from "../../../components/InputNumber";
import RadioButtons from "../../../components/RadioButtons";

const schema = yup.object({
  trType: yup.string().required("Required"),
  ledgerId: yup.number().required("Required"),
  amount: yup
    .number()
    .min(0.1, "Must be greater than or equal to 0")
    .typeError("Positive number required")
    .transform((o, v) => parseInt(v.replace(/,/g, ""))),
  particulars: yup.string().max(250).required("Required"),
});

const JournalVoucherForm = () => {
  const [inputNumber, setInputNumber] = useState("");

  const value = useGlobalContext();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trId: "",
      trType: "",
      ledgerId: "",
      particulars: "",
      amount: "",
    },
    resolver: yupResolver(schema),
  });
  const { trType, ledgerId, amount, particulars } = errors;

  const checkDuplicateAccount = (id) => {
    const data = value.cartItems.filter((item) => {
      if (item.ledgerId === id) return item;
      else return false;
    });
    return data.length > 0 ? true : false;
  };

  const onSubmit = (formData) => {
    if (checkDuplicateAccount(formData.ledgerId) === true) return;

    const currentProduct = {
      trId: Math.random() * 100,
      ledgerId: formData.ledgerId,
      particulars: formData.particulars,
      dr: formData.trType === "Debit" ? formData.amount : 0,
      cr: formData.trType === "Credit" ? formData.amount : 0,
    };

    value.addToCart(currentProduct);

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col-4 py-2">
          <RadioButtons
            register={register}
            options={["Debit", "Credit"]}
            label="Select Voucher Type"
            name="trType"
            errorMessage={trType?.message}
          />
        </div>

        <div className="form-col-4 py-2">
          <SelectFromDb
            control={control}
            name="ledgerId"
            label="Select Ledger"
            path="/acLedger/selectByJournal"
            errorMessage={ledgerId?.message}
          />
          <Input
            name="particulars"
            label="Particulars"
            type="text"
            register={register}
            errorMessage={particulars?.message}
          />
          <InputNumber
            name="amount"
            label="Amount"
            type="text"
            register={register}
            errorMessage={amount?.message}
            inputNumber={inputNumber}
            setInputNumber={setInputNumber}
          />
          <div className="my-auto md:pt-5">
            <button
              className="w-28 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JournalVoucherForm;
