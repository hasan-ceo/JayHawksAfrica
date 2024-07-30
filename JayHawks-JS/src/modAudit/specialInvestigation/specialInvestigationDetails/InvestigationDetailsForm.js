import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import Input from "../../../components/Input";

const schema = yup.object({
  investigationDetailsId: yup.string().max(50),
  evidences: yup.string(),
  reportInputs: yup.string(),
});

const InvestigationDetailsForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { evidences, reportInputs } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("investigationDetailsId", formData.investigationDetailsId);
    data.append("reportInputs", formData.reportInputs);
    data.append("evidences", formData.evidences);
    data.append("testSteps", formData.testSteps);

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
      <input type="hidden" {...register("investigationDetailsId")} />

      <div className="form-col">
        <p>{defaultValues.guideline}</p>
        <p>{defaultValues.testSteps}</p>
        <Input
          name="evidences"
          label="Evidences"
          type="text"
          register={register}
          errorMessage={evidences?.message}
        />
        <Input
          name="reportInputs"
          label="Report Inputs"
          type="text"
          register={register}
          errorMessage={reportInputs?.message}
        />
      </div>

      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default InvestigationDetailsForm;
