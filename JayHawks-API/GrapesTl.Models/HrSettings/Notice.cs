using System;

namespace GrapesTl.Models;

public class Notice
{
    public string NoticeId { get; set; }

    public string Title { get; set; }

    public string FileUrl { get; set; }

    public DateTime PublishDate { get; set; }
    public DateTime ExpiryDate { get; set; }

}
