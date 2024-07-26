using System;

namespace GrapesTl.Models;

public class EmpSalary
{
    public long EmpPayrollId { get; set; }
    public int SalaryYear { get; set; }
    public int SalaryMonth { get; set; }
    public string CompanyName { get; set; }
    public string CompanyAddress { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public DateTime JoiningDate { get; set; }
    public float GrossSalaryUsd { get; set; }
    public float GrossSalary { get; set; }
    public string TotalNoofDays { get; set; }
    public string ProratedGrossSalary { get; set; }
    public int NssfEmployee { get; set; }
    public float TaxPaye { get; set; }
    public float SaccoDeduction { get; set; }
    public float TotalDeduction { get; set; }
    public float SaccoPayment { get; set; }
    public float AdvanceDeductions { get; set; }
    public float SaccoLoanRePaymentDeduction { get; set; }
    public float Netpayment { get; set; }
    public float NssfEmployer { get; set; }
    public float TotalNssf { get; set; }
    public float TraineeArrears { get; set; }
}
