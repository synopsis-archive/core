using Core.WebUntis.Interface.Types;

namespace Core.WebUntis.Interface;

public interface IWebUntisClient
{
    public Task<Authentication> Authenticate(string user, string password);
    public Task<Authentication> AuthenticateWithSecret(string user, string secret);
    public Task<List<Class>> GetClasses(int schoolYear);
    public Task<List<Subject>> GetSubjects();
    public Task<List<Room>> GetRooms();
    public Task<List<Teacher>> GetTeachers();
}
