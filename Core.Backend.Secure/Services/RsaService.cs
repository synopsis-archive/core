using System.Security.Cryptography;
using Org.BouncyCastle.Asn1.Pkcs;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.Utilities.IO.Pem;
using PemReader = Org.BouncyCastle.OpenSsl.PemReader;

namespace Core.Backend.Secure.Services;

public static class RsaService
{
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
        if (!File.Exists(pem))
        {
            Console.WriteLine($"File {pem} does not exist!");
            throw new FileNotFoundException($"File {pem} does not exist in {System.AppContext.BaseDirectory}!");
        }
        PemReader pr = new PemReader(new StringReader(pem));
        PemObject keyPair = pr.ReadPemObject();
        if (keyPair is null)
        {
            throw new Exception("KeyPair is null!");
        }
        RSAParameters rsaParams = DotNetUtilities.ToRSAParameters(RsaPrivateKeyStructure.GetInstance(keyPair));

        RSACryptoServiceProvider csp = new RSACryptoServiceProvider(); // cspParams);
        csp.ImportParameters(rsaParams);
        return csp;
    }
}
