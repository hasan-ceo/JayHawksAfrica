import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import TopHeader from "../../components/TopHeader";
import { format } from "date-fns";
import TaskButton from "../../components/button/TaskButton";
import CloseButton from "../../components/button/CloseButton";

const InvestigationList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", "/spInvestigation/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation"
        btn="Save"
        path="/audit/investigation/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Title" />
          <ListHeader label="Branch" />
          <ListHeader label="Department Name" />
          <ListHeader label="Investigation Date" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.investigationId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Title:" value={item.title} />
              <ListCol label="Branch" value={item.branchName} />
              <ListCol label="Department Name:" value={item.departmentName} />
              <ListCol
                label="Investigation Date:"
                value={format(new Date(item.investigationDate), "dd/MMM/yyyy")}
              />
              <div className="flex justify-end space-x-2">
                {item.status !== "Audit Close" && (
                  <>
                    <TaskButton
                      path={`/audit/investigation/details/${item.investigationId}`}
                    />
                    <EditButton
                      path={`/audit/investigation/edit/${item.investigationId}`}
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/SpInvestigation/delete/${item.investigationId}`}
                    />
                    <CloseButton
                      action={() => {
                        refetch();
                      }}
                      path={`/spInvestigation/statusupdate/${item.investigationId}`}
                    />
                  </>
                )}
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL: {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationList;
