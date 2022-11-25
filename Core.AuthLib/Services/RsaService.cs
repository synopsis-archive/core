using System.Security.Cryptography;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;
using PemReader = Org.BouncyCastle.OpenSsl.PemReader;

namespace Core.AuthLib.Services;

public static class RsaService
{
    public static RSA ImportRSAKey(string pem, bool isPk = false)
    {
        var pk = File.ReadAllText(pem);

        AsymmetricCipherKeyPair? keyPair;

        using (var sr = new StringReader(pk))
        {
            var pr = new PemReader(sr);
            keyPair = pr.ReadObject() as AsymmetricCipherKeyPair;
        }

        if (keyPair == null)
            throw new Exception("KeyPair is null");

        var rsaParams =
            DotNetUtilities.ToRSAParameters(isPk
                ? keyPair.Private as RsaPrivateCrtKeyParameters
                : keyPair.Public as RsaPrivateCrtKeyParameters);
        var rsa = RSA.Create();
        rsa.ImportParameters(rsaParams);

        return rsa;
    }
}
