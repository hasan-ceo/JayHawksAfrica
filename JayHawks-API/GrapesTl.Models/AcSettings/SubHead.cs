using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class SubHead
{
    public string SubHeadId { get; set; }
    public string MainHeadId { get; set; }
    [MaxLength(50)]
    [Required]
    public string SubHeadName { get; set; }

}
