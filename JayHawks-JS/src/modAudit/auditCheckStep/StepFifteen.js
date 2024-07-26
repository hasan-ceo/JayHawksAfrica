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
    testResults68: yup.string().required("Required.").max(255),
    testConclusion68: yup.string().required("Required.").max(255),
    testResults69: yup.string().required("Required.").max(255),
    testConclusion69: yup.string().required("Required.").max(255),
    testResults70: yup.string().required("Required.").max(255),
    testConclusion70: yup.string().required("Required.").max(255),
    testResults71: yup.string().required("Required.").max(255),
    testConclusion71: yup.string().required("Required.").max(255),
    testResults72: yup.string().required("Required.").max(255),
    testConclusion72: yup.string().required("Required.").max(255),
    testResults73: yup.string().required("Required.").max(255),
    testConclusion73: yup.string().required("Required.").max(255),
    testResults74: yup.string().required("Required.").max(255),
    testConclusion74: yup.string().required("Required.").max(255),
    testResults75: yup.string().required("Required.").max(255),
    testConclusion75: yup.string().required("Required.").max(255),
    testResults76: yup.string().required("Required.").max(255),
    testConclusion76: yup.string().required("Required.").max(255),
  })
  .shape({
    picture68: yup.mixed(),
    picture69: yup.mixed(),
    picture70: yup.mixed(),
    picture71: yup.mixed(),
    picture72: yup.mixed(),
    picture73: yup.mixed(),
    picture74: yup.mixed(),
    picture75: yup.mixed(),
    picture76: yup.mixed(),
  });

