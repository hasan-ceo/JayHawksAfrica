using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Expense
{
    public string ExpenseId { get; set; }

    [MaxLength(50)]
    [Required]
    public string ExpenseName { get; set; }

}
