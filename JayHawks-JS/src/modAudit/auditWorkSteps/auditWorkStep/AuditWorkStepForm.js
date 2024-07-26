import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputFileOther from "../../../components/InputFileOther";
import Label from "../../../components/Label";
import SaveButton from "../../../components/button/SaveButton";
import { usePostData } from "../../../hooks/dataApi";
import DatePicker from "../../../components/DatePicker";
import Input from "../../../components/Input";
import { SelectFromOptions } from "../../../components/SelectList";
import useDebounce from "../../../hooks/useDebounce";
import moment from "moment";

const schema = yup
  .object({
    auditWorkListId: yup.number(),
    auditYearId: yup.string().required("Required."),
    auditId: yup.string().required("Required."),
    auditTestStepsId: yup.string().required("Required."),
    testingDate: yup.date().required("Required."),
    sampledMonth: yup.date().required("Required."),
    auditPeriod: yup.string().required("Required."),
    selectionMethod: yup.string().required("Required."),
    controlFrequency: yup.string().required("Required."),
    sampleSize: yup.number().required("Required."),
    populationSize: yup.number().required("Required."),
    testResults: yup.string().required("Required.").max(50),
    overallTestConclusion: yup.string().when("testResults", {
      is: (value) => value === "Fail",
      then: yup.string().required("Required.").max(50),
      otherwise: yup.string().max(50),
    }),
    finding: yup.string().when("testResults", {
      is: (value) => value === "Fail",
      then: yup.string().required("Required.").max(50),
      otherwise: yup.string().max(50),
    }),
    cause: yup.string().when("testResults", {
      is: (value) => value === "Fail",
      then: yup.string().required("Required.").max(50),
      otherwise: yup.string().max(50),
    }),
    implication: yup.string().when("testResults", {
      is: (value) => value === "Fail",
      then: yup.string().required("Required.").max(50),
      otherwise: yup.string().max(50),
    }),
    recommendation: yup.string().when("testResults", {
      is: (value) => value === "Fail",
      then: yup.string().required("Required.").max(50),
      otherwise: yup.string().max(50),
    }),
    branchResponse: yup.string().when("testResults", {
      is: (value) => value === "Fail",
      then: yup.string().required("Required.").max(50),
      otherwise: yup.string().max(50),
    }),
    implementationDate: yup.date().when("testResults", {
      is: (value) => value === "Fail",
      then: yup.date().required("Required"),
      otherwise: yup.date(),
    }),
    managementAction: yup.string().when("testResults", {
      is: (value) => value === "Fail",
      then: yup.string().required("Required.").max(50),
      otherwise: yup.string().max(50),
    }),
    testEvidences: yup.string().when("testResults", {
      is: (value) => value === "Fail",
      then: yup.string().required("Required.").max(50),
      otherwise: yup.string().max(50),
    }),
  })
  .shape({
    filepath: yup.mixed().when("testResults", {
      is: "Fail",
      then: yup
        .mixed()
        .test("required", "You need to provide a file", (value) => {
          return value && value.length;
        }),
      otherwise: yup.mixed(),
    }),
  });

const AuditWorkStepForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [fileUrl, setPhoto] = useState("");

  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const actualQuery = watch("testResults", "");
  const finalQuery = useDebounce(actualQuery, 1000);

  const {
    testingDate,
    sampledMonth,
    auditPeriod,
    selectionMethod,
    controlFrequency,
    sampleSize,
    populationSize,
    testResults,
    overallTestConclusion,
    finding,
    cause,
    implication,
    recommendation,
    branchResponse,
    implementationDate,
    managementAction,
    testEvidences,
    filepath,
  } = errors;

  const onSubmit = async (formData) => {
    if (fileUrl === "" && formData.testResults === "Fail") {
      toast.error("Upload not complete! Please wait.");
      return;
    }
    setSubmitting(true);
    var data = new FormData();
    data.append("auditWorkListId", formData.auditWorkListId);
    data.append("auditYearId", formData.auditYearId);
    data.append("auditYear", formData.auditYear);
    data.append("auditId", formData.auditId);
    data.append("auditTestStepsId", formData.auditTestStepsId);
    data.append("testStepsName", formData.testStepsName);
    data.append(
      "testingDate",
      moment.utc(formData.testingDate).local().format("YYYY-MM-DD")
    );
    data.append(
      "sampledMonth",
      moment.utc(formData.sampledMonth).local().format("YYYY-MM-DD")
    );
    data.append("auditPeriod", formData.auditPeriod);
    data.append("selectionMethod", formData.selectionMethod);
    data.append("controlFrequency", formData.controlFrequency);
    data.append("sampleSize", formData.sampleSize);
    data.append("populationSize", formData.populationSize);
    data.append("testResults", formData.testResults);
    data.append("overallTestConclusion", formData.overallTestConclusion);
    data.append("finding", formData.finding);
    data.append("cause", formData.cause);
    data.append("implication", formData.implication);
    data.append("recommendation", formData.recommendation);
    data.append("branchResponse", formData.branchResponse);
    data.append(
      "implementationDate",
      moment.utc(formData.implementationDate).local().format("YYYY-MM-DD")
    );
    data.append("managementAction", formData.managementAction);
    data.append("exceptions", fileUrl);
    data.append("testEvidences", formData.testEvidences);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        navigate(returnPath);
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
      <input type="hidden" {...register("auditWorkListId")} />
      <div className="form-col">
        <Label label="Audit Year" value={defaultValues.auditYear} />
        <Label label="Test Steps " value={defaultValues.testStepsName} />
        <Controller
          control={control}
          name="testingDate"
          render={({ field }) => (
            <DatePicker
              label="Testing Date"
              field={field}
              errorMessage={testingDate?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="sampledMonth"
          render={({ field }) => (
            <DatePicker
              label="Sampled Month"
              field={field}
              errorMessage={sampledMonth?.message}
              isRow={false}
            />
          )}
        />
        <Input
          name="auditPeriod"
          label="Audit Period"
          type="text"
          register={register}
          errorMessage={auditPeriod?.message}
        />
        <Input
          name="selectionMethod"
          label="Selection Method"
          type="text"
          register={register}
          errorMessage={selectionMethod?.message}
        />
        <Input
          name="controlFrequency"
          label="Control Frequency"
          type="text"
          register={register}
          errorMessage={controlFrequency?.message}
        />
        <Input
          name="sampleSize"
          label="Sample Size"
          type="text"
          register={register}
          errorMessage={sampleSize?.message}
        />
        <Input
          name="populationSize"
          label="Population Size"
          type="text"
          register={register}
          errorMessage={populationSize?.message}
        />

        <SelectFromOptions
          register={register}
          options={["Pass", "Fail"]}
          label="Test results Finding and observations"
          name="testResults"
          errorMessage={testResults?.message}
        />
        {finalQuery === "Fail" && (
          <>
            <Input
              name="overallTestConclusion"
              label="Overall Test Conclusion"
              type="text"
              register={register}
              errorMessage={overallTestConclusion?.message}
            />
            {defaultValues.auditAreaId !== 6 && (
              <>
                <Input
                  name="finding"
                  label="Finding"
                  type="text"
                  register={register}
                  errorMessage={finding?.message}
                />
                <Input
                  name="cause"
                  label="Cause"
                  type="text"
                  register={register}
                  errorMessage={cause?.message}
                />
                <Input
                  name="implication"
                  label="Implication"
                  type="text"
                  register={register}
                  errorMessage={implication?.message}
                />
                <Input
                  name="recommendation"
                  label="Recommendation"
                  type="text"
                  register={register}
                  errorMessage={recommendation?.message}
                />
                <Input
                  name="branchResponse"
                  label="Branch Response"
                  type="text"
                  register={register}
                  errorMessage={branchResponse?.message}
                />

                <Controller
                  control={control}
                  name="implementationDate"
                  render={({ field }) => (
                    <DatePicker
                      label="Implementation Date"
                      field={field}
                      errorMessage={implementationDate?.message}
                      isRow={false}
                    />
                  )}
                />
                <Input
                  name="managementAction"
                  label="Management Action"
                  type="text"
                  register={register}
                  errorMessage={managementAction?.message}
                />
              </>
            )}
            <Input
              name="testEvidences"
              label="Test Evidences"
              type="text"
              register={register}
              errorMessage={testEvidences?.message}
            />
            <div>
              <label>Exceptions </label>
              <InputFileOther
                name="filepath"
                label="Upload file"
                accept="*/*"
                register={register}
                action={setPhoto}
                errorMessage={filepath?.message}
              />
              <div className="text-xs">
                <label>{fileUrl}</label>
              </div>
            </div>
          </>
        )}

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditWorkStepForm;
