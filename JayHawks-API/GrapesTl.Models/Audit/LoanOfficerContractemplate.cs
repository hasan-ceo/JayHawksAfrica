using System;

namespace GrapesTl.Models.Audit;

public class LoanOfficerContractemplate
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public string StaffNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string EmailAddress { get; set; }
    public string Dear { get; set; }
    public string NameofBranch { get; set; }
    public string NameOfRegion { get; set; }
}
