namespace GrapesTl.Models;

public class DepartmentalInvestigationReportBase
{
    public string InvestigationId { get; set; }
    public string Title { get; set; }
    public string InvestigationDate { get; set; }
}


public class DepartmentalInvestigationReport : DepartmentalInvestigationReportBase
{
    public string BranchId { get; set; }
    public string DepartmentId { get; set; }

}

public class DepartmentalInvestigationReportView : DepartmentalInvestigationReportBase
{
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string Status { get; set; }

}


public class DepartmentalInvestigationReportDetails
{
    public string InvestigationDetailsId { get; set; }
    public string InvestigationId { get; set; }
    public string TestArea { get; set; }
    public string ReportInputs { get; set; }
    public string TestSteps { get; set; }
    public string SampleSelectionMethod { get; set; }
    public int ControlFrequency { get; set; }
    public int PopulationSize { get; set; }
    public int SampleSize { get; set; }
    public string DepartmentName { get; set; }
    public string TestConclusion { get; set; }
    public string AuditFinding { get; set; }
    public string Cause { get; set; }
    public string Implication { get; set; }
    public string Recommendation { get; set; }
    public string ControlOwnerResponse { get; set; }
    public string ImplementationDate { get; set; }
    public string ManagementAction { get; set; }
    public string Exceptions { get; set; }
    public string Evidences { get; set; }
}
