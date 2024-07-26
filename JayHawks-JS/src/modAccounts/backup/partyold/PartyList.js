import React from "react";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";

import { useGetData } from "../../hooks/dataApi";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";

const PartyList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("partiesList", "/parties/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="পার্টি তালিকা" btn="Save" path="/setup/party/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="নাম" />
          <ListHeader label="ইমেইল" />
          <ListHeader label="মোবাইল নং" />
          <ListHeader label="ঠিকানা" />
          <ListHeader label="" />
        </div>
        {list.data.map((item) => (
          <div
            key={item.partyId}
            className="grid grid-cols-1 md:grid-cols-5 list-body"
          >
            <ListCol label="নাম : " value={item.partyName} />
            <ListCol label="ইমেইল : " value={item.email} />
            <ListCol label="মোবাইল নং : " value={item.contactNumber} />
            <ListCol label="ঠিকানা : " value={item.address} />
            <div>
              <div className="flex justify-end space-x-2">
                <EditButton path={`/setup/party/edit/${item.partyId}`} />
                <DeleteButton
                  action={refetch}
                  path={`/parties/delete/${item.partyId}`}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="list-footer">
          <div className="flex justify-center">
            <span className="font-semibold">মোট : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyList;
