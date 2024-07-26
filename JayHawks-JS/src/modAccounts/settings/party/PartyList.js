import React from "react";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";

const PartyList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("party", "/parties/list");

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Party" btn="Save" path="/ac/settings/party/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Party Name" />
          <ListHeader label="Email Address" />
          <ListHeader label="Contact Number" />
          <ListHeader label="Address" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.partyId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Party Name :" value={item.partyName} />
              <ListCol label="Email Address :" value={item.email} />
              <ListCol label="Contact Number :" value={item.contactNumber} />
              <ListCol label="Address :" value={item.contactAddress} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ac/settings/party/edit/${item.partyId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/parties/delete/${item.partyId}`}
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

export default PartyList;
