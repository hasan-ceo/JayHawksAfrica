import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import ProjectForm from "./ProjectForm";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const ProjectEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("project", `/project/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Project"
        btn="Return"
        path="/ac/settings/project/list"
      />
      <ProjectForm
        defaultValues={{
          projectId: list.data.projectId,
          projectName: list.data.projectName,
        }}
        action={refetch}
        btnText="Update"
        path="/project/update"
        returnPath="/ac/settings/project/list"
      />
    </div>
  );
};

export default ProjectEdit;
