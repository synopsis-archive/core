using System.Security.Cryptography;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;
using PemReader = Org.BouncyCastle.OpenSsl.PemReader;

namespace Core.Backend.Secure.Services;

public static class RsaService
{
    public static RSA ImportRSAKey(string pem)
    {
        var pk = File.ReadAllText(pem);

        AsymmetricCipherKeyPair? keyPair = (AsymmetricCipherKeyPair)new PemReader(new StringReader(pk)).ReadObject();

        using (var sr = new StringReader(pk))
        {
            PemReader pr = new PemReader(sr);
            keyPair = pr.ReadObject() as AsymmetricCipherKeyPair;
        }

        var rsaParams = DotNetUtilities.ToRSAParameters(keyPair.Private as RsaPrivateCrtKeyParameters);

        RSA rsa = RSA.Create();
        rsa.ImportParameters(rsaParams);

        return rsa;
    }
}
