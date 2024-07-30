import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import SaveButton from "../../components/button/SaveButton";
import { DataListFromDb, SelectFromDb } from "../../components/SelectList";

const schema = yup.object({
  transType: yup.string().required("Required"),
  partyId: yup.string().required("Required"),
  headName: yup.string().required("Required"),
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  particulars: yup.string().max(250).required("Required"),
});

const PaymentPartyForm = ({ defaultValues, action, btnText, path }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
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
  const { partyId, headName, amount, particulars } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("transType", formData.transType);
    data.append("partyId", formData.partyId);
    data.append("headName", formData.headName);
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
      if (status === 204) {
        toast.success("Update successful!");
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
    <div className="card w-full max-w-screen-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col">
          <SelectFromDb
            control={control}
            path="/parties/select"
            label="Party Name"
            name="partyId"
            errorMessage={partyId?.message}
          />
          <DataListFromDb
            register={register}
            path="/subHead/select"
            label="Account Head"
            name="headName"
            errorMessage={headName?.message}
          />
          <Input
            name="amount"
            label="Amount"
            type="text"
            register={register}
            errorMessage={amount?.message}
          />
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

export default PaymentPartyForm;
