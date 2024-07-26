import React, { Fragment, useState } from "react";
import { AiOutlineRedo } from "react-icons/ai";
import { usePostData } from "../../hooks/dataApi";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";

// const schema = yup.object({
//   allVisitId: yup.string().max(50),
// });
const ReopenButton = ({ action, allVisitId }) => {
  const [setSubmitting] = useState(false);

  const { mutateAsync, reset } = usePostData();

  // const {
  //   // register,
  //   // handleSubmit,
  //   // control,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: { closeRemarks: "" },
  //   resolver: yupResolver(schema),
  // });

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("allVisitId", allVisitId);

    try {
      const { status } = await mutateAsync({
        path: `/allVisit/reopen`,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        // navigate(returnPath);
      }
      if (status === 204) {
        toast.success("Successfully Reopen!");
        // navigate(returnPath);
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
      action();
      setSubmitting(false);
    }
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="btn-success w-12 h-10"
        onClick={() => {
          openModal();
        }}
      >
        <AiOutlineRedo size={24} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-12 my-8 overflow-hidden text-left align-middle transition-all transform bg-lighter shadow-xl rounded-2xl">
                <div className="flex flex-col items-center justify-center">
                  <h3 className="mb-5 text-xl text-gray-800  font-medium">
                    Are you sure you want to Re-open this visit? This item will
                    be open immediately.
                  </h3>
                  <div className="flex space-x-2">
                    <button className="w-24 btn-success" onClick={onSubmit}>
                      Yes
                    </button>
                    <button className="w-24 btn-danger" onClick={closeModal}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ReopenButton;
