using Core.Backend;
using Core.Ldap.Implementation;
using Core.Database;
using Microsoft.EntityFrameworkCore;
using Core.Moodle.Implementation;

Pluginloader.LoadPlugins(AppDomain.CurrentDomain.BaseDirectory + "/plugins");

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<CoreContext>(db => db.UseSqlite("data source=core.sqlite3"));
}
else
{
    // TODO: setup production database
}

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<MoodleConfiguration>(builder.Configuration.GetSection("Moodle"));
builder.Services.Configure<LdapConfiguration>(builder.Configuration.GetSection("LDAPConfiguration"));

var app = builder.InjectBuilderToPlugin().Build();

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

app.UseAuthorization();

app.MapControllers();

app.InjectAppToPlugin().Run();
