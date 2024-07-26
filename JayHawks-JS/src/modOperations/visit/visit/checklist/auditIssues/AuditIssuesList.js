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

function AuditIssuesList({ id, isSubmit, isManager, isBm }) {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "allSettlementAuditIssues",
    `/allSettlementAuditIssues/list/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader
        title="6.	Settlement of Audit Issues:"
        btn={isSubmit === 0 ? "Save" : ""}
        path={`/ops/allvisit/auditIssue/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader className="md:col-span-2" label="Issues" />
          <ListHeader label="Is Settled" />
          <ListHeader
            className="md:col-span-2 md:pr-2"
            label="Pending Reason"
          />
          <ListHeader className="md:col-span-3 md:pr-2" label="BM Comments" />
          <ListHeader className="md:col-span-3" label="Supervisor Comments" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 list-body">
              <ListCol
                className="md:col-span-2"
                label="Issues :"
                value={item.issues}
              />
              <ListCol
                className="md:text-center"
                label="Is Settled :"
                value={item.isSettled}
              />
              <ListCol
                className="md:col-span-2 md:pr-2"
                label="Pending Reason :"
                value={item.pendingReason}
              />
              <ListCol
                className="md:col-span-3 md:pr-2"
                label="Comments Of BM :"
                value={item.bmComments}
              />
              <ListCol
                className="md:col-span-3"
                label="Comments Of Supervisor:"
                value={item.supervisorComments}
              />

              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/allvisit/auditIssue/edit/${item.seAuditIssueId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/allSettlementAuditIssues/delete/${item.seAuditIssueId}`}
                  />
                </div>
              )}
              {isSubmit === 1 && isBm === true && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/allvisit/auditIssue/bm/edit/${item.seAuditIssueId}`}
                  />
                </div>
              )}
              {isSubmit === 1 && isManager === true && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/allvisit/auditIssue/supervisor/edit/${item.seAuditIssueId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AuditIssuesList;
