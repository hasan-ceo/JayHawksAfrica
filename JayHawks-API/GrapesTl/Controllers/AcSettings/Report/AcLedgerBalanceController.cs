using Dapper;
using GrapesTl.Models;
using GrapesTl.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace GrapesTl.Controllers
{
    [Authorize(Roles = "Super Admin,Accounts Manager,Accounts Executive")]
    [Route("api/[controller]")]
    [ApiController]
    public class AcLedgerBalanceController(IUnitOfWork unitOfWork) : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;


        [HttpGet("LedgerBalance/{groupId}/{fromDate}/{tillDate}")]
        public async Task<IActionResult> LedgerName([FromRoute] string GroupId, [FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
        {

            try
            {
                var parameter = new DynamicParameters();
                parameter.Add("@GroupId", GroupId);
                parameter.Add("@FromDate", fromDate);
                parameter.Add("@TillDate", tillDate);
                var data = await _unitOfWork.SP_Call.List<AccountGlView>("AcGroupNameGetBySearch", parameter);

                return Ok(data);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
               "Error retrieve list of data." + e.Message);
            }
        }

    }
}
