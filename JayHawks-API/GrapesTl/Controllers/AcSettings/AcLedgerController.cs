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
public class AcLedgerController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedgerView>("acLedgerGetAll");

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
            var data = await _unitOfWork.SP_Call.List<AcLedger>("acLedgerGetAll");
            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByName")]
    public async Task<IActionResult> SelectByName()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedger>("AcLedgerSelectByName");
            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByPayment")]
    public async Task<IActionResult> SelectByPayment()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedger>("AcLedgerSelectByPayment");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByReceive")]
    public async Task<IActionResult> SelectByReceive()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedger>("AcLedgerSelectByReceive");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByTransfer")]
    public async Task<IActionResult> SelectByTransfer()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedger>("AcLedgerSelectByTransfer");
            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByJournal")]
    public async Task<IActionResult> SelectByJournal()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedger>("AcLedgerSelectByJournal");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByIncome")]
    public async Task<IActionResult> SelectByIncome()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedger>("AcLedgerSelectByIncome");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByExpense")]
    public async Task<IActionResult> SelectByExpense()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedger>("AcLedgerSelectByExpence");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByBank")]
    public async Task<IActionResult> SelectByBank()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedger>("AcLedgerSelectByBank");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectByCash")]
    public async Task<IActionResult> SelectByCash()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AcLedger>("AcLedgerSelectByCash");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerName }));
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
            parameter.Add("@LedgerId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AcLedgerView>("acLedgerGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] AcLedger model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SubGroupId", model.SubGroupId);
            parameter.Add("@LedgerName", model.LedgerName);
            parameter.Add("@DisplayAt", model.DisplayAt);
            parameter.Add("@VoucherType", model.VoucherType);
            parameter.Add("@AccountType", model.AccountType);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("acLedgerCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] AcLedger model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@LedgerId", model.LedgerId);
            parameter.Add("@SubGroupId", model.SubGroupId);
            parameter.Add("@LedgerName", model.LedgerName);
            parameter.Add("@DisplayAt", model.DisplayAt);
            parameter.Add("@VoucherType", model.VoucherType);
            parameter.Add("@AccountType", model.AccountType);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("acLedgerUpdate", parameter);
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
            parameter.Add("@LedgerId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("acLedgerDelete", parameter);

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


    [HttpGet("JournalLedger/{id}")]
    public async Task<IActionResult> Balance(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@LedgerId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AcLedger>("AcLedgerSearchByLedgerId", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }





}
