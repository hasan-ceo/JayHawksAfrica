import React from "react";
import TopHeader from "../../../../../../components/TopHeader";
import { HashLoading } from "../../../../../../components/Loading";
import Error from "../../../../../../components/Error";
import { useGetData } from "../../../../../../hooks/dataApi";
import {
  ListCol,
  ListHeader,
} from "../../../../../../components/ListColWithHeader";
import EditButton from "../../../../../../components/button/EditButton";
import DeleteButton from "../../../../../../components/button/DeleteButton";

const RmCheckList = ({ id, isSubmit, isManager }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/allRmEffectiveness/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <TopHeader
        title="c) Effectiveness of RM visit "
        btn={isSubmit === 0 ? "Save" : ""}
        // btn={isSubmit === 1 && isManager === true ? "Save" : ""}
        path={`/ops/allVisit/checkeffective/rm/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader className="md:pr-2" label="Strength " />
          <ListHeader className="md:pr-2" label="Weakless" />
          <ListHeader label="Action Taken" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 list-body">
              <ListCol
                className="md:pr-2"
                label="Strength:"
                value={item.strength}
              />
              <ListCol
                className="md:pr-2"
                label="Weakless:"
                value={item.weakness}
              />
              <ListCol label="Action Taken:" value={item.actionTaken} />

              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/allVisit/checkeffective/rm/edit/${item.allRmEffectId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/allRmEffectiveness/delete/${item.allRmEffectId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default RmCheckList;
