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

[Authorize(Roles = "Super Admin,Accounts Manager,Accounts Executive")]
[Route("api/[controller]")]
[ApiController]
public class AcSaccosController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("Search/{id}")]
    public async Task<IActionResult> Search(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", id);

            var data = await _unitOfWork.SP_Call.List<SaccoWithdrawView>("AcSaccoGetBySearch", parameter);

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

    [HttpGet("Balance/{id}")]
    public async Task<IActionResult> Balance(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@pinName", id);

            var data = await _unitOfWork.SP_Call.Single<double>("AcSaccoGetBalance", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpPost("Withdraw")]
    public async Task<IActionResult> Withdraw([FromForm] SaccoWithdraw model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeePinName", model.PinName);
            parameter.Add("@Withdraw", model.Withdraw);
            parameter.Add("@Particulars", model.Particulars);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpSaccoWithdraw", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Insufficient balance")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SaccoId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("acSaccoDelete", parameter);

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
