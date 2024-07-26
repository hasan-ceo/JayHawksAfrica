namespace GrapesTl.Models;

public class Region
{
    public string RegionId { get; set; }
    public string DivisionId { get; set; }
    public string RegionName { get; set; }

}

public class RegionView : Region
{
    public string DivisionName { get; set; }
}
