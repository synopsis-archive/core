using Core.Backend.Secure.Dtos;
using Core.Secure.Database;
using Microsoft.EntityFrameworkCore;

namespace Core.Backend.Secure.Services;

public class UserService
{
    private CoreSecureContext _db;

    public UserService(CoreSecureContext db)
    {
        _db = db;
    }

    public UserDTO GetUserInfo(string uuid)
    {
        var usr = _db.Users.First(x => x.UUID == new Guid(uuid));
        return new UserDTO()
        {
            UUID = usr.UUID,
            Username = usr.Username,
            SchoolEmail = usr.SchoolEmail,
            DisplayName = usr.DisplayName,
            Class = usr.Class,
            Role = usr.Role.ToString(),
            MatriculationNumber = usr.MatriculationNumber
        };
    }

    public async Task<List<UserFavoriteDto>> GetUserFavoritesFromUser(Guid uuid)
    {
        var usr = await _db.UserFavorites.Where(x => x.Uuid == uuid).ToListAsync();
        return usr.Select(x => new UserFavoriteDto()
        {
            UUID = x.Uuid,
            PluginID = x.PluginId
        }).ToList();
    }

    public async Task<UserFavoriteDto> AddUserFavorite(Guid uuid, string PluginId)
    {
        var usr = new UserFavorite
        {
            PluginId = PluginId,
            Uuid = uuid
        };
        await _db.UserFavorites.AddAsync(usr);
        await _db.SaveChangesAsync();
        return new UserFavoriteDto()
        {
            UUID = uuid,
            PluginID = usr.PluginId
        };
    }

    public async Task<UserFavoriteDto> RemoveUserFavorite(Guid uuid, string PluginId)
    {
        var usr = await _db.UserFavorites.Where(x => x.Uuid == uuid && x.PluginId == PluginId).FirstOrDefaultAsync();
        _db.UserFavorites.Remove(usr!);
        await _db.SaveChangesAsync();
        return new UserFavoriteDto()
        {
            UUID = uuid,
            PluginID = usr.PluginId
        };
    }


}
