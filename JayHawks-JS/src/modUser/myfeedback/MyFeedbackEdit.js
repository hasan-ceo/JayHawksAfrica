import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import MyFeedbackForm from "./MyFeedbackForm";

const MyFeedbackEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrMyFeedback", `/notices/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit MyFeedback" btn="Return" path="/hr/notice/list" />
      <MyFeedbackForm
        defaultValues={{
          noticeId: list.data.noticeId,
          title: list.data.title,
          refLink: list.data.refLink,
          isPinned: list.data.isPinned,
        }}
        action={refetch}
        btnText="Update"
        path="/notices/update"
        returnPath="/hr/notice/list"
      />
    </div>
  );
};

export default MyFeedbackEdit;
