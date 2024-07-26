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
    testResults23: yup.string().required("Required.").max(255),
    testConclusion23: yup.string().required("Required.").max(255),
  })
  .shape({
    picture23: yup.mixed(),
  });

const StepFive = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [fileId23, setFile23] = useState();

  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults23: "",
      testConclusion23: "",
    },
    resolver: yupResolver(schema),
  });

  const { testResults23, testConclusion23, picture23 } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults23", formData.testResults23);
    data.append("testConclusion23", formData.testConclusion23);
    data.append("testEvidences23", fileId23);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update5",
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
          <span className="font-semibold"> Audit Area:</span> Fund transfers
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were there
              fund transfers (branch to branch)and the branch to Head Office?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 5.1.
              Verify the fund transfer acknowledgment (branch to Branch) is duly
              approved by RM/AM and whether it is well documented or not (Head
              Office to Branch /Branch to Head office).
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults23"
              errorMessage={testResults23?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion23"
              errorMessage={testConclusion23?.message}
            />
            {fileId23 && <a href={fileId23}>{fileId23}</a>}
            <InputFileOther
              register={register}
              action={setFile23}
              accept="image/*"
              label="Upload Evidences"
              name="picture23"
              errorMessage={picture23?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepFive;
