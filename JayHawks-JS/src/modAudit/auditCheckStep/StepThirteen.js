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
    testResults56: yup.string().required("Required.").max(255),
    testConclusion56: yup.string().required("Required.").max(255),
    testResults57: yup.string().required("Required.").max(255),
    testConclusion57: yup.string().required("Required.").max(255),
    testResults58: yup.string().required("Required.").max(255),
    testConclusion58: yup.string().required("Required.").max(255),
    testResults59: yup.string().required("Required.").max(255),
    testConclusion59: yup.string().required("Required.").max(255),
    testResults60: yup.string().required("Required.").max(255),
    testConclusion60: yup.string().required("Required.").max(255),
    testResults61: yup.string().required("Required.").max(255),
    testConclusion61: yup.string().required("Required.").max(255),
    testResults62: yup.string().required("Required.").max(255),
    testConclusion62: yup.string().required("Required.").max(255),
  })
  .shape({
    picture56: yup.mixed(),
    picture57: yup.mixed(),
    picture58: yup.mixed(),
    picture59: yup.mixed(),
    picture60: yup.mixed(),
    picture61: yup.mixed(),
    picture62: yup.mixed(),
  });

const StepThirteen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [fileId56, setFile56] = useState();
  const [fileId57, setFile57] = useState();
  const [fileId58, setFile58] = useState();
  const [fileId59, setFile59] = useState();
  const [fileId60, setFile60] = useState();
  const [fileId61, setFile61] = useState();
  const [fileId62, setFile62] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults56: "",
      testConclusion56: "",
      testResults57: "",
      testConclusion57: "",
      testResults58: "",
      testConclusion58: "",
      testResults59: "",
      testConclusion59: "",
      testResults60: "",
      testConclusion60: "",
      testResults61: "",
      testConclusion61: "",
      testResults62: "",
      testConclusion62: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    testResults56,
    testConclusion56,
    picture56,
    testResults57,
    testConclusion57,
    picture57,
    testResults58,
    testConclusion58,
    picture58,
    testResults59,
    testConclusion59,
    picture59,
    testResults60,
    testConclusion60,
    picture60,
    testResults61,
    testConclusion61,
    picture61,
    testResults62,
    testConclusion62,
    picture62,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults56", formData.testResults56);
    data.append("testConclusion56", formData.testConclusion56);
    data.append("testEvidences56", fileId56);
    data.append("testResults57", formData.testResults57);
    data.append("testConclusion57", formData.testConclusion57);
    data.append("testEvidences57", fileId57);
    data.append("testResults58", formData.testResults58);
    data.append("testConclusion58", formData.testConclusion58);
    data.append("testEvidences58", fileId58);
    data.append("testResults59", formData.testResults59);
    data.append("testConclusion59", formData.testConclusion59);
    data.append("testEvidences59", fileId59);
    data.append("testResults60", formData.testResults60);
    data.append("testConclusion60", formData.testConclusion60);
    data.append("testEvidences60", fileId60);
    data.append("testResults61", formData.testResults61);
    data.append("testConclusion61", formData.testConclusion61);
    data.append("testEvidences61", fileId61);
    data.append("testResults62", formData.testResults62);
    data.append("testConclusion62", formData.testConclusion62);
    data.append("testEvidences62", fileId62);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update13",
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
          <span className="font-semibold"> Audit Area:</span> Books of accounts/
          registers
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether all
              the books of accounts and registers maintained at the branch and
              updated regularly?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 13.1 .
              Verify the cashbook entries for the audit period and compare daily
              transactions with the system.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults56"
              errorMessage={testResults56?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion56"
              errorMessage={testConclusion56?.message}
            />

            {fileId56 && <a href={fileId56}>{fileId56}</a>}
            <InputFileOther
              register={register}
              action={setFile56}
              label="Upload Evidences"
              name="picture56"
              errorMessage={picture56?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether all
              the books of accounts and registers maintained at the branch and
              updated regularly?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 13.2.
              Verify Loan collection margin with LO-based registers and
              collection sheets.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults57"
              errorMessage={testResults57?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion57"
              errorMessage={testConclusion57?.message}
            />

            {fileId57 && <a href={fileId57}>{fileId57}</a>}
            <InputFileOther
              register={register}
              action={setFile57}
              label="Upload Evidences"
              name="picture57"
              errorMessage={picture57?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether all
              the books of accounts and registers maintained at the branch and
              updated regularly?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 13.3.
              Track the monthly collection and disbursement as per the cash book
              with the General ledger (manual). For all months of the audit
              period.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults58"
              errorMessage={testResults58?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion58"
              errorMessage={testConclusion58?.message}
            />

            {fileId58 && <a href={fileId58}>{fileId58}</a>}
            <InputFileOther
              register={register}
              action={setFile58}
              label="Upload Evidences"
              name="picture58"
              errorMessage={picture58?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether all
              the books of accounts and registers maintained at the branch and
              updated regularly?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 13.4.
              Verify registers are maintained and updated as per the checklist.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults59"
              errorMessage={testResults59?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion59"
              errorMessage={testConclusion59?.message}
            />

            {fileId59 && <a href={fileId59}>{fileId59}</a>}
            <InputFileOther
              register={register}
              action={setFile59}
              label="Upload Evidences"
              name="picture59"
              errorMessage={picture59?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether all
              the books of accounts and registers maintained at the branch and
              updated regularly?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 13.5.
              Verify the LO top sheets with the LO register on a sample basis.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults60"
              errorMessage={testResults60?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion60"
              errorMessage={testConclusion60?.message}
            />

            {fileId60 && <a href={fileId60}>{fileId60}</a>}
            <InputFileOther
              register={register}
              action={setFile60}
              label="Upload Evidences"
              name="picture60"
              errorMessage={picture60?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether all
              the books of accounts and registers maintained at the branch and
              updated regularly?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 13.6 .
              Check LO Security return registers and compare them with LO-based
              registers and top sheets.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults61"
              errorMessage={testResults61?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion61"
              errorMessage={testConclusion61?.message}
            />

            {fileId61 && <a href={fileId61}>{fileId61}</a>}
            <InputFileOther
              register={register}
              action={setFile61}
              label="Upload Evidences"
              name="picture61"
              errorMessage={picture61?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether any
              amount advanced to employee and are there any irregularities in
              subsequent adjustment?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 14.5.
              Check advance amounts to employees and adjustments treated in the
              books.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults62"
              errorMessage={testResults62?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion62"
              errorMessage={testConclusion62?.message}
            />

            {fileId62 && <a href={fileId62}>{fileId62}</a>}
            <InputFileOther
              register={register}
              action={setFile62}
              label="Upload Evidences"
              name="picture62"
              errorMessage={picture62?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepThirteen;
