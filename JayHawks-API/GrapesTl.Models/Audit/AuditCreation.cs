using System;

namespace GrapesTl.Models;

public class AuditCreation
{
    public string AuditId { get; set; }
    public string AuditName { get; set; }
    public string BranchId { get; set; }
    public string LoId { get; set; }
    public string BmId { get; set; }
    public string AmId { get; set; }
    public string RmId { get; set; }
    public DateTime AuditStartDate { get; set; }
    public DateTime AuditEndDate { get; set; }
    public string PeriodUnderAudit { get; set; }
    public DateTime LastAuditPeriod { get; set; }
    public int NumOfBorrowers { get; set; }
    public int TotalLoanPortfolio { get; set; }
    public string EmployeeId { get; set; }
    public string AuditNotification { get; set; }
    public string AuditObjectives { get; set; }
    public string AuditorsUndertaking { get; set; }

}

public class AuditCreationView : AuditCreation
{
    public string BranchName { get; set; }
    public string LoName { get; set; }
    public string BmName { get; set; }
    public string AmName { get; set; }
    public string RmName { get; set; }
    public string AreaName { get; set; }
    public string RegionName { get; set; }
    public string DivisionName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime JoiningDate { get; set; }

}
