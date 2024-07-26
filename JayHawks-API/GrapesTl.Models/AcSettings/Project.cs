using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Project
{
    public string ProjectId { get; set; }

    [MaxLength(50)]
    [Required]
    public string ProjectName { get; set; }

}
