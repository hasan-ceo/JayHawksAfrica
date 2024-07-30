namespace GrapesTl.Models;

public class AcGroup
{
    public string GroupId { get; set; }
    public string MainId { get; set; }
    public string GroupName { get; set; }

}

public class AcGroupView : AcGroup
{
    public string MainName { get; set; }
    public string GroupCode { get; set; }
}
