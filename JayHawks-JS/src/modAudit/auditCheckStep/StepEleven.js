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
    testResults40: yup.string().required("Required.").max(255),
    testConclusion40: yup.string().required("Required.").max(255),
    testResults41: yup.string().required("Required.").max(255),
    testConclusion41: yup.string().required("Required.").max(255),
    testResults42: yup.string().required("Required.").max(255),
    testConclusion42: yup.string().required("Required.").max(255),
  })
  .shape({
    picture40: yup.mixed(),
    picture41: yup.mixed(),
    picture42: yup.mixed(),
  });

const StepEleven = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [fileId40, setFile40] = useState();
  const [fileId41, setFile41] = useState();
  const [fileId42, setFile42] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults40: "",
      testConclusion40: "",
      testResults41: "",
      testConclusion41: "",
      testResults42: "",
      testConclusion42: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    testResults40,
    testConclusion40,
    picture40,
    testResults41,
    testConclusion41,
    picture41,
    testResults42,
    testConclusion42,
    picture42,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults40", formData.testResults40);
    data.append("testConclusion40", formData.testConclusion40);
    data.append("testEvidences40", fileId40);
    data.append("testResults41", formData.testResults41);
    data.append("testConclusion41", formData.testConclusion41);
    data.append("testEvidences41", fileId41);
    data.append("testResults42", formData.testResults42);
    data.append("testConclusion42", formData.testConclusion42);
    data.append("testEvidences42", fileId42);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update11",
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
          <span className="font-semibold"> Audit Area:</span> Expenses
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Are
              expenses processed per policy, Check policy of expenses as per
              circular?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span>11.1.
              Verify if any expenses crossed the limit as per the delegation of
              Authority of branches.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults40"
              errorMessage={testResults40?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion40"
              errorMessage={testConclusion40?.message}
            />
            {fileId40 && <a href={fileId40}>{fileId40}</a>}
            <InputFileOther
              register={register}
              action={setFile40}
              label="Upload Evidences"
              name="picture40"
              errorMessage={picture40?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was Advance
              Office rent adjusted properly in the ledger?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 11.2.
              Check the accuracy, completeness, and occurrence of the expenses
              as per audit assertions.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults41"
              errorMessage={testResults41?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion41"
              errorMessage={testConclusion41?.message}
            />
            {fileId41 && <a href={fileId41}>{fileId41}</a>}
            <InputFileOther
              register={register}
              action={setFile41}
              label="Upload Evidences"
              name="picture41"
              errorMessage={picture41?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was Advance
              Office rent adjusted properly in the ledger?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 11.3 .
              Advance branch rent adjusted properly, check for the audit period
              with the agreement.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults42"
              errorMessage={testResults42?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion42"
              errorMessage={testConclusion42?.message}
            />
            {fileId42 && <a href={fileId42}>{fileId42}</a>}
            <InputFileOther
              register={register}
              action={setFile42}
              label="Upload Evidences"
              name="picture42"
              errorMessage={picture42?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepEleven;
