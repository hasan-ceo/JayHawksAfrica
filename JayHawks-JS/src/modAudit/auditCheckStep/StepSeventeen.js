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
    testResults78: yup.string().required("Required.").max(255),
    testConclusion78: yup.string().required("Required.").max(255),
  })
  .shape({
    picture78: yup.mixed(),
  });

const StepSeventeen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [fileId78, setFile78] = useState();

  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults78: "",
      testConclusion78: "",
    },
    resolver: yupResolver(schema),
  });

  const { testResults78, testConclusion78, picture78 } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults78", formData.testResults78);
    data.append("testConclusion78", formData.testConclusion78);
    data.append("testEvidences78", fileId78);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update17",
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
          <span className="font-semibold"> Audit Area:</span> Branch monitoring/
          Supervision status
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether
              monitoring was conducted?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 17.1.
              Determine the number of monitoring of RM/AM performed in the Audit
              period and verify whether suggestions of monitoring were resolved
              by BM.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults78"
              errorMessage={testResults78?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion78"
              errorMessage={testConclusion78?.message}
            />

            {fileId78 && <a href={fileId78}>{fileId78}</a>}
            <InputFileOther
              register={register}
              action={setFile78}
              label="Upload Evidences"
              name="picture78"
              errorMessage={picture78?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepSeventeen;
