using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Database;

public class UserFavorite
{
    [Key]
    public Guid Uuid { get; set; }

    [Key]
    public string PluginId { get; set; } = null!;

}
