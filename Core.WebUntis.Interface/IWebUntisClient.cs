using Core.WebUntis.Interface.Types;

namespace Core.WebUntis.Interface;

public interface IWebUntisClient
{
    public Task<Authentication> Authenticate(string user, string password);
    public Task<Authentication> AuthenticateWithSecret(string user, string secret);
    public List<Class> GetClasses(int schoolYear);
    public List<Room> GetRooms();
}
