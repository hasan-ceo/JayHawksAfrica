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

namespace GrapesTl.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuditWorkStepsController(IUnitOfWork unitOfWork) : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private string _userId;





        [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]


        [HttpGet("List/{id}/{auditAreaId}")]
        public async Task<IActionResult> List(string id, string auditAreaId)
        {
            try
            {
                _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                var parameter = new DynamicParameters();
                parameter.Add("@AuditId", id);
                parameter.Add("@AuditAreaId", auditAreaId);

                var data = await _unitOfWork.SP_Call.List<AuditWorkStepsView>("AuditWorkStepsGetAll", parameter);

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

        [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
        [HttpGet("Details/{id}")]
        public async Task<IActionResult> Details(string id)
        {
            try
            {
                _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


                var parameter = new DynamicParameters();
                parameter.Add("@auditWorkListId", id);

                var data = await _unitOfWork.SP_Call.OneRecord<AuditWorkStepsView>("AuditWorkStepGetById", parameter);

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

        //[Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
        //[HttpPost("Create")]
        //public async Task<IActionResult> Create([FromForm] AuditWorkplan model)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(SD.Message_Model_Error);

        //    try
        //    {

        //        _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        //        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

        //        var parameter = new DynamicParameters();
        //        parameter.Add("@EmployeeId", user.EmployeeId);
        //        parameter.Add("@MonthName", model.MonthName);
        //        parameter.Add("@BranchId", model.BranchId);
        //        parameter.Add("@RiskRating", model.RiskRating);
        //        parameter.Add("@Auditor", model.Auditor);
        //        parameter.Add("@FieldDays", model.FieldDays);
        //        parameter.Add("@ExpectedCost", model.ExpectedCost);
        //        parameter.Add("@AuditStatus", model.AuditStatus);
        //        parameter.Add("@ReportStatus", model.ReportStatus);
        //        parameter.Add("@DiscussionStatus", model.DiscussionStatus);
        //        parameter.Add("@FollowUpStatus", model.FollowUpStatus);

        //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
        //        await _unitOfWork.SP_Call.Execute("AuditWorkplanCreate", parameter);

        //        var message = parameter.Get<string>("Message");

        //        if (message == "Already exists")
        //            return BadRequest(message);

        //        return Created("", SD.Message_Save);
        //    }
        //    catch (Exception e)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError,
        //       "Error saving data." + e.Message);
        //    }
        //}

        [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromForm] AuditWorkSteps model)
        {
            if (!ModelState.IsValid)
                return BadRequest(SD.Message_Model_Error);

            try
            {
                _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                var parameter = new DynamicParameters();
                parameter.Add("@AuditWorkListId", model.AuditWorkListId);
                //parameter.Add("@AuditYearId", model.AuditYearId);
                //parameter.Add("@AuditId", model.AuditId);
                //parameter.Add("@AuditTestStepsId", model.AuditTestStepsId);
                parameter.Add("@TestingDate", model.TestingDate);
                parameter.Add("@SampledMonth", model.SampledMonth);
                parameter.Add("@AuditPeriod", model.AuditPeriod ?? "");
                parameter.Add("@SelectionMethod", model.SelectionMethod ?? "");
                parameter.Add("@ControlFrequency", model.ControlFrequency ?? "");
                parameter.Add("@SampleSize", model.SampleSize);
                parameter.Add("@PopulationSize", model.PopulationSize);
                parameter.Add("@TestResults", model.TestResults ?? "");
                parameter.Add("@OverallTestConclusion", model.OverallTestConclusion ?? "");
                parameter.Add("@Finding", model.Finding ?? "");
                parameter.Add("@Cause", model.Cause ?? "");
                parameter.Add("@Implication", model.Implication ?? "");
                parameter.Add("@Recommendation", model.Recommendation ?? "");
                parameter.Add("@BranchResponse", model.BranchResponse ?? "");
                parameter.Add("@ImplementationDate", model.ImplementationDate);
                parameter.Add("@ManagementAction", model.ManagementAction ?? "");
                parameter.Add("@Exceptions", model.Exceptions ?? "");
                parameter.Add("@TestEvidences", model.TestEvidences ?? "");


                parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
                await _unitOfWork.SP_Call.Execute("AuditWorkStepUpdate", parameter);

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

        [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


                var parameter = new DynamicParameters();
                parameter.Add("@workPlanId", id);

                parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
                await _unitOfWork.SP_Call.Execute("AuditWorkPlanDelete", parameter);

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
}
