using GrapesTl.Models;
using GrapesTl.Models.Admin;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace GrapesTl.Controllers.Admin;


[Authorize(Roles = "Grapes Admin,Super Admin")]
[Route("api/[controller]")]
[ApiController]
public class UserCreateController(IUnitOfWork unitOfWork, IAuthService authService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IAuthService _authService = authService;


    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<User>("CaUserGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<UserSelect>("CaUserGetAllForSelect");
            return Ok(data.Select(a => new { listId = a.UserId, listName = a.Role + " - " + a.FullName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("RoleSelect")]
    public async Task<IActionResult> RoleSelect()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Role>("CaRoleelectGetAll");
            return Ok(data.Select(a => new { listId = a.Name, listName = a.Name }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] UserCreate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        var userModel = new RegisterViewModel
        {
            FullName = model.FullName,
            PhoneNumber = model.PhoneNumber,
            ImageUrl = model.ImageUrl,
            Password = "Umoja1234$",
            EmployeeId = model.PhoneNumber

        };
        var result = await _authService.RegisterUserAsync(userModel, model.Role);

        if (result.IsSuccess)
            return Created("", SD.Message_Save);

        return BadRequest(SD.Message_Unsuccessful);
    }
}
