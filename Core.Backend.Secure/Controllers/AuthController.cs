using Core.Backend.Secure.Auth;
using Core.Backend.Secure.Services;
using Core.Ldap.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Backend.Secure.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AuthController : ControllerBase
{
    private JwtService _jwtService;
    private ILdapClient _ldap;

    public AuthController(JwtService jwt, ILdapClient ldap)
    {
        _jwtService = jwt;
        _ldap = ldap;
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
            Email = "siemens.feichtlbauer@gmail.com",
            ConnectedPlatforms = new List<string>() { "Webuntis" },
            MatriculationNumber = "180012",
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

    [HttpPost]
    public IActionResult Login(SignInParams signInParams)
    {
        var signInResult = _ldap.SignIn(signInParams);

        var tokens = new Dictionary<string, string>
        {
            ["idToken"] = _jwtService.GenerateToken(new IDToken()
            {
                Username = signInResult.User.LoginName,
                Email = signInResult.User.Email,
                Role = signInResult.User.OrganizationUnit.ToString(),
                Class = signInResult.User.Class ?? string.Empty,
                UUID = new Guid("00000000-0000-0000-0000-000000000000"),
                ConnectedPlatforms = new List<string>() { "Webuntis" },
                MatriculationNumber = "180012",
            }),
            ["authToken"] = _jwtService.GenerateToken(new AuthToken()
            {
                Username = signInResult.User.LoginName,
                UUID = new Guid("00000000-0000-0000-0000-000000000000"),
            })
        };

        var cookie = new CookieOptions()
        {
            HttpOnly = true,
            IsEssential = true,
            Expires = DateTime.Now.AddMinutes(15),
            Secure = true,
            SameSite = SameSiteMode.None
        };

        Response.Cookies.Append("auth", tokens["authToken"], cookie);
        //Response.Cookies.Append("Test", "anel", cookie);

        return Ok();
    }

    [Authorize]
    [HttpGet]
    public bool IsAuthed() => true;

    [Authorize(Policy = "ID-Token")]
    [HttpGet]
    public string? GetRole() => User.Claims.FirstOrDefault(x => x.Type == "rolle")?.Value;
}
