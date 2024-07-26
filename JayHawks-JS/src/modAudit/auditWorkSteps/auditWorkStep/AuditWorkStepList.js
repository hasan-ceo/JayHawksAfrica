import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import EditButton from "../../../components/button/EditButton";
import { format } from "date-fns";
// import { AiOutlineFile } from "react-icons/ai";

const AuditWorkStepList = ({ auditId, auditAreaId }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "auditworksteps",
    `/auditworksteps/list/${auditId}/${auditAreaId}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title={
          list.data.length > 0
            ? `${list.data[0].auditAreaName}`
            : "No Data Found"
        }
        btn="Return"
        path={`/audit/checklist/${auditId}`}
      />
      <div className="overflow-auto h-auto">
        <table className="table-fixed border-collapse rounded-md text-xs">
          <thead className="bg-gray-300 text-primary">
            <tr className="text-center h-24">
              <th></th>

              <th className="p-2 -rotate-45">Audit Year</th>
              <th className="px-20 -rotate-45">Audit Test Steps</th>
              <th className="p-2 -rotate-45">Testing Date</th>
              <th className="p-2 -rotate-45">Sampled Month</th>
              <th className="p-2 -rotate-45">Audit Period</th>
              <th className="p-2 -rotate-45">Selection Method</th>
              <th className="p-2 -rotate-45">Control Frequency</th>
              <th className="p-2 -rotate-45">Sample Size</th>
              <th className="p-2 -rotate-45">Population Size</th>
              <th className="p-2 -rotate-45">Test Results</th>
              <th className="p-2 -rotate-45">Overall Test Conclusion</th>
              
              {/* <th className="p-2 -rotate-45">Finding</th>
              <th className="p-2 -rotate-45">Cause</th>
              <th className="p-2 -rotate-45">Implication</th>
              <th className="p-2 -rotate-45">Recommendation</th>
              <th className="p-2 -rotate-45">Branch Response</th>
              <th className="p-2 -rotate-45">Implementation Date</th>
              <th className="p-2 -rotate-45">Management Action</th>
              <th className="p-2 -rotate-45">Exceptions</th>
              <th className="p-2 -rotate-45">Test Evidences</th> */}
            </tr>
          </thead>
          <tbody>
            {list.data.length > 0 &&
              list.data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-2 flex align-top">
                    <EditButton
                      path={`/audit/amRmMonitoring/edit/${item.auditWorkListId}`}
                    />
                  </td>

                  <td className="p-2 align-top">{item.auditYear}</td>
                  <td className="p-2 md:pr-2 align-top ">
                    {item.testStepsName}
                  </td>
                  <td className="p-2 align-top">
                    {format(new Date(item.testingDate), "dd/MMM/yyyy")}
                  </td>
                  <td className="p-2 align-top">
                    {format(new Date(item.sampledMonth), "dd/MMM/yyyy")}
                  </td>
                  <td className="p-2 align-top">{item.auditPeriod}</td>
                  <td className="p-2 align-top">{item.selectionMethod}</td>
                  <td className="p-2 align-top">{item.controlFrequency}</td>
                  <td className="p-2 align-top">{item.sampleSize}</td>
                  <td className="p-2 align-top">{item.populationSize}</td>
                  <td className="p-2 align-top">{item.testResults}</td>
                  <td className="p-2 align-top">
                    {item.overallTestConclusion}
                  </td>
                   {/* <td className="p-2 align-top">{item.finding}</td>
                  <td className="p-2 align-top">{item.cause}</td>
                  <td className="p-2 align-top">{item.implication}</td>
                  <td className="p-2 align-top">{item.recommendation}</td>
                  <td className="p-2 align-top">{item.branchResponse}</td>
                  <td className="p-2 align-top">
                    {item.testResults === "Fail" &&
                      format(new Date(item.implementationDate), "dd/MMM/yyyy")}
                  </td>
                  <td className="p-2 align-top">{item.managementAction}</td> 
                  <td className="p-2 align-top">
                    {item.exceptions !== "" ? (
                      <a
                        href={item.exceptions}
                        className="btn-success w-12 h-10"
                      >
                        <AiOutlineFile size={24} />
                      </a>
                    ) : (
                      item.testResults === "Fail" && <> File Not Attached</>
                    )}
                  </td> */}
                  {/* <td className="p-2 align-top">{item.testEvidences}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditWorkStepList;
