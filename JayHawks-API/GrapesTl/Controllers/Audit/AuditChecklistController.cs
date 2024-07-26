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
public class AuditChecklistController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;




    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpGet("Details/{auditId}")]
    public async Task<IActionResult> Details(string auditId)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", auditId);

            var data = await _unitOfWork.SP_Call.List<AuditChecklist>("AuditChecklistGetById", parameter);

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
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] AuditChecklist model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@ChecklistId", model.ChecklistId);
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@QuestionId", model.QuestionId);
            parameter.Add("@TestResults", model.TestResults);
            parameter.Add("@TestConclusion", model.TestConclusion);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate", parameter);
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
    [HttpPost("Update1")]
    public async Task<IActionResult> Update1([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults1", model.TestResults1);
            parameter.Add("@TestConclusion1", model.TestConclusion1);
            parameter.Add("@TestEvidences1", model.TestEvidences1);
            parameter.Add("@TestResults2", model.TestResults2);
            parameter.Add("@TestConclusion2", model.TestConclusion2);
            parameter.Add("@TestEvidences2", model.TestEvidences2);
            parameter.Add("@TestResults3", model.TestResults3);
            parameter.Add("@TestConclusion3", model.TestConclusion3);
            parameter.Add("@TestEvidences3", model.TestEvidences3);
            parameter.Add("@TestResults4", model.TestResults4);
            parameter.Add("@TestConclusion4", model.TestConclusion4);
            parameter.Add("@TestEvidences4", model.TestEvidences4);
            parameter.Add("@TestResults5", model.TestResults5);
            parameter.Add("@TestConclusion5", model.TestConclusion5);
            parameter.Add("@TestEvidences5", model.TestEvidences5);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate1);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate1", parameter);
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
    [HttpPost("Update2")]
    public async Task<IActionResult> Update2([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults6", model.TestResults6);
            parameter.Add("@TestConclusion6", model.TestConclusion6);
            parameter.Add("@TestEvidences6", model.TestEvidences6);
            parameter.Add("@TestResults7", model.TestResults7);
            parameter.Add("@TestConclusion7", model.TestConclusion7);
            parameter.Add("@TestEvidences7", model.TestEvidences7);
            parameter.Add("@TestResults8", model.TestResults8);
            parameter.Add("@TestConclusion8", model.TestConclusion8);
            parameter.Add("@TestEvidences8", model.TestEvidences8);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate2);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate2", parameter);
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
    [HttpPost("Update3")]
    public async Task<IActionResult> Update3([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults9", model.TestResults9);
            parameter.Add("@TestConclusion9", model.TestConclusion9);
            parameter.Add("@TestEvidences9", model.TestEvidences9);
            parameter.Add("@TestResults10", model.TestResults10);
            parameter.Add("@TestConclusion10", model.TestConclusion10);
            parameter.Add("@TestEvidences10", model.TestEvidences10);
            parameter.Add("@TestResults11", model.TestResults11);
            parameter.Add("@TestConclusion11", model.TestConclusion11);
            parameter.Add("@TestEvidences11", model.TestEvidences11);
            parameter.Add("@TestResults12", model.TestResults12);
            parameter.Add("@TestConclusion12", model.TestConclusion12);
            parameter.Add("@TestEvidences12", model.TestEvidences12);
            parameter.Add("@TestResults13", model.TestResults13);
            parameter.Add("@TestConclusion13", model.TestConclusion13);
            parameter.Add("@TestEvidences13", model.TestEvidences13);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate3);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate3", parameter);
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
    [HttpPost("Update4")]
    public async Task<IActionResult> Update4([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults14", model.TestResults14);
            parameter.Add("@TestConclusion14", model.TestConclusion14);
            parameter.Add("@TestEvidences14", model.TestEvidences14);
            parameter.Add("@TestResults15", model.TestResults15);
            parameter.Add("@TestConclusion15", model.TestConclusion15);
            parameter.Add("@TestEvidences15", model.TestEvidences15);
            parameter.Add("@TestResults16", model.TestResults16);
            parameter.Add("@TestConclusion16", model.TestConclusion16);
            parameter.Add("@TestEvidences16", model.TestEvidences16);
            parameter.Add("@TestResults17", model.TestResults17);
            parameter.Add("@TestConclusion17", model.TestConclusion17);
            parameter.Add("@TestEvidences17", model.TestEvidences17);
            parameter.Add("@TestResults18", model.TestResults18);
            parameter.Add("@TestConclusion18", model.TestConclusion18);
            parameter.Add("@TestEvidences18", model.TestEvidences18);
            parameter.Add("@TestResults19", model.TestResults19);
            parameter.Add("@TestConclusion19", model.TestConclusion19);
            parameter.Add("@TestEvidences19", model.TestEvidences19);
            parameter.Add("@TestResults20", model.TestResults20);
            parameter.Add("@TestConclusion20", model.TestConclusion20);
            parameter.Add("@TestEvidences20", model.TestEvidences20);
            parameter.Add("@TestResults21", model.TestResults21);
            parameter.Add("@TestConclusion21", model.TestConclusion21);
            parameter.Add("@TestEvidences21", model.TestEvidences21);
            parameter.Add("@TestResults22", model.TestResults22);
            parameter.Add("@TestConclusion22", model.TestConclusion22);
            parameter.Add("@TestEvidences22", model.TestEvidences22);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate4);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate4", parameter);
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
    [HttpPost("Update5")]
    public async Task<IActionResult> Update5([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults23", model.TestResults23);
            parameter.Add("@TestConclusion23", model.TestConclusion23);
            parameter.Add("@TestEvidences23", model.TestEvidences23);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate5);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate5", parameter);
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
    [HttpPost("Update6")]
    public async Task<IActionResult> Update6([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults24", model.TestResults24);
            parameter.Add("@TestConclusion24", model.TestConclusion24);
            parameter.Add("@TestEvidences24", model.TestEvidences24);
            parameter.Add("@TestResults25", model.TestResults25);
            parameter.Add("@TestConclusion25", model.TestConclusion25);
            parameter.Add("@TestEvidences25", model.TestEvidences25);
            parameter.Add("@TestResults26", model.TestResults26);
            parameter.Add("@TestConclusion26", model.TestConclusion26);
            parameter.Add("@TestEvidences26", model.TestEvidences26);
            parameter.Add("@TestResults27", model.TestResults27);
            parameter.Add("@TestConclusion27", model.TestConclusion27);
            parameter.Add("@TestEvidences27", model.TestEvidences27);
            parameter.Add("@TestResults28", model.TestResults28);
            parameter.Add("@TestConclusion28", model.TestConclusion28);
            parameter.Add("@TestEvidences28", model.TestEvidences28);
            parameter.Add("@TestResults29", model.TestResults29);
            parameter.Add("@TestConclusion29", model.TestConclusion29);
            parameter.Add("@TestEvidences29", model.TestEvidences29);
            parameter.Add("@TestResults30", model.TestResults30);
            parameter.Add("@TestConclusion30", model.TestConclusion30);
            parameter.Add("@TestEvidences30", model.TestEvidences30);
            parameter.Add("@TestResults31", model.TestResults31);
            parameter.Add("@TestConclusion31", model.TestConclusion31);
            parameter.Add("@TestEvidences31", model.TestEvidences31);
            parameter.Add("@TestResults32", model.TestResults32);
            parameter.Add("@TestConclusion32", model.TestConclusion32);
            parameter.Add("@TestEvidences32", model.TestEvidences32);
            parameter.Add("@TestResults33", model.TestResults33);
            parameter.Add("@TestConclusion33", model.TestConclusion33);
            parameter.Add("@TestEvidences33", model.TestEvidences33);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate6);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate6", parameter);
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
    [HttpPost("Update7")]
    public async Task<IActionResult> Update7([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults34", model.TestResults34);
            parameter.Add("@TestConclusion34", model.TestConclusion34);
            parameter.Add("@TestEvidences34", model.TestEvidences34);
            parameter.Add("@TestResults35", model.TestResults35);
            parameter.Add("@TestConclusion35", model.TestConclusion35);
            parameter.Add("@TestEvidences35", model.TestEvidences35);
            parameter.Add("@TestResults36", model.TestResults36);
            parameter.Add("@TestConclusion36", model.TestConclusion36);
            parameter.Add("@TestEvidences36", model.TestEvidences36);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate7);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate7", parameter);
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
    [HttpPost("Update8")]
    public async Task<IActionResult> Update8([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults37", model.TestResults37);
            parameter.Add("@TestConclusion37", model.TestConclusion37);
            parameter.Add("@TestEvidences37", model.TestEvidences37);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate8);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate8", parameter);
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
    [HttpPost("Update9")]
    public async Task<IActionResult> Update9([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults38", model.TestResults38);
            parameter.Add("@TestConclusion38", model.TestConclusion38);
            parameter.Add("@TestEvidences38", model.TestEvidences38);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate9);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate9", parameter);
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
    [HttpPost("Update10")]
    public async Task<IActionResult> Update10([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults39", model.TestResults39);
            parameter.Add("@TestConclusion39", model.TestConclusion39);
            parameter.Add("@TestEvidences39", model.TestEvidences39);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate10);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate10", parameter);
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
    [HttpPost("Update11")]
    public async Task<IActionResult> Update11([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults40", model.TestResults40);
            parameter.Add("@TestConclusion40", model.TestConclusion40);
            parameter.Add("@TestEvidences40", model.TestEvidences40);
            parameter.Add("@TestResults41", model.TestResults41);
            parameter.Add("@TestConclusion41", model.TestConclusion41);
            parameter.Add("@TestEvidences41", model.TestEvidences41);
            parameter.Add("@TestResults42", model.TestResults42);
            parameter.Add("@TestConclusion42", model.TestConclusion42);
            parameter.Add("@TestEvidences42", model.TestEvidences42);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate11);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate11", parameter);
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
    [HttpPost("Update12")]
    public async Task<IActionResult> Update12([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults43", model.TestResults43);
            parameter.Add("@TestConclusion43", model.TestConclusion43);
            parameter.Add("@TestEvidences43", model.TestEvidences43);
            parameter.Add("@TestResults44", model.TestResults44);
            parameter.Add("@TestConclusion44", model.TestConclusion44);
            parameter.Add("@TestEvidences44", model.TestEvidences44);
            parameter.Add("@TestResults45", model.TestResults45);
            parameter.Add("@TestConclusion45", model.TestConclusion45);
            parameter.Add("@TestEvidences45", model.TestEvidences45);
            parameter.Add("@TestResults46", model.TestResults46);
            parameter.Add("@TestConclusion46", model.TestConclusion46);
            parameter.Add("@TestEvidences46", model.TestEvidences46);
            parameter.Add("@TestResults47", model.TestResults47);
            parameter.Add("@TestConclusion47", model.TestConclusion47);
            parameter.Add("@TestEvidences47", model.TestEvidences47);
            parameter.Add("@TestResults48", model.TestResults48);
            parameter.Add("@TestConclusion48", model.TestConclusion48);
            parameter.Add("@TestEvidences48", model.TestEvidences48);
            parameter.Add("@TestResults49", model.TestResults49);
            parameter.Add("@TestConclusion49", model.TestConclusion49);
            parameter.Add("@TestEvidences49", model.TestEvidences49);
            parameter.Add("@TestResults50", model.TestResults50);
            parameter.Add("@TestConclusion50", model.TestConclusion50);
            parameter.Add("@TestEvidences50", model.TestEvidences50);
            parameter.Add("@TestResults51", model.TestResults51);
            parameter.Add("@TestConclusion51", model.TestConclusion51);
            parameter.Add("@TestEvidences51", model.TestEvidences51);
            parameter.Add("@TestResults52", model.TestResults52);
            parameter.Add("@TestConclusion52", model.TestConclusion52);
            parameter.Add("@TestEvidences52", model.TestEvidences52);
            parameter.Add("@TestResults53", model.TestResults53);
            parameter.Add("@TestConclusion53", model.TestConclusion53);
            parameter.Add("@TestEvidences53", model.TestEvidences53);
            parameter.Add("@TestResults54", model.TestResults54);
            parameter.Add("@TestConclusion54", model.TestConclusion54);
            parameter.Add("@TestEvidences54", model.TestEvidences54);
            parameter.Add("@TestResults55", model.TestResults55);
            parameter.Add("@TestConclusion55", model.TestConclusion55);
            parameter.Add("@TestEvidences55", model.TestEvidences55);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate12);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate12", parameter);
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
    [HttpPost("Update13")]
    public async Task<IActionResult> Update13([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults56", model.TestResults56);
            parameter.Add("@TestConclusion56", model.TestConclusion56);
            parameter.Add("@TestEvidences56", model.TestEvidences56);
            parameter.Add("@TestResults57", model.TestResults57);
            parameter.Add("@TestConclusion57", model.TestConclusion57);
            parameter.Add("@TestEvidences57", model.TestEvidences57);
            parameter.Add("@TestResults58", model.TestResults58);
            parameter.Add("@TestConclusion58", model.TestConclusion58);
            parameter.Add("@TestEvidences58", model.TestEvidences58);
            parameter.Add("@TestResults59", model.TestResults59);
            parameter.Add("@TestConclusion59", model.TestConclusion59);
            parameter.Add("@TestEvidences59", model.TestEvidences59);
            parameter.Add("@TestResults60", model.TestResults60);
            parameter.Add("@TestConclusion60", model.TestConclusion60);
            parameter.Add("@TestEvidences60", model.TestEvidences60);
            parameter.Add("@TestResults61", model.TestResults61);
            parameter.Add("@TestConclusion61", model.TestConclusion61);
            parameter.Add("@TestEvidences61", model.TestEvidences61);
            parameter.Add("@TestResults62", model.TestResults62);
            parameter.Add("@TestConclusion62", model.TestConclusion62);
            parameter.Add("@TestEvidences62", model.TestEvidences62);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate13);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate13", parameter);
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
    [HttpPost("Update14")]
    public async Task<IActionResult> Update14([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults63", model.TestResults63);
            parameter.Add("@TestConclusion63", model.TestConclusion63);
            parameter.Add("@TestEvidences63", model.TestEvidences63);
            parameter.Add("@TestResults64", model.TestResults64);
            parameter.Add("@TestConclusion64", model.TestConclusion64);
            parameter.Add("@TestEvidences64", model.TestEvidences64);
            parameter.Add("@TestResults65", model.TestResults65);
            parameter.Add("@TestConclusion65", model.TestConclusion65);
            parameter.Add("@TestEvidences65", model.TestEvidences65);
            parameter.Add("@TestResults66", model.TestResults66);
            parameter.Add("@TestConclusion66", model.TestConclusion66);
            parameter.Add("@TestEvidences66", model.TestEvidences66);
            parameter.Add("@TestResults67", model.TestResults67);
            parameter.Add("@TestConclusion67", model.TestConclusion67);
            parameter.Add("@TestEvidences67", model.TestEvidences67);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate14);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate14", parameter);
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
    [HttpPost("Update15")]
    public async Task<IActionResult> Update15([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults68", model.TestResults68);
            parameter.Add("@TestConclusion68", model.TestConclusion68);
            parameter.Add("@TestEvidences68", model.TestEvidences68);
            parameter.Add("@TestResults69", model.TestResults69);
            parameter.Add("@TestConclusion69", model.TestConclusion69);
            parameter.Add("@TestEvidences69", model.TestEvidences69);
            parameter.Add("@TestResults70", model.TestResults70);
            parameter.Add("@TestConclusion70", model.TestConclusion70);
            parameter.Add("@TestEvidences70", model.TestEvidences70);
            parameter.Add("@TestResults71", model.TestResults71);
            parameter.Add("@TestConclusion71", model.TestConclusion71);
            parameter.Add("@TestEvidences71", model.TestEvidences71);
            parameter.Add("@TestResults72", model.TestResults72);
            parameter.Add("@TestConclusion72", model.TestConclusion72);
            parameter.Add("@TestEvidences72", model.TestEvidences72);
            parameter.Add("@TestResults73", model.TestResults73);
            parameter.Add("@TestConclusion73", model.TestConclusion73);
            parameter.Add("@TestEvidences73", model.TestEvidences73);
            parameter.Add("@TestResults74", model.TestResults74);
            parameter.Add("@TestConclusion74", model.TestConclusion74);
            parameter.Add("@TestEvidences74", model.TestEvidences74);
            parameter.Add("@TestResults75", model.TestResults75);
            parameter.Add("@TestConclusion75", model.TestConclusion75);
            parameter.Add("@TestEvidences75", model.TestEvidences75);
            parameter.Add("@TestResults76", model.TestResults76);
            parameter.Add("@TestConclusion76", model.TestConclusion76);
            parameter.Add("@TestEvidences76", model.TestEvidences76);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate15);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate15", parameter);
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
    [HttpPost("Update16")]
    public async Task<IActionResult> Update16([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults77", model.TestResults77);
            parameter.Add("@TestConclusion77", model.TestConclusion77);
            parameter.Add("@TestEvidences77", model.TestEvidences77);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate16);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate16", parameter);
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
    [HttpPost("Update17")]
    public async Task<IActionResult> Update17([FromForm] AuditChecklistUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", model.AuditId);
            parameter.Add("@TestResults78", model.TestResults78);
            parameter.Add("@TestConclusion78", model.TestConclusion78);
            parameter.Add("@TestEvidences78", model.TestEvidences78);
            parameter.Add("@Details", OperationConstant.AuditChecklistUpdate17);
            parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditChecklistUpdate17", parameter);
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

}
