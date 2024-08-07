namespace GrapesTl.Models;

public class AccountGlEntry
{
    public long BankOrCashId { get; set; }
    public string LedgerNameCode { get; set; }
    public float Amount { get; set; }
    public string Particulars { get; set; }
}
