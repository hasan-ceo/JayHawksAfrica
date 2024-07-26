import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import SaveButton from "../../../../components/button/SaveButton";
import Input from "../../../../components/Input";
import moment from "moment";
import DatePicker from "../../../../components/DatePicker";
import TextArea from "../../../../components/TextArea";

const schema = yup.object({
  investigationDetailsId: yup.string().max(50),
  investigationId: yup.string(),
  testArea: yup.string(),
  testSteps: yup.string(),
  sampleSelectionMethod: yup.string(),
  controlFrequency: yup.number(),
  populationSize: yup.number(),
  sampleSize: yup.number(),
  testConclusion: yup.string(),
  auditFinding: yup.string(),
  cause: yup.string(),
  implication: yup.string(),
  recommendation: yup.string(),
  controlOwnerResponse: yup.string(),
  implementationDate: yup.date(),
  managementAction: yup.string(),
  exceptions: yup.string(),
  evidences: yup.string(),
});

const DepartmentalInvestigationDetailsForm = ({
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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { evidences,testConclusion,auditFinding,cause,implication,recommendation,controlOwnerResponse,managementAction,exceptions} = errors;

  const onSubmit = async (formData) => {
    console.log(formData);
    setSubmitting(true);
    var data = new FormData();
    data.append("investigationDetailsId", formData.investigationDetailsId);
    data.append("testArea", formData.testSteps);
    data.append("testSteps", formData.testSteps);
    data.append("sampleSelectionMethod", formData.sampleSelectionMethod);
    data.append("controlFrequency", formData.controlFrequency);
    data.append("populationSize", formData.populationSize);
    data.append("sampleSize", formData.sampleSize);
    data.append("testConclusion", formData.testConclusion);
    data.append("auditFinding", formData.auditFinding);
    data.append("cause", formData.cause);
    data.append("implication", formData.implication);
    data.append("recommendation", formData.recommendation);
    data.append("controlOwnerResponse", formData.controlOwnerResponse);
    data.append(
      "implementationDate",
      moment.utc(formData.implementationDate).local().format("YYYY-MM-DD")
    );
    data.append("managementAction", formData.managementAction);
    data.append("exceptions", formData.exceptions);
    data.append("evidences", formData.evidences);

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
        <p>{defaultValues.testArea}</p>
        <p>{defaultValues.testSteps}</p>
        <Input
          name="sampleSelectionMethod"
          label="Sample Selection Method"
          type="text"
          register={register}
        />
        <Input
          name="controlFrequency"
          label="ControlFrequency"
          type="text"
          register={register}
        />
        <Input
          name="populationSize"
          label="Population Size"
          type="text"
          register={register}
        />
        <Input
          name="sampleSize"
          label="Sample Size"
          type="text"
          register={register}
        />
        <TextArea
          control={control}
          areaHeight="h-36"
          name="testConclusion"
          label="Test Conclusion"
          register={register}
          errorMessage={testConclusion?.message}
        />
         <TextArea
          control={control}
          areaHeight="h-36"
          name="auditFinding"
          label="Audit Finding"
          register={register}
          errorMessage={auditFinding?.message}
        />
        <TextArea
          control={control}
          areaHeight="h-36"
          name="cause"
          label="Cause"
          register={register}
          errorMessage={cause?.message}
        />
        <TextArea
          control={control}
          areaHeight="h-36"
          name="implication"
          label="Implication"
          register={register}
          errorMessage={implication?.message}
        />
        <TextArea
          control={control}
          areaHeight="h-36"
          name="recommendation"
          label="Recommendation"
          register={register}
          errorMessage={recommendation?.message}
         />
          <TextArea
          control={control}
          areaHeight="h-36"
          name="controlOwnerResponse"
          label="Control Owner Response"
          register={register}
          errorMessage={controlOwnerResponse?.message}
         />
         <Controller
          control={control}
          name="implementationDate"
          render={({ field }) => (
            <DatePicker label="Implementation Date" field={field} />
          )}
        />
          <TextArea
          control={control}
          areaHeight="h-36"
          name="managementAction"
          label="Management Action"
          register={register}
          errorMessage={managementAction?.message}
          />
          <TextArea
          control={control}
          areaHeight="h-36"
          name="exceptions"
          label="Exceptions"
          register={register}
          errorMessage={exceptions?.message}
          />
          <TextArea
          control={control}
          areaHeight="h-36"
          name="evidences"
          label="Evidences"
          register={register}
          errorMessage={evidences?.message}
          />
      </div>

      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default DepartmentalInvestigationDetailsForm;
