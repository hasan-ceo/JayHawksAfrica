import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromOptions } from "../../components/SelectList";
import TextArea from "../../components/TextArea";

const schema = yup.object({
  checklistId: yup.string().max(50),
  auditId: yup.string().required("Required.").max(50),
  questionId: yup.string().required("Required.").max(50),
  testResults: yup.string().required("Required.").max(50),
  testConclusion: yup.string().required("Required.").max(50),
});

const ChecklistForm = ({ defaultValues, action, btnText, path }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    control,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { testResults, testConclusion } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("checklistId", formData.checklistId);
    data.append("auditId", formData.auditId);
    data.append("questionId", formData.questionId);
    data.append("testResults", formData.testResults);
    data.append("testConclusion", formData.testConclusion);

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
      setSubmitting(false);
      action();
    }
  };
  setTimeout(onSubmit, 3000);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("auditId")} />
      <div className="form-col my-3">
        <p>
          <span className="font-semibold"> Audit Test Steps:</span>{" "}
          {defaultValues.auditTestSteps}
        </p>
        <TextArea
          control={control}
          areaHeight="h-16"
          label="Test results (Insert audit findings / observations)"
          name="testResults"
          errorMessage={testResults?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Pass", "Fail"]}
          label="Test Conclusion (Select Pass / Fail)"
          name="testConclusion"
          errorMessage={testConclusion?.message}
        />
        {/* <button
          type="submit"
          className="btn-umojayellow hidden"
          disabled={submitting}
        >
          {btnText}
        </button> */}
        {/* <SaveButton btnText="Update & Next" disabled={submitting} /> */}
      </div>
    </form>
  );
};

export default ChecklistForm;
