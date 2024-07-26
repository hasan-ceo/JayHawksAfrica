using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ResetPasswordViewModel
{


    [Required]
    [StringLength(50)]
    public string Id { get; set; }

    [Required]
    [StringLength(20)]
    public string Otp { get; set; }

    [Required]
    [StringLength(20)]
    public string NewPassword { get; set; }

    [Required]
    [StringLength(20)]
    public string ConfirmPassword { get; set; }
}
