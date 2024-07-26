import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import TaskButton from "../../../components/button/TaskButton";
// import { selectOptions } from "../../../data/selectOptions";
import PrintHeader from "../../../components/PrintHeader";

const CompleteListThree = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "evaluation",
    `/evaluation/listThree/${dataForm.selectYear}/${dataForm.branchId}/${dataForm.employee}`
  );
  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <PrintHeader title="" fileName={`evaluation.csv`} data={list.data} />
      <div className="overflow-auto h-96">
        <table className="table-fixed border-collapse rounded-md text-xs">
          <thead className="bg-gray-300 text-primary">
            <tr className="text-center h-28">
              <th></th>
              <th className="p-1 -rotate-45">Branch</th>
              <th className="p-1 -rotate-45">Employee PIN</th>
              <th className="p-1 -rotate-45">Employee Name</th>
              <th className="p-1 -rotate-45">Evaluation Type</th>
              <th className="p-1 -rotate-45">Line Manager</th>
              {/* <th className="p-1 -rotate-45">Overall Review Rating</th> */}
              <th className="p-1 -rotate-45">Probation Review Outcome</th>
              <th className="p-1 -rotate-45">Objective detail 1</th>
              <th className="p-1 -rotate-45">Employee Comments 1</th>
              <th className="p-1 -rotate-45">Manager Comments 1</th>
            </tr>
          </thead>
          <tbody>
            {list.data.length > 0 &&
              list.data.map((item) => (
                <tr
                  key={item.evaluationId}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-1 flex align-top">
                    <TaskButton
                      path={`/evaluationThree/reports/complete/view/${item.evaluationId}`}
                      btnColor="btn-gray "
                    />
                  </td>
                  <td className="p-1 align-top">{item.branchName}</td>
                  <td className="p-1 align-top">{item.employeePin}</td>
                  <td className="p-1 align-top">{item.employeeName}</td>
                  <td className="p-1 align-top">{item.evaluationTypeName}</td>
                  <td className="p-1 align-top">{item.managerName}</td>
                  {/* <td className="p-1 align-top">
                    {selectOptions.evaluationRating
                      .filter((x) => x.key === item.totalRating.toString())
                      .map((y) => y.value)}
                  </td> */}
                  <td className="p-1 align-top">{item.probationReview}</td>
                  <td className="p-1 align-top">{item.objectiveDetailsOne}</td>
                  <td className="p-1 align-top">{item.employeeCommentOne}</td>
                  <td className="p-1 align-top">{item.managerCommentOne}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompleteListThree;
