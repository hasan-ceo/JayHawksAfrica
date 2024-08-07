import React, { useState } from "react";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";

const JournalVoucherCartSave = ({
  cartItems,
  cartLength,
  totalBalance,
  action,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const onSubmit = async () => {
    setSubmitting(true);
    // var tmp = {
    //   journals: cartItems.map(({ ledgerId, particulars, dr, cr }) => ({
    //     ledgerId,
    //     particulars,
    //     dr,
    //     cr,
    //   })),
    // };
    console.log(cartItems);
    try {
      const { status } = await mutateAsync({
        path: "/accountGl/journalCreate",
        formData: cartItems,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        action();
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
      setSubmitting(false);
    }
  };

  return (
    cartLength > 0 &&
    totalBalance === 0 && (
      <button
        onClick={() => onSubmit()}
        disabled={submitting}
        className="bg-orange-500 text-white px-4 py-1 rounded-md my-2"
      >
        Save
      </button>
    )
  );
};

export default JournalVoucherCartSave;
