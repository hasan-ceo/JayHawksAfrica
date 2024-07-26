using CsvHelper;
using CsvHelper.Configuration;
using Dapper;
using GrapesTl.Models;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Globalization;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;


[Authorize(Roles = "Super Admin,HR Manager,HR Executive, Accounts Executive, Accounts Manager")]
[Route("api/[controller]")]
[ApiController]
public class FileUploadController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;
    //public class Foo
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}


    [HttpPost("EmpAllDed/Upload")]
    public async Task<IActionResult> AllowanceDeduction(IFormFile file)
    {

        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            if (file == null || file.ContentType.Length <= 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (Path.GetExtension(file.FileName).ToLower() != ".csv")
            {
                return BadRequest("Invalid file format. Only CSV files are allowed.");
            }

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                NewLine = Environment.NewLine,
            };

            using (var reader = new StreamReader(file.OpenReadStream()))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<EmpAllDedFileUplod>();

                //_unitOfWork.SP_Call.BulkInserts(records);
                foreach (var model in records)
                {
                    _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

                    var parameter = new DynamicParameters();

                    parameter.Add("@BranchName", model.BranchName);
                    parameter.Add("@EmployeePin", model.EmployeePin.Trim());
                    parameter.Add("@EmployeeName", model.EmployeeName);
                    parameter.Add("@AllowanceDeductionName", model.AllowanceDeductionName);
                    parameter.Add("@Amount", model.Amount);
                    parameter.Add("@Particulars", model.Particulars);
                    parameter.Add("@Message", "", DbType.String, ParameterDirection.Output);

                    await _unitOfWork.SP_Call.Execute("hrEmpAllDedFileUpload", parameter);

                    var message = parameter.Get<string>("@Message");


                }

                return Created("", SD.Message_Save);
            }


        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error saving data." + e.Message);
        }
    }


}

