using System.Text.RegularExpressions;
using Core.Backend.Secure.Auth;
using Core.Backend.Secure.Services;
using Core.Database;
using Core.Ldap.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Backend.Secure.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AuthController : ControllerBase
{
    private JwtService _jwtService;
    private CoreContext _db;
    private ILdapClient _ldap;

    public AuthController(JwtService jwt, CoreContext db, ILdapClient ldap)
    {
        _jwtService = jwt;
        _db = db;
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
    public Dictionary<string, string> Login(SignInParams signInParams)
    {
        var signInResult = _ldap.SignIn(signInParams);
        /*var signInResult = new SignInResult()
        {
            User = new LdapUser()
            {
                Class = "5b",
                Email = "FeichtlbauerS180061",
                DisplayName = "Feichtlbauer Simon",
                LoginName = "FeichtlbauerS180061",
                OrganizationUnit = LdapGroup.Schueler
            }
        };*/

        var user = _db.Users.FirstOrDefault(x => x.SchoolEmail == signInResult.User.Email);
        if (user is null)
        {
            user = _db.Users.Add(new User
            {
                SchoolEmail = signInResult.User.Email,
                StoredUserTokens = new StoredUserTokens()
            }).Entity;
            _db.SaveChanges();
        }

        var obj = _db.StoredUserTokens.First(x => x.UserUUID == user.UUID);
        var connectedPlatforms = obj.GetType().GetProperties().Where(x => x.Name != "UserUUID" && x.Name != "User")
            .Where(x => x.GetValue(obj, null) is not null).Select(x => x.Name).ToList();

        string? mnr = null;
        if (signInResult.User.OrganizationUnit.Equals(LdapGroup.Schueler))
        {
            var rg = new Regex(@"\d{6}");
            var mr = rg.Match(signInResult.User.LoginName);

            if (!mr.Success)
            {
                throw new Exception("Matriculation number not found");
            }

            mnr = mr.Value;
        }

        var tokens = new Dictionary<string, string>
        {
            ["idToken"] = _jwtService.GenerateToken(new IDToken()
            {
                Username = signInResult.User.LoginName,
                Email = signInResult.User.Email,
                Role = signInResult.User.OrganizationUnit.ToString(),
                Class = signInResult.User.Class ?? string.Empty,
                UUID = user.UUID,
                ConnectedPlatforms = connectedPlatforms,
                MatriculationNumber = mnr,
            }),
            ["authToken"] = _jwtService.GenerateToken(new AuthToken()
            {
                Username = signInResult.User.LoginName,
                UUID = user.UUID,
            })
        };

        var cookie = new CookieOptions()
        {
            HttpOnly = true,
            IsEssential = true,
            Domain = "/",
            Expires = DateTime.Now.AddMinutes(15),
            Secure = false
        };

        Response.Cookies.Append("Authorization", tokens["authToken"], cookie);
        Response.Cookies.Append("Auth-Token", tokens["authToken"], cookie);
        Response.Cookies.Append("ID-Token", tokens["idToken"], cookie);
        //Response.Cookies.Append("Test", "anel", cookie);

        return tokens;
    }

    [Authorize]
    [HttpGet]
    public bool IsAuthed() => true;

    [Authorize(Policy = "ID-Token")]
    [HttpGet]
    public string? GetRole() => User.Claims.FirstOrDefault(x => x.Type == "rolle")?.Value;
}
