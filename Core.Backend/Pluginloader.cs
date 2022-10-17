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
        Console.WriteLine("x--------------------[Loading Plugins]---------------------x");
        var files = Directory.GetFiles(folder, "*.dll");
        foreach (var file in files)
        {
            Console.WriteLine($"loading from {Path.GetFullPath(file)}");
            var assembly = Assembly.LoadFile(Path.GetFullPath(file));
            var types = assembly.GetTypes();

            foreach (var type in types)
            {

                if (type.IsAssignableTo(typeof(ICorePlugin)))
                {
                    Plugins.Add((ICorePlugin)Activator.CreateInstance(type)!);
                    Console.WriteLine($"Loading Plugin {type.Name}");
                }
            }
        }
        if (files.Length == 0)
            Console.WriteLine("No Plugins found");
        Console.WriteLine("x------------------[Starting Application]------------------x");
    }
}
