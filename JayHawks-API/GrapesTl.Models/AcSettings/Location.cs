using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Location
{
    public string LocationId { get; set; }

    [MaxLength(50)]
    [Required]
    public string LocationName { get; set; }

}
