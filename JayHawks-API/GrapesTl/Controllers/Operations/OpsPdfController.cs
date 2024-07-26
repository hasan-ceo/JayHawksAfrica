using Dapper;
using GrapesTl.Models;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NReco.PdfGenerator;
using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class OpsPdfController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private string _userId;

    public OpsPdfController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]


    [HttpGet("Report/{fromDate}/{tillDate}")]
    public async Task<IActionResult> ReportSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var datas = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitReport", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='11'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Visit History</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SubmitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitHistory.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("VisitCount/{fromDate}/{tillDate}")]
    public async Task<IActionResult> VisitCount([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var datas = await _unitOfWork.SP_Call.List<AllVisitCount>("OpsAllVisitCountReport", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='11'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Number Of Visits</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visitor Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>No. Of Visits</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.VisitCount}</td>");

                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitHistory.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("TravelHistory/{fromDate}/{tillDate}")]
    public async Task<IActionResult> TravelHistory([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var datas = await _unitOfWork.SP_Call.List<TravelingBillView>("OpsAllTravelReport", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='11'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Travel History</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Travel Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Applicant</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Checked By</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Supervisor</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Short Description</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.TravelingDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.CheckerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Remarks}</td>");

                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitHistory.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("Listbyuser/{fromDate}/{tillDate}")]
    public async Task<IActionResult> ListbyuserSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var datas = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetByUser", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Visit List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Entry Time</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Exit Time</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EntryTime}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ExitTime}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SubmitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }



    [HttpGet("ListByBranchManager")]
    public async Task<IActionResult> ListByBranchManagerSearchPdf()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);

            var datas = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetByBM", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Application Received As BM</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SubmitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitReceivedAsBmList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }




    [HttpGet("ListByManager")]
    public async Task<IActionResult> ListByManagerSearchPdf()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);

            var datas = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetByManager", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Application Received As Supervisor</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SubmitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitReceivedAsManagerList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

}
