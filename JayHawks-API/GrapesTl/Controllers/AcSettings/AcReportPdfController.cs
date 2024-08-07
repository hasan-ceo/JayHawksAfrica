using Dapper;
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


namespace GrapesTl.Controllers.IT;

[Authorize(Roles = "Super Admin,Accounts Manager,Accounts Executive")]
[Route("api/[controller]")]
[ApiController]
public class AcReportPdfController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("New/{fromDate}/{tillDate}")]
    public async Task<IActionResult> New([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<AccountGlView>("AcDayBookSearch", parameter);
            var company = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");


            var sb = new StringBuilder();


            sb.Append("<div style='font-family: Arial;'>");

            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='6'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");



            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            //sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");

            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-top: 20px;'>Day Book</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Ledger Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Sub Ledger Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Particulars</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Debit Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Credit Amount</th>");


            sb.Append("</tr>");
            sb.Append("</thead>");

            decimal totaldr = 0;
            decimal totalcr = 0;

            foreach (var item in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.WorkDate.ToString("dd/MMM/yyyy")}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.LedgerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.SubLedgerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Particulars}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Dr:N0}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Cr:N2}</td>");
                //sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{(item.SellPrice):N2}</td>");

                sb.Append("</tr>");

                totaldr += (decimal)(item.Dr);
                totalcr += (decimal)(item.Cr);
            }

            sb.Append("<tr>");
            sb.Append($"<td colspan='4' style='border: 1px solid #000000; text-align: right; padding: 8px;'></td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totaldr:N2}</td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totalcr:N2}</td>");
            sb.Append("</tr>");

            sb.Append("</table>");
            sb.Append("</div>");





            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "dayBook.pdf");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("LedgerName/{SearchId}/{fromDate}/{tillDate}")]
    public async Task<IActionResult> LedgerName([FromRoute] string SearchId, [FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@LedgerId", SearchId);
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            var data = await _unitOfWork.SP_Call.List<AccountGlView>("AcLedgerNameGetBySearch", parameter);

            var company = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");


            var sb = new StringBuilder();


            sb.Append("<div style='font-family: Arial;'>");

            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='5'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");



            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            //sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");

            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-top: 20px;'>Ledger </td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Particulars</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Voucher No</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Debit Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Credit Amount</th>");


            sb.Append("</tr>");
            sb.Append("</thead>");


            decimal totaldr = 0;
            decimal totalcr = 0;

            foreach (var item in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.WorkDate}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Particulars}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.VoucherNumber}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Cr}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Dr}</td>");


                sb.Append("</tr>");

                totaldr += (decimal)(item.Dr);
                totalcr += (decimal)(item.Cr);
            }

            sb.Append("<tr>");
            sb.Append($"<td colspan='3' style='border: 1px solid #000000; text-align: right; padding: 8px;'></td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totaldr:N2}</td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totalcr:N2}</td>");

            sb.Append("</tr>");

            sb.Append("</table>");
            sb.Append("</div>");





            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Ledger.pdf");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("TrialBalance/{fromDate}/{tillDate}")]
    public async Task<IActionResult> TrialBalance([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<AccountGlView>("AcTrialBalanceSearch", parameter);

            var company = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");


            var sb = new StringBuilder();


            sb.Append("<div style='font-family: Arial;'>");

            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='4'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");



            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            //sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");

            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-top: 20px;'>Trial Balance</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Particulars</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Debit Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Credit Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Balance</th>");


            sb.Append("</tr>");
            sb.Append("</thead>");


            decimal totaldr = 0;
            decimal totalcr = 0;

            foreach (var item in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Particulars}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Cr}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Dr}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Balance}</td>");


                sb.Append("</tr>");

                totaldr += (decimal)(item.Dr);
                totalcr += (decimal)(item.Cr);
            }

            sb.Append("<tr>");
            sb.Append($"<td colspan='1' style='border: 1px solid #000000; text-align: right; padding: 8px;'></td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totaldr:N2}</td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totalcr:N2}</td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>Balance:{totaldr - totalcr}</td>");
            sb.Append("</tr>");

            sb.Append("</table>");
            sb.Append("</div>");





            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "trial.pdf");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }



    [HttpGet("BankBook/{fromDate}/{tillDate}")]
    public async Task<IActionResult> BankBook([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLBankBookGetAll", parameter);

            var company = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");


            var sb = new StringBuilder();


            sb.Append("<div style='font-family: Arial;'>");

            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='5'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");



            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            //sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-top: 20px;'>Bank Book</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Ledger Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Debit Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Credit Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Balance</th>");


            sb.Append("</tr>");
            sb.Append("</thead>");


            decimal totaldr = 0;
            decimal totalcr = 0;

            foreach (var item in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.WorkDate.ToShortDateString()}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.LedgerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Cr}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Dr}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Balance}</td>");


                sb.Append("</tr>");

                totaldr += (decimal)(item.Dr);
                totalcr += (decimal)(item.Cr);
            }

            sb.Append("<tr>");
            sb.Append($"<td colspan='2' style='border: 1px solid #000000; text-align: right; padding: 8px;'></td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totaldr:N2}</td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totalcr:N2}</td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{(totaldr - totalcr):N2}</td>");
            sb.Append("</tr>");

            sb.Append("</table>");
            sb.Append("</div>");





            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "BankBook.pdf");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }




    [HttpGet("CashBook/{fromDate}/{tillDate}")]
    public async Task<IActionResult> CashBook([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLBankBookGetAll", parameter);

            var company = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");


            var sb = new StringBuilder();


            sb.Append("<div style='font-family: Arial;'>");

            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='5'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");



            sb.Append("<td style='text-align: center; padding-top: 10px'>");

            sb.Append("<img style='background-color:white; padding: 3px' src='" + SD.ReportImageUrl + "'/>");

            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-top: 20px;'>Cash Book</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Ledger Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Debit Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Credit Amount</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;' colspan='1'>Balance</th>");


            sb.Append("</tr>");
            sb.Append("</thead>");


            decimal totaldr = 0;
            decimal totalcr = 0;

            foreach (var item in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.WorkDate.ToShortDateString()}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.LedgerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Cr}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Dr}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.Balance}</td>");


                sb.Append("</tr>");

                totaldr += (decimal)(item.Dr);
                totalcr += (decimal)(item.Cr);
            }

            sb.Append("<tr>");
            sb.Append($"<td colspan='2' style='border: 1px solid #000000; text-align: right; padding: 8px;'></td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totaldr:N2}</td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totalcr:N2}</td>");
            sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{(totaldr - totalcr):N2}</td>");
            sb.Append("</tr>");

            sb.Append("</table>");
            sb.Append("</div>");





            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "CashBook.pdf");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


}
