import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../hooks/dataApi";
import SaveButton from "../../components/button/SaveButton";
import Input from "../../components/Input";
import { selectOptions } from "../../data/selectOptions";
import { SelectFromDb, SelectFromOptions } from "../../components/SelectList";
import InputFileOther from "../../components/InputFileOther";

const schema = yup.object({
  specialInvestigationAuditReportId: yup.string().max(255),
  year: yup.string().max(255),
  reportingQuarter: yup.string().max(300),
  monthOfAudit: yup.string().max(300),
  departmentName: yup.string().max(300),
  branchId: yup.string().max(300),
  region: yup.string().max(300),
  detectionMethod: yup.string().max(300),
  typeOfFraud: yup.string().max(300),
  whoMightBeInvolved: yup.string().max(300),
  positionOfFraudster: yup.string().max(300),
  howIsTheFraudBeingPerpetrated: yup.string().max(300),
  numberOfOccurences: yup.string().max(300),
  potentialWitness: yup.string().max(300),
  statements: yup.string().max(300),
  evidence: yup.string().max(300),
  observations: yup.string().max(300),
  defectiveControlsIdentified: yup.string().max(300),
  estimatedFraudLoss: yup.string().max(300),
  recommendations: yup.string().max(300),
  managementResponse: yup.string().max(300),
  employeeId: yup.string().max(300),
  iaInCharge: yup.string().max(300),
});

const AuditSpecialInvestigationReportForm = ({
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
    DetectionMethod,
    TypeOfFraud,
    WhoMightBeInvolved,
    PositionOfFraudster,
    HowIsTheFraudBeingPerpetrated,
    NumberOfOccurences,
    PotentialWitness,
    Statements,
    Evidence,
    Observations,
    DefectiveControlsIdentified,
    EstimatedFraudLoss,
    Recommendations,
    ManagementResponse,
    EmployeeId,
    iaInCharge,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append(
      "specialInvestigationAuditReportId",
      formData.specialInvestigationAuditReportId
    );
    data.append("year", formData.year);
    data.append("reportingQuarter", formData.reportingQuarter);
    data.append("monthOfAudit", formData.monthOfAudit);
    data.append("departmentName", formData.departmentName);
    data.append("branchId", formData.branchId);
    data.append("region", formData.region);
    data.append("detectionMethod", formData.detectionMethod);
    data.append("typeOfFraud", formData.typeOfFraud);
    data.append("whoMightBeInvolved", formData.whoMightBeInvolved);
    data.append("positionOfFraudster", formData.positionOfFraudster);
    data.append(
      "howIsTheFraudBeingPerpetrated",
      formData.howIsTheFraudBeingPerpetrated
    );
    data.append("numberOfOccurences", formData.numberOfOccurences);
    data.append("potentialWitness", formData.potentialWitness);
    data.append("statements", formData.statements);
    data.append("evidence", formData.evidence);
    data.append("observations", formData.observations);
    data.append(
      "defectiveControlsIdentified",
      formData.defectiveControlsIdentified
    );
    data.append("estimatedFraudLoss", formData.estimatedFraudLoss);
    data.append("recommendations", formData.recommendations);
    data.append("managementResponse", formData.managementResponse);
    data.append("employeeId", formData.employeeId);
    data.append("iaInCharge", formData.iaInCharge);

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
      <input type="hidden" {...register("specialInvestigationAuditReportId")} />

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
        <SelectFromOptions
          register={register}
          options={selectOptions.detectionMethod}
          label="Detection Method"
          name="detectionMethod"
          errorMessage={DetectionMethod?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.typeOfFraud}
          label="Type of Fraud "
          name="typeOfFraud"
          errorMessage={TypeOfFraud?.message}
        />
        <Input
          name="whoMightBeInvolved"
          label="Who might be involved?"
          type="text"
          register={register}
          errorMessage={WhoMightBeInvolved?.message}
        />
        <Input
          name="positionOfFraudster"
          label="Position of Fraudster"
          type="text"
          register={register}
          errorMessage={PositionOfFraudster?.message}
        />
        <Input
          name="howIsTheFraudBeingPerpetrated"
          label="How is the fraud being perpetrated?"
          type="text"
          register={register}
          errorMessage={HowIsTheFraudBeingPerpetrated?.message}
        />
        <Input
          name="numberOfOccurences"
          label="Number of occurences"
          type="text"
          register={register}
          errorMessage={NumberOfOccurences?.message}
        />
        <Input
          name="potentialWitness"
          label="Potential Witness"
          type="text"
          register={register}
          errorMessage={PotentialWitness?.message}
        />
        <InputFileOther
          register={register}
          action={setFile}
          label="Statements"
          name="statements"
          errorMessage={Statements?.message}
        />
        <InputFileOther
          register={register}
          action={setFile}
          label="Evidence"
          name="evidence"
          errorMessage={Evidence?.message}
        />
        <Input
          name="observations"
          label="Observations"
          type="text"
          register={register}
          errorMessage={Observations?.message}
        />
        <Input
          name="defectiveControlsIdentified"
          label="Defective controls identified"
          type="text"
          register={register}
          errorMessage={DefectiveControlsIdentified?.message}
        />
        <Input
          name="estimatedFraudLoss"
          label="Estimated fraud loss"
          type="text"
          register={register}
          errorMessage={EstimatedFraudLoss?.message}
        />
        <Input
          name="recommendations"
          label="Recommendations"
          type="text"
          register={register}
          errorMessage={Recommendations?.message}
        />
        <Input
          name="managementResponse"
          label="Management Response"
          type="text"
          register={register}
          errorMessage={ManagementResponse?.message}
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
          options={selectOptions.iAInCharge}
          name="iaInCharge"
          label="IA In Charge"
          errorMessage={iaInCharge?.message}
        />
      </div>

      <div className="form-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditSpecialInvestigationReportForm;
