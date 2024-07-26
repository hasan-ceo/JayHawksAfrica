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
public class SpInvestigationController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<SpInvestigationView>("AuditSpInvestigationGetAll");

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

            var data = await _unitOfWork.SP_Call.OneRecord<SpInvestigation>("AuditSpInvestigationGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] SpInvestigation model)
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
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] SpInvestigation model)
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
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationUpdate", parameter);
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
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationDelete", parameter);

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

    [HttpGet("InvestigationInfo")]
    public async Task<IActionResult> InvestigationInfo()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.OneRecord<SpInvestigationView>("AuditSpInvestigationGetAll");

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

            var data = await _unitOfWork.SP_Call.List<SpInvestigationDetails>("AuditSpInvestigationDetailsGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpGet("InvestigationDetails/{id}/")]
    public async Task<IActionResult> InvestigationDetails(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationDetailsId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<SpInvestigationDetails>("AuditSpInvestigationDetailsGetById", parameter);

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
    public async Task<IActionResult> DetailsUpdate(string id, [FromForm] SpInvestigationDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);
            parameter.Add("@InvestigationDetailsId", model.InvestigationDetailsId);
            parameter.Add("@Evidences", model.Evidences);
            parameter.Add("@ReportInputs", model.ReportInputs);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationDetailsUpdate", parameter);
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
    [HttpDelete("DetailsDelete/{id}")]
    public async Task<IActionResult> DetailsDelete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationDetailsId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationDetailsDelete", parameter);

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

    [Authorize]
    [HttpPost("StatusUpdate/{id}")]
    public async Task<IActionResult> StatusUpdate(string id)
    {
        try
        {


            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationStatusUpdate", parameter);

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
