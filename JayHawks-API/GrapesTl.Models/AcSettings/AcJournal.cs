using Newtonsoft.Json;
using System.Collections.Generic;

namespace GrapesTl.Models;

public record MainCart
{
    [JsonProperty("items")]
    public List<AcItems> Items { get; init; }
}

public record AcItems
{
    [JsonProperty("ledgerId")]
    public string LedgerId { get; set; }
    [JsonProperty("particulars")]
    public string Particulars { get; set; }
    [JsonProperty("dr")]
    public double Dr { get; set; }
    [JsonProperty("cr")]
    public double Cr { get; set; }
}

//public class AcCartItems
//{
//    public List<AcItems> CartItems { get; set; }
//}
//public class AcCart1
//{
//    public string GlId { get; set; }
//    public DateTime WorkDate { get; set; }
//    public string VoucherType { get; set; }
//    public string VoucherNumber { get; set; }
//    public string TransType { get; set; }
//    public string Particulars { get; set; }
//    public bool IsReverse { get; set; }
//    public string LedgerName { get; set; }
//    public string LedgerId { get; set; }
//    public float Dr { get; set; }
//    public float Cr { get; set; }
//    public IEnumerable<AcItems> AcItems { get; set; }
//}
