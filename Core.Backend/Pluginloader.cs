using System.Diagnostics;
using System.Reflection;
using System.Runtime.Loader;
using Core.Plugin.Interface;

namespace Core.Backend;

public static class Pluginloader
{
    private static List<ICorePlugin> Plugins { get; } = new List<ICorePlugin>();

    public static WebApplicationBuilder InjectBuilderToPlugin(this WebApplicationBuilder builder)
    {
        Plugins.ForEach(plugin =>
        {
            plugin.ConfigureServices(builder);
            builder.Services.AddControllers().AddApplicationPart(plugin.GetType().Assembly);
        });
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
        var pluginDirectories = Directory.GetDirectories(folder);
        foreach (var pluginDirectory in pluginDirectories)
        {
            Console.WriteLine($"Searching for plugins in {pluginDirectory}");
            //var assembly = Assembly.LoadFile(Path.GetFullPath(Path.Combine(pluginDirectory, "CorePlugin.Plugin.dll")));

            //var path = Path.GetFullPath(Path.Combine(pluginDirectory, "CorePlugin.Plugin.dll"));
            var path = Path.GetFullPath(Path.Combine(pluginDirectory, "CorePlugin.Plugin.dll"));

            var loadContext = new PluginLoadContext(path);
            loadContext.Resolving += OnAssemblyResolve;
            Assembly assembly =
                loadContext.LoadFromAssemblyName(new AssemblyName(Path.GetFileNameWithoutExtension(path)));


            var types = assembly.GetTypes();

            foreach (var type in types)
            {
                Console.WriteLine("I Probier -- " + type.FullName + " - gehts? " +
                                  (typeof(ICorePlugin).IsAssignableFrom(type) ? "ja" : "nein"));

                if (!type.IsAssignableTo(typeof(ICorePlugin)) ||
                    type.FullName == "Core.Plugin.Interface.ICorePlugin") continue;

                Plugins.Add((ICorePlugin)Activator.CreateInstance(type)!);
                Console.WriteLine($"Loading plugin {type.Name}");
            }
        }

        if (pluginDirectories.Length == 0)
            Console.WriteLine("No plugin folders found");
        Console.WriteLine("x------------------[Starting Application]------------------x");
    }

    public static void HookAssemblyResolver()
    {
        //AppDomain.CurrentDomain.AssemblyResolve += OnAssemblyResolve;
    }

    private static Assembly? OnAssemblyResolve(object? sender, ResolveEventArgs args)
    {
        var folderPath = Path.GetDirectoryName((args.RequestingAssembly ?? typeof(Pluginloader).Assembly).Location);
        var assemblyPath = Path.Combine(folderPath!, new AssemblyName(args.Name).Name + ".dll");

        Debug.WriteLine($"Resolving assembly {args.Name} from {assemblyPath}");

        if (!File.Exists(assemblyPath)) return null;
        var assembly = Assembly.LoadFrom(assemblyPath);
        return assembly;
    }

    private static Assembly? OnAssemblyResolve(AssemblyLoadContext context, AssemblyName name)
    {
        Console.WriteLine($"Coundn't resovle {name.Name}");
        return null; // Fail to read.
    }
}
