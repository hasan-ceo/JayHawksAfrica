import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import TopHeader from "../../components/TopHeader";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromDb } from "../../components/SelectList";

const schema = yup.object({
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  particulars: yup.string().min(10).max(4000).required("Required"),
  accountHeadDr: yup.string().required("Required"),
  accountHeadCr: yup.string().required("Required"),
});

const JournalVoucherForm = () => {
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
  const { accountHeadDr, accountHeadCr, amount, particulars } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: "/accounts/journalVoucher",
        formData: formData,
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
      <TopHeader
        title="Journal Voucher"
        btn="Return"
        path="/accounts/dashboard"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col">
          <SelectFromDb
            register={register}
            label="Account Head Dr"
            path="/accountHeadDr/select"
            name="accountHeadDr"
            errorMessage={accountHeadDr?.message}
          />
          <SelectFromDb
            register={register}
            label="Account Head Cr"
            path="/accountHeadCr/select"
            name="accountHeadCr"
            errorMessage={accountHeadCr?.message}
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

export default JournalVoucherForm;
