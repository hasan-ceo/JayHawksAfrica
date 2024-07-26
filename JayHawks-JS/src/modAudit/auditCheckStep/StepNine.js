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
    testResults38: yup.string().required("Required.").max(255),
    testConclusion38: yup.string().required("Required.").max(255),
  })
  .shape({
    picture38: yup.mixed(),
  });

const StepNine = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [fileId38, setFile38] = useState();

  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults38: "",
      testConclusion38: "",
    },
    resolver: yupResolver(schema),
  });

  const { testResults38, testConclusion38, picture38 } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults38", formData.testResults38);
    data.append("testConclusion38", formData.testConclusion38);
    data.append("testEvidences38", fileId38);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update9",
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
          <span className="font-semibold"> Audit Area:</span> Group management
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were the
              groups managed, formed as per policy guidelines by the Loan
              officers and monitored by BM/AM/RM?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 9.1.
              Conduct group visits of at least 2 -3 groups from each loan
              officer and interview 50-100 clients to determine group-related
              irregularities.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults38"
              errorMessage={testResults38?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion38"
              errorMessage={testConclusion38?.message}
            />

            {fileId38 && <a href={fileId38}>{fileId38}</a>}
            <InputFileOther
              register={register}
              action={setFile38}
              label="Upload Evidences"
              name="picture38"
              errorMessage={picture38?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepNine;
