import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import TopHeader from "../../components/TopHeader";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import AuditInfo from "../auditCreation/AuditInfo";
import AttachmentButton from "../../components/button/AttachmentButton";

const CloseObservationsList = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("auditObservations", `/auditObservations/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Audit Observations List" />
      <AuditInfo id={id} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10  list-header">
          <ListHeader label="Audit Area" />
          <ListHeader label="Details" />
          <ListHeader label="Root Cause" />
          <ListHeader label="Risk Rating" />
          <ListHeader label="Risk Implication" />
          <ListHeader label="Recommendations" />
          <ListHeader label="Management comments" />
          <ListHeader label="Issue owner" />
          <ListHeader label="Action Date" />
          <ListHeader label="Attachment" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.observationsId}
              className="grid grid-cols-1 md:grid-cols-10 list-body"
            >
              <ListCol label="Audit Area:" value={item.auditArea} />
              <ListCol label="Details:" value={item.details} />
              <ListCol label="Root Cause:" value={item.rootCause} />
              <ListCol label="Root Rating:" value={item.riskRating} />
              <ListCol label="Risk Implication:" value={item.riskImplication} />
              <ListCol label="Recommendations:" value={item.recommendations} />
              <ListCol
                label="Management Comments:"
                value={item.managementComments}
              />
              <ListCol label="Issue Owner:" value={item.issueOwner} />
              <ListCol
                label="Action Date:"
                value={format(new Date(item.actionDate), "dd/MMM/yyyy")}
              />
              <div className="flex justify-end space-x-2">
                {item.attachment && <AttachmentButton path={item.attachment} />}
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseObservationsList;
