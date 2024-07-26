using System;

namespace GrapesTl.Models;

public class AuditObservations
{
    public string ObservationssId { get; set; }
    public string AuditId { get; set; }
    public string AuditArea { get; set; }
    public string Details { get; set; }
    public string RootCause { get; set; }
    public string RiskRating { get; set; }
    public string RiskImplication { get; set; }
    public string Recommendations { get; set; }
    public string ManagementComments { get; set; }
    public string IssueOwner { get; set; }
    public string Attachment { get; set; }
    public DateTime ActionDate { get; set; }
    public object ObservationsId { get; set; }
}
