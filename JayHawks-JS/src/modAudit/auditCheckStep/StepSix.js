import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromCheckBox } from "../../components/SelectList";
import TextArea from "../../components/TextArea";
import InputFileOther from "../../components/InputFileOther";
import TopHeader from "../../components/TopHeader";
import { useNavigate, useParams } from "react-router-dom";

const schema = yup
  .object({
    auditId: yup.string().required("Required."),
    testResults24: yup.string().required("Required.").max(255),
    testConclusion24: yup.string().required("Required.").max(255),
    testResults25: yup.string().required("Required.").max(255),
    testConclusion25: yup.string().required("Required.").max(255),
    testResults26: yup.string().required("Required.").max(255),
    testConclusion26: yup.string().required("Required.").max(255),
    testResults27: yup.string().required("Required.").max(255),
    testConclusion27: yup.string().required("Required.").max(255),
    testResults28: yup.string().required("Required.").max(255),
    testConclusion28: yup.string().required("Required.").max(255),
    testResults29: yup.string().required("Required.").max(255),
    testConclusion29: yup.string().required("Required.").max(255),
    testResults30: yup.string().required("Required.").max(255),
    testConclusion30: yup.string().required("Required.").max(255),
    testResults31: yup.string().required("Required.").max(255),
    testConclusion31: yup.string().required("Required.").max(255),
    testResults32: yup.string().required("Required.").max(255),
    testConclusion32: yup.string().required("Required.").max(255),
    testResults33: yup.string().required("Required.").max(255),
    testConclusion33: yup.string().required("Required.").max(255),
  })
  .shape({
    picture24: yup.mixed(),
    picture25: yup.mixed(),
    picture26: yup.mixed(),
    picture27: yup.mixed(),
    picture28: yup.mixed(),
    picture29: yup.mixed(),
    picture30: yup.mixed(),
    picture31: yup.mixed(),
    picture32: yup.mixed(),
    picture33: yup.mixed(),
  });

