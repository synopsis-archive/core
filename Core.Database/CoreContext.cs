using Microsoft.EntityFrameworkCore;

namespace Core.Database;

public class CoreContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<StoredUserTokens> StoredUserTokens { get; set; } = null!;
    public DbSet<Teacher> Teachers { get; set; } = null!;
    public DbSet<Student> Students { get; set; } = null!;

    public DbSet<UserFavorite> UserFavorites { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<UserFavorite>().HasKey(u => new
        {
            u.UUID,
            u.PluginId
        });
    }

    public CoreContext(DbContextOptions<CoreContext> options) : base(options)
    {
    }
}
