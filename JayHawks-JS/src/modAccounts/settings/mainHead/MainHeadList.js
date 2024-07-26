import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const MainHeadList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("mainheadlist", "/mainhead/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Account Main Head"
        btn="Save"
        path={"/ac/settings/mainhead/add"}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Account Type" />
          <ListHeader label="Main Head Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.mainHeadId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Account Type :" value={item.accountType} />
              <ListCol label="Main Head Name :" value={item.mainHeadName} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/ac/settings/mainhead/edit/${item.mainHeadId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/mainhead/delete/${item.mainHeadId}`}
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

export default MainHeadList;
