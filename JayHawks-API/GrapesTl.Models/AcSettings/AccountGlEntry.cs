namespace GrapesTl.Models;

public class AccountGlEntry
{
    public long BankOrCashId { get; set; }
    public long LedgerId { get; set; }
    public float Amount { get; set; }
    public string Particulars { get; set; }
}
