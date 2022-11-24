using System.Security.Cryptography;
using Core.Backend.Secure.Services;
using Core.Database;
using Core.Ldap.Implementation;
using Core.Ldap.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<CoreContext>(db => db.UseSqlite("data source=core.sqlite3"));
}
else
{
    // TODO: setup production database
    Console.WriteLine("Production database not setup yet");
}

builder.Services.AddTransient<CredService>();
builder.Services.AddSingleton<JwtService>();
builder.Services.AddSingleton<RSA>(RsaService.ImportRSAKey("./keys/" + builder.Configuration["RSA:private-key"]));

builder.Services.Configure<LdapConfiguration>(builder.Configuration.GetSection("LDAPConfiguration"));
builder.Services.AddTransient<ILdapClient, LdapClient>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(o =>
{

});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new RsaSecurityKey(RsaService.ImportRSAKey("./keys/" + builder.Configuration["RSA:private-key"]))
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["Authorization"];
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization(opt =>
{
    opt.AddPolicy("Admin", policy =>
    {
        policy.RequireClaim("rolle", "Admin");
        policy.RequireClaim("type", "id-token");
    });

    opt.AddPolicy("ID-Token", policy => policy.RequireClaim("type", "id-token"));
    opt.AddPolicy("Auth-Token", policy => policy.RequireClaim("type", "auth-token"));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CoreContext>();
    //context.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(policyBuilder => policyBuilder.AllowAnyHeader().WithOrigins("http://localhost:63342").AllowAnyMethod().AllowCredentials());
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
