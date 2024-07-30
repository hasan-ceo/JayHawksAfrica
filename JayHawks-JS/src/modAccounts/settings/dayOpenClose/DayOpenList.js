import React from "react";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import { format } from "date-fns";
import DayCloseButton from "../../components/layout/DayCloseButton";

const DayOpenList = ({ data, action }) => {
  return (
    <div className="list-wrapper">
      <div className="md:grid grid-cols-5 list-header gap-2">
        <ListHeader label="Current Date" />
        <ListHeader label="Business Date" />
        <ListHeader label="Closed Time" />
        <ListHeader label="Status" />
        <ListHeader label="" />
      </div>

      {data.length > 0 &&
        data.slice(0, 30).map((item) => (
          <div
            key={item.dayOpenCloseId}
            className="grid grid-cols-1 md:grid-cols-5 list-body gap-1 text-xs items-center"
          >
            <ListCol
              label="Current Date: "
              value={format(new Date(item.currentDate), "dd/MMM/yyyy")}
            />
            <ListCol
              label="Business Date: "
              value={format(new Date(item.businessDate), "dd/MMM/yyyy")}
            />
            {item.status !== "Day Open" ? (
              <ListCol
                label="Closed Time: "
                value={format(new Date(item.currentDate), "hh:mm:ss a")}
              />
            ) : (
              <ListCol label="Closed Time: " value="" />
            )}

            {item.status === "Day Closed" && (
              <ListCol
                className="text-red-600"
                label="Status : "
                value={item.status}
              />
            )}

            {item.status === "Day Open" && (
              <>
                <ListCol
                  className="text-green-600"
                  label="Status : "
                  value={item.status}
                />

                <DayCloseButton
                  path={`/acDay/DayClose/${item.dayOpenCloseId}`}
                  action={action}
                />
              </>
            )}
          </div>
        ))}

      <div className="list-footer">
        <div className="col-span-10"></div>
        <div className="flex justify-center">
          <span className="font-semibold">
            Total : {data.slice(0, 30).length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DayOpenList;
