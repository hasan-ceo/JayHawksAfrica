import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import { usePostData } from "../../hooks/dataApi";
import { useHistory } from "react-router";
import toast from "react-hot-toast";
import CustomSelect from "../../components/CustomSelect";
import Input from "../../components/Input";
import moment from "moment";
import DatePicker from "../../components/DatePicker";

const Reports = () => {
  const history = useHistory();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fromDate: new Date(),
      tillDate: new Date(),
    },
    // resolver: yupResolver(schema),
  });

  const { mainHead, cashOrBank, fromDate, party, tillDate } = errors;

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      fromData: moment.utc(data.fromData).local().format("YYYY-MM-DD"),
      tillDate: moment.utc(data.tillDate).local().format("YYYY-MM-DD"),
    };
    setSubmitting(true);
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Reports" btn="Return" path="" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <div className="flex flex-col gap-y-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="mainHead"
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  value={value}
                  label="Main Head"
                  onChange={onChange}
                  _key="mainHeadList"
                  path="/mainHeadList"
                  errorMessage={mainHead?.label.message}
                  isRow={false}
                />
              )}
            />
            <Controller
              control={control}
              name="cashOrBank"
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  value={value}
                  label="Cash/Bank"
                  onChange={onChange}
                  _key="cashOrBankList"
                  path="/cashOrBankList"
                  errorMessage={cashOrBank?.label.message}
                  isRow={false}
                />
              )}
            />
            <Controller
              control={control}
              name="party"
              render={({ field: { onChange, value } }) => (
                <CustomSelect
                  value={value}
                  label="Party"
                  onChange={onChange}
                  _key="partyList"
                  path="/partyList"
                  errorMessage={party?.label.message}
                  isRow={false}
                />
              )}
            />
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
          </form>
        </div>
        <div className="flex flex-col gap-y-1">
          <Link to="/accounts/reports/ledger" className="btn-umojayellow">
            Ledger
          </Link>
          <Link to="/accounts/reports/bank-ledger" className="btn-umojayellow">
            Bank Ledger
          </Link>
          <Link
            to="/accounts/reports/trial-balance-consolidated"
            className="btn-umojayellow"
          >
            Trial Balance (Consolidated)
          </Link>
          <Link
            to="/accounts/reports/trial-balance-details"
            className="btn-umojayellow"
          >
            Trial Balance (Details)
          </Link>
          <Link to="/accounts/reports/party-ledger" className="btn-umojayellow">
            Party Ledger
          </Link>
        </div>
        <div className="grid grid-rows-3 gap-1 h-32">
          <Link
            to="/accounts/reports/creditor-list"
            className="btn-umojayellow"
          >
            Creditor List
          </Link>
          <Link to="/accounts/reports/debitor-list" className="btn-umojayellow">
            Debitor List
          </Link>
          <Link
            to="/accounts/reports/cash-requisition-list"
            className="btn-umojayellow"
          >
            Cash Requisition List
          </Link>
        </div>
        <div className="flex flex-col gap-y-1"></div>
      </div>
    </div>
  );
};

export default Reports;
