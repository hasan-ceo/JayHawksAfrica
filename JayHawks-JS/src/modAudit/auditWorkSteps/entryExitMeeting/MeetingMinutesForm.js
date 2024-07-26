import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputFileOther from "../../../components/InputFileOther";
import Label from "../../../components/Label";
import SaveButton from "../../../components/button/SaveButton";
import { usePostData } from "../../../hooks/dataApi";

const schema = yup
  .object({
    meetingMinutesId: yup.string().max(50),
  })
  .shape({
    filepath: yup
      .mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      }),
  });

const MeetingMinutesForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [fileUrl, setPhoto] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    // control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { filepath } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("meetingMinutesId", formData.meetingMinutesId);
    data.append("fileUrl", fileUrl);

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
      <input type="hidden" {...register("meetingMinutesId")} />
      <div className="form-col">
        <Label label="Audit Year" value={defaultValues.auditYear} />
        <Label label="Particulars " value={defaultValues.particulars} />

        <div>
          <label>Minutes (Attached File) </label>
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

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default MeetingMinutesForm;
