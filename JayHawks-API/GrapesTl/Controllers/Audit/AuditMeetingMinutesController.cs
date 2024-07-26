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
public class AuditMeetingMinutesController(IUnitOfWork unitOfWork) : ControllerBase
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
            parameter.Add("@AuditId", id);

            var data = await _unitOfWork.SP_Call.List<AuditMeetingMinutes>("AuditMeetingMinutesGetAll", parameter);

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
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@MeetingMinutesId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditMeetingMinutes>("AuditMeetingMinutesGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] AuditTestSteps model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AudiTestStepsId", model.AuditTestStepsId);
            parameter.Add("@AuditAreaId", model.AuditAreaId);
            parameter.Add("@TestStepsName", model.TestStepsName);
            parameter.Add("@Details", OperationConstant.AuditMeetingMinutesCreate);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AudiTestStepsCreate", parameter);

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
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] AuditMeetingMinutes model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@MeetingMinutesId", model.MeetingMinutesId);
            parameter.Add("@FileUrl", model.FileUrl);
            parameter.Add("@Details", OperationConstant.AuditMeetingMinutesUpdate);
            parameter.Add("@OperationBy", _userId);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditMeetingMinutesUpdate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            if (message == "Not found")
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
            parameter.Add("@AudiTestStepsId", id);
            parameter.Add("@Details", OperationConstant.AuditMeetingMinutesDelete);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AudiTestStepsDelete", parameter);

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
