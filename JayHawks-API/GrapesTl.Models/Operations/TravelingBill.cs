using System;

namespace GrapesTl.Models;

public class TravelingBill
{

    public string TravelBillId { get; set; }
    public string TravelId { get; set; }
    public DateTime TravelingDate { get; set; }
    public string StartFrom { get; set; }
    public string EndTo { get; set; }
    public float Taxi { get; set; }
    public float Bus { get; set; }
    public float Train { get; set; }
    public float Motorcycle { get; set; }
    public float Others { get; set; }
    public float Total { get; set; }
    public string Remarks { get; set; }
    public string DesignationName { get; set; }
    public string EmployeeName { get; set; }
    public string EmployeePin { get; set; }
    public string ManagerId { get; set; }
    public string ManagerName { get; set; }
    public string CheckerName { get; set; }


}
