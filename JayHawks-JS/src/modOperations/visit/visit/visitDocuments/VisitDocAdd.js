import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import { useForm } from "react-hook-form";
import Input from "../../../../components/Input";
import InputFileOther from "../../../../components/InputFileOther";
import TopHeader from "../../../../components/TopHeader";

const schema = yup
  .object({
    allVisitId: yup.string().max(50),
    title: yup.string().required("Required.").max(50),
  })
  .shape({
    filepath: yup
      .mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      }),
  });

const VisitDocAdd = ({ allVisitId, action }) => {
  const defaultValues = {
    allVisitId: allVisitId,
    title: "",
  };
  const [fileUrl, setPhoto] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { title, filepath } = errors;
  const onSubmit = async (formData) => {
    if (fileUrl === "") {
      toast.error("Upload not complete! Please wait.");
      return;
    }
    setSubmitting(true);
    var data = new FormData();
    data.append("allVisitId", formData.allVisitId);
    data.append("title", formData.title);
    data.append("fileUrl", fileUrl);
    try {
      const { status } = await mutateAsync({
        path: "/allVisit/DocCreate",
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        setPhoto("");
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
    <>
      <TopHeader
        title="Visit Documents Add"
        btn="Return"
        path="/ops/visit/list"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-200 my-3 p-2 rounded-lg"
      >
        <input type="hidden" {...register("allVisitId")} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          <Input
            name="title"
            label="Document Type"
            type="text"
            register={register}
            isAutoFocus={true}
            errorMessage={title?.message}
            showPlaceHolder={true}
          />

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
          <div className="w-24 grid content-center place-self-end">
            <button
              type="submit"
              className="btn-umojayellow w-full"
              disabled={submitting}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default VisitDocAdd;
