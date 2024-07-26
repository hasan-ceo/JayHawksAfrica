import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import { format } from "date-fns";
import TopHeader from "../../../../components/TopHeader";
import { useParams } from "react-router-dom";

const DepartmentalInvestigationInfo = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrDepartment", "/AuditDpInvestigation/DepartmentalInvestigationInfo/"+id);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Departmental audit"
        btn="Return"
        path={`/audit/departmentalInvestigationreport/list`}
      />
      <div className="grid grid-cols-1 gap-1">
        <div className="">
          <span className="font-bold">Branch:</span> {data.branchName}
        </div>
        <div className="">
          <span className="font-bold">Department:</span> {data.departmentName}
        </div>

        {data.investigationDate !== "1980-12-31T00:00:00" ? (
          <div className="">
            <span className="font-bold">Date:</span>{" "}
            {format(new Date(data.investigationDate), "dd/MMM/yyyy")}
          </div>
        ) : (
          <div className="">Investigation Date</div>
        )}
      </div>
    </div>
  );
};
export default DepartmentalInvestigationInfo;
