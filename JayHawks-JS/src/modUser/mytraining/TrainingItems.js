import React from "react";
import { AiOutlineLink } from "react-icons/ai";
//import { useNavigate } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
import { usePostData } from "../../hooks/dataApi";

function TrainingItems({ data }) {
  //const navigate = useNavigate();
  const { mutateAsync } = usePostData();

  const onSubmit = async (refLink, topicId) => {
    const path = "/topics/readbyuser";
    var formData = new FormData();
    formData.append("topicId", topicId);
    formData.append(
      "readDateTime",
      moment.utc(formData.readDateTime).local().format("YYYY-MM-DD hh:mm")
    );
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 201) {
        toast.success("Thank you!");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      if (refLink) window.location = refLink;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <div
          key={item.topicId}
          className="grid grid-cols-1 grid-rows-twoRowsReverse gap-1 content-start bg-gray-200 rounded-lg shadow-lg p-4"
        >
          <div>
            <div className="text-md">
              <span>Publish date: </span>
              {moment.utc(item.publishDate).local().format("DD-MMM-YYYY")}
            </div>
            <div className="text-sm md:text-lg font-bold">{item.title}</div>
          </div>

          <div className="border-t border-gray-300 pt-2">
            <button
              className="btn-umojayellow w-full"
              onClick={() => onSubmit(item.refLink, item.topicId)}
            >
              <span className="">
                <AiOutlineLink size={24} />
              </span>
              <span className="text-xs font-bold">Read and Received</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrainingItems;
