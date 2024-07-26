import React, { Fragment, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { usePostData } from "../../hooks/dataApi";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDoLHyOX0LV2PV9190R6I3RYEXaOPlGEh4",
  authDomain: "ukilsab-sms.firebaseapp.com",
  projectId: "ukilsab-sms",
  storageBucket: "ukilsab-sms.appspot.com",
  messagingSenderId: "182704194443",
  appId: "1:182704194443:web:17c661b9f836e72fa7a58e",
  measurementId: "G-0C04T57PDE"
};

const DeviceRegister = ({
  path = "/deviceregister/create",
  title = "Device Register",
  action,
}) => {
  const [token, setToken] = useState();
  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        getToken(messaging, {
          vapidKey:
            "BINEGakVxIFh43_tgHhmExpOTtmFPVgp2WEmCFYS6ql0JmUKLOzveHp4OFnYT6aIE5l2rG2MtFxlL8YfHvuL22A",
        }).then((currentToken) => {
          if (currentToken) {
            console.log("currentToken: ", currentToken);
            setToken(currentToken);
          } else {
            console.log("Can not get token");
          }
        });
      } else {
        console.log("Do not have permission!");
      }
    });
  }
  requestPermission();

  const { mutateAsync } = usePostData();

  const onSubmit = async () => {
    var data = new FormData();
    data.append("token", token);
    data.append("deviceName", "Test Device");
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Successfully processed!");
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
      closeModal();
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
        className="btn-success w-24 md:w-72 h-10 flex align-middle space-x-2"
        onClick={() => {
          openModal();
        }}
      >
        <span>
          <AiOutlineFileDone size={24} />
        </span>
        <div className="hidden md:block">{title}</div>
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
                  <h3 className="mb-5 text-xl text-gray-800  font-medium break-all">
                    Are you update your token ?
                  </h3>
                  <div className="flex space-x-2">
                    <button className="w-24 btn-danger" onClick={onSubmit}>
                      Yes
                    </button>
                    <button className="w-24 btn-success" onClick={closeModal}>
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

export default DeviceRegister;
