using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Designation
{
    public string DesignationId { get; set; }

    [MaxLength(50)]
    [Required]
    public string DesignationName { get; set; }
    public float SaccoDeduction { get; set; }
    public float GrossSalary { get; set; }

    public string KpiDetails { get; set; }
    public string ObjectiveOne { get; set; }
    public string ObjectiveTwo { get; set; }
    public string ObjectiveThree { get; set; }
    public string ObjectiveFour { get; set; }

}
