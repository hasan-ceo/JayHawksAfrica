namespace GrapesTl.Models;

public class MgtMapping
{
    public decimal MgtMappingId { get; set; }
    public string DesignationId { get; set; }
    public string MappedTo { get; set; }

}

public class MgtMappingView : MgtMapping
{

    public string DesignationName { get; set; }


}



