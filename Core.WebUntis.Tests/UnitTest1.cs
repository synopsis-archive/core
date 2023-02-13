using System.Text.Json;
using Core.WebUntis.Implementation;
using Core.WebUntis.Interface;

namespace Core.WebUntis.Tests;

public class Tests
{
    IWebUntisClient _client;

    [SetUp]
    public void Setup()
    {
        var username = Environment.GetEnvironmentVariable("WEBUNTIS_USERNAME");
        var password = Environment.GetEnvironmentVariable("WEBUNTIS_PASSWORD");
        _client = new WebUntisClient("https://arche.webuntis.com", "htbla-grieskirchen", "Synopsis-Test");
        _client.Authenticate(username, password);
    }

    [Test]
    public async Task TestRooms()
    {
        await TestMethod(async () => { await _client.GetRooms(); });
    }

    private static async Task TestMethod(Func<Task> function)
    {
        try
        {
            await function.Invoke();
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.Pass();
    }
}
