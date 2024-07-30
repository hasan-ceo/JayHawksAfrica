namespace GrapesTl.Models;

public class AcLedger
{
    public string LedgerId { get; set; }
    public string SubGroupId { get; set; }
    public string LedgerName { get; set; }
    public string DisplayAt { get; set; }
    public string VoucherType { get; set; }
    public string AccountType { get; set; }

}

public class AcLedgerView : AcLedger
{
    public string MainName { get; set; }
    public string GroupName { get; set; }
    public string SubGroupName { get; set; }
    public string LedgerCode { get; set; }
}