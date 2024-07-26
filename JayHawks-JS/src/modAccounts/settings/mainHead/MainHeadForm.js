import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import Input from "../../../components/Input";
import { SelectFromOptions } from "../../../components/SelectList";

const schema = yup.object({
  mainHeadId: yup.string(),
  accountType: yup.string().required("Required.").max(50),
  mainHeadName: yup.string().required("Required.").max(50),
});

const MainHeadForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { mainHeadName, accountType } = errors;

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
      <input type="hidden" {...register("mainHeadId")} />
      <div className="form-col">
        <SelectFromOptions
          register={register}
          options={["Asset", "Liabilities", "Income", "Expenditure"]}
          label="Type"
          name="accountType"
          errorMessage={accountType?.message}
        />
        <Input
          name="mainHeadName"
          label="Main Head Name"
          type="text"
          register={register}
          errorMessage={mainHeadName?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default MainHeadForm;
