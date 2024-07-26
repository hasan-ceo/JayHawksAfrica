namespace GrapesTl.Models.Admin;


public class UserCreate
{

    public string UserId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string ProductName { get; set; }
    public string PhoneNumber { get; set; }
    public string ImageUrl { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
    public string EmployeeId { get; set; }

}

public class UserSelect
{
    public string UserId { get; set; }
    public string Role { get; set; }
    public string FullName { get; set; }
}
