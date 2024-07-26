using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Company
{
    public string CompanyId { get; set; }

    [MaxLength(50)]
    [Required]
    public string CompanyName { get; set; }

    [MaxLength(50)]
    [Required]
    public string CompanyAddress { get; set; }
    [MaxLength(50)]
    [Required]
    public string MailServer { get; set; }
    [MaxLength(50)]
    [Required]
    public string MailPort { get; set; }
    [MaxLength(50)]
    [Required]
    public string MailAlias { get; set; }
    [MaxLength(50)]
    [Required]
    public string MailUserName { get; set; }
    [MaxLength(50)]
    [Required]
    public string MailPassword { get; set; }
    [Required]
    public int NssfEmployee { get; set; }
    [Required]
    public int NssfEmployer { get; set; }
}
