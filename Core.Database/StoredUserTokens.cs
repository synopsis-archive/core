using System.ComponentModel.DataAnnotations;

namespace Core.Database;

public class StoredUserTokens
{
    [Key]
    public int UserId { get; set; }
    public string? WebUntisToken { get; set; }
    public string? EduvidualToken { get; set; }

    public User User { get; set; } = null!;
}
