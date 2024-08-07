using Dapper;
using GrapesTl.Models;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditSpecialInvestigationAuditReportController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;

    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<SpecialInvestigationAuditReport>("AuditSpecialInvestigationReportGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SpecialInvestigationAuditReportId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<SpecialInvestigationAuditReport>("AuditSpecialInvestigationReportGetById", parameter);

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

    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] SpecialInvestigationAuditReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@Year", model.Year);
            parameter.Add("@ReportingQuarter", model.ReportingQuarter);
            parameter.Add("@MonthOfAudit", model.MonthOfAudit);
            parameter.Add("@DepartmentName", model.DepartmentName);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@Region", model.Region);
            parameter.Add("@DetectionMethod", model.DetectionMethod);
            parameter.Add("@TypeOfFraud", model.TypeOfFraud);
            parameter.Add("@WhoMightBeInvolved", model.WhoMightBeInvolved);
            parameter.Add("@PositionOfFraudster", model.PositionOfFraudster);
            parameter.Add("@LengthOfServiceOfFraudster", model.@LengthOfServiceOfFraudster);
            parameter.Add("@HowIsTheFraudBeingPerpetrated", model.HowIsTheFraudBeingPerpetrated);
            parameter.Add("@NumberOfOccurences", model.NumberOfOccurences);
            parameter.Add("@PotentialWitness", model.PotentialWitness);
            parameter.Add("@Statements", model.Statements);
            parameter.Add("@Evidence", model.Evidence);
            parameter.Add("@Observations", model.Observations);
            parameter.Add("@DefectiveControlsIdentified", model.DefectiveControlsIdentified);
            parameter.Add("@EstimatedFraudLoss", model.EstimatedFraudLoss);
            parameter.Add("@Recommendations", model.Recommendations);
            parameter.Add("@ManagementResponse", model.ManagementResponse);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@IAInCharge", model.IAInCharge);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpecialInvestigationReportCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            //return Created("", SD.Message_Save);
            return Created("", message);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] SpecialInvestigationAuditReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SpecialInvestigationAuditReportId", model.SpecialInvestigationAuditReportId);
            parameter.Add("@Year", model.Year);
            parameter.Add("@ReportingQuarter", model.ReportingQuarter);
            parameter.Add("@MonthOfAudit", model.MonthOfAudit);
            parameter.Add("@DepartmentName", model.DepartmentName);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@Region", model.Region);
            parameter.Add("@DetectionMethod", model.DetectionMethod);
            parameter.Add("@TypeOfFraud", model.TypeOfFraud);
            parameter.Add("@WhoMightBeInvolved", model.WhoMightBeInvolved);
            parameter.Add("@PositionOfFraudster", model.PositionOfFraudster);
            parameter.Add("@HowIsTheFraudBeingPerpetrated", model.HowIsTheFraudBeingPerpetrated);
            parameter.Add("@NumberOfOccurences", model.NumberOfOccurences);
            parameter.Add("@PotentialWitness", model.PotentialWitness);
            parameter.Add("@Statements", model.Statements);
            parameter.Add("@Evidence", model.Evidence);
            parameter.Add("@Observations", model.Observations);
            parameter.Add("@DefectiveControlsIdentified", model.DefectiveControlsIdentified);
            parameter.Add("@EstimatedFraudLoss", model.EstimatedFraudLoss);
            parameter.Add("@Recommendations", model.Recommendations);
            parameter.Add("@ManagementResponse", model.ManagementResponse);
            parameter.Add("@EmployeeId", model.EmployeeId);
            parameter.Add("@IAInCharge", model.IAInCharge);
            parameter.Add("@LengthOfServiceOfFraudster", model.@LengthOfServiceOfFraudster);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpecialInvestigationReportUpdate", parameter);
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

    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SpecialInvestigationAuditReportId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpecialInvestigationReportDelete", parameter);

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
