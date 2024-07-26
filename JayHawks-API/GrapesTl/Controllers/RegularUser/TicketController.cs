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
public class TicketController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("MyList")]
    public async Task<IActionResult> MyList()
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);

            var parameter = new DynamicParameters();
            parameter.Add("@createdby", user.EmployeeId);
            var data = await _unitOfWork.SP_Call.List<MyTicket>("AdTicketLogGetByUser", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin")]
    [HttpGet("OpenList")]
    public async Task<IActionResult> OpenList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<MyTicket>("AdTicketLogGetAllOpen");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [Authorize(Roles = "Super Admin")]
    [HttpGet("CloseList/{fromDate}/{tillDate}")]
    public async Task<IActionResult> CloseList([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<MyTicket>("AdTicketLogGetAllClose", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TicketId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<MyTicket>("AdTicketLogGetById", parameter);

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

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] MyTicket model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);


            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@CategoryId", model.CategoryId);
            parameter.Add("@TicketType", model.TicketType);
            parameter.Add("@Priority", model.Priority);
            parameter.Add("@Title", model.Title);
            parameter.Add("@Description", model.Description);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AdTicketLogCreate", parameter);

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

    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] MyTicket model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);


            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@TicketId", model.TicketId);
            parameter.Add("@CategoryId", model.CategoryId);
            parameter.Add("@TicketType", model.TicketType);
            parameter.Add("@Priority", model.Priority);
            parameter.Add("@Title", model.Title);
            parameter.Add("@Description", model.Description);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AdTicketLogUpdate", parameter);
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

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TicketId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AdTicketLogDelete", parameter);

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
