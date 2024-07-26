using Dapper;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SobHisab.Models;
using System;
using System.Data;
using System.Threading.Tasks;

namespace SobHisab.Controllers.Audit;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditConfigController(IUnitOfWork unitOfWork) : Controller
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [Authorize(Roles = "Super Admin,Audit Manager,Audit Executive")]
    [HttpPost("CreateAuditMasterAndDetails")]
    public async Task<IActionResult> CreateAuditMasterAndDetails([FromBody] AuditConfigs auditData)
    {

        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);
        try
        {
            // Create AuditMaster
            var masterParams = new DynamicParameters();
            masterParams.Add("@BusinessArea", auditData.BusinessArea);
            masterParams.Add("@AURef", auditData.AURef);
            masterParams.Add("@AUName", auditData.AUName);
            masterParams.Add("@AuditType", auditData.AuditType);
            masterParams.Add("@OverallRiskRating", auditData.OverallRiskRating);
            masterParams.Add("@SelectedForAuditPeriod", auditData.SelectedForAuditPeriod);
            masterParams.Add("@Budget", auditData.Budget);
            masterParams.Add("@NewAuditID", dbType: DbType.Int32, direction: ParameterDirection.Output);
            masterParams.Add("@Message", dbType: DbType.String, size: 1000, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("ConfigsAuditMaster", masterParams);

            int newAuditId = masterParams.Get<int>("@NewAuditID");
            string masterMessage = masterParams.Get<string>("@Message");

            if (masterMessage == "Already exists")
                return BadRequest(masterMessage);

            // Create AuditDetails
            foreach (var detail in auditData.AuditDetails)
            {
                if (detail == null)
                    return BadRequest("One of the audit details is null.");

                var detailParams = new DynamicParameters();
                detailParams.Add("@AuditID", newAuditId);
                detailParams.Add("@PortfolioValue", detail.PortfolioValue);
                detailParams.Add("@PAR", detail.PAR);
                detailParams.Add("@Fraud", detail.Fraud);
                detailParams.Add("@StaffTurnover", detail.StaffTurnover);
                detailParams.Add("@NumberOfBorrowers", detail.NumberOfBorrowers);
                detailParams.Add("@InherentRisk", detail.InherentRisk);
                detailParams.Add("@ResidualRisk", detail.ResidualRisk);
                detailParams.Add("@PreviousYearRating", detail.PreviousYearRating);
                detailParams.Add("@Weightage", detail.Weightage);
                detailParams.Add("@NewEntryID", dbType: DbType.Int32, direction: ParameterDirection.Output);
                detailParams.Add("@Message", dbType: DbType.String, size: 1000, direction: ParameterDirection.Output);

                await _unitOfWork.SP_Call.Execute("ConfigsAuditDetails", detailParams);

                string detailMessage = detailParams.Get<string>("@Message");

                if (!string.IsNullOrEmpty(detailMessage) && detailMessage != "AuditDetails record created successfully.")
                {
                    // Log the detail message or handle it as needed
                }
            }

            return Ok(new
            {
                NewAuditID = newAuditId,
                MasterMessage = masterMessage,
            });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                "An error occurred while creating audit master and details. " + e.Message);
        }

    }

}

