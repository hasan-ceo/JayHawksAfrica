import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import Clock from "../../../modUser/dashboard/Clock";

const BusinessDay = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("BusinessDay", "/acDay/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  // const data = list.data;

  return (
    <div className="">
      {list.data.length > 0 ? (
        <div>
          {list.data[0].status === "Day Open" ? (
            <p className=" font-bold text-xs md:text-base leading-0 ">
              Business Date Open:{" "}
              <span className="text-green-600">
                {" "}
                {format(new Date(list.data[0].businessDate), "dd-MMM-yyyy")}
              </span>
            </p>
          ) : (
            <p className=" font-bold ">
              Business Date Closed:{" "}
              <span className="text-red-500">
                {format(new Date(list.data[0].businessDate), "dd-MMM-yyyy")}
              </span>
            </p>
          )}
        </div>
      ) : (
        <Clock />
      )}
    </div>
  );
};

export default BusinessDay;
