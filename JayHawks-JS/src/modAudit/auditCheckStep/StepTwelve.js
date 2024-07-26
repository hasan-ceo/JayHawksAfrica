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
    testResults43: yup.string().required("Required.").max(255),
    testConclusion43: yup.string().required("Required.").max(255),
    testResults44: yup.string().required("Required.").max(255),
    testConclusion44: yup.string().required("Required.").max(255),
    testResults45: yup.string().required("Required.").max(255),
    testConclusion45: yup.string().required("Required.").max(255),
    testResults46: yup.string().required("Required.").max(255),
    testConclusion46: yup.string().required("Required.").max(255),
    testResults47: yup.string().required("Required.").max(255),
    testConclusion47: yup.string().required("Required.").max(255),
    testResults48: yup.string().required("Required.").max(255),
    testConclusion48: yup.string().required("Required.").max(255),
    testResults49: yup.string().required("Required.").max(255),
    testConclusion49: yup.string().required("Required.").max(255),
    testResults50: yup.string().required("Required.").max(255),
    testConclusion50: yup.string().required("Required.").max(255),
    testResults51: yup.string().required("Required.").max(255),
    testConclusion51: yup.string().required("Required.").max(255),
    testResults52: yup.string().required("Required.").max(255),
    testConclusion52: yup.string().required("Required.").max(255),
    testResults53: yup.string().required("Required.").max(255),
    testConclusion53: yup.string().required("Required.").max(255),
    testResults54: yup.string().required("Required.").max(255),
    testConclusion54: yup.string().required("Required.").max(255),
    testResults55: yup.string().required("Required.").max(255),
    testConclusion55: yup.string().required("Required.").max(255),
  })
  .shape({
    picture43: yup.mixed(),
    picture44: yup.mixed(),
    picture45: yup.mixed(),
    picture46: yup.mixed(),
    picture47: yup.mixed(),
    picture48: yup.mixed(),
    picture49: yup.mixed(),
    picture50: yup.mixed(),
    picture51: yup.mixed(),
    picture52: yup.mixed(),
    picture53: yup.mixed(),
    picture54: yup.mixed(),
    picture55: yup.mixed(),
  });

