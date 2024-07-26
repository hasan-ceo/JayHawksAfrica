using System;

namespace GrapesTl.Models;


public class AuditPlanMaster
{
    public string AuditMasterId { get; set; }
    public string AuditYear { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string ApprovedBy { get; set; }
    public DateTime ApprovedDate { get; set; }
    public string Status { get; set; }
}
public class AuditPlanDetails
{
    public long Id { get; set; }
    public string Fraud { get; set; }
    public int StaffTurnover { get; set; }
    public int InherentRisk { get; set; }
    public int ResidualRisk { get; set; }
    public string OverallRiskRating { get; set; }
    public string SelectedForAuditPeriod { get; set; }
    public int Budget { get; set; }



    public string BusinessArea { get; set; }
    public string AuditType { get; set; }
    public float PortfolioValue { get; set; }
    public string Par { get; set; }
    public float NumOfBorrower { get; set; }
    public string Weightage { get; set; }
    public object AURef { get; set; }
    public object AUName { get; set; }
}

