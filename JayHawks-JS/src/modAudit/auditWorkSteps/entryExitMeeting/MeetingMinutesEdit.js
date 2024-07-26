import React from "react";
import { useParams } from "react-router-dom";

import MeetingMinutesForm from "./MeetingMinutesForm";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";

const MeetingMinutesEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditMeetingMinutes", `/auditMeetingMinutes/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Entry Exit Meeting Minutes"
        btn="Return"
        path={`/audit/checkdetails/${list.data.auditId}/1`}
      />
      <MeetingMinutesForm
        defaultValues={{
          meetingMinutesId: list.data.meetingMinutesId,
          auditId: list.data.auditId,
          auditYearId: list.data.auditYearId,
          auditYear: list.data.auditYear,
          particulars: list.data.particulars,
          fileUrl: list.data.fileUrl,
        }}
        action={refetch}
        btnText="Update"
        path="/auditMeetingMinutes/update"
        returnPath={`/audit/checkdetails/${list.data.auditId}/1`}
      />
    </div>
  );
};

export default MeetingMinutesEdit;
