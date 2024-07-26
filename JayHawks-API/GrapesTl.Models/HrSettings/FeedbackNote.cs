using System;

namespace GrapesTl.Models;

public class FeedbackNote
{
    public string NoteId { get; set; }
    public string FeedbackId { get; set; }
    public string Note { get; set; }
    public string EntryBy { get; set; }
    public DateTime EntryDate { get; set; }

}
