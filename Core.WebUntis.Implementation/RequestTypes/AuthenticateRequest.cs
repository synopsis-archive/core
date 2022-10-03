using Newtonsoft.Json;

namespace Core.WebUntis.Implementation;

public class AuthenticateRequest
{
    [JsonProperty("user")] public string User { get; set; } = null!;
    [JsonProperty("password")] public string Password { get; set; } = null!;
    [JsonProperty("client")] public string Client { get; set; } = null!;
}
