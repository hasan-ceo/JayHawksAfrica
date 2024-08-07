using GrapesTl.Models;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NReco.PdfGenerator;
using System;
using System.Text;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive,Accounts Manager,Audit Manager,Accounts Executive, Country Team Lead")]
[Route("api/[controller]")]
[ApiController]
public class AuditPdfGenerateController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpGet("AuditPlanList")]
    public async Task<IActionResult> DownloadAuditPlanPdf()
    {
        try
        {
            var auditPlans = await _unitOfWork.SP_Call.List<AuditPlanDetails>("AuditPlanDetailsGetAll");

            var sb = new StringBuilder();
            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='15'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px; padding-bottom: 25px; padding-top: 10px;'>Audit Plan Check List</td>");
            sb.Append("</tr>");

            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");


            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Business Area</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>AU Ref</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>AU Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Audit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Portfolio Value</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>PAR</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Fraud</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Staff Turnover</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Number of Borrowers</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Inherent Risk</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Residual Risk</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Weightage</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Overall Risk Rating</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Selected for Audit Period</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Budget</th>");


            sb.Append("</tr>");

            sb.Append("</thead>");
            sb.Append("<tbody>");
            foreach (var auditPlan in auditPlans)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.BusinessArea}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.AURef}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.AUName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.AuditType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.PortfolioValue}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.Par}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.Fraud}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.StaffTurnover}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.NumOfBorrower}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.InherentRisk}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.ResidualRisk}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.Weightage}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.OverallRiskRating}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.SelectedForAuditPeriod}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{auditPlan.Budget}</td>");
                sb.Append("</tr>");
            }
            sb.Append("</tbody>");
            sb.Append("</table>");

            var htmlContent = sb.ToString();


            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);


            return File(pdfBytes, "application/pdf", "Audit Planning Checklist.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

}
