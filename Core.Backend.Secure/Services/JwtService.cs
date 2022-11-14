using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Core.Backend.Secure.Auth;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Security;

namespace Core.Backend.Secure.Services;

public class JwtService
{
    private IConfiguration _conf;
    private RSACryptoServiceProvider _privateKey;

    public JwtService(IConfiguration conf)
    {
        _conf = conf;
        //_privateKey = RsaService.ImportPrivateKey("./keys/" + _conf["RSA:private-key"]);
        //_publicKey = ImportPublicKey("./keys/"+_conf["RSA:public-key"]);
    }

    public string GenerateToken(AuthToken user)
    {
        //var securityKey = _privateKey;
        //var credentials = new SigningCredentials(new SymmetricSecurityKey(_privateKey.SignData()), SecurityAlgorithms.HmacSha256);

        //var credentials = new SigningCredentials(new SymmetricSecurityKey(_privateKey.ExportCspBlob(true)), SecurityAlgorithms.RsaSha256);

        //throw new JsonException("anelle");

        var pk = File.ReadAllText("./keys/" + _conf["RSA:private-key"]);

        AsymmetricCipherKeyPair keyPair = (AsymmetricCipherKeyPair)new PemReader(new StringReader(pk)).ReadObject();

        using (var sr = new StringReader(pk))
        {
            PemReader pr = new PemReader(sr);
            keyPair = pr.ReadObject() as AsymmetricCipherKeyPair;
        }

        var rsaParams = DotNetUtilities.ToRSAParameters(keyPair.Private as RsaPrivateCrtKeyParameters);

        using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
        {
            rsa.ImportParameters(rsaParams);
            SecurityKey key = new RsaSecurityKey(rsa);

            Claim[] claims;

            if (user.IsAuthToken)
            {
                claims = new[]
                {
                    new Claim("type", "auth-token"),
                    new Claim("username", user.Username),
                    new Claim("uuid", user.UUID.ToString()),
                };
            }
            else
            {
                var idt = (IDToken)user;
                claims = new[]
                {
                    new Claim("type", "id-token"),
                    new Claim("username", idt.Username),
                    new Claim("uuid", idt.UUID.ToString()),
                    new Claim("rolle", idt.Role),
                    new Claim("matrikelnr", idt.MNR),
                    new Claim("klasse", idt.Class),
                    new Claim("connectedPlatforms", JsonConvert.SerializeObject(idt.ConnectedPlatforms)),
                };
            }


            var token = new JwtSecurityToken(
                issuer: _conf["Jwt:Issuer"],
                audience: _conf["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.RsaSha256Signature));


            Console.WriteLine("Token generated");
            Console.WriteLine(token);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
