import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";

const schema = yup.object({
  companyId: yup.string().max(50),
  companyName: yup.string().required("Required.").max(50),
  companyAddress: yup.string().required("Required.").max(50),
  mailServer: yup.string().required("Required.").max(50),
  mailPort: yup.string().required("Required.").max(50),
  mailAlias: yup.string().required("Required.").max(50),
  mailUserName: yup.string().required("Required.").max(50),
  mailPassword: yup.string().required("Required.").max(50),
  googleDriveKey: yup.string().required("Required.").max(50),
});

const CompanyForm = ({ defaultValues, action, btnText, path }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    companyName,
    companyAddress,
    mailServer,
    mailPort,
    mailAlias,
    mailUserName,
    mailPassword,
    nssfEmployee,
    nssfEmployer,
    googleDriveKey,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("companyId")} />
      <div className="form-col">
        <Input
          name="companyName"
          label="Company Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={companyName?.message}
        />
        <Input
          name="companyAddress"
          label="Company Address"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={companyAddress?.message}
        />
        <Input
          name="mailServer"
          label="Mail Server"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={mailServer?.message}
        />
        <Input
          name="mailPort"
          label="Mail Port"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={mailPort?.message}
        />
        <Input
          name="mailAlias"
          label="Mail Alias"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={mailAlias?.message}
        />
        <Input
          name="mailUserName"
          label="Mail User Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={mailUserName?.message}
        />
        <Input
          name="mailPassword"
          label="Mail Password"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={mailPassword?.message}
        />
        <Input
          name="nssfEmployee"
          label="NSSF Employee %"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={nssfEmployee?.message}
        />
        <Input
          name="nssfEmployer"
          label="NSSF Employer %"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={nssfEmployer?.message}
        />
        <Input
          name="googleDriveKey"
          label="Google Drive Key"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={googleDriveKey?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default CompanyForm;
