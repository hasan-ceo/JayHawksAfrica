import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import InputFileOther from "../../components/InputFileOther";
import DatePicker from "../../components/DatePicker";
import moment from "moment";

const schema = yup
  .object({
    noticeId: yup.string().max(50),
    title: yup.string().required("Required.").max(250),
    expiryDate: yup.date().required("Required"),
  })
  .shape({
    filepath: yup
      .mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      }),
  });

const NoticeForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [fileUrl, setFile] = useState("");
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
  const { title, filepath, expiryDate } = errors;

  const onSubmit = async (formData) => {
    if (fileUrl === "") {
      toast.error("Upload not complete! Please wait.");
      return;
    }
    setSubmitting(true);
    var data = new FormData();
    data.append("title", formData.title);
    data.append(
      "expiryDate",
      moment.utc(formData.expiryDate).local().format("YYYY-MM-DD")
    );
    data.append("fileUrl", fileUrl);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        setFile("");
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
      <input type="hidden" {...register("noticeId")} />
      <div className="form-col">
        <Input
          name="title"
          label="Notice title"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={title?.message}
        />
        <Controller
          control={control}
          name="expiryDate"
          render={({ field }) => (
            <DatePicker
              label="Expiry Date"
              field={field}
              errorMessage={expiryDate?.message}
              isRow={false}
            />
          )}
        />
        <InputFileOther
          name="filepath"
          label="Upload file"
          accept="*/*"
          register={register}
          action={setFile}
          errorMessage={filepath?.message}
        />
        <div className="text-xs">
          <label>{fileUrl}</label>
        </div>
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default NoticeForm;
