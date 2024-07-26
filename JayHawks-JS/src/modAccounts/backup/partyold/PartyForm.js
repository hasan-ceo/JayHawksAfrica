import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  partyId: yup.string().max(50),
  partyName: yup.string().required("Required").max(50),
  email: yup.string().email("ইমেল প্রদান করুন").required("Required").max(50),
  contactNumber: yup
    .string()
    .required("Required")
    .matches(phoneRegExp, "Required")
    .max(50),
  address: yup.string().required("Required").max(50),
});

const PartyForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { partyName, email, address, contactNumber } = errors;

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
          label="নাম"
          register={register}
          errorMessage={partyName?.message}
          isAutoFocus={true}
        />
        <Input
          name="email"
          label="ইমেইল"
          register={register}
          errorMessage={email?.message}
        />
        <Input
          name="contactNumber"
          label="মোবাইল নাম্বার"
          register={register}
          errorMessage={contactNumber?.message}
        />
        <Input
          name="address"
          label="ঠিকানা"
          register={register}
          errorMessage={address?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default PartyForm;
