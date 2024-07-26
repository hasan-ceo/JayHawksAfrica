import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromDb, SelectFromOptions } from "../../components/SelectList";
import TextArea from "../../components/TextArea";

const schema = yup.object({
  ticketId: yup.string().max(50),
  categoryId: yup.string().required("Required"),
  ticketType: yup.string().required("Required.").max(50),
  title: yup.string().required("Required.").max(50),
  description: yup.string().required("Required.").max(4000),
  priority: yup.string().required("Required.").max(50),
  // status: yup.string().required("Required.").max(50),
  // createDate: yup.date().required("Required.").max(50),
  // createdBy: yup.string().required("Required.").max(50),
  // closedDate: yup.string().required("Required.").max(50),
  // closeBy: yup.string().required("Required.").max(50),
});

const TicketForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { categoryId, ticketType, priority, title, description } = errors;

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
      <input type="hidden" {...register("ticketId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Ticket Catogory"
          path="/adTicketCategory/select"
          name="categoryId"
          errorMessage={categoryId?.message}
        />

        <SelectFromOptions
          register={register}
          options={["New", "Recurring"]}
          label="Ticket Type"
          name="ticketType"
          errorMessage={ticketType?.message}
        />
        <Input
          name="title"
          label="Ticket Title"
          type="text"
          register={register}
          errorMessage={title?.message}
        />
        <TextArea
          control={control}
          name="description"
          label="Ticket Description"
          type="text"
          register={register}
          errorMessage={description?.message}
        />
        <SelectFromOptions
          register={register}
          options={["High", "Medium", "Low"]}
          label="Priority"
          name="priority"
          errorMessage={priority?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default TicketForm;
