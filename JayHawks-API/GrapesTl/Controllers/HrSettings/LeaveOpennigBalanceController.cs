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

[Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
[Route("api/[controller]")]
[ApiController]
public class LeaveOpennigBalanceController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] LeaveOpennigBalance model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@PinName", model.PinName);
            parameter.Add("@AnnualLeave", model.AnnualLeave);
            parameter.Add("@AnnualLeaveExpt", model.AnnualLeaveExpt);
            parameter.Add("@CompassionateLeave", model.CompassionateLeave);
            parameter.Add("@PaternityLeave", model.PaternityLeave);
            parameter.Add("@SickLeave", model.SickLeave);
            parameter.Add("@MaternityLeave", model.MaternityLeave);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrLeaveOpenningBalance", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }




}
