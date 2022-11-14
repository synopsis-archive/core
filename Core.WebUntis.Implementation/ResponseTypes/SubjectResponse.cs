using System.Text.Json.Serialization;

namespace Core.WebUntis.Implementation.ResponseTypes;

public class SubjectResponse
{
    [JsonPropertyName("id")] public int Id { get; set; }
    [JsonPropertyName("name")] public string Name { get; set; }
    [JsonPropertyName("longName")] public string LongName { get; set; }
    [JsonPropertyName("foreColorHex")] public string ForeColorHex { get; set; }
    [JsonPropertyName("backColorHex")] public string BackColorHex { get; set; }

    public Subject Convert(SubjectResponse response)
    {
        return new Subject
        {
            Id = response.Id,
            Name = response.Name,
            LongName = response.LongName,
            ForeColorHex = response.ForeColorHex,
            BackColorHex = response.BackColorHex
        };
    }
}
