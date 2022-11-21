using System.ComponentModel.DataAnnotations;

namespace Core.Database;

public class StoredUserTokens
{
    [Key]
    public Guid UUID { get; set; }
    public string? WebUntisSecret { get; set; }
    public string? EduvidualToken { get; set; }

    public User User { get; set; } = null!;
}
