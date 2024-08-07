
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
using System.Security.Claims;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,Accounts Manager,Accounts Executive")]
[Route("api/[controller]")]
[ApiController]
public class AccountGlController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;

    [HttpGet("PaymentList")]
    public async Task<IActionResult> PaymentList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLGetAllPayment");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("OpenningList")]
    public async Task<IActionResult> OpenningList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLGetAllOpenning");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("IncomeList")]
    public async Task<IActionResult> IncomeList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLGetAllIncome");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("ExpenseList")]
    public async Task<IActionResult> ExpenseList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLGetAllExpense");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("ReceiveList")]
    public async Task<IActionResult> ReceiveList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLGetAllReceive");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [HttpGet("TransferList")]
    public async Task<IActionResult> TransferList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLGetAllTransfer");

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
            parameter.Add("@AccountGlId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AccountGlView>("ActGLGetById", parameter);

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

    [HttpGet("Select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLGetAllSelect");
            return Ok(data.Select(a => new { listId = a.GlId, listName = a.VoucherNumber }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("PaymentCreate")]
    public async Task<IActionResult> PaymentCreate([FromForm] AccountGlEntry model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BankOrCashId", model.BankOrCashId);
            parameter.Add("@LedgerNameCode", model.LedgerNameCode);
            parameter.Add("@Amount", model.Amount);
            parameter.Add("@Particulars", string.IsNullOrWhiteSpace(model.Particulars) == true ? "" : model.Particulars);
            parameter.Add("@FullName", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("ActGLPaymentCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            if (message == "Select Correct Accounts Code")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("IncomeCreate")]
    public async Task<IActionResult> IncomeCreate([FromForm] AccountGlEntry model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BankOrCashId", model.BankOrCashId);
            parameter.Add("@LedgerNameCode", model.LedgerNameCode);
            parameter.Add("@Amount", model.Amount);
            parameter.Add("@Particulars", string.IsNullOrWhiteSpace(model.Particulars) == true ? "" : model.Particulars);
            parameter.Add("@FullName", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("ActGLIncomeCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            if (message == "Select Correct Accounts Code")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }


    [HttpPost("ExpenseCreate")]
    public async Task<IActionResult> ExpenseCreate([FromForm] AccountGlEntry model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BankOrCashId", model.BankOrCashId);
            parameter.Add("@LedgerNameCode", model.LedgerNameCode);
            parameter.Add("@Amount", model.Amount);
            parameter.Add("@Particulars", string.IsNullOrWhiteSpace(model.Particulars) == true ? "" : model.Particulars);
            parameter.Add("@FullName", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("ActGLExpenseCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            if (message == "Select Correct Accounts Code")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("ReceiveCreate")]
    public async Task<IActionResult> ReceiveCreate([FromForm] AccountGlEntry model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BankOrCashId", model.BankOrCashId);
            parameter.Add("@LedgerNameCode", model.LedgerNameCode);
            parameter.Add("@Amount", model.Amount);
            parameter.Add("@Particulars", string.IsNullOrWhiteSpace(model.Particulars) == true ? "" : model.Particulars);
            parameter.Add("@FullName", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("ActGLReceiveCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            if (message == "Select Correct Accounts Code")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }


    [HttpPost("TransferCreate")]
    public async Task<IActionResult> TransferCreate([FromForm] AccountGlEntry model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BankOrCashId", model.BankOrCashId);
            parameter.Add("@LedgerNameCode", model.LedgerNameCode);
            parameter.Add("@Amount", model.Amount);
            parameter.Add("@Particulars", string.IsNullOrWhiteSpace(model.Particulars) == true ? "" : model.Particulars);
            parameter.Add("@FullName", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("ActGLTransferCreate", parameter);

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


    [HttpPost("OpeningCreate")]
    public async Task<IActionResult> OpeningCreate([FromForm] AccountGlEntry model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@LedgerNameCode", model.LedgerNameCode);
            parameter.Add("@Amount", model.Amount);
            parameter.Add("@Particulars", string.IsNullOrWhiteSpace(model.Particulars) == true ? "" : model.Particulars);
            parameter.Add("@FullName", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("ActGLOpenningCreate", parameter);

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



    [HttpPost("JournalCreate")]
    public async Task<IActionResult> JournalCreate([FromBody] AcJournals model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);


            var gl = Guid.NewGuid();

            var parameter = new DynamicParameters();

            parameter.Add("@GlId", gl);
            parameter.Add("@FullName", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);


            await _unitOfWork.SP_Call.Execute("ActGLJournalMultiCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);


            foreach (var journal in model.Journals)
            {
                parameter = new DynamicParameters();

                parameter.Add("@GlId", gl);
                parameter.Add("@LedgerId", journal.LedgerId);
                parameter.Add("@Particulars", journal.Particulars);
                parameter.Add("@Dr", journal.Dr);
                parameter.Add("@Cr", journal.Cr);
                parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
                await _unitOfWork.SP_Call.Execute("ActGLJournalMultiItemCreate", parameter);
            }

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error saving data." + e.Message);
        }
    }


    [HttpGet("JournalList")]
    public async Task<IActionResult> JournalList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AccountGlView>("ActGLGetAllJournal");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@GlId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("acVoucherDelete", parameter);

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