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
    testResults14: yup.string().required("Required.").max(255),
    testConclusion14: yup.string().required("Required.").max(255),
    testResults15: yup.string().required("Required.").max(255),
    testConclusion15: yup.string().required("Required.").max(255),
    testResults16: yup.string().required("Required.").max(255),
    testConclusion16: yup.string().required("Required.").max(255),
    testResults17: yup.string().required("Required.").max(255),
    testConclusion17: yup.string().required("Required.").max(255),
    testResults18: yup.string().required("Required.").max(255),
    testConclusion18: yup.string().required("Required.").max(255),
    testResults19: yup.string().required("Required.").max(255),
    testConclusion19: yup.string().required("Required.").max(255),
    testResults20: yup.string().required("Required.").max(255),
    testConclusion20: yup.string().required("Required.").max(255),
    testResults21: yup.string().required("Required.").max(255),
    testConclusion21: yup.string().required("Required.").max(255),
    testResults22: yup.string().required("Required.").max(255),
    testConclusion22: yup.string().required("Required.").max(255),
  })
  .shape({
    picture14: yup.mixed(),
    picture15: yup.mixed(),
    picture16: yup.mixed(),
    picture17: yup.mixed(),
    picture18: yup.mixed(),
    picture19: yup.mixed(),
    picture20: yup.mixed(),
    picture21: yup.mixed(),
    picture22: yup.mixed(),
  });

