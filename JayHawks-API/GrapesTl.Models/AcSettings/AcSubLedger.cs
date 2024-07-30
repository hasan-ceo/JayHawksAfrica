namespace GrapesTl.Models;

public class AcSubLedger
{
    public string SubLedgerId { get; set; }
    public string LedgerId { get; set; }
    public string SubLedgerName { get; set; }

}

public class AcSubLedgerView : AcSubLedger
{
    public string MainName { get; set; }
    public string GroupName { get; set; }
    public string SubGroupName { get; set; }
    public string LedgerName { get; set; }

}