using Core.Database;

namespace Core.Backend.Secure.Services;

public class CredService
{
    private CoreContext _db;
    public CredService(CoreContext db) => _db = db;

    // @TODO: Add DTO, but I don't want to do that now...
    public void saveCreds(string id, string password, Platform platform)
    {
    }
}
