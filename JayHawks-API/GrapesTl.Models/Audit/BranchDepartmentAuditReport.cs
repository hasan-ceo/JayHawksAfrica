namespace GrapesTl.Models;

public class BranchDepartmentAuditReport
{
    public string ReportId { get; set; }

    public string Year { get; set; }
    public string ReportingQuarter { get; set; }

    public string MonthOfAudit { get; set; }
    public string DepartmentName { get; set; }

    public string BranchId { get; set; }
    public string BranchName { get; set; }
    public string Region { get; set; }

    public string BranchOverview { get; set; }
    public string AreaOfreview { get; set; }

    public string DetailedAuditFinding { get; set; }
    public string PrimaryRootCause { get; set; }

    public string RiskImplication { get; set; }
    public string Recommendations { get; set; }

    public string EmployeeId { get; set; }
    public string EmployeeName { get; set; }
    public string RiskCategory { get; set; }

    public string BranchResponse { get; set; }
    public string ManagementResponse { get; set; }

    public string CommitmentDate { get; set; }
    public string OverallControlsAssessment { get; set; }
    public string FraudRisk { get; set; }

    public string RepeatFinding { get; set; }
    public string FollowUpCommentIfAny { get; set; }

    public string IAInCharge { get; set; }
    public string Appendices { get; set; }


}
