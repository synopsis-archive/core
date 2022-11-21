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
    public ActionResult SetMoodleToken(Guid guid, string token)
    {
        try
        {
            _cred.SaveToken(guid, token, "moodle");
            return Ok();
        }
        catch (AuthException e)
        {
            return BadRequest(e.Message);
        }
    }
}
