import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const SubHeadList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("subhead", "/subhead/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Account Sub Head"
        btn="Save"
        path={"/ac/settings/subhead/add"}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Account Type" />
          <ListHeader label="Main Head Name" />
          <ListHeader label="Sub Head Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.subHeadId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Account Type : " value={item.accountType} />
              <ListCol label="Main Head Name : " value={item.mainHeadName} />
              <ListCol label="Sub Head Name : " value={item.subHeadName} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/ac/settings/subhead/edit/${item.subHeadId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/subhead/delete/${item.subHeadId}`}
                />
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

export default SubHeadList;
