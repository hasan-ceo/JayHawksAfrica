using Dapper;
using GrapesTl.Models;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,Accounts Manager,Accounts Executive")]
[Route("api/[controller]")]
[ApiController]
public class AcDayController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            //_userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            //parameter.Add("@EmployeeId", user.EmployeeId);
            var data = await _unitOfWork.SP_Call.List<AcDay>("AcDayOpenCloseGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }
    [HttpGet("DayList")]
    public async Task<IActionResult> DayList()
    {
        try
        {

            var data = await _unitOfWork.SP_Call.List<AcDay>("AcBusinessDayGetById");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("DayOpenList")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcDay>("AcDayOpenGetAll");
            return Ok(data.Select(a => new { listId = a.DayOpenCloseId, listName = a.BusinessDate }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("BusinessDayList")]
    public async Task<IActionResult> BusinessDayList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcDay>("invBusinessDayGetAll");
            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("DayOpenCreate")]
    public async Task<IActionResult> DayOpenCreate([FromForm] AcDay model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            //_userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@Status", model.Status);
            //parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcDayOpenCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Business Day is Already Opened.")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("BusinessDayCreate")]
    public async Task<IActionResult> BusinessDayCreate([FromForm] AcDay model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BusinessDate", model.BusinessDate);
            parameter.Add("@Status", model.Status);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcBusinessDayCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Business Day is Already Opened.")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("DayClose/{id}")]
    public async Task<IActionResult> DayClose(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DayOpenCloseId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcDayClose", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Loan Collection Not Completed")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }


    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DayOpenCloseId", id);
            var data = await _unitOfWork.SP_Call.OneRecord<AcDay>("AcDayOpenGetById", parameter);

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


    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] AcDay model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DayOpenCloseId", model.DayOpenCloseId);
            parameter.Add("@Status", model.Status);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcDayOpenUpdate", parameter);
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
            parameter.Add("@DayOpenCloseId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcDayUndo", parameter);

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
