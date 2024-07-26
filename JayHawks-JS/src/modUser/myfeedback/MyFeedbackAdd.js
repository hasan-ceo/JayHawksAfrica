import React from "react";
import TopHeader from "../../components/TopHeader";
import MyFeedbackForm from "./MyFeedbackForm";

const MyFeedbackAdd = () => {
  const defaultValues = {
    feedbackType: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Feedback Create" btn="Return" path="/my/feedback" />
      <MyFeedbackForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/myfeedback/create"
        returnPath="/my/feedback"
      />
    </div>
  );
};

export default MyFeedbackAdd;
