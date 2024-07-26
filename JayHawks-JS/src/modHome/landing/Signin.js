import React from "react";
import { useState } from "react";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonPassword from "../../components/ButtonPassword";
import { useGlobalContext } from "../../hooks/context";
//import jwt_decode from "jwt-decode";

const schema = yup.object().shape({
  phoneNumber: yup.string().max(20).required("Required"),
  password: yup
    .string()
    .max(20)
    .required("Required")
    .min(8, "Password is too short, at least 8 characters"),
});

const Signin = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const value = useGlobalContext();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "25",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { phoneNumber, password } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/Login",
        formData: formData,
      });

      if (status === 200 && data.isSuccess === true) {
        reset();
        //var decoded = jwt_decode(data.accessToken);
        value.setUser(data.accessToken);
        value.setRole(data.role);
        value.setModules(data.modules);
        value.setMenus(data.menus);
        value.setSubmenus(data.subMenus);
        
        // navigate(from);
        navigate(data.role === "Grapes Admin" ? "/grapes" : "/dashboard");
      } else {
        toast.error(data.message);
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
    }
  };

  return (
    <div className="mt-0 text-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Phone number with country code"
            {...register("phoneNumber")}
            autoFocus={true}
          />
          {phoneNumber && (
            <div className="text-danger">{phoneNumber.message}</div>
          )}
        </div>
        <div className="mb-2">
          <ButtonPassword control={control} />
          {password && <div className="text-danger">{password.message}</div>}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button
            className="w-full btn-umojayellow"
            type="submit"
            disabled={submitting}
          >
            Log in &#10148;
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
