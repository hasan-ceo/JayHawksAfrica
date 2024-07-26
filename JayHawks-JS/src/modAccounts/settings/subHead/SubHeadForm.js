import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import Input from "../../../components/Input";
import { SelectFromDb } from "../../../components/SelectList";

const schema = yup.object({
  subHeadId: yup.string(),
  mainHeadId: yup.string().required("Required.").max(50),
  subHeadName: yup.string().required("Required.").max(50),
});

const SubHeadForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
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
  const { subHeadName, mainHeadId } = errors;

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
      <input type="hidden" {...register("subHeadId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Main Head"
          path="/mainhead/select"
          name="mainHeadId"
          errorMessage={mainHeadId?.message}
        />
        <Input
          name="subHeadName"
          label="Sub Head Name"
          type="text"
          register={register}
          errorMessage={subHeadName?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default SubHeadForm;
