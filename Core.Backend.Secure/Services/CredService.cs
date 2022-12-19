using System.Security.Cryptography;
using System.Text;
using Core.Database;

namespace Core.Backend.Secure.Services;

public class CredService
{
    private CoreContext _db;
    private RSA _rsa;
    private IConfiguration _conf;

    public CredService(CoreContext db, IConfiguration conf, RSA rsa)
    {
        _db = db;
        _conf = conf;
        _rsa = rsa;
        //_privateKey = RsaService.ImportRSAKey("./keys/" + _conf["RSA:private-key"]);
        //_publicKey = ImportPublicKey("./keys/"+_conf["RSA:public-key"]);
    }

    public string? GetWebuntisToken(Guid uuid) => DecryptPw(GetUserTokenSet(uuid).WebUntisToken);
    public string? GetEduvidualToken(Guid uuid) => DecryptPw(GetUserTokenSet(uuid).EduvidualToken);
    private StoredUserTokens GetUserTokenSet(Guid uuid) => _db.StoredUserTokens.First(x => x.UUID == uuid);
    public string? DecryptPw(string? pw) => pw is not null ? Encoding.UTF8.GetString(_rsa.Decrypt(Convert.FromBase64String(pw), RSAEncryptionPadding.OaepSHA512)) : pw;
    public string EncryptPw(string pw) => Convert.ToBase64String(_rsa.Encrypt(Encoding.UTF8.GetBytes(pw), RSAEncryptionPadding.OaepSHA512));
}
