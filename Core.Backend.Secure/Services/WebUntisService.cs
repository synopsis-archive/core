using System.Security.Claims;
using Core.Backend.Secure.Auth;
using Core.WebUntis.Implementation;

namespace Core.Backend.Secure.Services;

public class WebUntisService
{

    private readonly CredService _credService;

    public WebUntisService(CredService credService)
    {
        _credService = credService;
    }

    private async Task<WebUntisClient> GetWebUntisClient(ClaimsPrincipal user)
    {
        var webUntisCredentials = GetWebUntisCredentials(user);
        var webUntisClient = new WebUntisClient("https://arche.webuntis.com", "htbla-grieskirchen", "Synopsis");
        await webUntisClient.AuthenticateWithSecret(webUntisCredentials.Username, webUntisCredentials.Secret);
        return webUntisClient;
    }

    private WebUntisCredentials GetWebUntisCredentials(ClaimsPrincipal user)
    {
        var guid = new Guid(user.GetUUID());

        var secret = _credService.GetWebUntisSecret(guid);

        if (secret == null)
            throw new NoSecretException();

        return new WebUntisCredentials
        {
            Username = user.GetUsername(),
            Secret = secret
        };
    }

    private class WebUntisCredentials
    {
        public string Username = null!;
        public string Secret = null!;
    }

    private class NoSecretException : Exception { }
}
