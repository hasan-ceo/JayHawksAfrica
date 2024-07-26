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
    testResults63: yup.string().required("Required.").max(255),
    testConclusion63: yup.string().required("Required.").max(255),
    testResults64: yup.string().required("Required.").max(255),
    testConclusion64: yup.string().required("Required.").max(255),
    testResults65: yup.string().required("Required.").max(255),
    testConclusion65: yup.string().required("Required.").max(255),
    testResults66: yup.string().required("Required.").max(255),
    testConclusion66: yup.string().required("Required.").max(255),
    testResults67: yup.string().required("Required.").max(255),
    testConclusion67: yup.string().required("Required.").max(255),
  })
  .shape({
    picture63: yup.mixed(),
    picture64: yup.mixed(),
    picture65: yup.mixed(),
    picture66: yup.mixed(),
    picture67: yup.mixed(),
  });

const StepFourteen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [fileId63, setFile63] = useState();
  const [fileId64, setFile64] = useState();
  const [fileId65, setFile65] = useState();
  const [fileId66, setFile66] = useState();
  const [fileId67, setFile67] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults63: "",
      testConclusion63: "",
      testResults64: "",
      testConclusion64: "",
      testResults65: "",
      testConclusion65: "",
      testResults66: "",
      testConclusion66: "",
      testResults67: "",
      testConclusion67: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    testResults63,
    testConclusion63,
    picture63,
    testResults64,
    testConclusion64,
    picture64,
    testResults65,
    testConclusion65,
    picture65,
    testResults66,
    testConclusion66,
    picture66,
    testResults67,
    testConclusion67,
    picture67,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults63", formData.testResults63);
    data.append("testConclusion63", formData.testConclusion63);
    data.append("testEvidences63", fileId63);
    data.append("testResults64", formData.testResults64);
    data.append("testConclusion64", formData.testConclusion64);
    data.append("testEvidences64", fileId64);
    data.append("testResults65", formData.testResults65);
    data.append("testConclusion65", formData.testConclusion65);
    data.append("testEvidences65", fileId65);
    data.append("testResults66", formData.testResults66);
    data.append("testConclusion66", formData.testConclusion66);
    data.append("testEvidences66", fileId66);
    data.append("testResults67", formData.testResults67);
    data.append("testConclusion67", formData.testConclusion67);
    data.append("testEvidences67", fileId67);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update14",
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
          <span className="font-semibold"> Audit Area:</span> Human Resources
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was there
              any discrepancies noted in case of payment to any branch staffs?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 14.1.
              Verify the salary payment as per the Head office payroll sheet
              with the HR system.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults63"
              errorMessage={testResults63?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion63"
              errorMessage={testConclusion63?.message}
            />
            {fileId63 && <a href={fileId63}>{fileId63}</a>}
            <InputFileOther
              register={register}
              action={setFile63}
              label="Upload Evidences"
              name="picture63"
              errorMessage={picture63?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether HR
              letters are filed in the HR file
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 14.2.
              Check all employee's HR files regarding appointments, transfer
              letters, Identity cards & address proof, etc.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults64"
              errorMessage={testResults64?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion64"
              errorMessage={testConclusion64?.message}
            />
            {fileId64 && <a href={fileId64}>{fileId64}</a>}
            <InputFileOther
              register={register}
              action={setFile64}
              label="Upload Evidences"
              name="picture64"
              errorMessage={picture64?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Are the
              staff aware of the HR system and its usage?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 14.3.
              Verify the knowledge level of the HR system by the staff and its
              usage regarding leave applications, and evaluations.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults65"
              errorMessage={testResults65?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion65"
              errorMessage={testConclusion65?.message}
            />
            {fileId65 && <a href={fileId65}>{fileId65}</a>}
            <InputFileOther
              register={register}
              action={setFile65}
              label="Upload Evidences"
              name="picture65"
              errorMessage={picture65?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was leave
              availed to staff as per policy?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 14.4.
              Verify the leave compliance as per appointments and compute the
              leave availed and balance leave as per the system.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults66"
              errorMessage={testResults66?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion66"
              errorMessage={testConclusion66?.message}
            />
            {fileId66 && <a href={fileId66}>{fileId66}</a>}
            <InputFileOther
              register={register}
              action={setFile66}
              label="Upload Evidences"
              name="picture66"
              errorMessage={picture66?.message}
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
              name="testResults67"
              errorMessage={testResults67?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion67"
              errorMessage={testConclusion67?.message}
            />
            {fileId67 && <a href={fileId67}>{fileId67}</a>}
            <InputFileOther
              register={register}
              action={setFile67}
              label="Upload Evidences"
              name="picture67"
              errorMessage={picture67?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepFourteen;
