using Flurl.Http.Configuration;
using GrapesTl.Service;
using GrapesTl.Utility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace GrapesTl;

public class Startup(IConfiguration configuration)
{
    //public Startup(IConfiguration configuration)
    //{
    //    Configuration = configuration;
    //}

    public IConfiguration Configuration { get; } = configuration;

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        services.AddIdentity<IdentityUser, IdentityRole>().AddDefaultTokenProviders()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.Configure<IdentityOptions>(options =>
        {
            // Default Password settings.
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 1;
            options.Lockout.MaxFailedAccessAttempts = 1000;

            // Default SignIn settings.
            options.SignIn.RequireConfirmedEmail = false;
            options.SignIn.RequireConfirmedPhoneNumber = false;
        });

        services.AddAuthentication(auth =>
        {
            auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidAudience = Configuration["AuthSettings:Audience"],
                ValidIssuer = Configuration["AuthSettings:Issuer"],
                RequireExpirationTime = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["AuthSettings:Key"])),
                ValidateIssuerSigningKey = true
            };

            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = static context =>
                {
                    if (context.Request.Query.TryGetValue("relic", out var token))
                        context.Token = token;
                    return Task.CompletedTask;
                }
            };
        });

        //services.Configure<EmailOptions>(Configuration.GetSection("Email"));
        //services.AddSingleton<IEmailSender, EmailSender>();

        var emailHost = Configuration.GetSection("Email")["Host"];
        var emailFrom = Configuration.GetSection("Email")["From"];
        var emailSender = Configuration.GetSection("Email")["Sender"];
        var emailPassword = Configuration.GetSection("Email")["Password"];
        var emailPort = Convert.ToInt32(Configuration.GetSection("Email")["Port"]);

        services
            .AddFluentEmail(emailSender, emailFrom)
            .AddRazorRenderer()
            .AddSmtpSender(new SmtpClient(emailHost)
            {
                UseDefaultCredentials = false,
                Port = emailPort,
                Credentials = new NetworkCredential(emailSender, emailPassword),
                EnableSsl = true,
            });

        services.AddSingleton<IMailSender, MailSender>();

        services.AddSingleton<IFlurlClientFactory, PerBaseUrlFlurlClientFactory>();
        services.AddScoped<CvrService>();


        services.Configure<SmsOptions>(Configuration.GetSection("SMS"));
        services.AddSingleton<ISmsSender, SmsSender>();

        services.AddScoped<IAuthService, AuthService>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddHostedService<RepeatWork>();

        services.AddCors(options =>
        {
            options.AddPolicy("Policy1", builder =>
            {
                builder.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins(
                    "https://umug.umoja-international.com",
                    "http://localhost:3000",
                    "https://localhost:3000")
                .WithMethods("POST", "GET", "PUT", "DELETE");
            });
        });

        services.AddControllers();

        // In production, the React files will be served from this directory
        services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "ClientApp";
        });

        services.AddSwaggerGen(gen =>
        {
            gen.SwaggerDoc("v1.0", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "GrapesTl Endpoint", Version = "v1.0" });
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseMigrationsEndPoint();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        //app.UseStaticFiles(new StaticFileOptions
        // {
        //     FileProvider = new PhysicalFileProvider(Path.Combine(env.WebRootPath, "images")),
        //     RequestPath = "/images"
        // });
        app.UseSpaStaticFiles();

        app.UseRouting();

        app.UseCors("Policy1");

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseSwagger();

        app.UseSwaggerUI(ui =>
        {
            ui.SwaggerEndpoint("/swagger/v1.0/swagger.json", "GrapesTl Endpoint");
        });

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");
        });

        app.UseSpa(spa =>
        {
            spa.Options.SourcePath = "ClientApp";

        });
    }
}
