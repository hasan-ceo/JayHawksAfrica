import React from "react";
import TopHeader from "../../../components/TopHeader";
import ProjectForm from "./ProjectForm";

const ProjectAdd = () => {
  const defaultValues = {
    projectId: "",
    projectName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Project"
        btn="Return"
        path="/ac/settings/project/list"
      />
      <ProjectForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/project/create"
        returnPath="/ac/settings/project/list"
      />
    </div>
  );
};

export default ProjectAdd;
