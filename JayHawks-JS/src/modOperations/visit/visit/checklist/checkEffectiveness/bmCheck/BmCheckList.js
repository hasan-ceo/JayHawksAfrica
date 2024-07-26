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

const BmCheckList = ({ id, isSubmit, isManager, isBm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allBmEffectivenesslist", `/allBmEffectiveness/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  // console.log(list.data);

  return (
    <>
      <TopHeader
        title="a) Effectiveness of BM visit "
        btn={isSubmit === 0 ? "Save" : ""}
        // btn={isSubmit === 1 && isBm === true ? "Save" : ""}
        path={`/ops/allVisit/checkeffective/bm/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader className="md:pr-2" label="Strength " />
          <ListHeader className="md:pr-2" label="Weakness" />
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
                    path={`/ops/allVisit/checkeffective/bm/edit/${item.allBmEffectId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/allBmEffectiveness/delete/${item.allBmEffectId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default BmCheckList;