const StepFour = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [fileId14, setFile14] = useState();
  const [fileId15, setFile15] = useState();
  const [fileId16, setFile16] = useState();
  const [fileId17, setFile17] = useState();
  const [fileId18, setFile18] = useState();
  const [fileId19, setFile19] = useState();
  const [fileId20, setFile20] = useState();
  const [fileId21, setFile21] = useState();
  const [fileId22, setFile22] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults14: "",
      testConclusion14: "",
      testResults15: "",
      testConclusion15: "",
      testResults16: "",
      testConclusion16: "",
      testResults17: "",
      testConclusion17: "",
      testResults18: "",
      testConclusion18: "",
      testResults19: "",
      testConclusion19: "",
      testResults20: "",
      testConclusion20: "",
      testResults21: "",
      testConclusion21: "",
      testResults22: "",
      testConclusion22: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    testResults14,
    testConclusion14,
    picture14,
    testResults15,
    testConclusion15,
    picture15,
    testResults16,
    testConclusion16,
    picture16,
    testResults17,
    testConclusion17,
    picture17,
    testResults18,
    testConclusion18,
    picture18,
    testResults19,
    testConclusion19,
    picture19,
    testResults20,
    testConclusion20,
    picture20,
    testResults21,
    testConclusion21,
    picture21,
    testResults22,
    testConclusion22,
    picture22,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults14", formData.testResults14);
    data.append("testConclusion14", formData.testConclusion14);
    data.append("testEvidences14", fileId14);
    data.append("testResults15", formData.testResults15);
    data.append("testConclusion15", formData.testConclusion15);
    data.append("testEvidences15", fileId15);
    data.append("testResults16", formData.testResults16);
    data.append("testConclusion16", formData.testConclusion16);
    data.append("testEvidences16", fileId16);
    data.append("testResults17", formData.testResults17);
    data.append("testConclusion17", formData.testConclusion17);
    data.append("testEvidences17", fileId17);
    data.append("testResults18", formData.testResults18);
    data.append("testConclusion18", formData.testConclusion18);
    data.append("testEvidences18", fileId18);
    data.append("testResults19", formData.testResults19);
    data.append("testConclusion19", formData.testConclusion19);
    data.append("testEvidences19", fileId19);
    data.append("testResults20", formData.testResults20);
    data.append("testConclusion20", formData.testConclusion20);
    data.append("testEvidences20", fileId20);
    data.append("testResults21", formData.testResults21);
    data.append("testConclusion21", formData.testConclusion21);
    data.append("testEvidences21", fileId21);
    data.append("testResults22", formData.testResults22);
    data.append("testConclusion22", formData.testConclusion22);
    data.append("testEvidences22", fileId22);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update4",
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
          <span className="font-semibold"> Audit Area:</span> Bank
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was cash
              banked after daily work on branch bank account?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 4.1.
              Validate bank deposits and withdrawals for the audit period. Check
              closing bank balance as per bank statement and account books.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults14"
              errorMessage={testResults14?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion14"
              errorMessage={testConclusion14?.message}
            />
            {fileId14 && <a href={fileId14}>{fileId14}</a>}
            <InputFileOther
              register={register}
              action={setFile14}
              label="Upload Evidences"
              name="picture14"
              errorMessage={picture14?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Is there
              any Delegation of Authority Matrix followed for the bank
              signatories?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 4.2.
              Verify the bank signatories whether approved by the authority.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults15"
              errorMessage={testResults15?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion15"
              errorMessage={testConclusion15?.message}
            />
            {fileId15 && <a href={fileId15}>{fileId15}</a>}
            <InputFileOther
              register={register}
              action={setFile15}
              label="Upload Evidences"
              name="picture15"
              errorMessage={picture15?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Is the
              distance from the branch office to the bank secure to carry cash?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 4.3.
              Determine the distance from branch office to the bank facility.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults16"
              errorMessage={testResults16?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion16"
              errorMessage={testConclusion16?.message}
            />
            {fileId16 && <a href={fileId16}>{fileId16}</a>}
            <InputFileOther
              register={register}
              action={setFile16}
              label="Upload Evidences"
              name="picture16"
              errorMessage={picture16?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was there
              any fake note identified during the physical verification?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 4.4.
              Verify if there is any fake note in physical verification
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults17"
              errorMessage={testResults17?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion17"
              errorMessage={testConclusion17?.message}
            />
            {fileId17 && <a href={fileId17}>{fileId17}</a>}
            <InputFileOther
              register={register}
              action={setFile17}
              label="Upload Evidences"
              name="picture17"
              errorMessage={picture17?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether any
              idle funds are held by the branch for longer period.
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 4.5.
              Check and List out the idle fund balance month-end balance above
              the ceiling held by the branch.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults18"
              errorMessage={testResults18?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion18"
              errorMessage={testConclusion18?.message}
            />
            {fileId18 && <a href={fileId18}>{fileId18}</a>}
            <InputFileOther
              register={register}
              action={setFile18}
              label="Upload Evidences"
              name="picture18"
              errorMessage={picture18?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Has the
              bank reconciliation statement (BRS) been prepared and approved on
              a monthly basis?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 4.6.
              Collect and verify that BRSs are prepared monthly basis and duly
              approved.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults19"
              errorMessage={testResults19?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion19"
              errorMessage={testConclusion19?.message}
            />
            {fileId19 && <a href={fileId19}>{fileId19}</a>}
            <InputFileOther
              register={register}
              action={setFile19}
              label="Upload Evidences"
              name="picture19"
              errorMessage={picture19?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Has the
              chequebooks signed by the authorized signatory?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 4.7.
              Verify if the chequebooks are signed by authorized signatory.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults20"
              errorMessage={testResults20?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion20"
              errorMessage={testConclusion20?.message}
            />
            {fileId20 && <a href={fileId20}>{fileId20}</a>}
            <InputFileOther
              register={register}
              action={setFile20}
              label="Upload Evidences"
              name="picture20"
              errorMessage={picture20?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Is there
              any canceled cheque or dishonored cheques?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 4.8.
              Examine the canceled cheques.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults21"
              errorMessage={testResults21?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion21"
              errorMessage={testConclusion21?.message}
            />
            {fileId21 && <a href={fileId21}>{fileId21}</a>}
            <InputFileOther
              register={register}
              action={setFile21}
              label="Upload Evidences"
              name="picture21"
              errorMessage={picture21?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Is there
              any contra-entry item
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 4.9.
              Inspect any contra entries and agree to their supporting
              documents.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults22"
              errorMessage={testResults22?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion22"
              errorMessage={testConclusion22?.message}
            />
            {fileId22 && <a href={fileId22}>{fileId22}</a>}
            <InputFileOther
              register={register}
              action={setFile22}
              label="Upload Evidences"
              name="picture22"
              errorMessage={picture22?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepFour;
