namespace GrapesTl.Models;

public class EvaluationSummary
{
    public string BranchId { get; set; }
    public string BranchName { get; set; }
    public int CurrentEmployee { get; set; }
    public int Created { get; set; }
    public int Submitted { get; set; }
    public int Completed { get; set; }
    public int Rejected { get; set; }
}
