import React from "react";
import { useParams } from "react-router-dom";
import AuditInfo from "../auditCreation/AuditInfo";
import PreviewButton from "../../components/button/PreviewButton";
import TopHeader from "../../components/TopHeader";
import LinkButton from "../../components/button/LinkButton";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";

const Checklist = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("auditchecklist", "/auditAreas/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Audit Check List" />
      <div className="grid grid-cols-2">
        <AuditInfo id={id} />
        <div className="flex justify-end space-x-2">
          <PreviewButton path={`/audit/preview/${id}`} />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      
        <LinkButton
          btnText="Branch/ Office operation and set up"
          path={`/audit/checkdetails/${id}/1`}
        />
        <LinkButton
          btnText="Office licenses"
          path={`/audit/checkdetails/${id}/2`}
        />
        <LinkButton btnText="Cash" path={`/audit/checkdetails/${id}/3`} />
        <LinkButton btnText="Bank" path={`/audit/checkdetails/${id}/4`} />
        <LinkButton
          btnText="Fund transfers"
          path={`/audit/checkdetails/${id}/5`}
        />
        <LinkButton
          btnText="Loans and advances"
          path={`/audit/checkdetails/${id}/6`}
        />
        <LinkButton
          btnText="Risk cover for Death case clients"
          path={`/audit/checkdetails/${id}/7`}
        />
        <LinkButton btnText="Over dues" path={`/audit/checkdetails/${id}/8`} />
        <LinkButton
          btnText="Group Management"
          path={`/audit/checkdetails/${id}/9`}
        />
        <LinkButton btnText="Passbooks" path={`/audit/checkdetails/${id}/10`} />
        <LinkButton btnText="Expenses" path={`/audit/checkdetails/${id}/11`} />
        <LinkButton
          btnText="UMIS/ Information Technology"
          path={`/audit/checkdetails/${id}/12`}
        />
        <LinkButton
          btnText="Books of accounts/ registers"
          path={`/audit/checkdetails/${id}/13`}
        />
        <LinkButton
          btnText="Human Resources"
          path={`/audit/checkdetails/${id}/14`}
        />
        <LinkButton
          btnText="Health and Safety"
          path={`/audit/checkdetails/${id}/15`}
        />
        <LinkButton
          btnText="Fixed Assets"
          path={`/audit/checkdetails/${id}/16`}
        />
        <LinkButton
          btnText="Branch monitoring/ Supervision status"
          path={`/audit/checkdetails/${id}/17`}
        />
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div key={index}>
              <LinkButton
                btnText={`${item.auditAreaName}`}
                path={`/audit/checkdetails/${id}/${item.auditAreaId}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Checklist;
