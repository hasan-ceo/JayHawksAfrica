import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import TextArea from "../../components/TextArea";
import DatePicker from "../../components/DatePicker";
import { useNavigate } from "react-router";
import moment from "moment";

const schema = yup.object({
  reverseVoucherAddId: yup.string(),
  transactionDate: yup.string().required("Required.").max(250),
  vno: yup.string().required("Required.").max(250),
  subHeadName: yup.string().required("Required.").max(20),
  transactionType: yup.string().required("Required."),
  dr: yup.string().required("Required."),
  cr: yup.string().required("Required."),
  particulars: yup.string().required("Required.").max(4000),
  voucherType: yup.string().required("Required."),
});

const ReverseVoucherForm = ({
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
  const {
    transactionDate,
    vno,
    subHeadName,
    transactionType,
    dr,
    cr,
    particulars,
    voucherType,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();

    data.append(
      "transactionDate",
      moment.utc(formData.workDate).local().format("YYYY-MM-DD")
    );
    data.append("vno", formData.entryBy);
    data.append("subHeadName", formData.particulars);
    data.append("transactionType", formData.amount);
    data.append("dr", formData.approvedBy);
    data.append("cr", formData.particulars);
    data.append("particulars", formData.amount);
    data.append("voucherType", formData.approvedBy);

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
        <Controller
          control={control}
          name="transactionDate"
          render={({ field }) => (
            <DatePicker
              label="Transaction Date"
              field={field}
              isRow={false}
              errorMessage={transactionDate?.message}
            />
          )}
        />
        <Input
          name="vno"
          label="VNO"
          type="text"
          register={register}
          sAutoFocus={true}
          errorMessage={vno?.message}
        />

        <TextArea
          control={control}
          name="particulars"
          label="Particulars"
          errorMessage={particulars?.message}
        />
        <SaveButton btnText="Save" disabled={submitting} />
      </div>
    </form>
  );
};

export default ReverseVoucherForm;
