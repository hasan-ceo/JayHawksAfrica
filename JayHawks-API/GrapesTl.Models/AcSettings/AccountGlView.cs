using System;

namespace GrapesTl.Models;

public class AccountGlView
{
    public string GlId { get; set; }
    public int TrnsId { get; set; }
    public DateTime WorkDate { get; set; }
    public string VoucherType { get; set; }
    public string VoucherNumber { get; set; }
    public string TransType { get; set; }
    public string Particulars { get; set; }
    public bool IsReverse { get; set; }
    public string LedgerName { get; set; }
    public string SubLedgerName { get; set; }
    public float Dr { get; set; }
    public float Cr { get; set; }
    public float Balance { get; set; }
    public float CrBalance { get; set; }
    public float DrBalance { get; set; }
    public float OpeningBalance { get; set; }

}
