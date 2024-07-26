import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "../../components/DatePicker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromDb } from "../../components/SelectList";
import moment from "moment";

const schema = yup.object({
  auditId: yup.string().max(50),
  auditName: yup.string().required("Required.").max(50),
  branchId: yup.string().required("Required.").max(50),
  bmId: yup.string().required("Required.").max(50),
  amId: yup.string().required("Required.").max(50),
  rmId: yup.string().required("Required.").max(50),
  loId: yup.string().required("Required.").max(50),
  auditStartDate: yup.date().required("Required."),
  auditEndDate: yup.date().required("Required."),
  periodUnderAudit: yup.string().required("Required.").max(50),
  lastAuditPeriod: yup.date().required("Required."),
  auditNotification: yup.string().required("Required.").max(50),
  auditObjectives: yup.string().required("Required.").max(50),
  auditorsUndertaking: yup.string().required("Required.").max(50),
});

const CreationForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    auditName,
    branchId,
    bmId,
    amId,
    rmId,
    loId,
    auditStartDate,
    auditEndDate,
    periodUnderAudit,
    lastAuditPeriod,
    auditNotification,
    auditObjectives,
    auditorsUndertaking,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var datas = new FormData();
    datas.append("auditId", formData.auditId);
    datas.append("auditName", formData.auditName);
    datas.append("branchId", formData.branchId);
    datas.append("bmId", formData.bmId);
    datas.append("amId", formData.amId);
    datas.append("rmId", formData.rmId);
    datas.append("loId", formData.loId);
    datas.append(
      "auditStartDate",
      moment.utc(formData.auditStartDate).local().format("YYYY-MM-DD")
    );
    datas.append(
      "auditEndDate",
      moment.utc(formData.auditEndDate).local().format("YYYY-MM-DD")
    );
    datas.append("periodUnderAudit", formData.periodUnderAudit);
    datas.append(
      "lastAuditPeriod",
      moment.utc(formData.lastAuditPeriod).local().format("YYYY-MM-DD")
    );
    datas.append("auditNotification", formData.auditNotification);
    datas.append("auditObjectives", formData.auditObjectives);
    datas.append("auditorsUndertaking", formData.auditorsUndertaking);

    try {
      const { status, data } = await mutateAsync({
        path: path,
        formData: datas,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        navigate(`/audit/checklist/${data}`);
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
      <input type="hidden" {...register("auditId")} />
      <div className="form-col">
        <Input
          name="auditName"
          label="Audit Name"
          type="text"
          register={register}
          errorMessage={auditName?.message}
        />
        <SelectFromDb
          control={control}
          label="Branch Name"
          path="/branches/select"
          name="branchId"
          errorMessage={branchId?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Loan Officer"
          path="/auditCreation/selectLoanOfficer"
          name="loId"
          errorMessage={loId?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Branch Manager"
          path="/auditCreation/selectBranchManager"
          name="bmId"
          errorMessage={bmId?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Area Manager"
          path="/auditCreation/selectAreaManager"
          name="amId"
          errorMessage={amId?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Regional Manager"
          path="/auditCreation/selectRegionalManager"
          name="rmId"
          errorMessage={rmId?.message}
        />
        <Controller
          control={control}
          name="auditStartDate"
          render={({ field }) => (
            <DatePicker
              label="Audit Start Date"
              field={field}
              errorMessage={auditStartDate?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="auditEndDate"
          render={({ field }) => (
            <DatePicker
              label="Audit End Date"
              field={field}
              errorMessage={auditEndDate?.message}
              isRow={false}
            />
          )}
        />
        <Input
          name="periodUnderAudit"
          label="Period Under Audit"
          type="text"
          register={register}
          errorMessage={periodUnderAudit?.message}
        />
        <Controller
          control={control}
          name="lastAuditPeriod"
          render={({ field }) => (
            <DatePicker
              label="Last Audit Period"
              field={field}
              errorMessage={lastAuditPeriod?.message}
              isRow={false}
            />
          )}
        />
        <Input
          name="auditNotification"
          label="Branch audit notification, with dates for entry and exit meetings"
          type="text"
          register={register}
          errorMessage={auditNotification?.message}
        />
        <Input
          name="auditObjectives"
          label="Audit objectives"
          type="text"
          register={register}
          errorMessage={auditObjectives?.message}
        />
        <Input
          name="auditorsUndertaking"
          label="Auditor's Undertaking"
          type="text"
          register={register}
          errorMessage={auditorsUndertaking?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default CreationForm;
