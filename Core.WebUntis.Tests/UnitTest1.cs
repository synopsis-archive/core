using Core.WebUntis.Implementation;
using Core.WebUntis.Interface.Types;

namespace Core.WebUntis.Tests;

public class Tests
{
    WebUntisClient _client;

    [SetUp]
    public async Task Setup()
    {
        var username = Environment.GetEnvironmentVariable("WEBUNTIS_USERNAME");
        var password = Environment.GetEnvironmentVariable("WEBUNTIS_PASSWORD");
        _client = new WebUntisClient("https://arche.webuntis.com", "htbla-grieskirchen", "Synopsis-Test");
        await _client.Authenticate(username, password);
    }

    [Test]
    public async Task TestRooms()
    {
        await TestMethod(async () => await _client.GetRooms());
    }

    [Test]
    public async Task TestClasses()
    {
        await TestMethod(async () => await _client.GetClasses());
    }

    [Test]
    public async Task TestHolidays()
    {
        await TestMethod(async () => await _client.GetHolidays());
    }

    [Test]
    public async Task TestHomeworks()
    {
        await TestMethod(async () => await _client.GetHomeworks(DateTime.Now, DateTime.Now.AddDays(1)));
    }

    [Test]
    public async Task TestSubject()
    {
        await TestMethod(async () => await _client.GetSubjects());
    }

    [Test]
    public async Task TestTimetable()
    {
        await TestMethod(async () => await _client.GetTimetable(ElementType.Student, _client.PersonId, DateTime.Now, DateTime.Now.AddDays(1)));
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
