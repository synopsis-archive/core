using System.Text.Json.Serialization;

namespace Core.WebUntis.Implementation.RequestTypes;

public class TimetableRequest
{
    [JsonPropertyName("type")] public int Type { get; set; }
    [JsonPropertyName("id")] public int? Id { get; set; }
    [JsonPropertyName("startDate")] public int StartDate { get; set; }
    [JsonPropertyName("endDate")] public int EndDate { get; set; }
}