const StepTwelve = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [fileId43, setFile43] = useState();
  const [fileId44, setFile44] = useState();
  const [fileId45, setFile45] = useState();
  const [fileId46, setFile46] = useState();
  const [fileId47, setFile47] = useState();
  const [fileId48, setFile48] = useState();
  const [fileId49, setFile49] = useState();
  const [fileId50, setFile50] = useState();
  const [fileId51, setFile51] = useState();
  const [fileId52, setFile52] = useState();
  const [fileId53, setFile53] = useState();
  const [fileId54, setFile54] = useState();
  const [fileId55, setFile55] = useState();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      auditId: id,
      testResults43: "",
      testConclusion43: "",
      testResults44: "",
      testConclusion44: "",
      testResults45: "",
      testConclusion45: "",
      testResults46: "",
      testConclusion46: "",
      testResults47: "",
      testConclusion47: "",
      testResults48: "",
      testConclusion48: "",
      testResults49: "",
      testConclusion49: "",
      testResults50: "",
      testConclusion50: "",
      testResults51: "",
      testConclusion51: "",
      testResults52: "",
      testConclusion52: "",
      testResults53: "",
      testConclusion53: "",
      testResults54: "",
      testConclusion54: "",
      testResults55: "",
      testConclusion55: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    testResults43,
    testConclusion43,
    picture43,
    testResults44,
    testConclusion44,
    picture44,
    testResults45,
    testConclusion45,
    picture45,
    testResults46,
    testConclusion46,
    picture46,
    testResults47,
    testConclusion47,
    picture47,
    testResults48,
    testConclusion48,
    picture48,
    testResults49,
    testConclusion49,
    picture49,
    testResults50,
    testConclusion50,
    picture50,
    testResults51,
    testConclusion51,
    picture51,
    testResults52,
    testConclusion52,
    picture52,
    testResults53,
    testConclusion53,
    picture53,
    testResults54,
    testConclusion54,
    picture54,
    testResults55,
    testConclusion55,
    picture55,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("auditId", formData.auditId);
    data.append("testResults43", formData.testResults43);
    data.append("testConclusion43", formData.testConclusion43);
    data.append("testEvidences43", fileId43);
    data.append("testResults44", formData.testResults44);
    data.append("testConclusion44", formData.testConclusion44);
    data.append("testEvidences44", fileId44);
    data.append("testResults45", formData.testResults45);
    data.append("testConclusion45", formData.testConclusion45);
    data.append("testEvidences45", fileId45);
    data.append("testResults46", formData.testResults46);
    data.append("testConclusion46", formData.testConclusion46);
    data.append("testEvidences46", fileId46);
    data.append("testResults47", formData.testResults47);
    data.append("testConclusion47", formData.testConclusion47);
    data.append("testEvidences47", fileId47);
    data.append("testResults48", formData.testResults48);
    data.append("testConclusion48", formData.testConclusion48);
    data.append("testEvidences48", fileId48);
    data.append("testResults49", formData.testResults49);
    data.append("testConclusion49", formData.testConclusion49);
    data.append("testEvidences49", fileId49);
    data.append("testResults50", formData.testResults50);
    data.append("testConclusion50", formData.testConclusion50);
    data.append("testEvidences50", fileId50);
    data.append("testResults51", formData.testResults51);
    data.append("testConclusion51", formData.testConclusion51);
    data.append("testEvidences51", fileId51);
    data.append("testResults52", formData.testResults52);
    data.append("testConclusion52", formData.testConclusion52);
    data.append("testEvidences52", fileId52);
    data.append("testResults53", formData.testResults53);
    data.append("testConclusion53", formData.testConclusion53);
    data.append("testEvidences53", fileId53);
    data.append("testResults54", formData.testResults54);
    data.append("testConclusion54", formData.testConclusion54);
    data.append("testEvidences54", fileId54);
    data.append("testResults55", formData.testResults55);
    data.append("testConclusion55", formData.testConclusion55);
    data.append("testEvidences55", fileId55);

    try {
      const { status } = await mutateAsync({
        path: "/auditChecklist/update12",
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
          <span className="font-semibold"> Audit Area:</span> UMIS/ Information
          Technology
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("auditId")} />
        <div className="grid gap-5">
          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Any
              incidents of manipulation of the UMIS by the staff that occurred?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.1.
              Cross-check any incidents of manipulation of the UMIS by the
              staff.
            </p>

            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults43"
              errorMessage={testResults43?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion43"
              errorMessage={testConclusion43?.message}
            />

            {fileId43 && <a href={fileId43}>{fileId43}</a>}
            <InputFileOther
              register={register}
              action={setFile43}
              label="Upload Evidences"
              name="picture43"
              errorMessage={picture43?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was client
              information/details match with UMIS?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.2.
              Cross-check the client's information with UMIS data.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults44"
              errorMessage={testResults44?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion44"
              errorMessage={testConclusion44?.message}
            />

            {fileId44 && <a href={fileId44}>{fileId44}</a>}
            <InputFileOther
              register={register}
              action={setFile44}
              label="Upload Evidences"
              name="picture44"
              errorMessage={picture44?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was there
              any duplicate customer ID used in the UMIS?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.3.
              Identify the duplication of customer ID/PIN used in UMIS.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults45"
              errorMessage={testResults45?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion45"
              errorMessage={testConclusion45?.message}
            />

            {fileId45 && <a href={fileId45}>{fileId45}</a>}
            <InputFileOther
              register={register}
              action={setFile45}
              label="Upload Evidences"
              name="picture45"
              errorMessage={picture45?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Is the user
              access revoked properly after the departure
              (termination/resignation/ transfer) of an employee?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.4.
              Evaluate whether user access was revoked in case of the departure
              of an employee.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults46"
              errorMessage={testResults46?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion46"
              errorMessage={testConclusion46?.message}
            />

            {fileId46 && <a href={fileId46}>{fileId46}</a>}
            <InputFileOther
              register={register}
              action={setFile46}
              label="Upload Evidences"
              name="picture46"
              errorMessage={picture46?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Were there
              any system errors noticed regarding financial information in the
              UMIS?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.5.
              Examine any system errors regarding loan information.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults47"
              errorMessage={testResults47?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion47"
              errorMessage={testConclusion47?.message}
            />

            {fileId47 && <a href={fileId47}>{fileId47}</a>}
            <InputFileOther
              register={register}
              action={setFile47}
              label="Upload Evidences"
              name="picture47"
              errorMessage={picture47?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was there
              any mismatches regarding collection and disbursement with book
              balance and UMIS?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.6.
              Cross-check collection and disbursement margin with book balance
              and UMIS.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults48"
              errorMessage={testResults48?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion48"
              errorMessage={testConclusion48?.message}
            />

            {fileId48 && <a href={fileId48}>{fileId48}</a>}
            <InputFileOther
              register={register}
              action={setFile48}
              label="Upload Evidences"
              name="picture48"
              errorMessage={picture48?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Is there
              any IT user instruction manual for branch staffs?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.7.
              Check the availability of the IT user manual for branch computers,
              IT gadgets, and UMIS.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults49"
              errorMessage={testResults49?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion49"
              errorMessage={testConclusion49?.message}
            />

            {fileId49 && <a href={fileId49}>{fileId49}</a>}
            <InputFileOther
              register={register}
              action={setFile49}
              label="Upload Evidences"
              name="picture49"
              errorMessage={picture49?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was the
              user able to access the UMIS?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.8.
              Verify if users were availed with login details to UMIS.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults50"
              errorMessage={testResults50?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion50"
              errorMessage={testConclusion50?.message}
            />

            {fileId50 && <a href={fileId50}>{fileId50}</a>}
            <InputFileOther
              register={register}
              action={setFile50}
              label="Upload Evidences"
              name="picture50"
              errorMessage={picture50?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Is there
              any policy for maintaince and usage of UMIS?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.9.
              Check the policy regarding maintenance and usage of UMIS.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults51"
              errorMessage={testResults51?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion51"
              errorMessage={testConclusion51?.message}
            />

            {fileId51 && <a href={fileId51}>{fileId51}</a>}
            <InputFileOther
              register={register}
              action={setFile51}
              label="Upload Evidences"
              name="picture51"
              errorMessage={picture51?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether
              updated anti-virus installed in PCs/workstations and Phones?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.10.
              Verify if all workstations/PCs and Phones are installed with
              updated anti-viruses.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults52"
              errorMessage={testResults52?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion52"
              errorMessage={testConclusion52?.message}
            />

            {fileId52 && <a href={fileId52}>{fileId52}</a>}
            <InputFileOther
              register={register}
              action={setFile52}
              label="Upload Evidences"
              name="picture52"
              errorMessage={picture52?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Whether
              there is any list of unauthorized software, which is restricted by
              the system?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.11.
              Check the availability of the list of authorized software or
              prohibited software.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults53"
              errorMessage={testResults53?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion53"
              errorMessage={testConclusion53?.message}
            />

            {fileId53 && <a href={fileId53}>{fileId53}</a>}
            <InputFileOther
              register={register}
              action={setFile53}
              label="Upload Evidences"
              name="picture53"
              errorMessage={picture53?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was the
              power turned off after the completion of daily work and phones
              locked?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.12.
              Verify the compliance of phone usage policy.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults54"
              errorMessage={testResults54?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion54"
              errorMessage={testConclusion54?.message}
            />

            {fileId54 && <a href={fileId54}>{fileId54}</a>}
            <InputFileOther
              register={register}
              action={setFile54}
              label="Upload Evidences"
              name="picture54"
              errorMessage={picture54?.message}
            />
          </div>

          <div className="grid gap-2 rounded border-2 p-5">
            <p>
              <span className="font-semibold"> Questionnaire:</span> Was data
              back up taken after closure of working day?
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span> 12.13.
              Check the UMIS regarding data back up taken/ preserved and
              uploaded on flash disk on time.
            </p>
            <TextArea
              control={control}
              areaHeight="h-16"
              label="Test results (Insert audit findings / observations)"
              name="testResults55"
              errorMessage={testResults55?.message}
            />

            <SelectFromCheckBox
              register={register}
              options={["Pass", "Fail"]}
              label="Test Conclusion (Select Pass / Fail)"
              name="testConclusion55"
              errorMessage={testConclusion55?.message}
            />

            {fileId55 && <a href={fileId55}>{fileId55}</a>}
            <InputFileOther
              register={register}
              action={setFile55}
              label="Upload Evidences"
              name="picture55"
              errorMessage={picture55?.message}
            />
          </div>

          <SaveButton btnText="Save" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default StepTwelve;
