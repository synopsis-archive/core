using System.Security.Cryptography;
using Core.Database;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;

namespace Core.Backend.Secure.Services;

public class CredService
{
    private CoreContext _db;
    private RSACryptoServiceProvider _rsa;

    public CredService(CoreContext db)
    {
        _db = db;
        _rsa = ImportPrivateKey("./keys/private.pem");
    }

    public static RSACryptoServiceProvider ImportPublicKey(string pem)
    {
        PemReader pr = new PemReader(new StringReader(pem));
        AsymmetricKeyParameter publicKey = (AsymmetricKeyParameter)pr.ReadObject();
        RSAParameters rsaParams = DotNetUtilities.ToRSAParameters((RsaKeyParameters)publicKey);

        RSACryptoServiceProvider csp = new RSACryptoServiceProvider(); // cspParams);
        csp.ImportParameters(rsaParams);
        return csp;
    }

    public static RSACryptoServiceProvider ImportPrivateKey(string pem)
    {
        PemReader pr = new PemReader(new StringReader(pem));
        AsymmetricCipherKeyPair KeyPair = (AsymmetricCipherKeyPair)pr.ReadObject();
        RSAParameters rsaParams = DotNetUtilities.ToRSAParameters((RsaPrivateCrtKeyParameters)KeyPair.Private);

        RSACryptoServiceProvider csp = new RSACryptoServiceProvider(); // cspParams);
        csp.ImportParameters(rsaParams);
        return csp;
    }

    public string? GetWebuntisToken(Guid uuid) => DevcryptPw(GetUserTokenSet(uuid).WebUntisToken);
    public string? GetEduvidualToken(Guid uuid) => DevcryptPw(GetUserTokenSet(uuid).EduvidualToken);
    private StoredUserTokens GetUserTokenSet(Guid uuid) => _db.StoredUserTokens.First(x => x.UUID == uuid);
    private string? DevcryptPw(string? pw) => pw is not null ? System.Text.Encoding.Unicode.GetString(_rsa.Decrypt(Convert.FromBase64String(pw), false)) : pw;
}
