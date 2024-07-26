import React from "react";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useParams } from "react-router-dom";
import AuditInfo from "../auditCreation/AuditInfo";

const Preview = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("auditChecklist", `/auditChecklist/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card gap-2 w-full max-w-screen-xl">
      <TopHeader title="Audit Check List" />

      <AuditInfo id={id} />

      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.checklistId}
            className="grid gap-2 rounded border-2 p-5"
          >
            <p>
              <span className="font-semibold"> Questionnaire:</span>{" "}
              {item.questionnaire}
            </p>
            <p>
              <span className="font-semibold"> Audit Test Steps:</span>{" "}
              {item.auditTestSteps}
            </p>
            <p>
              <span className="font-semibold "> Test Results:</span>{" "}
              <span className="text-justify">{item.testResults}</span>
            </p>
            <p>
              <span className="font-semibold"> Test Conclusion:</span>{" "}
              {item.testConclusion}
            </p>
            <p>
              <span className="font-semibold"> Test Evidences:</span>{" "}
              {item.testEvidences && (
                <a href={item.testEvidences}>{item.testEvidences}</a>
              )}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Preview;
