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

    [HttpGet]
    public string Encrypt(string pw) => _cred.EncryptPw(pw);

    [HttpGet]
    public string? Decrypt(string pw) => _cred.DecryptPw(pw);

    [Authorize(Policy = "Auth-Token")]
    [HttpPost("MoodleToken/{guid:guid}/{token}")]
    public ActionResult SetEduvidualToken(Guid guid, string token)
    {
        try
        {
            _cred.SaveToken(guid, token, "eduvidual");
            return Ok();
        }
        catch (AuthException e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize(Policy = "Auth-Token")]
    [HttpPost("WebuntisToken/{guid:guid}/{token}")]
    public ActionResult SetWebuntisToken(Guid guid, string token)
    {
        try
        {
            _cred.SaveToken(guid, token, "webuntis");
            return Ok();
        }
        catch (AuthException e)
        {
            return BadRequest(e.Message);
        }
    }

}
