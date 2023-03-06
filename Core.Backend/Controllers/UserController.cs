using Core.AuthLib;
using Core.Backend.Secure.Dtos;
using Core.Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Backend.Secure.Controllers;

[Authorize(Policy = "Auth-Token")]
[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{

    private UserFavoritesService _userFavoritesService;

    public UserController(UserFavoritesService userFavoritesService) => _userFavoritesService = userFavoritesService;

    [Authorize]
    [HttpGet("Favorites")]
    public async Task<List<UserFavoriteDto>> GetUserFavorites()
    {
        return await _userFavoritesService.GetUserFavoritesFromUser(this.User.GetUUID());
    }

    [Authorize]
    [HttpPost("AddFavorite")]
    public async Task<UserFavoriteDto> AddUserFavorite(string PluginId)
    {
        return await _userFavoritesService.AddUserFavorite(this.User.GetUUID(), PluginId);
    }

    [Authorize]
    [HttpDelete("RemoveFavorite")]
    public async Task<UserFavoriteDto> RemoveUserFavorite(string PluginId)
    {
        return await _userFavoritesService.RemoveUserFavorite(this.User.GetUUID(), PluginId);
    }

}
