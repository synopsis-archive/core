using Core.Backend.Secure.Auth;
using Core.Backend.Secure.Services;
using Microsoft.AspNetCore.Mvc;

namespace Core.Backend.Secure.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private JwtService _jwtService;

    public WeatherForecastController(JwtService jwt)
    {
        _jwtService = jwt;
    }

    [HttpGet]
    public string GetIDToken()
    {
        var uuid = new Guid("00000000-0000-0000-0000-000000000000");
        var idToken = new IDToken()
        {
            Class = "5b",
            Role = "Superduperadmin",
            Username = "Siemens",
            ConnectedPlatforms = new List<string>() { "Webuntis" },
            MNR = "180012",
            UUID = uuid,
        };
        return _jwtService.GenerateToken(idToken);
    }

    [HttpGet]
    public string GetAuth()
    {
        var uuid = new Guid("00000000-0000-0000-0000-000000000000");
        var idToken = new AuthToken()
        {
            Username = "Siemens",
            UUID = uuid
        };
        return _jwtService.GenerateToken(idToken);
    }
}
