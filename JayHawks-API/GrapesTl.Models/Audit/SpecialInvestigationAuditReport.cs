namespace GrapesTl.Models;

public class SpecialInvestigationAuditReport
{
    public string SpecialInvestigationAuditReportId { get; set; }

    public string Year { get; set; }
    public string ReportingQuarter { get; set; }

    public string MonthOfAudit { get; set; }
    public string DepartmentName { get; set; }

    public string BranchId { get; set; }
    public string BranchName { get; set; }
    public string Region { get; set; }

    public string DetectionMethod { get; set; }
    public string TypeOfFraud { get; set; }

    public string WhoMightBeInvolved { get; set; }
    public string PositionOfFraudster { get; set; }
    public string @LengthOfServiceOfFraudster { get; set; }

    public string HowIsTheFraudBeingPerpetrated { get; set; }
    public string NumberOfOccurences { get; set; }

    public string PotentialWitness { get; set; }
    public string Statements { get; set; }

    public string Evidence { get; set; }
    public string Observations { get; set; }

    public string DefectiveControlsIdentified { get; set; }
    public string EstimatedFraudLoss { get; set; }
    public string Recommendations { get; set; }

    public string ManagementResponse { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeeName { get; set; }

    public string IAInCharge { get; set; }



}
