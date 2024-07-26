import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmpPayslipList from "./EmpPayslipList";
import SearchMonthYear from "../../../components/SearchMonthYear";

const EmpPayslip = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Payslip" />
      <SearchMonthYear action={setDataForm} displaySearch={true} />
      {dataForm && <EmpPayslipList dataForm={dataForm} />}
    </div>
  );
};

export default EmpPayslip;
