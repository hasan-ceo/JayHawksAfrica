import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import EditButton from "../../components/button/EditButton";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
// import { format } from "date-fns";

const AuditSpecialInvestigationReportList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "hrAuditSpecialInvestigationAuditReport",
    "/auditSpecialInvestigationAuditReport/list"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation Audit Report"
        btn="Save"
        path="/audit/AuditSpecialInvestigationReport/add"
      />
      <div className="overflow-auto h-96">
        <table className="table-auto border-collapse rounded-md text-xs w-full">
          <thead className="bg-gray-300 text-primary">
            <tr className="text-center">
              <th className="text-center flex w-32"></th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Year
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Reporting Quarter
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Month Of Audit
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Department
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Branch
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Region
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Detection Method
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Type of Fraud
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Who might be involved?
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Position of Fraudster
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                How is the fraud being perpetrated?
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Number of occurrences
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Potential Witness
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Statements
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Evidence
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Observations
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Defective controls identified
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Estimated fraud loss
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Recommendations
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Management Response
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                Implemented by
              </th>
              <th className="p-2 transform  whitespace-nowrap text-center">
                IA InCharge
              </th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>
            {list.data.length > 0 &&
              list.data.map((item) => (
                <tr
                  key={item.specialInvestigationAuditReportId}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 flex justify-between align-top text-center">
                    <EditButton
                      path={`/audit/AuditSpecialInvestigationAuditReport/edit/${item.specialInvestigationAuditReportId}`}
                      btnColor="btn-gray"
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/AuditSpecialInvestigationAuditReport/delete/${item.specialInvestigationAuditReportId}`}
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
                    {item.detectionMethod}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.typeOfFraud}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.whoMightBeInvolved}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.positionOfFraudster}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.howIsTheFraudBeingPerpetrated}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.numberOfOccurences}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.potentialWitness}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.statements}
                  </td>
                  <td className="p-2 align-top text-center">{item.evidence}</td>
                  <td className="p-2 align-top text-center">
                    {item.observations}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.defectiveControlsIdentified}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.estimatedFraudLoss}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.recommendations}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.managementResponse}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.employeeName}
                  </td>
                  <td className="p-2 align-top text-center">
                    {item.iaInCharge}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditSpecialInvestigationReportList;
