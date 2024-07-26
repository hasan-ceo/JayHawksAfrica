import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";

const schema = yup.object({
  name: yup.string().min(4).max(20).required("Required."),
  accountNumber: yup.min(8).max(30).string().required("Requied."),
  currency: yup.string().required("Requied."),
  address: yup.string().min(10).max(200).required("Requied."),
});

const BankForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { name, accountNumber, currency, address } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: path,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-col">
        <Input
          name="name"
          label="Bank Name"
          type="text"
          register={register}
          errorMessage={name?.message}
        />
        <Input
          name="accountNumber"
          label="Account Number"
          type="text"
          register={register}
          errorMessage={accountNumber?.message}
        />
        <Input
          name="currency"
          label="Currency (ex. USD / TSH (Local Currency)"
          type="text"
          register={register}
          errorMessage={currency?.message}
        />
        <TextArea
          name="address"
          label="Address"
          type="text"
          register={register}
          errorMessage={address?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BankForm;
