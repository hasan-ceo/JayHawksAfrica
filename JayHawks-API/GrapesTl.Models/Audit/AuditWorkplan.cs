using System;

namespace GrapesTl.Models;

public class AuditWorkplan
{
    public double WorkPlanId { get; set; }
    public string AuditYearId { get; set; }
    public string MonthName { get; set; }
    public string BranchId { get; set; }
    public double RiskRating { get; set; }
    public double Auditor { get; set; }
    public double FieldDays { get; set; }
    public double ExpectedCost { get; set; }
    public string AuditStatus { get; set; }
    public string ReportStatus { get; set; }
    public string DiscussionStatus { get; set; }
    public string FollowUpStatus { get; set; }

}

public class AuditWorkplanView : AuditWorkplan
{

    public string BranchName { get; set; }
    public string EmployeeName { get; set; }
    public string AuditorName { get; set; }
    public string AuditYear { get; set; }
    public DateTime EntryDate { get; set; }

}
