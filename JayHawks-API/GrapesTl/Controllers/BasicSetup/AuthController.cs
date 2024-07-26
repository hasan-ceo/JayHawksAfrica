using GrapesTl.Models;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IAuthService authService, IConfiguration configuration) : ControllerBase
{
    private readonly IAuthService _authService = authService;
    private readonly IConfiguration _configuration = configuration;


    // /api/auth/register
    [HttpPost("Register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterViewModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            model.EmployeeId = "";
            var result = await _authService.RegisterUserAsync(model, SD.Role_SuperAdmin);

            if (result.IsSuccess)
            {
                var loginView = new LoginViewModel { PhoneNumber = model.PhoneNumber, Password = model.Password };
                var loginUser = await _authService.LoginUserAsync(loginView);

                if (loginUser.IsSuccess)
                {
                    return Created("", loginUser);
                }
            }

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Register User - " + e.Message);
        }
    }

    // /api/auth/login
    [HttpPost("Login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginViewModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.LoginUserAsync(model);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Login - " + e.Message);
        }

    }

    // /api/auth/Impersonation
    [HttpPost("Impersonation")]
    public async Task<IActionResult> ImpersonationAsync([FromBody] ImpersonationViewModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.LoginIdAsync(model);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Login - " + e.Message);
        }

    }

    // /api/auth/confirmemail?userid&token
    [HttpGet("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail(string userId, string token)
    {
        if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(token))
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.ConfirmEmailAsync(userId, token);

            if (result.IsSuccess)
            {
                return Redirect($"{_configuration["AppUrl"]}/ConfirmEmail.html");
            }

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Confirm Email - " + e.Message);
        }
    }

    // api/auth/forgetpassword
    [HttpPost("ForgetPassword")]
    public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordViewModel model)
    {
        if (string.IsNullOrEmpty(model.PhoneNumber))
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.ForgetPasswordAsync(model.PhoneNumber);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Forget Password - " + e.Message);
        }
    }

    // api/auth/resetpassword
    [HttpPost("ResetPassword")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.ResetPasswordAsync(model);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                 "Error Reset Password - " + e.Message);
        }
    }

    // api/auth/RefreshToken
    [HttpPost("RefreshToken")]
    public async Task<ActionResult> RefreshToken([FromBody] AuthResponse refreshRequest)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var result = await _authService.RefreshToken(refreshRequest);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error Refresh Token - " + e.Message);
        }
    }

}
