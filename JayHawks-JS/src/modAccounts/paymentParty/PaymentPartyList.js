import React from "react";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import TextButton from "../../components/button/TextButton";

const PaymentPartyList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("paymentParty", "/accountGl/paymentPartyList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Payment to Party List
        </h1>
        <div className="flex justify-end space-x-2">
          <TextButton path="/ac/paymentParty/byBank" title="By Bank" />
          <TextButton path="/ac/paymentParty/byCash" title="By Cash" />
        </div>
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Cash/Bank" />
          <ListHeader label="Head Name" />
          <ListHeader label="Amount" />
          <ListHeader label="Particulars" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.trnsId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Cash/Bank : " value={item.transType} />
              <ListCol label="Head Name : " value={item.headName} />
              <ListCol label="Amount : " value={item.dr} />
              <ListCol label="Particulars : " value={item.particulars} />
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

export default PaymentPartyList;
