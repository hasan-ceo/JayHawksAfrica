import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { SelectFromCheckBox } from "../../components/SelectList";
import InputFileOther from "../../components/InputFileOther";

const schema = yup.object({
  observationsId: yup.string(),
  auditId: yup.string().required("Required").max(50),
  auditArea: yup.string().required("Required").max(50),
  details: yup.string().required("Required").max(255),
  rootCause: yup.string().required("Required").max(50),
  riskRating: yup.string().required("Required").max(50),
  riskImplication: yup.string().required("Required").max(50),
  recommendations: yup.string().required("Required").max(255),
  attachment: yup.string().required("Required").max(255),
});

const ObservationsForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [fileUrl, setFile] = useState(defaultValues?.attachment);
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
    auditArea,
    details,
    rootCause,
    riskRating,
    riskImplication,
    recommendations,
    attachment,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("observationsId", formData.observationsId);
    data.append("auditId", formData.auditId);
    data.append("auditArea", formData.auditArea);
    data.append("details", formData.details);
    data.append("rootCause", formData.rootCause);
    data.append("riskRating", formData.riskRating);
    data.append("riskImplication", formData.riskImplication);
    data.append("recommendations", formData.recommendations);
    data.append("attachment", fileUrl);
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
      <input type="hidden" {...register("observationsId")} />
      <input type="hidden" {...register("auditId")} />
      <div className="form-col">
        <Input
          register={register}
          name="auditArea"
          label="Audit Area"
          type="text"
          errorMessage={auditArea?.message}
        />
        <TextArea
          control={control}
          name="details"
          label="Details"
          type="text"
          errorMessage={details?.message}
        />
        <Input
          register={register}
          name="rootCause"
          label="Root Cause"
          type="text"
          errorMessage={rootCause?.message}
        />
        <SelectFromCheckBox
          register={register}
          options={["Low", "Medium", "High"]}
          label="Risk Rating"
          name="riskRating"
          errorMessage={riskRating?.message}
        />
        <Input
          register={register}
          name="riskImplication"
          label="Risk Implication"
          type="text"
          errorMessage={riskImplication?.message}
        />
        <TextArea
          control={control}
          name="recommendations"
          label="Auditor Recommendations"
          type="text"
          errorMessage={recommendations?.message}
        />
        {fileUrl && (
          <a href={fileUrl} target="blank">
            {fileUrl}
          </a>
        )}
        <InputFileOther
          register={register}
          action={setFile}
          label="Upload file"
          name="fileUrl"
          errorMessage={attachment?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default ObservationsForm;
