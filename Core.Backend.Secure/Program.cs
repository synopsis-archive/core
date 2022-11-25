using System.Security.Cryptography;
using Core.AuthLib;
using Core.AuthLib.Services;
using Core.Backend.Secure.Services;
using Core.Database;
using Core.Ldap.Implementation;
using Core.Ldap.Interface;
using Microsoft.EntityFrameworkCore;

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

builder.AddCookieAuth();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CoreContext>();
    context.Database.EnsureCreated();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
