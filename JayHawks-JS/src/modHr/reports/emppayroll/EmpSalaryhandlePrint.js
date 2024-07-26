import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const EmpSalaryhandlePrint = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "emppayrollsalary",
    `/emppayroll/salary/${dataForm.selectMonth}/${dataForm.selectYear}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.staffStatus.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        joiningDate,
        grossSalaryUsd,
        grossSalary,
        totalNoofDays,
        proratedGrossSalary,
        othersAllowance,
        nssfEmployee,
        taxPaye,
        saccoDeduction,
        totalDeduction,
        saccoPayment,
        advanceDeductions,
        saccoLoanRePaymentDeduction,
        netpayment,
        salaryRefund,
        lostDeduction,
        nssfEmployer,
        traineeArrears,
        totalNssf,
        stopPayment,
        stopParticulars,
      }) => ({
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        joiningDate,
        grossSalaryUsd,
        grossSalary,
        totalNoofDays,
        proratedGrossSalary,
        othersAllowance,
        nssfEmployee,
        taxPaye,
        saccoDeduction,
        totalDeduction,
        saccoPayment,
        advanceDeductions,
        saccoLoanRePaymentDeduction,
        netpayment,
        salaryRefund,
        lostDeduction,
        nssfEmployer,
        traineeArrears,
        totalNssf,
        stopPayment,
        stopParticulars,
      })
    );

  const handlePrint = () => {
    var doc = new jsPDF("l", "pt", "a3");
    var totalPagesExp = "{total_pages_count_string}";
    // doc.setFontSize(18);
    // doc.text("Salary Sheet", 40, 40);
    doc.setFontSize(6);

    autoTable(doc, {
      theme: "grid",
      headStyles: { fillColor: [0, 0, 0] }, // Purple
      columns: [
        { dataKey: "branchName", header: "Branch" },
        { dataKey: "departmentName", header: "Department" },
        { dataKey: "employeePin", header: "PIN" },
        { dataKey: "employeeName", header: "Name" },
        { dataKey: "designationName", header: "Designation" },
        { dataKey: "joiningDate", header: "Joining Date" },
        { dataKey: "grossSalaryUsd", header: "Gross Salary Usd" },
        { dataKey: "grossSalary", header: "Gross Salary" },
        { dataKey: "totalNoofDays", header: "Total No of Days" },
        { dataKey: "proratedGrossSalary", header: "Prorated Gross Salary" },
        { dataKey: "nssfEmployee", header: "Nssf (5%)" },
        { dataKey: "taxPaye", header: "Tax Paye" },
        { dataKey: "saccoDeduction", header: "Sacco Deduction" },
        { dataKey: "totalDeduction", header: "Total Deduction" },
        { dataKey: "saccoPayment", header: "Sacco Payment" },
        { dataKey: "advanceDeductions", header: "Advance Deductions" },
        { dataKey: "netpayment", header: "Net payment" },
        { dataKey: "nssfEmployer", header: "Nssf (10%)" },
        { dataKey: "totalNssf", header: "Total Nssf" },
        { dataKey: "traineeArrears", header: "Trainee Arrears" },
      ],
      columnStyles: {
        0: { halign: "left", cellWidth: 50 },
        1: { halign: "left", cellWidth: 70 },
        2: { halign: "left", cellWidth: 50 },
        3: { halign: "left", cellWidth: 80 },
        4: { halign: "left", cellWidth: 80 },
        5: { halign: "left", cellWidth: 50 },
        6: { halign: "left", cellWidth: 50 },
        7: { halign: "right", cellWidth: 60 },
        8: { halign: "right", cellWidth: 50 },
        9: { halign: "right", cellWidth: 60 },
        10: { halign: "right", cellWidth: 50 },
        11: { halign: "right", cellWidth: 50 },
        12: { halign: "right", cellWidth: 50 },
        13: { halign: "right", cellWidth: 50 },
        14: { halign: "right", cellWidth: 50 },
        15: { halign: "right", cellWidth: 50 },
        16: { halign: "right", cellWidth: 50 },
        17: { halign: "right", cellWidth: 50 },
        18: { halign: "right", cellWidth: 50 },
        19: { halign: "right", cellWidth: 50 },
        20: { halign: "right", cellWidth: 40 },
      },
      body: list.data.filter((item) => {
        if (query === "") {
          return item;
        } else if (
          item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !==
            -1 ||
          item.staffStatus.toLowerCase().indexOf(query.toLowerCase()) !== -1
        ) {
          return item;
        } else return null;
      }),
      margin: 60,
      rowPageBreak: "avoid",
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text("Salary Sheet", data.settings.margin.left + 0, 40);

        var str = "Page " + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });
    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save("salary.pdf");
  };

  return <></>;
};

export default EmpSalaryhandlePrint;
