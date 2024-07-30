import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import EditButton from "../../components/button/EditButton";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { format } from "date-fns";

const AuditDepartmentReportList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "hrAuditBranchDepartmentAuditReport",
    "/auditBranchDepartmentAuditReport/list"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Department Audit Report"
        btn="Save"
        path="/audit/AuditDepartmentReport/add"
      />
      <div className="overflow-auto h-96">
        <table className="table-auto border-collapse rounded-md text-xs w-full">
          <thead className="bg-gray-300 text-primary">
            <tr className="text-center">
              <th className="text-center flex w-32"></th>
              <th className="p-2 text-center whitespace-nowrap">Year</th>
              <th className="p-2 text-center whitespace-nowrap">
                Reporting Quarter
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Month Of Audit
              </th>
              <th className="p-2 text-center whitespace-nowrap">Department</th>
              <th className="p-2 text-center whitespace-nowrap">Branch</th>
              <th className="p-2 text-center whitespace-nowrap">Region</th>
              <th className="p-2 text-center whitespace-nowrap">
                Branch Overview
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Area Of Review
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Detailed Audit Finding
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Primary Root Cause
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Risk Implication
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Recommendations
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Implemented By
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Risk Category
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Branch Response
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Management Response
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Commitment Date
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Overall Controls Assessment
              </th>
              <th className="p-2 text-center whitespace-nowrap">Fraud Risk</th>
              <th className="p-2 text-center whitespace-nowrap">
                Repeat Finding
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                Follow Up Comment If Any
              </th>
              <th className="p-2 text-center whitespace-nowrap">
                IA In Charge
              </th>
              <th className="p-2 text-center whitespace-nowrap">Appendices</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {list.data.length > 0 &&
              list.data.map((item) => (
                <tr
                  key={item.reportId}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 flex justify-between align-top text-center">
                    <EditButton
                      path={`/audit/auditBranchDepartmentAuditReport/edit/${item.reportId}`}
                      btnColor="btn-gray"
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/auditBranchDepartmentAuditReport/delete/${item.reportId}`}
                    />
                  </td>
                  <td className="p-2 align-top text-center">{item.year}</td>
                  <td className="p-2 align-top text-center">
                    {item.reportingQuarter}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.monthOfAudit}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.departmentName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.branchName}
                  </td>
                  <td className="p-2 align-top text-center">{item.region}</td>
                  <td className="p-2 align-top text-center">
                    {item.branchOverview}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.areaOfreview}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.detailedAuditFinding}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.primaryRootCause}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskImplication}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.recommendations}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.employeeName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.riskCategory}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.branchResponse}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.managementResponse}
                  </td>
                  <td className="p-2 align-top text-center">
                    {format(new Date(item.commitmentDate), "dd/MMM/yyyy")}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.overallControlsAssessment}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.fraudRisk}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.repeatFinding}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.followUpCommentIfAny}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.iaInCharge}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.appendices}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditDepartmentReportList;
