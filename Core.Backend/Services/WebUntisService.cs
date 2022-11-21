using Core.WebUntis.Implementation;

namespace Core.Backend.Services;

public class WebUntisService
{
    private async Task<WebUntisClient> GetWebUntisClient(string user, string secret)
    {
        var webUntisClient = new WebUntisClient("https://arche.webuntis.com", "htbla-grieskirchen", "CORE");
        await webUntisClient.AuthenticateWithSecret(user, secret);
        return webUntisClient;
    }
}