const StepFifteen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [fileId68, setFile68] = useState();
  const [fileId69, setFile69] = useState();
  const [fileId70, setFile70] = useState();
  const [fileId71, setFile71] = useState();
  const [fileId72, setFile72] = useState();
  const [fileId73, setFile73] = useState();
  const [fileId74, setFile74] = useState();
  const [fileId75, setFile75] = useState();
  const [fileId76, setFile76] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults68: "",
      testConclusion68: "",
      testResults69: "",
      testConclusion69: "",
      testResults70: "",
      testConclusion70: "",
      testResults71: "",
      testConclusion71: "",
      testResults72: "",
      testConclusion72: "",
      testResults73: "",
      testConclusion73: "",
      testResults74: "",
      testConclusion74: "",
      testResults75: "",
      testConclusion75: "",
      testResults76: "",
      testConclusion76: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    testResults68,
    testConclusion68,
    picture68,
    testResults69,
    testConclusion69,
    picture69,
    testResults70,
    testConclusion70,
    picture70,
    testResults71,
    testConclusion71,
    picture71,
    testResults72,
    testConclusion72,
    picture72,
    testResults73,
    testConclusion73,
    picture73,
    testResults74,
    testConclusion74,
    picture74,
    testResults75,
    testConclusion75,
    picture75,
    testResults76,
    testConclusion76,
    picture76,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults68", formData.testResults68);
    data.append("testConclusion68", formData.testConclusion68);
    data.append("testEvidences68", fileId68);
    data.append("testResults69", formData.testResults69);
    data.append("testConclusion69", formData.testConclusion69);
    data.append("testEvidences69", fileId69);
    data.append("testResults70", formData.testResults70);
    data.append("testConclusion70", formData.testConclusion70);
    data.append("testEvidences70", fileId70);
    data.append("testResults71", formData.testResults17);
    data.append("testConclusion71", formData.testConclusion17);
    data.append("testEvidences71", fileId71);
    data.append("testResults72", formData.testResults72);
    data.append("testConclusion72", formData.testConclusion72);
    data.append("testEvidences72", fileId72);
    data.append("testResults73", formData.testResults73);
    data.append("testConclusion73", formData.testConclusion73);
    data.append("testEvidences73", fileId73);
    data.append("testResults74", formData.testResults74);
    data.append("testConclusion74", formData.testConclusion74);
    data.append("testEvidences74", fileId74);
    data.append("testResults75", formData.testResults75);
    data.append("testConclusion75", formData.testConclusion75);
    data.append("testEvidences75", fileId75);
    data.append("testResults76", formData.testResults76);
    data.append("testConclusion76", formData.testConclusion76);
    data.append("testEvidences76", fileId76);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update15",
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
          <span className="font-semibold"> Audit Area:</span> Health and Safety
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was there
              arrangement of safe drinking water with clearly marked in the
              premises?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 15.1.
              Check compliance of drinking water arrangements.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults68"
              errorMessage={testResults68?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion68"
              errorMessage={testConclusion68?.message}
            />
            {fileId68 && <a href={fileId68}>{fileId68}</a>}
            <InputFileOther
              register={register}
              action={setFile68}
              label="Upload Evidences"
              name="picture68"
              errorMessage={picture68?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was there
              any employee/client smoked in the workplace or official
              residential area?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 15.2.
              Check incidents of employees who smoke or drink liquor in the
              workplace or residential area of the premises.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults69"
              errorMessage={testResults69?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion69"
              errorMessage={testConclusion69?.message}
            />
            {fileId69 && <a href={fileId69}>{fileId69}</a>}
            <InputFileOther
              register={register}
              action={setFile69}
              label="Upload Evidences"
              name="picture69"
              errorMessage={picture69?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were the
              branch office provided facilities of latrines and urinals, which
              are kept clean and hygienic?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 15.3.
              Verify the compliance of hygienic issues in line with policy and
              procedure.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults70"
              errorMessage={testResults70?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion70"
              errorMessage={testConclusion70?.message}
            />
            {fileId70 && <a href={fileId70}>{fileId70}</a>}
            <InputFileOther
              register={register}
              action={setFile70}
              label="Upload Evidences"
              name="picture70"
              errorMessage={picture70?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether
              main entrance is freed from obstacles and hazardous substances?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 15.4.
              Verify whether the main entrance is free from obstacles and
              hazardous substances.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults71"
              errorMessage={testResults71?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion71"
              errorMessage={testConclusion71?.message}
            />
            {fileId71 && <a href={fileId71}>{fileId71}</a>}
            <InputFileOther
              register={register}
              action={setFile71}
              label="Upload Evidences"
              name="picture71"
              errorMessage={picture71?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Is the
              emergency evacuation sign marked in the premises?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 15.5.
              Check compliance of the evacuation sign marked.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults72"
              errorMessage={testResults72?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion72"
              errorMessage={testConclusion72?.message}
            />
            {fileId72 && <a href={fileId72}>{fileId72}</a>}

            <InputFileOther
              register={register}
              action={setFile72}
              label="Upload Evidences"
              name="picture72"
              errorMessage={picture72?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether
              adequate sitting facility is ensured for all employees of the
              branch?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 15.6.
              Verify whether all staffs have enough sitting facilities.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults73"
              errorMessage={testResults73?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion73"
              errorMessage={testConclusion73?.message}
            />
            {fileId73 && <a href={fileId73}>{fileId73}</a>}
            <InputFileOther
              register={register}
              action={setFile73}
              label="Upload Evidences"
              name="picture73"
              errorMessage={picture73?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether the
              following first-aid related facilities are available: • First-aid
              box containing prescribed health materials. • Trained first-aider.
              • To be inspected quarterly by the first-aider.
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 15.7.
              Verify first-aid facilities in respect of sufficiency of health
              materials, trained first-aider, quarterly inspection by aider,
              tracking card for replenishing, expire date, etc.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults74"
              errorMessage={testResults74?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion74"
              errorMessage={testConclusion74?.message}
            />
            {fileId74 && <a href={fileId74}>{fileId74}</a>}
            <InputFileOther
              register={register}
              action={setFile74}
              label="Upload Evidences"
              name="picture74"
              errorMessage={picture74?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether
              employees who drives carried valid driving license, insurance and
              safety kits?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 15.8.
              Check eligibility of staff to driving and compliance to driving
              rules of entity policy if any.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults75"
              errorMessage={testResults75?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion75"
              errorMessage={testConclusion75?.message}
            />
            {fileId75 && <a href={fileId75}>{fileId75}</a>}
            <InputFileOther
              register={register}
              action={setFile75}
              accept="image/*"
              label="Upload Evidences"
              name="picture75"
              errorMessage={picture75?.message}
            />
          </div>
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether the
              branch is equipped with fire extinguishers in addition to other
              firefighting materials i.e. sand and water? (must check expiry
              date).
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 15.9.
              Verify fire extinguishers arrangement with respect to
              availability, check the expiry date, etc.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults76"
              errorMessage={testResults76?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion76"
              errorMessage={testConclusion76?.message}
            />
            {fileId76 && <a href={fileId76}>{fileId76}</a>}
            <InputFileOther
              register={register}
              action={setFile76}
              accept="image/*"
              label="Upload Evidences"
              name="picture76"
              errorMessage={picture76?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepFifteen;
