import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
// import EditButton from "../../components/button/EditButton";

const TicketList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("ticket", "/ticket/mylist");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Ticket" btn="Save" path="/ticket/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Token No" />
          <ListHeader label="Category" />
          <ListHeader label="Type" />
          <ListHeader label="Title" />
          <ListHeader label="Description" />
          <ListHeader label="Status" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.ticketId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol label="Token No:" value={item.tokenNo} />
              <ListCol label="Category:" value={item.categoryName} />
              <ListCol label="Type:" value={item.ticketType} />
              <ListCol label="Title:" value={item.title} />
              <ListCol label="Description:" value={item.description} />
              <ListCol label="Status:" value={item.status} />
              <div className="flex justify-end space-x-2">
                {/* <EditButton path={`/ticket/edit/${item.ticketId}`} /> */}
                <DeleteButton
                  action={refetch}
                  path={`/ticket/delete/${item.ticketId}`}
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

export default TicketList;
