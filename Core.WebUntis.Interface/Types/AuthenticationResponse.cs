using System.Text.Json.Serialization;

namespace Core.WebUntis.Interface.Types;

public class AuthenticateResponse
{
    [JsonPropertyName("sessionId")] public string SessionId { get; set; } = null!;
    [JsonPropertyName("personType")] public long PersonType { get; set; }
    [JsonPropertyName("personId")] public long PersonId { get; set; }
    [JsonPropertyName("klasseId")] public long KlasseId { get; set; }
}
