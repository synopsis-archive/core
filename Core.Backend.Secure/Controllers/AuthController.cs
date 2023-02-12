using Core.AuthLib;
using Core.Backend.Secure.Auth;
using Core.Backend.Secure.Services;
using Core.Ldap.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignInResult = Core.Ldap.Interface.SignInResult;

namespace Core.Backend.Secure.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AuthController : ControllerBase
{
    private JwtService _jwtService;
    private IConfiguration _conf;
    private AuthService _authService;
    private CredService _credService;

    public AuthController(JwtService jwt, IConfiguration conf, AuthService auth, CredService cred)
    {
        _jwtService = jwt;
        _conf = conf;
        _authService = auth;
        _credService = cred;
    }

    [HttpGet]
    [ProducesResponseType(typeof(byte[]), 200, "application/octet-stream")]
    public IActionResult GetPublicKey()
    {
        return File(_credService.GetPublicKey(), "application/octet-stream");
    }

    [Authorize(Policy = "Auth-Token")]
    [HttpGet]
    public string GetIdToken()
    {
        var user = _authService.GetUser(User.GetUUID());
        var connectedPlatforms = _authService.GetPlatforms(user);

        return _jwtService.GenerateToken(new IDToken()
        {
            Username = user.Username,
            Email = user.SchoolEmail,
            Role = user.Role.ToString(),
            Class = user.Class,
            UUID = user.UUID,
            ConnectedPlatforms = connectedPlatforms,
            MatriculationNumber = user.MatriculationNumber,
        });
    }

    [Authorize]
    [HttpPost]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("auth");
        return Ok(); // oda doch unauthorized? :D
    }

    [HttpPost]
    public IActionResult Login(SignInParams signInParams)
    {
        SignInResult signInResult;
        try
        {
            signInParams.Password = _credService.DecryptPw(signInParams.Password) ?? signInParams.Password;
            signInResult = _authService.SignIn(signInParams);
        }
        catch (Exception e) when (e is InvalidLoginException or LdapNotReachableException)
        {
            return BadRequest(e.Message);
        }

        var user = _authService.UpdateUserInDB(signInResult, signInParams);

        DateTime valid = _conf["JWT:Auth-Token-Expiration-Unit"] == "days"
            ? DateTime.Now.AddDays(Convert.ToInt32(_conf["JWT:Auth-Token-Expiration"]))
            : DateTime.Now.AddMinutes(Convert.ToInt32(_conf["JWT:Auth-Token-Expiration"]));

        var cookie = new CookieOptions()
        {
            HttpOnly = true,
            IsEssential = true,
            Expires = valid,
            Secure = true,
            SameSite = SameSiteMode.None
        };

        var token = _jwtService.GenerateToken(new AuthToken()
        {
            Username = signInResult.User.LoginName,
            UUID = user.UUID,
        });

        Response.Cookies.Append("auth", token, cookie);
        return Ok();
    }

    [Authorize]
    [HttpGet]
    public bool IsAuthed() => true;

    [Authorize(Policy = "ID-Token")]
    [HttpGet]
    public string? GetRole() => User.Claims.FirstOrDefault(x => x.Type == "rolle")?.Value;
}
