import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import SaveButton from "../../../components/button/SaveButton";
import Input from "../../../components/Input";

const schema = yup.object({
  partyName: yup.string().max(50).required("Required."),
  email: yup.string().email("Provide a valid email").required("Required"),
  contactNumber: yup.string().max(50).required("Required"),
  contactAddress: yup.string().max(50).required("Required."),
});

const PartyForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
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
  const { partyName, email, contactNumber, contactAddress } = errors;

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
        <Input
          name="partyName"
          label="Party Name"
          type="text"
          register={register}
          errorMessage={partyName?.message}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          register={register}
          errorMessage={email?.message}
        />
        <Input
          name="contactNumber"
          label="Contact Number"
          type="text"
          register={register}
          errorMessage={contactNumber?.message}
        />
        <Input
          name="contactAddress"
          label="Address"
          type="text"
          register={register}
          errorMessage={contactAddress?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default PartyForm;
