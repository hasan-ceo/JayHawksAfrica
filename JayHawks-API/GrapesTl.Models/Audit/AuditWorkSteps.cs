using System;

namespace GrapesTl.Models;

public class AuditWorkSteps
{
    public long AuditWorkListId { get; set; }
    public string AuditYearId { get; set; }
    public string AuditId { get; set; }
    public string AuditTestStepsId { get; set; }
    public DateTime TestingDate { get; set; }
    public DateTime SampledMonth { get; set; }
    public string AuditPeriod { get; set; }
    public string SelectionMethod { get; set; }
    public string ControlFrequency { get; set; }
    public double SampleSize { get; set; }
    public double PopulationSize { get; set; }
    public string TestResults { get; set; }
    public string OverallTestConclusion { get; set; }
    public string Finding { get; set; }
    public string Cause { get; set; }
    public string Implication { get; set; }
    public string Recommendation { get; set; }
    public string BranchResponse { get; set; }
    public DateTime ImplementationDate { get; set; }
    public string ManagementAction { get; set; }
    public string Exceptions { get; set; }
    public string TestEvidences { get; set; }
}

public class AuditWorkStepsView : AuditWorkSteps
{

    public string BranchName { get; set; }
    public string EmployeeName { get; set; }
    public string AuditorName { get; set; }
    public double AuditAreaId { get; set; }
    public string AuditAreaName { get; set; }
    public string AuditYear { get; set; }

    public DateTime EntryDate { get; set; }
    public string TestStepsName { get; set; }

}
