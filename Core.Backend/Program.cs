using Core.AuthLib;
using Core.Backend;
using Core.Ldap.Implementation;
using Core.Moodle.Implementation;

Pluginloader.LoadPlugins("plugins");

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<MoodleConfiguration>(builder.Configuration.GetSection("Moodle"));
builder.Services.Configure<LdapConfiguration>(builder.Configuration.GetSection("LDAPConfiguration"));

builder.AddCookieAuth();

var app = builder.InjectBuilderToPlugin().Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.InjectAppToPlugin().Run();
