import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openModal}>
        <AiOutlineMenu size={30} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in-out duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-primary bg-opacity-70" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-150"
              enterFrom="opacity-0 transform -translate-x-20"
              enterTo="opacity-100"
              leave="transition ease-in-out duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 transform -translate-x-20"
            >
              <div className="relative bg-white" onClick={closeModal}>
                <Sidebar />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileSidebar;
