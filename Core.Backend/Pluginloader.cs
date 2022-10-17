using System.Reflection;
using Core.Plugin.Interface;

namespace Core.Backend;

public static class Pluginloader
{
    private static List<ICorePlugin> Plugins { get; } = new List<ICorePlugin>();

    public static WebApplicationBuilder InjectBuilderToPlugin(this WebApplicationBuilder builder)
    {
        Plugins.ForEach(plugin => plugin.ConfigureServices(builder));
        return builder;
    }

    public static WebApplication InjectAppToPlugin(this WebApplication app)
    {
        Plugins.ForEach(plugin => plugin.Configure(app));
        return app;
    }

    public static void LoadPlugins(string folder)
    {
        var files = Directory.GetFiles(folder, "*.dll");
        foreach (var file in files)
        {
            var assembly = Assembly.LoadFile(file);
            var types = assembly.GetTypes();

            foreach (var type in types)
            {
                if (type.IsSubclassOf(typeof(ICorePlugin)))
                {
                    Plugins.Add((ICorePlugin)Activator.CreateInstance(type)!);
                }
            }
        }
    }
}
