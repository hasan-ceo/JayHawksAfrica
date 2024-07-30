import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import InputNumber from "../../components/InputNumber";
import { SelectFromDb } from "../../components/SelectList";
import TextArea from "../../components/TextArea";
import SaveButton from "../../components/button/SaveButton";
import { usePostData } from "../../hooks/dataApi";

const schema = yup.object({
  ledgerId: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required")
    .transform((o, v) => parseInt(v.replace(/,/g, ""))),
  particulars: yup.string().max(250).required("Required"),
});

const OpenningForm = ({ defaultValues, selectPath, action, btnText, path }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const [selectedType, setSelectedType] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { ledgerId, amount, particulars } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("ledgerId", formData.ledgerId);
    data.append("amount", formData.amount);
    data.append("particulars", formData.particulars);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      action();
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col">
          <SelectFromDb
            control={control}
            label="Select Account Head"
            path="/acLedger/selectByPayment"
            name="ledgerId"
            errorMessage={ledgerId?.message}
          />
          {/* <RadioButtons
            register={register}
            options={["Debit", "Credit"]}
            label="Select Voucher Type"
            name="type"
            onChange={(e) => setSelectedType(e.target.value)}
          /> */}
          <div className="flex">
            <input
              type="radio"
              id="debit"
              name="fav_language"
              value="Debit"
              onChange={(e) => setSelectedType(e.target.value)}
            />
            <label htmlFor="html">Debit</label>
          </div>
          <input
            type="radio"
            id="credit"
            name="fav_language"
            value="Credit"
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <label htmlFor="css">Credit</label>

          {selectedType === "Debit" && (
            <InputNumber
              name="amount"
              label="Amount Dr"
              type="text"
              register={register}
              errorMessage={amount?.message}
            />
          )}

          {selectedType === "Credit" && (
            <InputNumber
              name="amount"
              label="Amount Cr"
              type="text"
              register={register}
              errorMessage={amount?.message}
            />
          )}
          <TextArea
            control={control}
            name="particulars"
            label="Particulars"
            type="text"
            errorMessage={particulars?.message}
          />

          <SaveButton btnText={btnText} disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default OpenningForm;
