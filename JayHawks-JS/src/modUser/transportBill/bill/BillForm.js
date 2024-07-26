import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../hooks/dataApi";
import { SelectFromDb } from "../../../components/SelectList";
import TextArea from "../../../components/TextArea";
import SaveButton from "../../../components/button/SaveButton";
import DatePicker from "../../../components/DatePicker";
import Input from "../../../components/Input";
import InputFileOther from "../../../components/InputFileOther";

const schema = yup
  .object({
    travelId: yup.string().max(50),
    travelingDate: yup.date().required("Required"),
    managerId: yup.string().required("Required").max(50),
    title: yup.string().max(50).required("Required"),
    remarks: yup.string().required("Required").max(2500),
  })
  .shape({
    filepath: yup
      .mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      }),
  });

const BillForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const [fileUrl, setPhoto] = useState("");
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
  const { travelingDate, remarks, managerId, filepath, title } = errors;

  const onSubmit = async (formData) => {
    console.log(formData);
    setSubmitting(true);
    var tmpData = new FormData();
    tmpData.append("travelId", formData.travelId);
    tmpData.append(
      "travelingDate",
      moment.utc(formData.travelingDate).local().format("YYYY-MM-DD")
    );
    tmpData.append("remarks", formData.remarks);
    tmpData.append("title", formData.title);
    tmpData.append("managerId", formData.managerId);
    tmpData.append("fileUrl", fileUrl);
    try {
      const { data, status } = await mutateAsync({
        path: path,
        formData: tmpData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        navigate(`/transportBill/preview/${data}`);
        // navigate(returnPath);
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
      <input type="hidden" {...register("travelId")} />

      <div className="form-col">
        <Controller
          control={control}
          name="travelingDate"
          render={({ field }) => (
            <DatePicker
              label="Traveling Date"
              field={field}
              errorMessage={travelingDate?.message}
              isRow={false}
            />
          )}
        />

        <SelectFromDb
          control={control}
          label="Request for approval"
          path="/employees/selectOpsManager"
          name="managerId"
          errorMessage={managerId?.message}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Input
            name="title"
            label="Document Title"
            type="text"
            register={register}
            isAutoFocus={true}
            errorMessage={title?.message}
            showPlaceHolder={true}
          />

          <InputFileOther
            name="filepath"
            label="Upload file"
            accept="/"
            register={register}
            action={setPhoto}
            errorMessage={filepath?.message}
          />
          <div className="text-xs">
            <label>{fileUrl}</label>
          </div>
        </div>
        <TextArea
          name="remarks"
          label="Remarks"
          type="text"
          register={register}
          control={control}
          errorMessage={remarks?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BillForm;
