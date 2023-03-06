using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Database;

public class UserFavorite
{
    [Key, Column(Order = 0)]
    public User User { get; set; }

    [ForeignKey("Uuid")]
    public User User { get; set; } = null!;

    [Key, Column(Order = 1)]
    public string PluginId { get; set; } = null!;
}
