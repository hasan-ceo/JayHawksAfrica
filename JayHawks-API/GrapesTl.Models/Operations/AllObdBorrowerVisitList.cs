namespace GrapesTl.Models;

public class AllObdBorrowerVisitList
{
    public float ObdBorrowerId { get; set; }
    public string AllVisitId { get; set; }
    public string GroupName { get; set; }
    public string BorrowerName { get; set; }
    public float OverdueAmount { get; set; }
    public float LoanBalance { get; set; }
    public float CollectedAmount { get; set; }
    public string TakenAction { get; set; }
    public string bmComments { get; set; }
    public string supervisorComments { get; set; }
    public int IsSubmit { get; set; }

}
