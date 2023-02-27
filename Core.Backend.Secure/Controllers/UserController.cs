using Core.Backend.Secure.Services;
using Core.AuthLib;
using Core.Backend.Secure.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Backend.Secure.Controllers;

[Authorize(Policy = "Auth-Token")]
[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{

    private UserService _userService;

    public UserController(UserService usr) => _userService = usr;

    [Authorize]
    [HttpPost]
    public UserDTO GetUserInfo(string? uuid) => _userService.GetUserInfo(uuid ?? User.GetUUID().ToString());

    [Authorize]
    [HttpGet("Favorites")]
    public async Task<List<UserFavoriteDto>> GetUserFavorites()
    {
        return await _userService.GetUserFavoritesFromUser(this.User.GetUUID());
    }

    [Authorize]
    [HttpPost("AddFavorite")]
    public async Task<UserFavoriteDto> AddUserFavorite(string PluginId)
    {
        return await _userService.AddUserFavorite(this.User.GetUUID(), PluginId);
    }

    [Authorize]
    [HttpDelete("RemoveFavorite")]
    public async Task<UserFavoriteDto> RemoveUserFavorite(string PluginId)
    {
        return await _userService.RemoveUserFavorite(this.User.GetUUID(), PluginId);
    }

}
