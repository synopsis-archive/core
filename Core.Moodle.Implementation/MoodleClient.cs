using System.Text.Json;
using Core.Moodle.Interface;

namespace Core.Moodle.Implementation;

public class MoodleClient : IMoodleClient
{
    private const string BaseAddress = "https://www.eduvidual.at/";
    private readonly HttpClient _client;

    public MoodleClient(HttpClient client) => _client = client;

    /*
     * Grabs all Courses of a User
     */
    public IEnumerable<MoodleCourse> GetCourses(string token)
    {
        var jsonElement = GetJsonResponse("mod_assign_get_assignments", token, "").Result.RootElement;
        var courses = jsonElement.GetProperty("courses").EnumerateArray()
            .Select(x => new MoodleCourse
            {
                Id = x.GetProperty("id").GetInt64().ToString(),
                Name = x.GetProperty("fullname").GetString()
            });
        return courses;
    }

    /*
     * Grabs detailed information about a course
     */
    public DetailedMoodleCourse? GetDetailedCourse(string courseId, string token)
    {
        var jsonElement = GetJsonResponse("core_course_get_courses_by_field", token, $"field=id&value={courseId}").Result.RootElement;
        var course = jsonElement.GetProperty("courses").EnumerateArray()
            .Select(x => new DetailedMoodleCourse()
            {
                Id = x.GetProperty("id").GetInt64().ToString(),
                Name = x.GetProperty("fullname").GetString(),
                CategoryName = x.GetProperty("categoryname").GetString(),
                Contacts = x.GetProperty("contacts").EnumerateArray().Select(y => y.GetProperty("fullname").GetString()).ToList(),
                Description = x.GetProperty("summary").GetString(),
                StartDate = ConvertUnixTimeStampToDateTime(x.GetProperty("startdate").GetInt64()),
                EndDate = ConvertUnixTimeStampToDateTime(x.GetProperty("enddate").GetInt64()),
            })
            .FirstOrDefault();
        return course;
    }

    /*
     * Grabs all Assignments of a User
     */
    public IEnumerable<MoodleAssignment> GetAssignments(string token)
    {
        var jsonElement = GetJsonResponse("mod_assign_get_assignments", token, "").Result.RootElement;
        var assignments = jsonElement.GetProperty("courses")
            .EnumerateArray()
            .Where(x => x.GetProperty("assignments").EnumerateArray().Any())
            .SelectMany(x => x.GetProperty("assignments").EnumerateArray())
            .Select(x => new MoodleAssignment
            {
                Name = x.GetProperty("name").GetString(),
                DueDate = ConvertUnixTimeStampToDateTime(x.GetProperty("duedate").GetInt64()),
                CourseId = x.GetProperty("course").GetInt64().ToString(),
                Id = x.GetProperty("id").GetInt64().ToString()
            });
        return assignments;
    }

    private Task<JsonDocument> GetJsonResponse(string functionName, string token, string additionalArgs)
    {
        var httpAddress = new Uri(
            $"{BaseAddress}webservice/rest/server.php" +
            $"?wstoken={token}&wsfunction={functionName}&moodlewsrestformat=json&{additionalArgs}"
        );
        var response = _client.GetStreamAsync(httpAddress);
        return JsonDocument.ParseAsync(response.Result);
    }

    private static DateTime ConvertUnixTimeStampToDateTime(long unixTimeStamp)
    {
        var dateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
        return dateTime.AddSeconds(unixTimeStamp).ToLocalTime();
    }
}
