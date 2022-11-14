using Core.Backend.Secure.Services;
using Microsoft.AspNetCore.Mvc;

namespace Core.Backend.Secure.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class PWControllerTEST : ControllerBase
{
    private CredService _cred;

    public PWControllerTEST(CredService cred) => _cred = cred;

    [HttpGet]
    public string Encrypt(string pw) => _cred.EncryptPw(pw);

    [HttpGet]
    public string? Decrypt(string pw) => _cred.DecryptPw(pw);
}
