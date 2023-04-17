using Core.AuthLib;
using Core.Moodle.Implementation;
using Core.Secure.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Core.Backend.Secure.Controllers;

[Authorize(Policy = "Auth-Token")]
[ApiController]
[Route("eduvidual")]
public class MoodleController : ControllerBase
{
    private readonly MoodleClient _moodleClient;
    private readonly CoreSecureContext _db;

    public MoodleController(MoodleClient moodleClient, CoreSecureContext db)
    {
        _moodleClient = moodleClient;
        _db = db;
    }

    [HttpGet]
    public ActionResult GetJsonResult(string functionName, string? additionalParameters)
    {
        var username = User.GetUsername();
        var token = _db.Users.Include(x => x.StoredUserTokens)
            .First(u => u.Username == username).StoredUserTokens?.EduvidualToken ?? null;

        if (token == null)
            return Problem($"No token found for user {username}");

        return new JsonResult(_moodleClient.GetJsonResponse(functionName, token, additionalParameters));
    }
}
