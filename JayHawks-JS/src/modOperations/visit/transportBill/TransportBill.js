import React from "react";
import { menuOperations } from "../../../data/menuOperations";
import TopHeader from "../../../components/TopHeader";
import SettingsItem from "../../../components/layout/SettingsItem";

const TransportBill = () => {
  const data = menuOperations.travelingData;
  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <TopHeader title="Transport Bill" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.length > 0 &&
          data.map((item, index) => (
            <SettingsItem
              key={index}
              name={item.name}
              link={item.link}
              Icon={item.Icon}
            />
          ))}
      </div>
    </div>
  );
};

export default TransportBill;
