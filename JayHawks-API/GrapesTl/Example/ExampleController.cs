using GrapesTl.Utility;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GrapesTl.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExampleController(IMailSender mailSender) : ControllerBase
{
    private readonly IMailSender _mailSender = mailSender;

    [HttpGet("GetCvr")]
    public async Task<IActionResult> GetCvr([FromServices] CvrService service)
    {
        var response = await service.Get("43778447");
        return Ok(response);
    }

    //[HttpGet("SendEmail")]
    //public async Task<IActionResult> SendEmail()
    //{
    //    var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/emails/test.cshtml");
    //    var tmp = await _mailSender.SendEmailWithBody(
    //        "info@grapestl.com",
    //        "info",
    //        //"hasan@grapestl.com",
    //        "s.m.tariqul.islam.eu181400082@gmail.com",
    //        path,
    //        "No Reply - Test",
    //        "Test");
    //    return Ok(tmp);
    //}

    [HttpGet("SendEmail")]
    public async Task<IActionResult> SendEmail()
    {
        var tmp = await _mailSender.SendEmailWithBody(
            "hasan@grapestl.com",
            "info",
            "hasan@grapestl.com",
            //"s.m.tariqul.islam.eu181400082@gmail.com",
            SD.AppointmentLetter,
            "We have the pleasure of offering you an employment opportunity with Umoja. Download Appointment Letter by <a href='https://localhost:44305/api/hrpdfreport/joiningletter/48230c83-7a80-42ac-9198-d6875939cd6e'>clicking here</a>.");
        return Ok(tmp);
    }
}