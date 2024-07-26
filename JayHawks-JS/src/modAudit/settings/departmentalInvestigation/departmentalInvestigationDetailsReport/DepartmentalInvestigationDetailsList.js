import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import EditButton from "../../../../components/button/EditButton";

const DepartmentalInvestigationDetailsList = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("evaluationdetailsinfo", `/AuditDpInvestigation/detailsList/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  console.log(data);

  return (
    <div className="overflow-auto h-96">
      <table className="table-fixed border-collapse rounded-md text-xs w-full">
        <thead className="bg-gray-300 text-primary">
          <tr className="text-center h-28">
            <th className="text-center"></th>
            <th className="p-1 -rotate-45 text-center">Department Name</th>
            <th className="p-1 -rotate-45 text-center">Test Area</th>
            <th className="p-1 -rotate-45 w-60">Test Steps</th>
            <th className="p-1 -rotate-45 text-center">Sample Selection Method</th>
            <th className="p-1 -rotate-45 text-center">Control Frequency</th>
            <th className="p-1 -rotate-45 text-center">Population Size</th>
            <th className="p-1 -rotate-45 text-center">Sample Size</th>
            <th className="p-1 -rotate-45 text-center">Test Conclusion</th>
            {/* <th className="p-1 -rotate-45 text-center">Audit Finding</th>
            <th className="p-1 -rotate-45 text-center">Cause</th>
            <th className="p-1 -rotate-45 text-center">Implication</th>
            <th className="p-1 -rotate-45 text-center">Recommendation</th>
            <th className="p-1 -rotate-45 text-center">Control Owner Response</th>
            <th className="p-1 -rotate-45 text-center">Implementation Date</th>
            <th className="p-1 -rotate-45 text-center">Management Action</th>
            <th className="p-1 -rotate-45 text-center">Exceptions</th>
            <th className="p-1 -rotate-45 text-center">Evidences</th> */}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr
                key={item.investigationDetailsId}
                className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
              >
                <td className="p-1 flex align-top text-center">
                  <EditButton
                    path={`/audit/departmentalInvestigation/details/edit/${item.investigationDetailsId}`}
                    btnColor="btn-gray"
                  />
                </td>
                <td className="p-1 align-top text-center">{item.departmentName}</td>
                <td className="p-1 align-top text-center">{item.testArea}</td>
                <td className="p-1 align-top w-60">{item.testSteps}</td>
                <td className="p-1 align-top text-center">{item.sampleSelectionMethod}</td>
                <td className="p-1 align-top text-center">{item.controlFrequency}</td>
                <td className="p-1 align-top text-center">{item.populationSize}</td>
                <td className="p-1 align-top text-center">{item.sampleSize}</td>
                <td className="p-1 align-top text-center">{item.testConclusion}</td>
                {/* <td className="p-1 align-top text-center">{item.auditFinding}</td>
                <td className="p-1 align-top text-center">{item.cause}</td>
                <td className="p-1 align-top text-center">{item.implication}</td>
                <td className="p-1 align-top text-center">{item.recommendation}</td>
                <td className="p-1 align-top text-center">{item.controlOwnerResponse}</td>
                <td className="p-1 align-top text-center">
                  {format(new Date(item.implementationDate), "dd/MMM/yyyy")}
                </td>
                <td className="p-1 align-top text-center">{item.managementAction}</td>
                <td className="p-1 align-top text-center">{item.exceptions}</td>
                <td className="p-1 align-top text-center">{item.evidences}</td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentalInvestigationDetailsList;
