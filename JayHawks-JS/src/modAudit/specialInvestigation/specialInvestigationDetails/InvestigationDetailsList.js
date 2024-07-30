import React from "react";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import EditButton from "../../../components/button/EditButton";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const InvestigationDetailsList = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("evaluationdetailsinfo", `/spInvestigation/detailsList/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data;

  return (
    <div className="card w-full max-w-screen-xl mt-2">
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Guideline" />
          <ListHeader label="Test Steps " />
          <ListHeader label="Evidences " />
          <ListHeader label="Report inputs" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.investigationDetailsId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Guideline :" value={item.guideline} />
              <ListCol label="Test Steps:" value={item.testSteps} />
              <ListCol label="Evidences " value={item.evidences} />
              <ListCol label="Report Inputs " value={item.reportInputs} />

              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/audit/investigation/details/edit/${item.investigationDetailsId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationDetailsList;
