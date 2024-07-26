namespace GrapesTl.Models;

public class EmployeeGetAll
{
    public string EmployeeResignId { get; set; }
    public string EmployeeId { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string JoiningDate { get; set; }
    public string DesignationName { get; set; }
    public string ContactNumber { get; set; }
    public string Email { get; set; }
    public string ResignReasonName { get; set; }
    public string Particulars { get; set; }
    public string DateOfBirth { get; set; }
    public int TenureYear { get; set; }
    public int TenureMonth { get; set; }
    public string Gender { get; set; }
    public string ContactAddress { get; set; }
    public double GrossSalary { get; set; }
    public double GrossSalaryUsd { get; set; }
    public double Balance { get; set; }
    public string ResignDate { get; set; }
    public string LanguagesSpoken { get; set; }
    public string SalaryYearMonth { get; set; }
    public string ImageUrl { get; set; }
}

public class EmpSearch
{
    public string OldBranchId { get; set; }
    public string OldDepartmentId { get; set; }
    public string OldStaffTypeId { get; set; }
}

public class EmpForSelect
{
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
}
public class EmpMonthlyPosition
{
    public string Country { get; set; }
    public string SalaryYear { get; set; }
    public string SalaryMonth { get; set; }
    public string Female { get; set; }
    public string Male { get; set; }
    public double NotToSay { get; set; }
    public double NewJoin { get; set; }
    public double CountResign { get; set; }


}
