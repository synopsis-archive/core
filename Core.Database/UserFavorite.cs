using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Database;

public class UserFavorite
{
    [Key, Column(Order = 0)]
    public Guid UUID { get; set; }

    [Key, Column(Order = 1)]
    public string PluginId { get; set; }

}
