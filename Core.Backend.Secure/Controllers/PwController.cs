using Core.Backend.Secure.Auth;
using Core.Backend.Secure.exceptions;
using Core.Backend.Secure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Core.Backend.Secure.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class PwController : ControllerBase
{
    private CredService _cred;

    public PwController(CredService cred) => _cred = cred;

    [Authorize(Policy = "Auth-Token")]
    [HttpPost("MoodleToken/{token}")]
    public ActionResult SetEduvidualToken(string token)
    {
        try
        {
            _cred.SaveToken(User.GetUUID(), token, "eduvidual");
            return Ok();
        }
        catch (AuthException e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(Policy = "Auth-Token")]
    [HttpPost("WebuntisToken/{token}")]
    public ActionResult SetWebuntisToken(string token)
    {
        try
        {
            _cred.SaveToken(User.GetUUID(), token, "webuntis");
            return Ok();
        }
        catch (AuthException e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(Policy = "Auth-Token")]
    [HttpPost("LDAP/{username}/{password}")]
    public ActionResult SaveLdapPassword(string username, string password)
    {
        try
        {
            _cred.SaveLdapPassword(User.GetUUID(), username, password);
            return Ok();
        }
        catch (AuthException e)
        {
            return BadRequest(e.Message);
        }
    }
}
