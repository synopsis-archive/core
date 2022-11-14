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
    private RSA _keys;

    public JwtService(IConfiguration conf, RSA keys)
    {
        _conf = conf;
        _keys = keys;
    }

    public string GenerateToken(AuthToken user)
    {
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

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
