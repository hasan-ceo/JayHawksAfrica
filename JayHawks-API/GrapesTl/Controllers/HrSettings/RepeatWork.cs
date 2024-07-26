using GrapesTl.Models;
using GrapesTl.Utility;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace GrapesTl.Service;

public class RepeatWork(IMailSender mailSender, IServiceProvider serviceProvider, ILogger<RepeatWork> logger) : BackgroundService
{
    private readonly IServiceProvider _serviceProvider = serviceProvider;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<RepeatWork> _logger = logger;


    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _serviceProvider.CreateScope();
            {
                var scopedService = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                var data = await scopedService.SP_Call.List<EmployeeGetAll>("hrEmployeeGetTodayBirthday");
                foreach (var emp in data)
                {
                    if (string.IsNullOrEmpty(emp.Email) == false)
                    {
                        try
                        {
                            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/emails/birthday.cshtml");
                            await _mailSender.SendEmailWithBody(
                                emp.Email,
                                emp.EmployeeName,
                                SD.BccEmail,

                                SD.HappyBirthday,
                                "");

                            //await _emailSender.SendEmailAsync(
                            // emp.Email + ", hr@umojamicrofinance.com",
                            //"Happy Birthday!",
                            //$"<h2>Dear " + emp.EmployeeName + ",</h2><br><h1>The warmest wishes to a great member of our team.<br> May your special day be full of happiness, fun and cheer!</h1><br><br><img alt='Happy Birthday!' height='400' src='https://umoja.GrapesTl.com/images/birthday.jpg' /> <br><br><h2>Thank you.</h2><br><h2>Umoja Team</h2>");

                        }
                        catch (Exception ex)
                        {
                            _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                        }
                    }
                }
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}
