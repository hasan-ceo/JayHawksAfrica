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
    public class AcLedgerReportController(IUnitOfWork unitOfWork) : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        //private string _userId;



        [HttpGet("LedgerName/{SearchId}/{fromDate}/{tillDate}")]
        public async Task<IActionResult> LedgerName([FromRoute] string SearchId, [FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
        {

            try
            {
                var parameter = new DynamicParameters();
                parameter.Add("@LedgerId", SearchId);
                parameter.Add("@FromDate", fromDate);
                parameter.Add("@TillDate", tillDate);
                var data = await _unitOfWork.SP_Call.List<AccountGlView>("AcLedgerNameGetBySearch", parameter);

                return Ok(data);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
               "Error retrieve list of data." + e.Message);
            }
        }



        [HttpGet("OpeningBalance/{id}/{fromDate}")]
        public async Task<IActionResult> OpeningBalance(string id, [FromRoute] DateTime fromDate)
        {
            try
            {
                var parameter = new DynamicParameters();
                parameter.Add("@FromDate", fromDate);
                parameter.Add("@LedgerId", id);

                var data = await _unitOfWork.SP_Call.OneRecord<AccountGlView>("AcLedgerBalanceGetBySearch", parameter);

                return Ok(data);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
               "Error retrieve details data." + e.Message);
            }
        }


    }
}
