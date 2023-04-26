using System.Security.Cryptography;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;
using PemReader = Org.BouncyCastle.OpenSsl.PemReader;

namespace Core.AuthLib.Services;

public static class RsaService
{
    public static RSA ImportRSAKey(string pem, bool isPrivateKey = false)
    {

        var pk = File.ReadAllText(pem);
        RSAParameters rsaParams;

        if (!isPrivateKey)
        {
            var kp = (AsymmetricKeyParameter)new PemReader(new StringReader(pk)).ReadObject();
            rsaParams = DotNetUtilities.ToRSAParameters((RsaKeyParameters)kp);
        }
        else
        {
            try
            {
                AsymmetricCipherKeyPair? keyPair = (AsymmetricCipherKeyPair)new PemReader(new StringReader(pk)).ReadObject();
                rsaParams = DotNetUtilities.ToRSAParameters(keyPair.Private as RsaPrivateCrtKeyParameters);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                RsaPrivateCrtKeyParameters? keyPair = (RsaPrivateCrtKeyParameters)new PemReader(new StringReader(pk)).ReadObject();
                rsaParams = DotNetUtilities.ToRSAParameters(keyPair);
            }

        }

        var rsa = RSA.Create();
        rsa.ImportParameters(rsaParams);

        return rsa;
    }
}
