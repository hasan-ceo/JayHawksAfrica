import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import TopHeader from "../../components/TopHeader";
import toast from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton";
import TextArea from "../../components/TextArea";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import { SelectFromDb } from "../../components/SelectList";

const schema = yup.object({
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  particulars: yup.string().required("Required.").max(4000),
  cashOrBank: yup.string().required("Required."),
  party: yup.string().required("Required."),
});

const ReceiveFromPartyForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { cashOrBank, party, amount, particulars } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: "/accounts/receiveFromParty",
        formData: formData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
        navigate(returnPath);
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
      <TopHeader title="Receive From Party" btn="Return" path="" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col">
          <SelectFromDb
            register={register}
            label="Party"
            path="/party/select"
            name="accountHead"
            errorMessage={party?.message}
          />
          <SelectFromDb
            register={register}
            label="Cash/Bank"
            path="/cashOrBankList/select"
            name="cashOrBank"
            errorMessage={cashOrBank?.message}
          />
          <Input
            name="amount"
            label="Amount"
            type="text"
            register={register}
            errorMessage={amount?.message}
          />
          <TextArea
            name="particulars"
            label="Particulars"
            type="text"
            register={register}
            errorMessage={particulars?.message}
          />
          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default ReceiveFromPartyForm;