const StepSix = () => {
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [fileId24, setFile24] = useState();
  const [fileId25, setFile25] = useState();
  const [fileId26, setFile26] = useState();
  const [fileId27, setFile27] = useState();
  const [fileId28, setFile28] = useState();
  const [fileId29, setFile29] = useState();
  const [fileId30, setFile30] = useState();
  const [fileId31, setFile31] = useState();
  const [fileId32, setFile32] = useState();
  const [fileId33, setFile33] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults24: "",
      testConclusion24: "",
      testResults25: "",
      testConclusion25: "",
      testResults26: "",
      testConclusion26: "",
      testResults27: "",
      testConclusion27: "",
      testResults28: "",
      testConclusion28: "",
      testResults29: "",
      testConclusion29: "",
      testResults30: "",
      testConclusion30: "",
      testResults31: "",
      testConclusion31: "",
      testResults32: "",
      testConclusion32: "",
      testResults33: "",
      testConclusion33: "",
      testEvidences33: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    testResults24,
    testConclusion24,
    picture24,
    testResults25,
    testConclusion25,
    picture25,
    testResults26,
    testConclusion26,
    picture26,
    testResults27,
    testConclusion27,
    picture27,
    testResults28,
    testConclusion28,
    picture28,
    testResults29,
    testConclusion29,
    picture29,
    testResults30,
    testConclusion30,
    picture30,
    testResults31,
    testConclusion31,
    picture31,
    testResults32,
    testConclusion32,
    picture32,
    testResults33,
    testConclusion33,
    picture33,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("TestResults24", formData.testResults24);
    data.append("TestConclusion24", formData.testConclusion24);
    data.append("TestEvidences24", fileId24);
    data.append("TestResults25", formData.testResults25);
    data.append("TestConclusion25", formData.testConclusion25);
    data.append("TestEvidences25", fileId25);
    data.append("TestResults26", formData.testResults26);
    data.append("TestConclusion26", formData.testConclusion26);
    data.append("TestEvidences26", fileId26);
    data.append("TestResults27", formData.testResults27);
    data.append("TestConclusion27", formData.testConclusion27);
    data.append("TestEvidences27", fileId27);
    data.append("TestResults28", formData.testResults28);
    data.append("TestConclusion28", formData.testConclusion28);
    data.append("TestEvidences28", fileId28);
    data.append("TestResults29", formData.testResults29);
    data.append("TestConclusion29", formData.testConclusion29);
    data.append("TestEvidences29", fileId29);
    data.append("TestResults30", formData.testResults30);
    data.append("TestConclusion30", formData.testConclusion30);
    data.append("TestEvidences30", fileId30);
    data.append("TestResults31", formData.testResults31);
    data.append("TestConclusion31", formData.testConclusion31);
    data.append("TestEvidences31", fileId31);
    data.append("TestResults32", formData.testResults32);
    data.append("TestConclusion32", formData.testConclusion32);
    data.append("TestEvidences32", fileId32);
    data.append("TestResults33", formData.testResults33);
    data.append("TestConclusion33", formData.testConclusion33);
    data.append("TestEvidences33", fileId33);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update6",
        formData: data,
      });
      if (status === 204) {
        toast.success("Update successful!");
        navigate(`/audit/checklist/${id}`);
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
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Check List"
        btn="Return"
        path={`/audit/checklist/${id}`}
      />
      <div>
        <p>
          <span className="font-semibold"> Audit Area:</span> Loans and advances
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Does the
              branch maintain a schedule of loans outstanding at the year-end
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.1.
              Evaluate the schedule of loans outstanding at the year-end date
              showing for each loan, name of the borrower, disbursed date,
              maturity date, interest rate, date, the balance of the period, and
              security.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults24"
              errorMessage={testResults24?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion24"
              errorMessage={testConclusion24?.message}
            />

            {fileId24 && <a href={fileId24}>{fileId24}</a>}
            <InputFileOther
              register={register}
              action={setFile24}
              label="Upload Evidences"
              name="picture24"
              errorMessage={picture24?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Has the
              Loan Appraisal process/ formalities been followed and the approval
              process been obtained for enhancement of loan as per policy?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.2.
              Evaluate the Loan Appraisal process and verify if formalities were
              followed as per policy.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults25"
              errorMessage={testResults25?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion25"
              errorMessage={testConclusion25?.message}
            />

            {fileId25 && <a href={fileId25}>{fileId25}</a>}
            <InputFileOther
              register={register}
              action={setFile25}
              label="Upload Evidences"
              name="picture25"
              errorMessage={picture25?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were all
              the Loans disbursed in the master roll and signed by the staff on
              daily basis?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.3.
              Verify the loans disbursed to the customers on a sample basis.
              Ensure the completeness of the loan form documentation and
              availability of total loan forms in the audit period.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults26"
              errorMessage={testResults26?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion26"
              errorMessage={testConclusion26?.message}
            />

            {fileId26 && <a href={fileId26}>{fileId26}</a>}
            <InputFileOther
              register={register}
              action={setFile26}
              label="Upload Evidences"
              name="picture26"
              errorMessage={picture26?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were all
              the Loans disbursed in the master roll and signed by the staff on
              daily basis?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.4.
              Examine loan advance payments and top-up facility of the
              customers.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults27"
              errorMessage={testResults27?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion27"
              errorMessage={testConclusion27?.message}
            />

            {fileId27 && <a href={fileId27}>{fileId27}</a>}
            <InputFileOther
              register={register}
              action={setFile27}
              label="Upload Evidences"
              name="picture27"
              errorMessage={picture27?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was there
              any sharing of loans noticed from the verification of loan
              documents / group visit/ installment collection pattern?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.5.
              Identify if there is any sharing of loans from the verification of
              loan documents /group visit/ installment collection pattern.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults28"
              errorMessage={testResults28?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion28"
              errorMessage={testConclusion28?.message}
            />

            {fileId28 && <a href={fileId28}>{fileId28}</a>}
            <InputFileOther
              register={register}
              action={setFile28}
              label="Upload Evidences"
              name="picture28"
              errorMessage={picture28?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span>Was the loan
              application processed within the timeline as per policy?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.6.
              Check the turnaround time for loan application and loan
              disbursement for new and existing loans.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults29"
              errorMessage={testResults29?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion29"
              errorMessage={testConclusion29?.message}
            />

            {fileId29 && <a href={fileId29}>{fileId29}</a>}
            <InputFileOther
              register={register}
              action={setFile29}
              label="Upload Evidences"
              name="picture29"
              errorMessage={picture29?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were there
              any customer loans missing in UMIS?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.7.
              Validate if there are any customer loans missing in the system.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults30"
              errorMessage={testResults30?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion30"
              errorMessage={testConclusion30?.message}
            />

            {fileId30 && <a href={fileId30}>{fileId30}</a>}
            <InputFileOther
              register={register}
              action={setFile30}
              label="Upload Evidences"
              name="picture30"
              errorMessage={picture30?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was there
              group interchange / changes in the Loan Officer (LO) groups /
              clients?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.8.
              Check the interchange of groups conducted for the Los and findings
              updated in the register. Check policy and approval by the
              authority.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults31"
              errorMessage={testResults31?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion31"
              errorMessage={testConclusion31?.message}
            />

            {fileId31 && <a href={fileId31}>{fileId31}</a>}
            <InputFileOther
              register={register}
              action={setFile31}
              label="Upload Evidences"
              name="picture31"
              errorMessage={picture31?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were the
              customers aware of the interest rate, outstanding loan amount and
              calculation methods?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.9.
              Determine customer awareness of the interest rate of the loan
              products and determine borrower loan outstanding balances.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults32"
              errorMessage={testResults32?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion32"
              errorMessage={testConclusion32?.message}
            />

            {fileId32 && <a href={fileId32}>{fileId32}</a>}
            <InputFileOther
              register={register}
              action={setFile32}
              label="Upload Evidences"
              name="picture32"
              errorMessage={picture32?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were there
              any sharing of groups within the branches?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 6.10.
              Verify if there is any sharing of groups and customers within the
              branches. Consider the area demarcation radius and boundary for
              the branch.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults33"
              errorMessage={testResults33?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion33"
              errorMessage={testConclusion33?.message}
            />

            {fileId33 && <a href={fileId33}>{fileId33}</a>}
            <InputFileOther
              register={register}
              action={setFile33}
              label="Upload Evidences"
              name="picture33"
              errorMessage={picture33?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepSix;
