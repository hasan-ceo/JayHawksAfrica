namespace GrapesTl.Models;

public class Area
{
    public string AreaId { get; set; }
    public string RegionId { get; set; }
    public string AreaName { get; set; }

}

public class AreaView : Area
{
    public string DivisionName { get; set; }
    public string RegionName { get; set; }
}
