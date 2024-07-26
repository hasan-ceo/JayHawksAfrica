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
    testResults39: yup.string().required("Required.").max(255),
    testConclusion39: yup.string().required("Required.").max(255),
  })
  .shape({
    picture39: yup.mixed(),
  });

const StepTen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [fileId39, setFile39] = useState();

  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults39: "",
      testConclusion39: "",
    },
    resolver: yupResolver(schema),
  });

  const { testResults39, testConclusion39, picture39 } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults39", formData.testResults39);
    data.append("testConclusion39", formData.testConclusion39);
    data.append("testEvidences39", fileId39);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update10",
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
          <span className="font-semibold"> Audit Area:</span> Passbooks
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were
              clients' passbooks updated properly?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 10.1.
              Validate clients' loan balances in the passbooks tally with UMIS.
              Check other clients' details if updated properly in the passbooks.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults39"
              errorMessage={testResults39?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion39"
              errorMessage={testConclusion39?.message}
            />

            {fileId39 && <a href={fileId39}>{fileId39}</a>}
            <InputFileOther
              register={register}
              action={setFile39}
              label="Upload Evidences"
              name="picture39"
              errorMessage={picture39?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepTen;
