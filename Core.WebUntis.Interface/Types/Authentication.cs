using Newtonsoft.Json;

namespace Core.WebUntis.Interface;

public class AuthenticateResponse
{
    [JsonProperty("sessionId")] public string SessionId { get; set; } = null!;
    [JsonProperty("personType")] public long PersonType { get; set; }
    [JsonProperty("personId")] public long PersonId { get; set; }
    [JsonProperty("klasseId")] public long KlasseId { get; set; }
}
