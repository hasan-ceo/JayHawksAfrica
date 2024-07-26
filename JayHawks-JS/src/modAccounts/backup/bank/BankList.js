import React from "react";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import EditButton from "../..//components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";

const BankList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("banks", "/accounts/banks/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Banks List" btn="Save" path="/accounts/banks/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Bank Name" />
          <ListHeader label="Account Number" />
          <ListHeader label="Currency" />
          <ListHeader label="Address" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.Id}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Bank Name : " value={item.name} />
              <ListCol label="Account Number :" value={item.accountNumber} />
              <ListCol label="Currency : " value={item.currency} />
              <ListCol label="Address : " value={item.address} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton path={`/accounts/banks/edit/${item.Id}`} />
                  <DeleteButton
                    action={refetch}
                    path={`/accounts/banks/delete/${item.Id}`}
                  />
                </div>
              </div>
            </div>
          ))}
        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankList;
