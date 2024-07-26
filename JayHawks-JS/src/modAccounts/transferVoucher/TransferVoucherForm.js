import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromDb, SelectFromOptions } from "../../components/SelectList";

const schema = yup.object({
  transferVoucherId: yup.string(),
  transactionType: yup.string().required("Required."),
  bank: yup.string().required("Required."),
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  particulars: yup.string().required("Required.").max(4000),
});

const TransferVoucherForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
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
  const { transactionType, bank, amount, particulars } = errors;

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col">
          <SelectFromDb
            control={control}
            label="Transaction Type"
            // path="/accountHeadCr/select"
            path={["Yes", "No"]}
            name="transactionType"
            errorMessage={transactionType?.message}
          />
          <SelectFromOptions
            register={register}
            options={["Bank"]}
            label="Bank"
            name="bank"
            errorMessage={bank?.message}
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

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default TransferVoucherForm;
