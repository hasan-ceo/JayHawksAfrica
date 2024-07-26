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
    testResults34: yup.string().required("Required.").max(255),
    testConclusion34: yup.string().required("Required.").max(255),
    testResults35: yup.string().required("Required.").max(255),
    testConclusion35: yup.string().required("Required.").max(255),
    testResults36: yup.string().required("Required.").max(255),
    testConclusion36: yup.string().required("Required.").max(255),
  })
  .shape({
    picture34: yup.mixed(),
    picture35: yup.mixed(),
    picture36: yup.mixed(),
  });

const StepSeven = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [fileId34, setFile34] = useState();
  const [fileId35, setFile35] = useState();
  const [fileId36, setFile36] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults34: "",
      testConclusion34: "",
      testResults35: "",
      testConclusion35: "",
      testResults36: "",
      testConclusion36: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    testResults34,
    testConclusion34,
    picture34,
    testResults35,
    testConclusion35,
    picture35,
    testResults36,
    testConclusion36,
    picture36,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults34", formData.testResults34);
    data.append("testConclusion34", formData.testConclusion34);
    data.append("testEvidences34", fileId34);
    data.append("testResults35", formData.testResults35);
    data.append("testConclusion35", formData.testConclusion35);
    data.append("testEvidences35", fileId35);
    data.append("testResults36", formData.testResults36);
    data.append("testConclusion36", formData.testConclusion36);
    data.append("testEvidences36", fileId36);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update7",
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
          <span className="font-semibold"> Audit Area:</span> Risk cover for
          Death case clients
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was there
              any instance of client death during the audit period?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 7.1.
              Identify if there is any instance of client death, and check if
              the settlement process and loan write-off is done as per policy.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults34"
              errorMessage={testResults34?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion34"
              errorMessage={testConclusion34?.message}
            />

            {fileId34 && <a href={fileId34}>{fileId34}</a>}
            <InputFileOther
              register={register}
              action={setFile34}
              label="Upload Evidences"
              name="picture34"
              errorMessage={picture34?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were the
              accounting treatment given regarding write off in the books?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 7.2.
              Collect and review the documents required for LOP write-off, and
              check BM/LO confirmation of the death incidence.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults35"
              errorMessage={testResults35?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion35"
              errorMessage={testConclusion35?.message}
            />

            {fileId35 && <a href={fileId35}>{fileId35}</a>}
            <InputFileOther
              register={register}
              action={setFile35}
              label="Upload Evidences"
              name="picture35"
              errorMessage={picture35?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were the
              accounting treatment given regarding write off in the books?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 7.3.
              Verify if the savings/security was returned to the nominees as
              indicated in the passbook of the client, and evaluate if the
              proper journal entries are given for write-off loans and savings/
              security.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults36"
              errorMessage={testResults36?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion36"
              errorMessage={testConclusion36?.message}
            />

            {fileId36 && <a href={fileId36}>{fileId36}</a>}
            <InputFileOther
              register={register}
              action={setFile36}
              label="Upload Evidences"
              name="picture36"
              errorMessage={picture36?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepSeven;
