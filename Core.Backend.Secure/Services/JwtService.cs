using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Core.Backend.Secure.Auth;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Core.Backend.Secure.Services;

public class JwtService
{
    private IConfiguration _conf;
    private RSACryptoServiceProvider _keys;

    public JwtService(IConfiguration conf, RSACryptoServiceProvider keys)
    {
        _conf = conf;
        _keys = keys;
        //_publicKey = ImportPublicKey("./keys/"+_conf["RSA:public-key"]);
    }

    public string GenerateToken(AuthToken user)
    {
        //var securityKey = _privateKey;
        //var credentials = new SigningCredentials(new SymmetricSecurityKey(_privateKey.SignData()), SecurityAlgorithms.HmacSha256);

        //var credentials = new SigningCredentials(new SymmetricSecurityKey(_privateKey.ExportCspBlob(true)), SecurityAlgorithms.RsaSha256);

        //throw new JsonException("anelle");

        SecurityKey key = new RsaSecurityKey(_keys);

        Claim[] claims;

        if (user.GetType() == typeof(AuthToken))
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

        Console.WriteLine(token.SigningCredentials.Key);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
