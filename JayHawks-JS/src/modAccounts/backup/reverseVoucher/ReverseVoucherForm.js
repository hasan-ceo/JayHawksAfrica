import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TopHeader from "../../components/TopHeader";
import SaveButton from "../../components/button/SaveButton";
import ReverseVoucherList from "./ReverseVoucherList";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";
import DatePicker from "../../components/DatePicker";

const schema = yup.object({
  fromDate: yup.string().required("Required"),
  tillDate: yup.string().required("Required"),
});

const ReverseVoucherForm = () => {
  const [searchQuery, setSearchQuery] = useState({});
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fromDate: new Date(),
      tillDate: new Date(),
    },
    resolver: yupResolver(schema),
  });
  const { fromDate, tillDate } = errors;

  const onSubmit = (formData) => {
    setSearchQuery(formData);
    reset();
  };

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "reverseVoucher",
    `/accounts/reverseVoucher?fromDate=${searchQuery.fromDate}&tillDate=${searchQuery.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Reverse Voucher" btn="Return" path="" />
      <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:flex gap-x-3">
          <Controller
            control={control}
            name="fromDate"
            render={({ field }) => (
              <DatePicker
                label="From Date"
                field={field}
                errorMessage={fromDate?.message}
                isRow={false}
              />
            )}
          />
          <Controller
            control={control}
            name="tillDate"
            render={({ field }) => (
              <DatePicker
                label="Till Date"
                field={field}
                errorMessage={tillDate?.message}
                isRow={false}
              />
            )}
          />
          <SaveButton btnText="Search" isRow={false} />
        </div>
      </form>
      <ReverseVoucherList list={list.data} />
    </div>
  );
};

export default ReverseVoucherForm;
