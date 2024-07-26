using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Party
{
    public string PartyId { get; set; }

    [MaxLength(50)]
    [Required]
    public string PartyName { get; set; }

    [MaxLength(50)]
    public string Email { get; set; }

    [MaxLength(50)]
    public string ContactNumber { get; set; }


    [MaxLength(50)]
    public string ContactAddress { get; set; }


}
