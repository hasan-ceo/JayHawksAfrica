using System;

namespace GrapesTl.Models;

public class EmployeeGetById
{
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string ContactNumber { get; set; }
    public string Email { get; set; }
    public string BranchId { get; set; }
    public string DepartmentId { get; set; }
    public string DesignationId { get; set; }
    public string StaffTypeId { get; set; }
    public string Gender { get; set; }
    public DateTime DateOfBirth { get; set; }
    public DateTime JoiningDate { get; set; }
    public double GrossSalaryUSD { get; set; }
    public double GrossSalary { get; set; }
    public double SaccoDeduction { get; set; }
    public string NssfNumber { get; set; }
    public string BankId { get; set; }
    public string BankAccountNumber { get; set; }
    public string TinNumber { get; set; }
    public string MotherName { get; set; }
    public string MotherContactNumber { get; set; }
    public string FatherName { get; set; }
    public string FatherContactNumber { get; set; }
    public string KinName { get; set; }
    public string KinAddress { get; set; }
    public string KinContactNumber { get; set; }
    public string KinRelationship { get; set; }
    public string Religion { get; set; }
    public string MaritalStatus { get; set; }
    public string BloodGroup { get; set; }
    public string EducationId { get; set; }
    public string LanguagesSpoken { get; set; }
    public string ImageUrl { get; set; }
    public string ContactAddress { get; set; }
    public bool CanEdit { get; set; }
    public string EntryBy { get; set; }
    public string UpdateBy { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime UpdateDate { get; set; }
}
