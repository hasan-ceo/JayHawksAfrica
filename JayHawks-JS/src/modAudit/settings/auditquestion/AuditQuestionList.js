import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const AuditQuestionList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("settingsauditQuestion", "/auditQuestion/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Question"
        btn="Save"
        path="/audit/settings/question/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Audit Area Name" />
          <ListHeader label="Question Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.auditQuestionId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Audit Area Name:" value={item.auditAreaName} />
              <ListCol label="Question Name:" value={item.questionName} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/audit/settings/question/edit/${item.auditQuestionId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/auditQuestion/delete/${item.auditQuestionId}`}
                  />
                </div>
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

export default AuditQuestionList;
