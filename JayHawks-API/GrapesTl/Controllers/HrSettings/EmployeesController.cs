using Dapper;
using GrapesTl.Models;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EmployeesController(IUnitOfWork unitOfWork, IMailSender mailSender, IConfiguration configuration, ILogger<EmployeesController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly IConfiguration _configuration = configuration;
    private readonly ILogger<EmployeesController> _logger = logger;
    private string _userId;


    [HttpGet("Select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectAll")]
    public async Task<IActionResult> SelectAll()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeGetForSelectAll");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    //[HttpGet("SelectManager")]
    //public async Task<IActionResult> SelectManager()
    //{
    //    _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
    //    var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

    //    var roles = new List<string>()
    //            {
    //                "Area Manager",
    //                "Operations Manager",
    //                "Super Admin",
    //                "Branch Manager",
    //                "Regional Manager",
    //                "Operations Head, Country Team Leader",
    //                "HR Manager",
    //                "HR Executive",
    //                "Audit Manager",
    //                "Head of operations",
    //                "Accounts Manager",
    //                "Assistant audit manager"

    //            };

    //    var result = roles.Contains(user.Role);
    //    try
    //    {
    //        var data = await _unitOfWork.SP_Call.List<EmpForSelect>(result == true ? "hrEmployeeTopMgtGetForSelect": "hrEmployeeMgtGetForSelect");

    //        return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve list of data." + e.Message);
    //    }
    //}

    [HttpGet("SelectManager")]
    public async Task<IActionResult> SelectManager()
    {


        try

        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeMgtSelect", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectSecondManager")]
    public async Task<IActionResult> SelectSecondManager()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeSecondMgtGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("SelectTopManager")]
    public async Task<IActionResult> SelectTopManager()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeTopMgtGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectOpsManager")]
    public async Task<IActionResult> SelectOpsManager()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeOpsGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }






    [HttpGet("SelectAuditor")]
    public async Task<IActionResult> SelectAuditor()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeAuditorGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Letter1/{id}")]
    public async Task<IActionResult> Letter1(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetAll>("hrEmployeeGetLetterById", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetById>("hrEmployeeGetById", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpGet("Search/{id}")]
    public async Task<IActionResult> Search(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", id);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetBySearch", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpGet("EmpSearch/{id}")]
    public async Task<IActionResult> EmpSearch(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmpSearch>("hrEmployeeGetByEmpSearch", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] Employee model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var employeeId = Guid.NewGuid();
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", employeeId);
            parameter.Add("@EmployeeName", model.EmployeeName);
            parameter.Add("@ContactNumber", model.ContactNumber);
            parameter.Add("@Email", string.IsNullOrEmpty(model.Email) ? "" : model.Email);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@DesignationId", model.DesignationId);
            parameter.Add("@StaffTypeId", model.StaffTypeId);
            parameter.Add("@Gender", model.Gender);
            parameter.Add("@DateOfBirth", model.DateOfBirth);
            parameter.Add("@JoiningDate", model.JoiningDate);
            parameter.Add("@GrossSalaryUSD", model.GrossSalaryUSD);
            parameter.Add("@GrossSalary", model.GrossSalary);
            parameter.Add("@NssfNumber", model.NssfNumber);
            parameter.Add("@BankId", model.BankId);
            parameter.Add("@BankAccountNumber", model.BankAccountNumber);
            parameter.Add("@TinNumber", model.TinNumber);
            parameter.Add("@SaccoDeduction", model.SaccoDeduction);
            parameter.Add("@MotherName", model.MotherName);
            parameter.Add("@FatherName", model.FatherName);
            parameter.Add("@Religion", model.Religion);
            parameter.Add("@MaritalStatus", model.MaritalStatus);
            parameter.Add("@BloodGroup", model.BloodGroup);
            parameter.Add("@EducationId", model.EducationId);
            parameter.Add("@LanguagesSpoken", model.LanguagesSpoken);
            parameter.Add("@ContactAddress", model.ContactAddress);
            parameter.Add("@ImageUrl", string.IsNullOrWhiteSpace(model.ImageUrl) ? SD.ImageUrl : model.ImageUrl);
            parameter.Add("@EntryBy", user.FullName);
            parameter.Add("@FatherContactNumber", string.IsNullOrEmpty(model.FatherContactNumber) ? "" : model.FatherContactNumber);
            parameter.Add("@MotherContactNumber", string.IsNullOrEmpty(model.MotherContactNumber) ? "" : model.MotherContactNumber);
            parameter.Add("@KinName", string.IsNullOrEmpty(model.KinName) ? "" : model.KinName);
            parameter.Add("@KinAddress", string.IsNullOrEmpty(model.KinAddress) ? "" : model.KinAddress);
            parameter.Add("@KinContactNumber", string.IsNullOrEmpty(model.KinContactNumber) ? "" : model.KinContactNumber);
            parameter.Add("@KinRelationship", string.IsNullOrEmpty(model.KinRelationship) ? "" : model.KinRelationship);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmployeeCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            if (string.IsNullOrEmpty(model.Email) == false)
            {
                try
                {
                    var callbackUrl = _configuration["NewJoinParameter:Audience"].ToString() + employeeId;
                    var tmp = await _mailSender.SendEmailWithBody(
                        model.Email,
                        model.EmployeeName,
                        SD.BccEmail,
                        SD.AppointmentLetter,
                        $"We have the pleasure of offering you an employment opportunity with " + SD.CompanyName + ". Download Appointment Letter by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                }
            }
            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] Employee model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", model.EmployeeId);
            parameter.Add("@EmployeeName", model.EmployeeName);
            parameter.Add("@ContactNumber", model.ContactNumber);
            parameter.Add("@Email", string.IsNullOrEmpty(model.Email) ? "" : model.Email);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@DesignationId", model.DesignationId);
            parameter.Add("@StaffTypeId", model.StaffTypeId);
            parameter.Add("@Gender", model.Gender);
            parameter.Add("@DateOfBirth", model.DateOfBirth);
            parameter.Add("@JoiningDate", model.JoiningDate);
            parameter.Add("@GrossSalaryUSD", model.GrossSalaryUSD);
            parameter.Add("@GrossSalary", model.GrossSalary);
            parameter.Add("@NssfNumber", model.NssfNumber);
            parameter.Add("@BankId", model.BankId);
            parameter.Add("@BankAccountNumber", model.BankAccountNumber);
            parameter.Add("@TinNumber", model.TinNumber);
            parameter.Add("@SaccoDeduction", model.SaccoDeduction);
            parameter.Add("@MotherName", model.MotherName);
            parameter.Add("@FatherName", model.FatherName);
            parameter.Add("@Religion", model.Religion);
            parameter.Add("@MaritalStatus", model.MaritalStatus);
            parameter.Add("@BloodGroup", model.BloodGroup);
            parameter.Add("@EducationId", model.EducationId);
            parameter.Add("@LanguagesSpoken", model.LanguagesSpoken);
            parameter.Add("@ContactAddress", model.ContactAddress);
            parameter.Add("@ImageUrl", string.IsNullOrWhiteSpace(model.ImageUrl) ? SD.ImageUrl : model.ImageUrl);
            parameter.Add("@FatherContactNumber", string.IsNullOrEmpty(model.FatherContactNumber) ? "" : model.FatherContactNumber);
            parameter.Add("@MotherContactNumber", string.IsNullOrEmpty(model.MotherContactNumber) ? "" : model.MotherContactNumber);
            parameter.Add("@KinName", string.IsNullOrEmpty(model.KinName) ? "" : model.KinName);
            parameter.Add("@KinAddress", string.IsNullOrEmpty(model.KinAddress) ? "" : model.KinAddress);
            parameter.Add("@KinContactNumber", string.IsNullOrEmpty(model.KinContactNumber) ? "" : model.KinContactNumber);
            parameter.Add("@KinRelationship", string.IsNullOrEmpty(model.KinRelationship) ? "" : model.KinRelationship);
            parameter.Add("@UpdateBy", user.FullName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmployeeUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmployeeDelete", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Cannot delete")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }
}
