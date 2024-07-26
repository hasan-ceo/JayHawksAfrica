using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class MainHead
{
    public string MainHeadId { get; set; }
    public string AccountType { get; set; }
    [MaxLength(50)]
    [Required]
    public string MainHeadName { get; set; }

}
