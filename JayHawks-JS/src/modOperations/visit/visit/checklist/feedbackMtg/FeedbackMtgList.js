import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import EditButton from "../../../../../components/button/EditButton";
import DeleteButton from "../../../../../components/button/DeleteButton";
import ImageView from "./ImageView";

function FeedbackMtgList({ id, isSubmit }) {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allFeedback", `/allFeedback/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader
        title="8. Have you done the feedback meeting (30 minutes meeting) before leaving the branch:"
        btn={list.data.length === 0 && isSubmit === 0 ? "Save" : ""}
        path={`/ops/allVisit/feedbackMsg/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader className="md:pr-2" label="Issues Discussed " />
          <ListHeader className="md:pr-2" label="Specific Feedback Given " />
          <ListHeader className="md:pr-2" label="Remarks" />
          <ListHeader className="md:pr-2" label="Name of Attendees" />
          <ListHeader label="Signature" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol
                className="md:pr-2"
                label="Issues Discussed : "
                // value={item.discussedIssues}
                value={item.discussedIssues.split(/,|\n/).map((issue, i) => (
                  <div key={i}>{issue}</div>
                ))}
              />
              <ListCol
                className="md:pr-2"
                label="Specific feedback Given :"
                // value={item.givenFeedback}
                value={item.givenFeedback.split(/,|\n/).map((feedback, i) => (
                  <div key={i}>{feedback}</div>
                ))}
              />
              <ListCol
                className="md:pr-2"
                label="Remarks :"
                // value={item.remarks}
                value={item.remarks.split(/,|\n/).map((remark, i) => (
                  <div key={i}>{remark}</div>
                ))}
              />
              <ListCol
                className="md:pr-2"
                label="Name of Attendees : "
                // value={item.nameOfAttendees}
                value={item.nameOfAttendees.split(/,|\n/).map((attendee, i) => (
                  <div key={i}>{attendee}</div>
                ))}
              />

              <div>
                <ImageView imageUrl={item.imageUrl} />
              </div>
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/allVisit/feedbackMsg/edit/${item.allFeedbackId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/allFeedback/delete/${item.allFeedbackId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FeedbackMtgList;
