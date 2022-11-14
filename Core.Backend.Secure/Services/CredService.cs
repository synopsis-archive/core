using System.Security.Cryptography;
using Core.Database;

namespace Core.Backend.Secure.Services;

public class CredService
{
    private CoreContext _db;
    private RSACryptoServiceProvider _privateKey;
    private RSACryptoServiceProvider _publicKey;
    private IConfiguration _conf;

    public CredService(CoreContext db, IConfiguration conf)
    {
        _db = db;
        _conf = conf;
        _privateKey = RsaService.ImportRSAKey("./keys/" + _conf["RSA:private-key"]);
        //_publicKey = ImportPublicKey("./keys/"+_conf["RSA:public-key"]);
    }

    public string? GetWebuntisToken(Guid uuid) => DevcryptPw(GetUserTokenSet(uuid).WebUntisToken);
    public string? GetEduvidualToken(Guid uuid) => DevcryptPw(GetUserTokenSet(uuid).EduvidualToken);
    private StoredUserTokens GetUserTokenSet(Guid uuid) => _db.StoredUserTokens.First(x => x.UUID == uuid);
    private string? DevcryptPw(string? pw) => pw is not null ? System.Text.Encoding.Unicode.GetString(_privateKey.Decrypt(Convert.FromBase64String(pw), false)) : pw;
}
