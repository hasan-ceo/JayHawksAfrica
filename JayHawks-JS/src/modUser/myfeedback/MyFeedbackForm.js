import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromDb, SelectFromOptions } from "../../components/SelectList";
import { selectOptions } from "../../data/selectOptions";
import TextArea from "../../components/TextArea";

const schema = yup.object({
  feedbackType: yup.string().required("Required.").max(50),
  departmentId: yup.string().required("Required.").max(50),
  particulars: yup.string().required("Required.").max(4000),
});

const MyFeedbackForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
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
  const { feedbackType, departmentId, particulars } = errors;

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
        <SelectFromOptions
          register={register}
          options={selectOptions.feedbackType}
          label="Feedback Type"
          name="feedbackType"
          errorMessage={feedbackType?.message}
        />
        <SelectFromDb
          control={control}
          label="My feedback is for the following Department"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />
        <TextArea
          name="particulars"
          label="Particulars"
          control={control}
          errorMessage={particulars?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default MyFeedbackForm;
