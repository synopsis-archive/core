using System.Runtime.Versioning;
using System.Text.Json.Serialization;
using Core.WebUntis.Interface.Types;

namespace Core.WebUntis.Implementation.ResponseTypes;

public class TeacherResponse
{
    [JsonPropertyName("id")] public int Id { get; set; }
    [JsonPropertyName("longName")] public string LongName { get; set; }
    [JsonPropertyName("foreName")] public string ForeName { get; set; }
    [JsonPropertyName("foreColor")] public string ForeColor { get; set; }
    [JsonPropertyName("backColor")] public string BackColor { get; set; }

    public Teacher Convert()
    {
        return new Teacher
        {
            Id = Id,
            ForeName = ForeName,
            LongName = LongName
        };
    }
}
