using System.Text.Json.Serialization;
using Core.WebUntis.Interface.Types;

namespace Core.WebUntis.Implementation.ResponseTypes;

public class StudentResponse
{
    [JsonPropertyName("id")] public int Id { get; set; }
    [JsonPropertyName("name")] public string Name { get; set; }
    [JsonPropertyName("longName")] public string LongName { get; set; }
    [JsonPropertyName("foreName")] public string ForeName { get; set; }
    [JsonPropertyName("key")] public string Key { get; set; }
    [JsonPropertyName("gender")] public string Gender { get; set; }

    public Student Convert()
    {
        return new Student()
        {
            Id = Id,
            Name = Name,
            LongName = LongName,
            ForeName = ForeName,
            Gender = Gender
        };
    }
}
