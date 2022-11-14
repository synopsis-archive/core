using System.Runtime.Versioning;
using System.Text.Json.Serialization;

namespace Core.WebUntis.Implementation.ResponseTypes;

public class TeacherResponse
{
    [JsonPropertyName("id")] public int Id { get; set; }
    [JsonPropertyName("lastName")] public string LastName { get; set; }
    [JsonPropertyName("firstName")] public string FirstName { get; set; }
    [JsonPropertyName("abbreviation")] public string Abbreviation { get; set; }
    [JsonPropertyName("foreColor")] public string ForeColor { get; set; }
    [JsonPropertyName("backColor")] public string BackColor { get; set; }

    public Teacher Convert()
    {
        return new Teacher
        {
            Id = Id,
            Abbreviation = Abbreviation,
            BackColor = Abbreviation,
            FirstName = FirstName,
            ForeColor = ForeColor,
            LastName = LastName
        };
    }
}
