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
    testResults77: yup.string().required("Required.").max(255),
    testConclusion77: yup.string().required("Required.").max(255),
  })
  .shape({
    picture77: yup.mixed(),
  });

const StepSixteen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [fileId77, setFile77] = useState();

  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults77: "",
      testConclusion77: "",
    },
    resolver: yupResolver(schema),
  });

  const { testResults77, testConclusion77, picture77 } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults77", formData.testResults77);
    data.append("testConclusion77", formData.testConclusion77);
    data.append("testEvidences77", fileId77);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update16",
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
          <span className="font-semibold"> Audit Area:</span> Fixed Assets
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether all
              assets properly codified or not.
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 16.1.
              Physically verify all fixed assets whether tagged with bar codes
              and in good condition.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults77"
              errorMessage={testResults77?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion77"
              errorMessage={testConclusion77?.message}
            />

            {fileId77 && <a href={fileId77}>{fileId77}</a>}
            <InputFileOther
              register={register}
              action={setFile77}
              label="Upload Evidences"
              name="picture77"
              errorMessage={picture77?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepSixteen;
