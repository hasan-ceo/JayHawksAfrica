namespace GrapesTl.Models;

public class BmBankInfo
{
    public long OpsBmBankInfoId { get; set; }
    public string BmVisitId { get; set; }
    public string FundReceivedBranch { get; set; }
    public float FundReceivedAmount { get; set; }
    public string FundTransferBranch { get; set; }
    public float FundTransferAmount { get; set; }
    public float BankWithdraw { get; set; }
    public float BankDeposit { get; set; }
    public float BankBalance { get; set; }
}
