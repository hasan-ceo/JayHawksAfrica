import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import TaskButton from "../../../components/button/TaskButton";
import { selectOptions } from "../../../data/selectOptions";
import PrintHeader from "../../../components/PrintHeader";

const CompleteList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "evaluation",
    `/evaluation/list/${dataForm.selectYear}/${dataForm.frequency}/${dataForm.branchId}/${dataForm.employee}`
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
              <th className="p-1 -rotate-45">Overall Review Rating</th>
              <th className="p-1 -rotate-45">Objective detail 1</th>
              <th className="p-1 -rotate-45">Employee Comments 1</th>
              <th className="p-1 -rotate-45">Manager Comments 1</th>
              <th className="p-1 -rotate-45">Objective detail 2</th>
              <th className="p-1 -rotate-45">Employee Comments 2</th>
              <th className="p-1 -rotate-45">Manager Comments 2</th>
              <th className="p-1 -rotate-45">Objective detail 3</th>
              <th className="p-1 -rotate-45">Employee Comments 3</th>
              <th className="p-1 -rotate-45">Manager Comments 3</th>
              <th className="p-1 -rotate-45">Objective detail 4</th>
              <th className="p-1 -rotate-45">Employee Comments 4</th>
              <th className="p-1 -rotate-45">Manager Comments 4</th>
              <th className="p-1 -rotate-45">
                Behaviour - Be Consistent Employee Comments
              </th>
              <th className="p-1 -rotate-45">Manager Comments</th>
              <th className="p-1 -rotate-45">
                Behaviour - Be Ambitious Employee Comments
              </th>
              <th className="p-1 -rotate-45">Manager Comments</th>
              <th className="p-1 -rotate-45">
                Behaviour - Be Positive Employee Comments
              </th>
              <th className="p-1 -rotate-45">Manager Comments</th>
              <th className="p-1 -rotate-45">
                Leadership - Delivers Results Employee Comments
              </th>
              <th className="p-1 -rotate-45">Manager Comments</th>
              <th className="p-1 -rotate-45">
                Leadership Innvoative Employee Comments
              </th>
              <th className="p-1 -rotate-45">Manager comments</th>
              <th className="p-1 -rotate-45">
                Leadership Leads People Employee Comments
              </th>
              <th className="p-1 -rotate-45">Manager Comments</th>
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
                      path={`/evaluation/reports/complete/view/${item.evaluationId}`}
                      btnColor="btn-gray "
                    />
                  </td>
                  <td className="p-1 align-top">{item.branchName}</td>
                  <td className="p-1 align-top">{item.employeePin}</td>
                  <td className="p-1 align-top">{item.employeeName}</td>
                  <td className="p-1 align-top">{item.evaluationTypeName}</td>
                  <td className="p-1 align-top">{item.managerName}</td>
                  <td className="p-1 align-top">
                    {selectOptions.evaluationRating
                      .filter((x) => x.key === item.totalRating.toString())
                      .map((y) => y.value)}
                  </td>
                  <td className="p-1 align-top">{item.objectiveDetailsOne}</td>
                  <td className="p-1 align-top">{item.employeeCommentOne}</td>
                  <td className="p-1 align-top">{item.managerCommentOne}</td>
                  <td className="p-1 align-top">{item.objectiveDetailsTwo}</td>
                  <td className="p-1 align-top">{item.employeeCommentTwo}</td>
                  <td className="p-1 align-top">{item.managerCommentTwo}</td>
                  <td className="p-1 align-top">
                    {item.objectiveDetailsThree}
                  </td>
                  <td className="p-1 align-top">{item.employeeCommentThree}</td>
                  <td className="p-1 align-top">
                    <span>{item.managerCommentThree}</span>
                  </td>
                  <td className="p-1 align-top">{item.objectiveDetailsFour}</td>
                  <td className="p-1 align-top">{item.employeeCommentFour}</td>
                  <td className="p-1 align-top">{item.managerCommentFour}</td>
                  <td className="p-1 align-top">{item.ambitiousAnswer2}</td>
                  <td className="p-1 align-top">{item.ambitiousReply}</td>
                  <td className="p-1 align-top">{item.consistentAnswer2}</td>
                  <td className="p-1 align-top">{item.consistentReply}</td>
                  <td className="p-1 align-top">{item.positiveAnswer2}</td>
                  <td className="p-1 align-top">{item.positiveReply}</td>
                  <td className="p-1 align-top">{item.innovationComment}</td>
                  <td className="p-1 align-top">{item.innovationReply}</td>
                  <td className="p-1 align-top">{item.leadsComment}</td>
                  <td className="p-1 align-top">{item.leadsReply}</td>
                  <td className="p-1 align-top">{item.resultComment}</td>
                  <td className="p-1 align-top">{item.resultReply}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompleteList;
