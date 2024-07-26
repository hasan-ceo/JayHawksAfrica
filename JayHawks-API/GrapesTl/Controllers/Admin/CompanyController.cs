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

namespace GrapesTl.Controllers
{
    [Authorize(Roles = "Super Admin,IT Manager,IT Executive")]
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController(IUnitOfWork unitOfWork) : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;


        [HttpGet("Details")]
        public async Task<IActionResult> Details()
        {
            try
            {
                var data = await _unitOfWork.SP_Call.OneRecord<Company>("adCompanyGetById");

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
        public async Task<IActionResult> Update([FromBody] Company model)
        {
            if (!ModelState.IsValid)
                return BadRequest(SD.Message_Model_Error);

            try
            {
                var parameter = new DynamicParameters();
                parameter.Add("@CompanyId", model.CompanyId);
                parameter.Add("@CompanyName", model.CompanyName);
                parameter.Add("@CompanyAddress", model.CompanyAddress);
                parameter.Add("@MailPort", model.MailPort);
                parameter.Add("@MailServer", model.MailServer);
                parameter.Add("@MailAlias", model.MailAlias);
                parameter.Add("@MailUserName", model.MailUserName);
                parameter.Add("@MailPassword", model.MailPassword);
                parameter.Add("@NssfEmployee", model.NssfEmployee);
                parameter.Add("@NssfEmployer", model.NssfEmployer);

                parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
                await _unitOfWork.SP_Call.Execute("adCompanyUpdate", parameter);
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
}
