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
    testResults9: yup.string().required("Required.").max(255),
    testConclusion9: yup.string().required("Required.").max(255),
    testResults10: yup.string().required("Required.").max(255),
    testConclusion10: yup.string().required("Required.").max(255),
    testResults11: yup.string().required("Required.").max(255),
    testConclusion11: yup.string().required("Required.").max(255),
    testResults12: yup.string().required("Required.").max(255),
    testConclusion12: yup.string().required("Required.").max(255),
    testResults13: yup.string().required("Required.").max(255),
    testConclusion13: yup.string().required("Required.").max(255),
  })
  .shape({
    picture9: yup.mixed(),
    picture10: yup.mixed(),
    picture11: yup.mixed(),
    picture12: yup.mixed(),
    picture13: yup.mixed(),
  });

const StepThree = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [fileId9, setFile9] = useState();
  const [fileId10, setFile10] = useState();
  const [fileId11, setFile11] = useState();
  const [fileId12, setFile12] = useState();
  const [fileId13, setFile13] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults9: "",
      testConclusion9: "",
      testResults10: "",
      testConclusion10: "",
      testResults11: "",
      testConclusion11: "",
      testResults12: "",
      testConclusion12: "",
      testResults13: "",
      testConclusion13: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    testResults9,
    testConclusion9,
    picture9,
    testResults10,
    testConclusion10,
    picture10,
    testResults11,
    testConclusion11,
    picture11,
    testResults12,
    testConclusion12,
    picture12,
    testResults13,
    testConclusion13,
    picture13,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults9", formData.testResults9);
    data.append("testConclusion9", formData.testConclusion9);
    data.append("testEvidences9", fileId9);
    data.append("testResults10", formData.testResults10);
    data.append("testConclusion10", formData.testConclusion10);
    data.append("testEvidences10", fileId10);
    data.append("testResults11", formData.testResults11);
    data.append("testConclusion11", formData.testConclusion11);
    data.append("testEvidences11", fileId11);
    data.append("testResults12", formData.testResults12);
    data.append("testConclusion12", formData.testConclusion12);
    data.append("testEvidences12", fileId12);
    data.append("testResults13", formData.testResults13);
    data.append("testConclusion13", formData.testConclusion13);
    data.append("testEvidences13", fileId13);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update3",
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
          <span className="font-semibold"> Audit Area:</span> Cash
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Has the
              physical cash matched with the statement of affairs / book balance
              / Register?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 3.1.
              Cross match the physical cash with cashbook and UMIS in presence
              of the BM and Cashier for verification.Assess the process of key
              control one by BM and other by cashier.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults9"
              errorMessage={testResults9?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion9"
              errorMessage={testConclusion9?.message}
            />

            {fileId9 && <a href={fileId9}>{fileId9}</a>}
            <InputFileOther
              register={register}
              action={setFile9}
              label="Upload Evidences"
              name="picture9"
              errorMessage={picture9?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Has the
              cash holding of branch exceeded the safe limit?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 3.2.
              Verify if the cash holding limit exceeded the safe limit.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults10"
              errorMessage={testResults10?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion10"
              errorMessage={testConclusion10?.message}
            />

            {fileId10 && <a href={fileId10}>{fileId10}</a>}
            <InputFileOther
              register={register}
              action={setFile10}
              label="Upload Evidences"
              name="picture10"
              errorMessage={picture10?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Is there a
              mechanism for detecting fake or counterfeit currency notes during
              collections?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 3.3.
              Assess the controls to identify fake notes during collections.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults11"
              errorMessage={testResults11?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion11"
              errorMessage={testConclusion11?.message}
            />

            {fileId11 && <a href={fileId11}>{fileId11}</a>}
            <InputFileOther
              register={register}
              action={setFile11}
              label="Upload Evidences"
              name="picture11"
              errorMessage={picture11?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Are there
              any other instruments that prevail at the branches except cash?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 3.4.
              Verify if there is any other Financial instrument prevail at the
              branches.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults12"
              errorMessage={testResults12?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion12"
              errorMessage={testConclusion12?.message}
            />

            {fileId12 && <a href={fileId12}>{fileId12}</a>}
            <InputFileOther
              register={register}
              action={setFile12}
              label="Upload Evidences"
              name="picture12"
              errorMessage={picture12?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Are there
              any other instruments that prevail at the branches except cash?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 3.5.
              Verify contra items appearing in the cash book or bank statement
              with the original entry
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults13"
              errorMessage={testResults13?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion13"
              errorMessage={testConclusion13?.message}
            />

            {fileId13 && <a href={fileId13}>{fileId13}</a>}
            <InputFileOther
              register={register}
              action={setFile13}
              label="Upload Evidences"
              name="picture13"
              errorMessage={picture13?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepThree;
