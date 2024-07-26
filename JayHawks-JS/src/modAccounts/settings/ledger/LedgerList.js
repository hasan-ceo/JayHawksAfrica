import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const LedgerList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("ledger", "/ledger/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Ledger" btn="Save" path={"/ac/settings/ledger/add"} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Main Head Name" />
          <ListHeader label="Sub Head Name" />
          <ListHeader label="Ledger Code" />
          <ListHeader label="Ledger Name" />
          <ListHeader label="Description" />
          <ListHeader label="Location" />
          <ListHeader label="Project" />
          <ListHeader label="Active" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.ledgerId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Main Head Name : " value={item.mainHeadName} />
              <ListCol label="Sub Head Name : " value={item.subHeadName} />
              <ListCol label="Ledger Code : " value={item.ledgerCode} />
              <ListCol label="Ledger Name : " value={item.ledgerName} />
              <ListCol label="Descriptions : " value={item.descriptions} />
              <ListCol label="Location : " value={item.locationName} />
              <ListCol label="Project : " value={item.projectName} />
              <ListCol label="Active : " value={item.isActive} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/ac/settings/ledger/edit/${item.ledgerId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/ledger/delete/${item.ledgerId}`}
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

export default LedgerList;
