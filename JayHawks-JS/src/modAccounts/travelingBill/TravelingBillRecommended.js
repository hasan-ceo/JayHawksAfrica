import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
// import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import TopHeader from "../../components/TopHeader";
import TaskButton from "../../components/button/TaskButton";

const TravelingBillRecommended = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "PendingTravelingBillApplicationslist",
    "/pendingTravelingBillApplications/recommendedlist/"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Traveling Recommended" />
      {/* <SearchHeader placeholder="PIN / Name" action={setQuery} /> */}
      <div className="overflow-auto h-96">
        <table className="table-fixed border-collapse rounded-md text-xs">
          <thead className="bg-gray-300 text-primary">
            <tr className="text-center h-10">
              <th className="p-3">Branch</th>
              <th className="p-3">Department</th>
              <th className="p-3">PIN</th>
              <th className="p-3">Employee Name</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Date</th>

              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Recommended By</th>
              <th className="p-3"> </th>
            </tr>
          </thead>
          <tbody>
            {list.data.length > 0 &&
              list.data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-umojablue hover:text-white odd:bg-gray-100 even:bg-gray-200"
                >
                  <td className="p-3 align-top">{item.branchName}</td>
                  <td className="p-3 align-top">{item.departmentName}</td>
                  <td className="p-3 align-top">{item.employeePin}</td>
                  <td className="p-3 align-top">{item.employeeName}</td>
                  <td className="p-3 align-top">{item.designationName}</td>
                  <td className="p-3 align-top">
                    {format(new Date(item.travelingDate), "dd/MMM/yyyy")}
                  </td>
                  <td className="p-3 align-top">{item.from}</td>
                  <td className="p-3 align-top">{item.to}</td>
                  <td className="p-3 align-top">{item.totalAmount}</td>
                  <td className="p-3 align-top">{item.description}</td>
                  <td className="p-3 align-top">{item.status}</td>
                  <td className="p-3 align-top">{item.authorityName}</td>
                  <div className="flex justify-end space-x-2 mt-1">
                    <TaskButton
                      path={`/ac/traveling/recommended/comments/${item.travelingId}`}
                    />
                  </div>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TravelingBillRecommended;
