using System.Text.Json.Serialization;

namespace Core.WebUntis.Implementation.RequestTypes;

public class HomeworkRequest
{
    [JsonPropertyName("startDate")] public int StartDate { get; set; }
    [JsonPropertyName("endDate")] public int EndDate { get; set; }
}
