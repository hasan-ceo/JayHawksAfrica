using Dapper;
using GrapesTl.Models;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditDpInvestigationController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<DepartmentalInvestigationReportView>("AuditDpInvestigationGetAll");

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
            parameter.Add("@InvestigationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<DepartmentalInvestigationReport>("AuditDpInvestigationGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] DepartmentalInvestigationReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Title", model.Title);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@InvestigationDate", model.InvestigationDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditDpInvestigationCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] DepartmentalInvestigationReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", model.InvestigationId);
            parameter.Add("@Title", model.Title);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@InvestigationDate", model.InvestigationDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditDpInvestigationUpdate", parameter);
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
            parameter.Add("@InvestigationId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditDpInvestigationDelete", parameter);

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

    [HttpGet("DepartmentalInvestigationInfo/{id}")]
    public async Task<IActionResult> InvestigationInfo(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);
            var data = await _unitOfWork.SP_Call.OneRecord<DepartmentalInvestigationReportView>("AuditDpInvestigationGetById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpGet("DetailsList/{id}")]
    public async Task<IActionResult> DetailsList(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);

            var data = await _unitOfWork.SP_Call.List<DepartmentalInvestigationReportDetails>("AuditDpInvestigationDetailsGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpGet("DepartmentalInvestigationDetails/{id}/")]
    public async Task<IActionResult> InvestigationDetails(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationDetailsId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<DepartmentalInvestigationReportDetails>("AuditDpInvestigationDetailsGetById", parameter);

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
    [HttpPost("DetailsUpdate/{id}")]
    public async Task<IActionResult> DetailsUpdate(string id, [FromForm] DepartmentalInvestigationReportDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationDetailsId", model.InvestigationDetailsId);
            parameter.Add("@SampleSelectionMethod", model.SampleSelectionMethod);
            parameter.Add("@ControlFrequency", model.ControlFrequency);
            parameter.Add("@PopulationSize", model.PopulationSize);
            parameter.Add("@SampleSize", model.SampleSize);
            parameter.Add("@TestConclusion", model.TestConclusion);
            parameter.Add("@AuditFinding", model.AuditFinding);
            parameter.Add("@Cause", model.Cause);
            parameter.Add("@Implication", model.Implication);
            parameter.Add("@Recommendation", model.Recommendation);
            parameter.Add("@ControlOwnerResponse", model.ControlOwnerResponse);
            parameter.Add("@ImplementationDate", model.ImplementationDate);
            parameter.Add("@ManagementAction", model.ManagementAction);
            parameter.Add("@Exceptions", model.Exceptions);
            parameter.Add("@Evidences", model.Evidences);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditDpInvestigationDetailsUpdate", parameter);
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

    [Authorize]
    [HttpPost("StatusUpdate/{id}")]
    public async Task<IActionResult> StatusUpdate(string id)
    {
        try
        {


            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditDepartmentStatusUpdate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Cannot update status")
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
