using Dapper;
using GrapesTl.Models;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NReco.PdfGenerator;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive,Accounts Manager,Accounts Executive, Country Team Leader")]
[Route("api/[controller]")]
[ApiController]
public class HrPdfReportController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpGet("List")]
    public async Task<IActionResult> DownloadPdf()
    {
        try
        {

            var employees = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAll");


            var sb = new StringBuilder();
            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='7'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            //   sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");

            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Employee List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch, Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pin, Designation </th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>DOB, Gender</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Contact Number</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Gross Salary</th>");

            sb.Append("</tr>");

            sb.Append("</thead>");
            sb.Append("<tbody>");
            foreach (var employee in employees)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.BranchName}, {employee.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.EmployeePin}, {employee.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.DateOfBirth}, {employee.Gender}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.JoiningDate}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{employee.ContactNumber}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{employee.GrossSalary}</td>");
                sb.Append("</tr>");
            }
            sb.Append("</tbody>");
            sb.Append("</table>");

            var htmlContent = sb.ToString();


            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);


            return File(pdfBytes, "application/pdf", "employees.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("New/{fromDate}/{tillDate}")]
    public async Task<IActionResult> NewJoinSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllNewJoin", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='9'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>New Join List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Id</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Joining Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Contact Number</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Gross Salary</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeId}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.JoiningDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.ContactNumber}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.GrossSalary}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "NewJoin.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Resign/{fromDate}/{tillDate}")]
    public async Task<IActionResult> ResignSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmpResignGetAll", parameter);

            var sb = new StringBuilder();
            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px'>Resign List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");



            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Id</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Contact Number</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Resign Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Resign Reason</th>");

            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeId}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.JoiningDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.ContactNumber}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ResignDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ResignReasonName}</td>");

                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "ResignList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Birthday/{month}")]
    public async Task<IActionResult> Birthday(string month)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Month", month);

            var datas = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllBirthday", parameter);

            var sb = new StringBuilder();


            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='8'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Birthday List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Joining Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Contact Number</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Birthday</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.JoiningDate}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.ContactNumber}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.DateOfBirth}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Birthday.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Promotion/{fromDate}/{tillDate}")]
    public async Task<IActionResult> PromotionSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmpPromotionView>("hrEmpPromotionGetAll", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Promotion List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee History Id</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary Usd</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary </th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Effective Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary Usd</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary, Particulars</th>");

            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmpHistoryId}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.PreDesignation}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.PreGrossSalaryUsd}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.PreGrossSalary}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EffectiveDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.GrossSalaryUsd}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.GrossSalary}, {data.Particulars}</td>");

                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "PromotionList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }



    [HttpGet("Demotion/{fromDate}/{tillDate}")]
    public async Task<IActionResult> DemotionSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmpDemotionView>("hrEmpDemotionGetAll", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Demotion List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee History Id</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary Usd</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary </th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Effective Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary Usd</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary, Particulars</th>");

            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmpHistoryId}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.PreDesignation}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.PreGrossSalaryUsd}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.PreGrossSalary}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EffectiveDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.GrossSalaryUsd}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.GrossSalary}, {data.Particulars}</td>");

                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "PromotionList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }



    [HttpGet("Transfer/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Transfer([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmpTransferView>("hrEmpTransferGetAll", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='10'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Transfer List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee History Id</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Old Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Old Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Effective Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>New Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>New Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");
            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmpHistoryId}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.PreBranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.PreDepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EffectiveDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Particulars}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "TransferList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("History/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Histroy([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmpHistoryView>("hrEmpHistoryGetAll", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='9'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Transfer, Promotion And Demotion List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee History Id</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin, Employee Status</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name, Pre Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Department, Pre Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary Usd, Pre Gross Salary</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Effective Date, Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name, Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary Usd, Gross Salary</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");

            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmpHistoryId}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}, {data.EmpStatus}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}, {data.PreBranch}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.PreDepartment}, {data.PreDesignation}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.PreGrossSalaryUsd}, {data.PreGrossSalary}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EffectiveDate:dd/MM/yyyy},{data.BranchName} </td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}, {data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.GrossSalaryUsd}, {data.GrossSalary}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Particulars}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "History.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("DisciplinaryLetter/{fromDate}/{tillDate}")]
    public async Task<IActionResult> DisciplinarySearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmpDisciplinaryLetterView>("hrEmployeeGetAllNewJoin", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='8'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Disciplinary Letter Issue List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Letter Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Issue Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Subject</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.LetterType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.IssueDate}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Title}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Disciplinary.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }



    [HttpGet("Tenure")]
    public async Task<IActionResult> Tenure()
    {
        try
        {

            var employees = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllTenure");


            var sb = new StringBuilder();
            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='10'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Tenure List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Date Of Birth</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Email</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Contact Number</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Tenure Year</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Tenure Month</th>");


            sb.Append("</tr>");

            sb.Append("</thead>");
            sb.Append("<tbody>");
            foreach (var employee in employees)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.DateOfBirth}</td>");


                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.Email}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.ContactNumber.Replace("M:", "").Trim()}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{employee.TenureYear}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{employee.TenureMonth}</td>");
                sb.Append("</tr>");
            }
            sb.Append("</tbody>");
            sb.Append("</table>");

            var htmlContent = sb.ToString();


            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);


            return File(pdfBytes, "application/pdf", "Tenure.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }




    [HttpGet("NoticeReadById/{id}")]
    public async Task<IActionResult> NoticeReadSearchPdf(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@NoticeId", id);

            var datas = await _unitOfWork.SP_Call.List<NoticeReadById>("hrNoticeReadGetById", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='6'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Notice</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Read Date Time</th>");


            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ReadDateTime}</td>");


                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "NoticeStatus.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("stopSalaryPaid")]
    public async Task<IActionResult> StopSalaryPaid()
    {
        try
        {
            var datas = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpStopSalaryPaid");

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='9'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Stop Salary</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Year</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Net Payment</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stop Reason</th>");


            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.JoiningDate}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SalaryMonth}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Netpayment}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.StopParticulars}</td>");


                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Stop Salary.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Nssf/{salaryMonth}/{salaryYear}")]
    public async Task<IActionResult> Nssf([FromRoute] string salaryMonth, [FromRoute] string salaryYear)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@salaryMonth", salaryMonth);
            parameter.Add("@salaryYear", salaryYear);

            var datas = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllNssf", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='7'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Nssf List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>NSSF Number</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>NSSF Employee</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>NSSF Employer</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Total Deposit</th>");


            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.NssfNumber}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ProratedGrossSalary}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.NssfEmployee}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.NssfEmployer}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.TotalNssf}</td>");


                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "NSSF.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Tax/{salaryMonth}/{salaryYear}")]
    public async Task<IActionResult> Tax([FromRoute] string salaryMonth, [FromRoute] string salaryYear)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@salaryMonth", salaryMonth);
            parameter.Add("@salaryYear", salaryYear);

            var datas = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllTax", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='5'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Tax</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>TIN Number</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>TAX Paye</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.TinNumber}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ProratedGrossSalary}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.TaxPaye}</td>");


                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Tax.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("Sacco")]
    public async Task<IActionResult> Sacco()
    {
        try
        {
            var datas = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllSacco");

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='8'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Sacco List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Contact Number</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Sacco Balance</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");

            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.JoiningDate}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ContactNumber}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Balance}</td>");


                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Sacco.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("SalaryStop")]
    public async Task<IActionResult> SalaryStop()
    {
        try
        {
            var datas = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllSalaryStop");

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='9'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Salary Stop</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Year</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Net Payment</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stop Reason</th>");


            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.JoiningDate}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SalaryMonth}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Netpayment}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.StopParticulars}</td>");


                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Stop Salary.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("List/{fromDate}/{tillDate}")]
    public async Task<IActionResult> List([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmpAllDedView>("hrEmpAllDedGetAll", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='9'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Allowance , Deduction List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Designation</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Allowance / Deduction Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Effective Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Particulars</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");

            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.AllowanceDeductionName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.EffectiveDate}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Amount}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Particulars}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "EmpPayrollAllDedList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("Leave/{fromDate}/{tillDate}")]
    public async Task<IActionResult> LeaveSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmpLeaveView>("hrEmpLeaveGetAll", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Leave List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Leave Id</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Leave Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Form Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Till Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Leave Status</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Authority Name</th>");
            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmpLeaveId}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.LeaveName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.FromDate}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.TillDate}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Particulars}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.LeaveStatus}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.AuthorityName}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Leave.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }



    [HttpGet("Leavebalance")]
    public async Task<IActionResult> Leavebalance()
    {
        try
        {
            var datas = await _unitOfWork.SP_Call.List<EmpLeavebookView>("hrEmpLeaveBookGetAll");

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Leave Balance</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name </th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Ale</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Al</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Comp</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Mtl</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pat</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Sl</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stu</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Ale}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Al}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Comp}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Mtl}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Pat}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Sl}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.Stu}</td>");

                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "leavebalance.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("Advancesalary/{fromDate}/{tillDate}")]
    public async Task<IActionResult> AdvanceSalarySearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmpAdvanceView>("hrEmpAdvanceSalaryGetAll", parameter);

            var sb = new StringBuilder();


            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='10'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Advance Salary List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");


            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Advance Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Needed Advance Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Purpose Of Advance</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Advance Status</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Authority Name</th>");
            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.AdvanceAmount}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.NeededAdvanceDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.PurposeOfAdvance}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.AdvanceStatus}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.AuthorityName}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "advancesalary.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("Attendance/{fromDate}/{tillDate}")]
    public async Task<IActionResult> AttendanceSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmpAttendanceView>("hrEmpAttendanceGetByDate", parameter);

            var sb = new StringBuilder();


            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='10'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Attendance List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");


            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Attendance Id</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Work Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Atten Status</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manual Entry</th>");
            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmpAttendanceId}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.WorkDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.AttenStatus}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Particulars}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ManualEntry}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "attendance.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("MonthlyEmpolyee/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MonthlyEmpolyeeSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrMonthlyEmployeeStaff", parameter);

            var sb = new StringBuilder();


            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='9'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Monthly Employee List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");


            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Salary Year Month</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name, Department Name</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin, Employee Name</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Date Of Birth</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation, Joining Date</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gender</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Contact Number</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary, Gross Salary Usd</th>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Email</th>");
            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SalaryYearMonth}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}, {data.DepartmentName} </td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}, {data.EmployeeName}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DateOfBirth}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DesignationName}, {data.JoiningDate}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Gender}</td>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ContactNumber}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.GrossSalary}, {data.GrossSalaryUsd}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Email}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "MonthlyEmployee.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("MonthlyStaff/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MonthlyStaff([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<Position>("hrEmployeeGetAllMonthlyStaff", parameter);

            var sb = new StringBuilder();


            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='2'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px'>Periodic Staff Position</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");


            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>General Statistics</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Details</th>");


            sb.Append("</tr>");

            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Title}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.StaffCount}</td>");



                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "salaryattendance.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("AuditTrail/{fromDate}/{tillDate}")]
    public async Task<IActionResult> AuditTrail([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fromDate", fromDate);
            parameter.Add("@tillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<AuditTrail>("AdAuditTrailGetAll", parameter);


            var sb = new StringBuilder();
            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='6'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px'>Audit Trail Report</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Task Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Entry By</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Entry Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Update Date</th>");

            sb.Append("</tr>");

            sb.Append("</thead>");
            sb.Append("<tbody>");
            foreach (var item in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.TaskName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EntryBy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EntryDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.UpdateDate:dd/MM/yyyy}</td>");

                sb.Append("</tr>");
            }
            sb.Append("</tbody>");
            sb.Append("</table>");

            var htmlContent = sb.ToString();


            var htmlToPdf = new HtmlToPdfConverter();

            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);


            return File(pdfBytes, "application/pdf", "employees.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [AllowAnonymous]
    [HttpGet("JoiningLetter/{employeeid}")]
    public async Task<IActionResult> JoiningLetter(string employeeid)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", employeeid);
            var model = await _unitOfWork.SP_Call.OneRecord<EmployeeGetAll>("HrEmpLettersGetById", parameter);
            var salaryInWords = HelperUtils.NumberToWords((int)model.GrossSalary);
            var formattedDate = DateTime.Parse(model.JoiningDate.ToString()).ToString("dd/MMM/yyyy");

            var sb = new StringBuilder();
            sb.Append("<div style='font-family: Arial, Helvetica, sans-serif;'>");
            var path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/logo.png");
            sb.Append("<div style='text-align: right;'><img src='" + path + "' alt='Logo' width='200' height='100'></div>");

            sb.Append("<br/><br/>");
            sb.Append("<div style='text-align: Left; font-size: 30px;'>Appointment Letter</div>");
            sb.Append("<br/><br/>");
            sb.Append($"{formattedDate}");
            sb.Append("<br/><br/>");
            sb.Append($"PIN : {model.EmployeePin}");
            sb.Append("<br/>");
            sb.Append($"<b>Mr. {model.EmployeeName}</b>");
            sb.Append("<br/>");
            sb.Append($"{model.Email}");
            sb.Append("<br/><br/>");
            sb.Append($"Dear {model.EmployeeName},");
            sb.Append("<br/><br/>");

            sb.Append($"<b>RE: APPOINTMENT TO THE POST OF {model.DesignationName.ToUpper()}</b>");
            sb.Append("<br/><br/>");

            sb.Append("Reference is made to the offer letter with Umoja.");
            sb.Append("<br/><br/>");

            sb.Append("We have the pleasure of offering you an employment opportunity with Umoja Microfinance (Uganda) Limited (hereinafter referred to as &quot;the company&quot) as a Loan Officer.");
            sb.Append("<br/><br/>");

            sb.Append("Your appointment will be subject to the following terms and conditions of service:");
            sb.Append("<br/><br/>");

            sb.Append("<b>1. DURATION OF CONTRACT</b>");
            sb.Append("<br/>");
            sb.Append($"Your employment with the company under this Contract will be for a period of 18 (eighteen) months subject to renewal depending on your performance and behavior, and will commence on {formattedDate}. It shall be subject to the satisfactory completion of a probationary period as indicated in clause 4 below.");
            sb.Append("<br/><br/>");

            sb.Append("<b>2.  OFFICE-HOURS</b>");
            sb.Append("<br/>");
            sb.Append("The official working hours from Monday to Friday will be 8:00A.M. &ndash; 5:00P.M, with the exception of public holidays. You will be entitled to an hour for lunch per day. You may also be required to work beyond the official working hours, due to the nature of your job, and as the situation at the Company requires. Your Duty Station shall be Bugiri Branch. However, the Company may transfer you to other locations from time to time as per the organization requirements.");
            sb.Append("<br/><br/>");

            sb.Append("<b>3. REMUNERATION</b>");
            sb.Append("<br/>");
            sb.Append($"Your Monthly Gross Consolidated Salary will be UGX {model.GrossSalary}/= In words ({salaryInWords}). Your gross salary shall be payable into your bank account and it would be subject to Pay As You Earn (PAYE), National Social Security Fund(NSSF), Local service Tax (LST) deductions and any other statutory deductions which the company is or may be required to deduct at source in accordance with any relevant statutory regulatory laws of Uganda. Salaries shall be reviewed every 18 (eighteen) months by the company. Salary increments, if any shall however, will always be at the discretion of management and the company, and will also be based on performance of the company, performance of the employee and the prevailing market conditions.");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<b>4.  PROBATIONARY PERIOD</b>");
            sb.Append("<br/>");
            sb.Append("Your employment term shall commence with an initial probationary period of six (6) months running from the effective date stated above. There will be a review after three (3) months. Your confirmation in the role/position will depend on the receipt of satisfactory performance report from your Supervisor/Line Manager. The successful completion of your probation will be communicated to you in writing.");
            sb.Append("<br/><br/>");

            sb.Append("<b>5. TRAVEL FACILITATION</b>");
            sb.Append("<br/>");
            sb.Append("The facilitation for travel will be provided as per the company policy.");
            sb.Append("<br/><br/>");

            sb.Append("<b>6. ANNUAL LEAVE</b>");
            sb.Append("<br/><br/>");
            sb.Append("During the course of your employment with us you will be entitled to twenty -one (21) days as per the Employment Act of Uganda 2006.");
            sb.Append("<br/><br/>");

            sb.Append("<b>7. SICK LEAVE</b>");
            sb.Append("<br/><br/>");
            sb.Append("During the course of your employment with us you will be entitled to sick leave as per the Human Resource Manual and in accordance with the Employment Act of Uganda, 2006.");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");


            path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/logo.png");
            sb.Append("<div style='text-align: right;'><img src='" + path + "' alt='Logo' width='200' height='100'></div>");
            sb.Append("<br/><br/>");
            sb.Append("<b>8. INVESTMENT CLUB</b>");
            sb.Append("<br/><br/>");
            sb.Append("Upon joining Umoja Microfinance Uganda limited you will automatically become a member of the Umoja Microfinance investment club where you will be able to save a certain percentage of your salary and have access to other services as per the investment club by-laws and constitution.");
            sb.Append("<br/><br/>");

            sb.Append("<b>9. TERMINATION</b>");
            sb.Append("<br/>");
            sb.Append("Termination of contract will occur in the event of occurrence of either of the following: by issuance of notice of termination in accordance with this agreement, expiry of the contract term, retirement, summary dismissal, protracted illness, permanent disability or death, as the case may be. Either party to this contract may during its term, terminate this contract by giving written notice of its or his/her intention to terminate employment or payment equivalent to the required notice period thereof as per the Employment Act Uganda 2006. In the unlikely event of gross misconduct on your part, the company reserves the right to terminate your contract summarily.");
            sb.Append("<br/><br/>");

            sb.Append("<b>10. FURTHER TERMS AND CONDITIONS OF YOUR EMPLOYMEN</b>");
            sb.Append("<br/><br/>");
            sb.Append("Any terms and conditions not specifically addressed in this contract or dealt with in terms of the company rules ,policies or procedures are governed by the Employment Act of Uganda, 2006, regulations thereunder and other applicable laws.\r\nYou are requested to return the enclosed copy duly signed as a token of your acceptance of the terms and conditions of your employment.");
            sb.Append("<br/><br/>");

            sb.Append("<b>11. ACCEPTANCE</b>");
            sb.Append("<br/><br/>");
            sb.Append("This contract is submitted to you in duplicate. If the terms are acceptable to you, we expect you to kindly endorse your acceptance, on both copies. We would like to congratulate you on this appointment and look forward to working with you.");
            sb.Append("<br/><br/>");
            sb.Append("Yours sincerely,");
            sb.Append("<br/><br/>");
            sb.Append("<table><tr>");

            var localPathSigne = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/signe.jpg");
            var localPathUmoja = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/Uganda.png");
            sb.Append("<td align='left'><img src='file:///" + localPathSigne.Replace('\\', '/') + "' alt='UMOJA' width='150' height='150'></td>");
            // sb.Append("<td style='text-align: center;'><img src='file:///" + localPathUmoja.Replace('\\', '/') + "' alt='Another Image' width='200' height='200'></td>");
            sb.Append("<td style='text-align: center;'><img src='file:///" + localPathUmoja.Replace('\\', '/') + "' alt='Another Image' width='150' height='150' style='display: inline-block; vertical-align: top; margin-left: 150px;'>");

            sb.Append("</tr></table>");
            sb.Append("<br/><br/>");
            sb.Append("Komugisha Grace");
            sb.Append("<br/>Human Resource Manager");
            sb.Append("<br/>Umoja Microfinance (SMC) Limited");
            sb.Append("<br/>Phone: +256-0782956438 / 0758200281");
            sb.Append("<br/><br/>");
            sb.Append("C.C  Accounts Dept.");
            sb.Append("<br/>C.C CEO");
            sb.Append("<br/><br/>");

            sb.Append("I ..................... accept the appointment of Umoja Fanisi Limited as Loan Officer on the terms and conditions of service set out above.");
            sb.Append("<br/><br/>");
            sb.Append("Signature: ............ Date: ........................................................................");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");


            path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/logo.png");
            sb.Append("<div style='text-align: right;'><img src='" + path + "' alt='Logo' width='200' height='100'></div>");
            sb.Append("<br/><br/>");

            path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/Jobdescription.png");
            // Table to center the image on the PDF page
            sb.Append("<table style='width: 100%; height: 100vh;'>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; vertical-align: middle;'>");
            sb.Append("<img src='file:///" + path.Replace('\\', '/') + "' alt='Logo' width='600' height='200'>");
            sb.Append("</td>");
            sb.Append("</tr>");
            sb.Append("</table>");
            sb.Append("<br/><br/>");
            sb.Append("<table border='1' style='border-collapse: collapse; width: 50%;'>");
            sb.Append("<tr><td style='padding: 10px;'><b>Job title:</b></td><td style='padding: 10px;'>" + model.DesignationName + "</td></tr>");
            sb.Append("<tr><td style='padding: 10px;'><b>Work Location:</b></td><td style='padding: 10px;'>" + model.BranchName + "</td></tr>");
            sb.Append("<tr><td style='padding: 10px;'><b>Department:</b></td><td style='padding: 10px;'>Operations</td></tr>");
            sb.Append("<tr><td style='padding: 10px;'><b>Reports to:</b></td><td style='padding: 10px;'>Manager</td></tr>");
            sb.Append("</table>");

            sb.Append("<br/><br/>");
            sb.Append("Umoja Microfinance exists to serve and empower people to build brighter futures together. Umoja means &quot;unity&quot; in Swahili. We are in this together, and together, we can learn, grow, and transform lives. We serve our shareholders, our board, our team, and most importantly, our clients. We believe in service one step beyond.");
            sb.Append("<br/><br/>");
            sb.Append("We will transform the Microfinance industry by pursulng excellence in all we do. Transformation isn&rsquo;t easy; but we are committed to excellence by going to a client&rsquo;s home when they need extra help, creating new products with the latest software to meet our clients&rsquo; needs, and building an ambitious culture of consistency and positivity.");
            sb.Append("<br/><br/>");

            sb.Append("<b>Overall Job purpose</b>");
            sb.Append("<br/><br/>");
            sb.Append("In your role as Loan Officer, you are an integral part of our core Operations Team at Umoja Microfinance. As a loan officer you will evaluate and process credit and loan applications. Research applicants' financial status ,references, credit history and evaluate their ability to repay the loan.");
            sb.Append("<br/><br/>");
            sb.Append("<b>Key Performance Indicators</b>");
            sb.Append("<br/><br/>");
            sb.Append("Period: First Three (3) Months");
            sb.Append("<br/><br/>");
            sb.Append("<li> First Month has a marketing target of Twenty (20) admissions</li>");
            sb.Append("<br/>");
            sb.Append("<li> Second Month has a target of fifty (50) borrowers</li>");
            sb.Append("<br/>");
            sb.Append("<li> Third Month has a target of fifty (50) borrowers</li>");
            sb.Append("<br/>");
            sb.Append("<li>Group formation by loan officer</li>");
            sb.Append("<br/>");
            sb.Append("<li> Maintain discipline in groups 100%</li>");
            sb.Append("<br/>");
            sb.Append("<li> Verification before admission 100%</li>");
            sb.Append("<br/>");
            sb.Append("<li> Assessment of client&rsquo;s property 100%</li>");
            sb.Append("<br/>");
            sb.Append("<li> Daily time management in office and the field, 8am reporting time</li>");
            sb.Append("<br/>");
            sb.Append("<li> Behavior pattern i.e. team player, integrity, good communication</li>");
            sb.Append("<br/><br/>");



            path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/logo.png");
            sb.Append("<div style='text-align: right;'><img src='" + path + "' alt='Logo' width='200' height='100'></div>");
            sb.Append("<br/><br/>");
            sb.Append("<b>Day to Day Duties and Responsibilities</b>");
            sb.Append("<br/><br/>");
            sb.Append("<li> To market Umoja Microfinance products by clearly explaining to individuals the types of loans and credit options available as well as the terms of loans</li>");
            sb.Append("<br/>");
            sb.Append("<li> To analyze and assess the applicant&rsquo;s credibility to determine feasibility of granting loans.</li>");
            sb.Append("<br/>");
            sb.Append("<li> To carry out proper verification of both the individual&rsquo;s business premises as well as residence prior to recommendation for a loan</li>");
            sb.Append("<br/>");
            sb.Append("<li> To evaluate loan applications and documents to confirm authenticity.</li>");
            sb.Append("<br/>");
            sb.Append("<li> To approve loans and present to the respective Branch Manager for final Approval.</li>");
            sb.Append("<br/>");
            sb.Append("<li> To update clients about any new policy that may be passed by the Company and ensure implementation of the same.</li>");
            sb.Append("<br/>");
            sb.Append("<li> To ensure that the disbursed loans are recovered back within the stipulated period.</li>");
            sb.Append("<br/>");
            sb.Append("<li> To review and update accurate information required concerning the loans.</li>");
            sb.Append("<br/>");
            sb.Append("<li> To obtain and record accurate information about the clients.</li>");
            sb.Append("<br/>");
            sb.Append("<li> Update in time all the necessary record books.</li>");
            sb.Append("<br/>");
            sb.Append("<li> Any other duty that may be assigned to you.</li>");
            sb.Append("<br/><br/>");

            sb.Append("<b>Our Values</b>");
            sb.Append("<br/><br/>"); ;
            sb.Append("In addition to your day&ndash;to&ndash;day responsibilities, as a team member of Umoja Microfinance Ltd., we take pride in acting as Brand Ambassadors for our company in all that we do. We strive to make this a great place to work and an organization that our communities are proud of. To ensure that we do this our core company values should be at the center of all that we do:");
            sb.Append("<br/>");
            sb.Append("<li> <b>Be Consistent</b> &ndash; Do the simple tasks right every day, every time</li>");
            sb.Append("<br/>");
            sb.Append("<li> <b>Be Ambitious</b> &ndash; Strive to innovate, grow, and improve in all you do</li>");
            sb.Append("<br/>");
            sb.Append("<li> <b>Be Positive</b> &ndash; Stay Upbeat and keep a fun attitude</li>");
            sb.Append("<br/>");
            sb.Append("<li> <b>Have Integrity</b> &ndash; The quality of being honest and having strong moral principles.</li>");
            sb.Append("<br/><br/>");

            sb.Append("<b>Skills</b>");
            sb.Append("<br/><br/>");
            sb.Append("<li> Familiarity with computers and software applications</li>");
            sb.Append("<br/>");
            sb.Append("<li> Solid understanding of direct/indirect lending products and practices</li>");
            sb.Append("<br/>");
            sb.Append("<li> Excellent communication and interpersonal skills</li>");
            sb.Append("<br/>");
            sb.Append("<li> Customer satisfaction orientation and sales competencies</li>");
            sb.Append("<br/>");
            sb.Append("<li> Ability to work in a goal oriented environment</li>");
            sb.Append("<br/><br/>");

            sb.Append("I hereby agree to abide and adhere to this Job Description at all times and I have also understood the key performance indicators (KPI's) for the period of three (3) months. I also confirm that I have read and understood it and that I have received all the relevant training to be able to complete all tasks required.");
            sb.Append("<br/><br/>");
            sb.Append("Signed: ............................................. Date: ............................................. Employee");
            sb.Append("<br/><br/>");

            sb.Append("</div>");

            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.CustomWkHtmlArgs = "--enable-local-file-access";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Loan Officer Contract.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("ResignDetails/{id}")]
    public async Task<IActionResult> ResignDetails(string id)
    {
        try
        {

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            var employees = await _unitOfWork.SP_Call.OneRecord<EmpResignDetails>("HrEmpExitInterview", parameter);

            // Define the CalculateMonths method
            int CalculateMonths(DateTime start, DateTime end)
            {
                return ((end.Year - start.Year) * 12) + end.Month - start.Month;
            }

            // Calculate the months served
            int monthsServed = CalculateMonths(employees.JoiningDate, employees.UpdateDate);


            var sb = new StringBuilder();
            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Times New Roman;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='8'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img  padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");
            sb.Append("</tr>");

            sb.Append("<tr>");



            sb.Append("</tr>");

            sb.Append("</thead>");
            sb.Append("<tbody>");



            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("<br/><br/>");

            sb.Append("<h2 style=' text-align: center; padding-top: 8px;' >STAFF EXIT SURVEY</h2>");
            sb.Append("<h3 style=' text-align: center;'>Please brief the outgoing /Ex-staffs, purpose of this survey before start</h3>");

            sb.Append("<h3 style='margin-top: 2px; font-weight: bold;'>Instructions:</h3>");
            sb.Append("<p>Please fill in the form completely and answer all the questions honestly to achieve the objective of the management to facilitate better services to all. Please do not hesitate to provide the required information as matters will be kept confidential.</p>");
            sb.Append("<p>Preferred Area of Action Research: professional growth, work safety, salary & benefits, supervisory role, office culture/environment</p>");



            sb.Append($@"
              <p style='margin-top: 20px; line-height: 1.5;'>
                  PIN: {employees.EmployeePin}<br/>
               <strong>{employees.EmployeeName}</strong><br/>
                       {employees.DesignationName}
              </p>");

            sb.Append($"<p>{employees.JoiningDate.ToString("dd/MMM/yyyy")}</p>");

            sb.Append("<form style='margin-top: 20px;>");
            sb.Append("<label for='reasonOfLeaving'>1. Reason of leaving (more than one reason may be given if appropriate):</label>");
            sb.Append("<br/><br/>");


            sb.Append(@"
<div style='display: flex;'>
    <div style=' padding-right: 20px;'>
        <p style='margin-top: 10px;'>");

            if (employees.BetterOffer == 0)
            {
                sb.Append("<input type='checkbox' /> Took another job/better offer<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Took another job/better offer<br/>");
            }

            if (employees.SalaryPackage == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with salary package<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with salary package<br/>");
            }

            if (employees.FamilyNeed == 0)
            {
                sb.Append("<input type='checkbox' /> Pregnancy/home/family need<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Pregnancy/home/family need<br/>");
            }

            if (employees.TypeOfWork == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with type of work<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with type of work<br/>");
            }

            if (employees.CareerPath == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with career path<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with career path<br/>");
            }

            if (employees.Disability == 0)
            {
                sb.Append("<input type='checkbox' /> Poor health/physical/disability<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Poor health/physical/disability<br/>");
            }

            if (employees.Supervisor == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with supervisor<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with supervisor<br/>");
            }

            sb.Append(@"
        </p>
    </div>

    <div>
        <p style='margin-top: 10px;'>");

            if (employees.Relocation == 0)
            {
                sb.Append("<input type='checkbox' /> Relocation to another city<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Relocation to another city<br/>");
            }

            if (employees.Colleagues == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with co-workers<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with co-workers<br/>");
            }

            if (employees.Travel == 0)
            {
                sb.Append("<input type='checkbox' /> Travel difficulties<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Travel difficulties<br/>");
            }

            if (employees.WorkingConditions == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfactory working conditions<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfactory working conditions<br/>");
            }

            if (employees.Education == 0)
            {
                sb.Append("<input type='checkbox' /> To attend further education<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> To attend further education<br/>");
            }

            if (employees.Benefits == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with benefits package<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with benefits package<br/>");
            }

            sb.Append($"<p style='font-weight: bold; text-align: center;'> Others (please specify):{employees.OtherReason} </p><br/> <br/>");

            sb.Append(@"
        </p>
    </div>
</div>");




            sb.Append("<label for='monthsServed'>2. How long have you served Umoja micro finance (write in months)</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {monthsServed}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");


            sb.Append("<label for='sharedDesire'>3. Did you share your desire to leave the company/concerns with immediate supervisor prior to leaving?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.InformSupervisor}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='constructiveFeedback'>4. Did you receive constructive feedback to help improve your situation?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Feedback}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='resources'>5. How easy was it to get the resources (office equipment, transport, security, cell phone, etc.) you needed to do your job well?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Resources}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='professionalGrowth'>6. How helpful was your position here in stimulating your professional growth?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Growth}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='pay'>7. How well were you paid here for the work you did?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Payment}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='recognition'>8. How often did you feel your contributions were recognized?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans:{employees.Recognized}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='decisions'>9. How reasonable were decisions (e.g., work load distribution, leave acceptance, recommend for promotion, etc.) made by your supervisor?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Decisions}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='voicingOpinion'>10. How comfortable did you feel voicing your opinion? (e.g., opinion on change of process, product, new ideas, etc.)</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans:{employees.Voicing}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='supervisorTreatment'>11. How well did your supervisor treat you? (e.g., common behavior, praising good work, health discussion, handling mistakes professionally, etc.)</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Treat}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='coWorkers'>12. How much did you like your co-workers?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.coworkers}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='teamwork'>13. How did the members of your team work together?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans:{employees.teamMembers}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='stress'>14. In a typical week, how often did you feel stressed at work?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.stressed}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='workLifeBalance'>15. How difficult was it for you to balance your work and personal life while working here?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.WorkBalance}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='workPlaceSafety'>16. How safe did you feel here at your work place?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.SafePlace}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='workEnvironment'>17. Overall, how was your work environment?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Environment}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='recommendation'>18. If you had a friend looking for a job, would you recommend us?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.RecommendUs}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='comments'>19. Any other comments or concerns, please feel free to write here.</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Comments}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("</form>");

            sb.Append("<h4>We express our sincere gratitude for your invaluable participation and time.</h4>");

            var htmlContent = sb.ToString();


            var htmlToPdf = new HtmlToPdfConverter();

            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);


            return File(pdfBytes, "application/pdf", "employees.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }





    [HttpGet("DetailsList")]
    public async Task<IActionResult> DetailsList()
    {
        try
        {
            var dataList = await _unitOfWork.SP_Call.List<AuditPlanDetails>("AuditPlanDetailsGetAll");

            var sb = new StringBuilder();

            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Audit Planning List</td>");
            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");
            sb.Append("</th>");
            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Details</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Portfolio Value</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>PAR</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Fraud</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Staff Turn Over</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Number Of Borrowers</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Inherent Risk</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Residual Risk</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Weightage</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Overall Risk Rating</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Selected For Audit Period</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Budget</th>");
            sb.Append("</tr>");

            sb.Append("</thead>");
            sb.Append("<tbody>");

            foreach (var data in dataList)
            {


                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BusinessArea}, {data.AURef} , {data.AUName} , {data.AuditType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.PortfolioValue}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Par}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Fraud}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.StaffTurnover}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.NumOfBorrower}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.InherentRisk}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ResidualRisk}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Weightage}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.OverallRiskRating}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SelectedForAuditPeriod}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Budget}</td>");
                sb.Append("</tr>");
            }

            sb.Append("</tbody>");
            sb.Append("</table>");

            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Auditplanlist.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }





    [HttpGet("Payslip/{empPayrollId}")]
    public async Task<IActionResult> Payslip([FromRoute] string empPayrollId)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmpPayrollId", empPayrollId);

            var data = await _unitOfWork.SP_Call.OneRecord<EmpPayslip>("hrEmpPayrollGetByPdf", parameter);
            var sb = new StringBuilder();

            DateTime currentMonth = new DateTime(data.SalaryYear, data.SalaryMonth, 1);


            sb.Append("<!DOCTYPE html>");
            sb.Append("<html lang='en'>");

            sb.Append("<head>");
            sb.Append("<meta charset='UTF-8'>");
            sb.Append("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            sb.Append("<title>Payslip</title>");
            sb.Append("</head>");


            sb.Append("<body>");
            sb.Append("<table style='width: 100%; padding: 4px; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<tr>");
            sb.Append("<td>");
            sb.Append("<img style='background-color: white; padding: 3px;' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-weight: bold; font-size: 30px;'>Payslip</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append($"<td style='text-align: center;font-size: 24px;'>{data.CompanyName}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td>");
            sb.Append("<table style=' padding: 5px;   width: 100%; margin-left: 0;'>");
            sb.Append("<tr>");
            sb.Append("<td>");
            sb.Append($"<div>PIN: {data.EmployeePin}</div>");
            sb.Append($"<div>Date of Joining: {data.JoiningDate}</div>");
            sb.Append($"<div>Pay Period: {currentMonth.ToString("MMM")}, {data.SalaryYear}</div>");
            sb.Append($"<div>No.Of Days: {data.TotalNoofDays}</div>");
            sb.Append($"<div>Branch: {data.BranchName}</div>");
            sb.Append($"<div>Department: {data.DepartmentName}</div>");
            sb.Append("</td>");
            sb.Append("<td>");
            sb.Append($"<div>Name: {data.EmployeeName}</div>");
            sb.Append($"<div>Designation: {data.DesignationName}</div>");
            sb.Append($"<div>NSSF Number: {data.NssfNumber}</div>");
            sb.Append($"<div>Bank Name: {data.BankName}</div>");
            sb.Append($"<div>Bank A/C Number: {data.BankAccountNumber}</div>");
            sb.Append($"<div>TIN: {data.TinNumber}</div>");
            sb.Append("</td>");
            sb.Append("</tr>");
            sb.Append("</table>");
            sb.Append("</td>");
            sb.Append("</tr>");
            sb.Append("<table style='padding: 5px;   width: 100%; margin-left: 0;'>");
            sb.Append("<tr>");
            sb.Append("<td style='font-weight: bold; border-bottom: 1px solid #000000;'>Particulars</td>");
            sb.Append("<td style='font-weight: bold; border-bottom: 1px solid #000000; text-align: right;'>Amount</td>");
            sb.Append("</tr>");
            if (data.GrossSalaryUsd > 0)
            {
                sb.Append("<tr>");
                sb.Append("<td style='border-bottom: 1px solid #000000;'>Gross Salary USD:</td>");
                sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.GrossSalaryUsd.ToString("N0")}</td>");
                sb.Append("</tr>");
            }
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Gross Salary :</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.GrossSalary.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Prorated Gross:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.ProratedGrossSalary.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>LST:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.Lst.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>NSSF (5%) :</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.NssfEmployee.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Pgs LST:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.PgsLst.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>TAX PAYE:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.TaxPaye.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Sacco Deduction:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.SaccoDeduction.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Total Deduction:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.TotalDeduction.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Sacco Payment:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.SaccoPayment.ToString("N0")}</td>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Advance Deductions:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.AdvanceDeductions.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Sacco Loan Re-Payment Deduction :</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.SaccoLoanRePaymentDeduction.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='font-weight: bold; border-bottom: 1px solid #000000;'>Net payment:</td>");
            sb.Append($"<td style='font-weight: bold; border-bottom: 1px solid #000000; text-align: right;'>{data.Netpayment.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Loss Deduction:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.LostDeduction.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>NSSF (10%):</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.NssfEmployer.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>NSSF Payable:</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.TotalNssf.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='border-bottom: 1px solid #000000;'>Trainee Arrears :</td>");
            sb.Append($"<td style='border-bottom: 1px solid #000000; text-align: right;'>{data.TraineeArrears.ToString("N0")}</td>");
            sb.Append("</tr>");
            sb.Append("<tr >");
            sb.Append("<td style='text-align: center;' colspan='2'>This is a system generated Payslip</td>");
            sb.Append("</tr>");
            sb.Append("</table>");
            sb.Append("</table>");
            sb.Append("</body>");
            sb.Append("</html>");

            string htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();

            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            //htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "payslip.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }




}