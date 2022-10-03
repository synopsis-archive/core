using System.Net;
using System.Text;
using System.Text.Json.Nodes;
using Core.WebUntis.Interface;
using Newtonsoft.Json;

namespace Core.WebUntis.Implementation;

public class WebUntisClient : IWebUntisClient
{
    private const string School = "htbla-grieskirchen";
    private const string Client = "htl-grieskirchen-core";

    private readonly HttpClient _httpClient;

    public WebUntisClient(string? token = null)
    {
        var baseAddress = new Uri("https://arche.webuntis.com/WebUntis/jsonrpc.do");

        var cookieContainer = new CookieContainer();
        if (token != null)
        {
            cookieContainer.Add(baseAddress, new Cookie("JSESSIONID", token));
        }

        var handler = new HttpClientHandler { CookieContainer = cookieContainer };
        _httpClient = new HttpClient(handler) { BaseAddress = baseAddress };
    }

    public async Task<AuthenticateResponse> Authenticate(string user, string password)
    {
        return await Request<AuthenticateResponse>(
            "authenticate",
            new AuthenticateRequest
            {
                User = user,
                Password = password,
                Client = Client
            },
            new Dictionary<string, string> {
                {"school", School}
            }
        );
    }

    private async Task<TResponse> Request<TResponse>(
        string method,
        object? request = null,
        Dictionary<string, string>? urlParameters = null
    )
    {
        var response = await _httpClient.PostAsync(
            GetUrlParameterString(urlParameters),
            GetContent(method, request)
        );
        var responseJson = JsonNode.Parse(await response.Content.ReadAsStringAsync())!;

        var errorJson = responseJson["error"];
        if (errorJson != null)
        {
            var errorCode = int.Parse(errorJson["code"]!.ToString());
            throw new NotImplementedException();
        }

        var resultJsonString = responseJson["result"]!.ToJsonString();
        return JsonConvert.DeserializeObject<TResponse>(resultJsonString)!;
    }

    private string GetUrlParameterString(Dictionary<string, string>? urlParameters = null)
    {
        return urlParameters != null
            ? $"?{string.Join("&", urlParameters.Select(entry => $"{entry.Key}={entry.Value}"))}"
            : "";
    }

    private HttpContent GetContent(
        string method,
        object? request = null
    )
    {
        var json = new JsonObject
        {
            ["method"] = method,
            ["id"] = 0,
            ["jsonrpc"] = "2.0"
        };

        if (request != null)
            json["params"] = JsonNode.Parse(JsonConvert.SerializeObject(request));

        return new StringContent(json.ToJsonString(), Encoding.UTF8, "application/json");
    }
}
