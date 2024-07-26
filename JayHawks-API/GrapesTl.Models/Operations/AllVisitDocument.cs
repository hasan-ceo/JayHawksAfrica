using System;

namespace GrapesTl.Models;

public class AllVisitDocument
{
    public int VisitDocId { get; set; }
    public string AllVisitId { get; set; }
    public string Title { get; set; }
    public string FileUrl { get; set; }
}

public class AllVisitDocumentView : AllVisitDocument
{
    public DateTime VisitDate { get; set; }
    public string BranchName { get; set; }
    public int IsSubmit { get; set; }


}

