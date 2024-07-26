namespace GrapesTl.Models;

public class AllPortfolioAnalysis
{
    public long AnalysisId { get; set; }
    public string AllVisitId { get; set; }
    public string LoId { get; set; }
    public string PinName { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeeName { get; set; }
    public float BorrowerMicroLoan { get; set; }
    public float BorrowerSbl { get; set; }
    public float BorrowerTotal { get; set; }
    public float LoiMicroLoan { get; set; }
    public float LoiSbl { get; set; }
    public float LoiTotal { get; set; }
    public float BorrowerTarget { get; set; }
    public float ShortageNoOfBorrower { get; set; }
    public float OverdueNo { get; set; }
    public float OverdueAmount { get; set; }
    public float OverdueInDeNo { get; set; }
    public float OverdueInDeAmount { get; set; }
    public string SupervisorComments { get; set; }
    public string SupervisorRemarks { get; set; }
    public string BmComments { get; set; }
    public float IsSubmit { get; set; }
    public float IsLock { get; set; }

}


