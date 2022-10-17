using Core.WebUntis.Interface.Types;

namespace Core.WebUntis.Interface;

public interface IWebUntisClient
{
    public Task<AuthenticateResponse> Authenticate(string user, string password);
}
