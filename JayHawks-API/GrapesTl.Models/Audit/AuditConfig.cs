using System.Collections.Generic;

namespace SobHisab.Models;

public class AuditConfigs
{
    public string BusinessArea { get; set; }
    public string AURef { get; set; }
    public string AUName { get; set; }
    public string AuditType { get; set; }
    public string OverallRiskRating { get; set; }
    public char SelectedForAuditPeriod { get; set; }
    public decimal Budget { get; set; }
    public List<AuditDetails> AuditDetails { get; set; } = new List<AuditDetails>(); // Ensure it's initialized
}

public class AuditDetails
{
    public decimal PortfolioValue { get; set; }
    public decimal PAR { get; set; }
    public char Fraud { get; set; }
    public decimal StaffTurnover { get; set; }
    public int NumberOfBorrowers { get; set; }
    public int InherentRisk { get; set; }
    public int ResidualRisk { get; set; }
    public string PreviousYearRating { get; set; }
    public string Weightage { get; set; }
}
