import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";

const schema = yup.object({
  ledgerId: yup.string(),
  ledgerCode: yup.string().required("Required.").max(50),
  ledgerName: yup.string().required("Required.").max(50),
  subHeadId: yup.string().required("Required.").max(50),
  descriptions: yup.string().required("Required.").max(250),
  locationId: yup.string().required("Required.").max(50),
  projectId: yup.string().required("Required.").max(50),
  isActive: yup.string().required("Required.").max(50),
});

const LedgerForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const {
    ledgerCode,
    ledgerName,
    subHeadId,
    descriptions,
    locationId,
    projectId,
    isActive,
  } = errors;

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
      <input type="hidden" {...register("ledgerId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Sub Head"
          path="/subHead/select"
          name="subHeadId"
          errorMessage={subHeadId?.message}
        />
        <Input
          name="ledgerCode"
          label="Ledger Code"
          type="text"
          register={register}
          errorMessage={ledgerCode?.message}
        />
        <Input
          name="ledgerName"
          label="Ledger Name"
          type="text"
          register={register}
          errorMessage={ledgerName?.message}
        />
        <TextArea
          control={control}
          name="descriptions"
          label="Descriptions"
          errorMessage={descriptions?.message}
        />
        <SelectFromDb
          control={control}
          label="Location"
          path="/location/select"
          name="locationId"
          errorMessage={locationId?.message}
        />
        <SelectFromDb
          control={control}
          label="Project"
          path="/project/select"
          name="projectId"
          errorMessage={projectId?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Yes", "No"]}
          label="Active"
          name="isActive"
          errorMessage={isActive?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default LedgerForm;
