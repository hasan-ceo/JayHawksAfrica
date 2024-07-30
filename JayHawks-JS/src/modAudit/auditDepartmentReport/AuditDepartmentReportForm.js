import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../hooks/dataApi";
import SaveButton from "../../components/button/SaveButton";
import Input from "../../components/Input";
import moment from "moment";
import DatePicker from "../../components/DatePicker";
// import TextArea from "../../components/TextArea";
import { selectOptions } from "../../data/selectOptions";
import { SelectFromDb, SelectFromOptions } from "../../components/SelectList";
import InputFileOther from "../../components/InputFileOther";

const schema = yup.object({
  reportId: yup.string().max(255),
  year: yup.string().max(255),
  reportingQuarter: yup.string().max(300),
  monthOfAudit: yup.string().max(300),
  departmentName: yup.string().max(300),
  branchId: yup.string().max(300),
  region: yup.string().max(300),
  branchOverview: yup.string().max(300),
  areaOfreview: yup.string().max(300),
  detailedAuditFinding: yup.string().max(300),
  primaryRootCause: yup.string().max(300),
  riskImplication: yup.string().max(300),
  recommendations: yup.string().max(300),
  employeeId: yup.string().max(300),
  riskCategory: yup.string().max(300),
  branchResponse: yup.string().max(300),
  managementResponse: yup.string().max(300),
  commitmentDate: yup.date(),
  overallControlsAssessment: yup.string().max(300),
  fraudRisk: yup.string().max(300),
  repeatFinding: yup.string().max(300),
  followUpCommentIfAny: yup.string().max(300),
  iaInCharge: yup.string().max(300),
  appendices: yup.string().max(300),
});

const AuditDepartmentReportForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [fileUrl, setFile] = useState(defaultValues?.attachment);

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
    Year,
    ReportingQuarter,
    MonthOfAudit,
    DepartmentName,
    BranchId,
    Region,
    BranchOverview,
    AreaOfReview,
    DetailedAuditFinding,
    PrimaryRootCause,
    RiskImplication,
    Recommendations,
    EmployeeId,
    RiskCategory,
    BranchResponse,
    ManagementResponse,
    OverallControlsAssessment,
    FraudRisk,
    RepeatFinding,
    FollowUpCommentIfAny,
    iaInCharge,
    Appendices,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "CommitmentDate") {
        data.append(
          key,
          moment.utc(formData[key]).local().format("YYYY-MM-DD")
        );
      } else {
        data.append(key, formData[key]);
      }
    });
    data.append("reportId", formData.reportId);
    data.append("year", formData.year);
    data.append("reportingQuarter", formData.reportingQuarter);
    data.append("monthOfAudit", formData.monthOfAudit);
    data.append("departmentName", formData.departmentName);
    data.append("branchId", formData.branchId);
    data.append("region", formData.region);
    data.append("branchOverview", formData.branchOverview);
    data.append("areaOfreview", formData.areaOfreview);
    data.append("detailedAuditFinding", formData.detailedAuditFinding);
    data.append("primaryRootCause", formData.primaryRootCause);
    data.append("riskImplication", formData.riskImplication);
    data.append("recommendations", formData.recommendations);
    data.append("employeeId", formData.employeeId);
    data.append("riskCategory", formData.riskCategory);
    data.append("branchResponse", formData.branchResponse);
    data.append("managementResponse", formData.managementResponse);
    data.append("commitmentDate", formData.commitmentDate);
    data.append(
      "overallControlsAssessment",
      formData.overallControlsAssessment
    );
    data.append("fraudRisk", formData.fraudRisk);
    data.append("repeatFinding", formData.repeatFinding);
    data.append("followUpCommentIfAny", formData.followUpCommentIfAny);
    data.append("iaInCharge", formData.iaInCharge);
    data.append("appendices", formData.appendices);

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
      <input type="hidden" {...register("reportId")} />

      <div className="form-col">
        <SelectFromOptions
          register={register}
          options={selectOptions.years}
          label="Years"
          name="year"
          errorMessage={Year?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.reportingQuarter}
          label="ReportingQuarter"
          name="reportingQuarter"
          errorMessage={ReportingQuarter?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.monthNames}
          label="Month Of Audit"
          name="monthOfAudit"
          errorMessage={MonthOfAudit?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.department}
          label="Department Name"
          name="departmentName"
          errorMessage={DepartmentName?.message}
        />
        <SelectFromDb
          control={control}
          label="Branch Name"
          path="/branches/select"
          name="branchId"
          errorMessage={BranchId?.message}
        />
        <Input
          name="region"
          label="Region"
          type="text"
          register={register}
          errorMessage={Region?.message}
        />
        <Input
          name="branchOverview"
          label="Branch Overview"
          type="text"
          register={register}
          errorMessage={BranchOverview?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.areaOfReview}
          label="Area Of Review"
          name="areaOfreview"
          errorMessage={AreaOfReview?.message}
        />
        <Input
          name="detailedAuditFinding"
          label="Detailed Audit Finding"
          type="text"
          register={register}
          errorMessage={DetailedAuditFinding?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.primaryRootCause}
          name="primaryRootCause"
          label="Primary Root Cause"
          errorMessage={PrimaryRootCause?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.riskImplication}
          name="riskImplication"
          label="Risk Implication"
          errorMessage={RiskImplication?.message}
        />
        <Input
          name="recommendations"
          label="Recommendations"
          type="text"
          register={register}
          errorMessage={Recommendations?.message}
        />
        <SelectFromDb
          control={control}
          label="Implemented By"
          path="/employees/select"
          name="employeeId"
          errorMessage={EmployeeId?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.riskCategory}
          name="riskCategory"
          label="Risk Category"
          errorMessage={RiskCategory?.message}
        />
        <Input
          name="branchResponse"
          label="Branch Response"
          type="text"
          register={register}
          errorMessage={BranchResponse?.message}
        />
        <Input
          name="managementResponse"
          label="Management Response"
          type="text"
          register={register}
          errorMessage={ManagementResponse?.message}
        />
        <Controller
          control={control}
          name="CommitmentDate"
          render={({ field }) => (
            <DatePicker label="Commitment Date" field={field} />
          )}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.overrallControlsAssessment}
          name="overallControlsAssessment"
          label="Overall Controls Assessment"
          errorMessage={OverallControlsAssessment?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.fraudRisk}
          name="fraudRisk"
          label="Fraud Risk"
          errorMessage={FraudRisk?.message}
        />
        <Input
          name="repeatFinding"
          label="Repeat Finding"
          type="text"
          register={register}
          errorMessage={RepeatFinding?.message}
        />
        <Input
          name="followUpCommentIfAny"
          label="Follow Up Comment If Any"
          type="text"
          register={register}
          errorMessage={FollowUpCommentIfAny?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.iAInCharge}
          name="iaInCharge"
          label="IA In Charge"
          errorMessage={iaInCharge?.message}
        />
        <InputFileOther
          register={register}
          action={setFile}
          label="Appendices"
          name="appendices"
          errorMessage={Appendices?.message}
        />
      </div>

      <div className="form-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditDepartmentReportForm;
