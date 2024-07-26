import React from "react";
import TopHeader from "../../components/TopHeader";
import ChecklistForm from "./ChecklistForm";
import { useGetData } from "../../hooks/dataApi";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";

const Preview = ({ id, que }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("auditChecklist", `/auditChecklist/details/${id}/${que}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Check List" btn="Return" path="/audit/list" />
      <p>
        <span className="font-semibold"> Audit Area:</span>{" "}
        {list.data[0].auditArea}
      </p>

      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.checklistId}
            className="rounded overflow-hidden shadow-lg shadow-slate-600 p-5"
          >
            <ChecklistForm
              defaultValues={{
                checklistId: item.checklistId,
                auditId: item.auditId,
                questionId: item.questionId,
                testResults: item.testResults,
                testConclusion: item.testConclusion,
                auditArea: item.auditArea,
                questionnaire: item.questionnaire,
                auditTestSteps: item.auditTestSteps,
              }}
              btnText="Update"
              path="/auditChecklist/update"
            />

            <p>
              <span className="font-semibold"> Questionnaire:</span>{" "}
              {item.questionnaire}
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span>{" "}
              {item.auditTestSteps}
            </p>
            <p>
              <span className="font-semibold"> Test Results:</span>{" "}
              {item.testResults}
            </p>
            <p>
              <span className="font-semibold"> Test Conclusion:</span>{" "}
              {item.testConclusion}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Preview;
