import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import LocationForm from "./LocationForm";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const LocationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("locationdetails", `/location/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Location"
        btn="Return"
        path="/ac/settings/location/list"
      />
      <LocationForm
        defaultValues={{
          locationId: list.data.locationId,
          locationName: list.data.locationName,
        }}
        action={refetch}
        btnText="Update"
        path="/location/update"
        returnPath="/ac/settings/location/list"
      />
    </div>
  );
};

export default LocationEdit;
