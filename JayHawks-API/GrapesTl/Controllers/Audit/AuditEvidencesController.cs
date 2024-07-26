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
public class AuditEvidencesController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpGet("List/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@ChecklistId", id);

            var data = await _unitOfWork.SP_Call.List<AuditEvidences>("AuditEvidencesGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] AuditEvidences model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@ChecklistId", model.ChecklistId);
            parameter.Add("@Evidences", model.Evidences);
            parameter.Add("@Details", OperationConstant.AuditEvidencesCreate);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditEvidencesCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }


    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@EvidencesId", id);
            parameter.Add("@Details", OperationConstant.AuditEvidencesDelete);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditEvidencesDelete", parameter);

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
