import React from "react";
import TopHeader from "../../../components/TopHeader";
import LocationForm from "./LocationForm";

const LocationAdd = () => {
  const defaultValues = {
    locationId: "",
    locationName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Location"
        btn="Return"
        path="/ac/settings/location/list"
      />
      <LocationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/location/create"
        returnPath="/ac/settings/location/list"
      />
    </div>
  );
};

export default LocationAdd;
