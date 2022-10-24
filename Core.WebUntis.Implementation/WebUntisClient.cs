using System.Globalization;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Core.WebUntis.Implementation.RequestTypes;
using Core.WebUntis.Implementation.ResponseTypes;
using Core.WebUntis.Interface;
using Core.WebUntis.Interface.Types;

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

    public async Task<Authentication> Authenticate(string user, string password)
    {
        var authenticateResponse = await Request<AuthenticateResponse>(
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

        return authenticateResponse.Convert();
    }

    public List<Class> GetClasses(int schoolYear)
    {
        var classesResponse = Request<ClassResponse[]>(
            "getKlassen",
            null,
            new Dictionary<string, string> {
                {"schoolYear", schoolYear.ToString()}
            }
        ).Result;
        return classesResponse.Select(x => x.Convert()).ToList();
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
        return JsonSerializer.Deserialize<TResponse>(resultJsonString)!;
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
            json["params"] = JsonNode.Parse(JsonSerializer.Serialize(request));

        return new StringContent(json.ToJsonString(), Encoding.UTF8, "application/json");
    }

    #region staticMethods

    public static DateTime ConvertUntisDateToDate(int date)
    {
        return DateTime.ParseExact(date.ToString(), "yyyyMMdd", CultureInfo.InvariantCulture);
    }

    public static int ConvertDateToUntisDate(DateTime date)
    {
        return int.Parse(date.ToString("yyyyMMdd", CultureInfo.InvariantCulture));
    }

    public static DateTime ConvertUntisTimeToTime(int time)
    {
        return DateTime.ParseExact(time.ToString(), "HHmm", CultureInfo.InvariantCulture);
    }

    public static int ConvertTimeToUntisTime(DateTime time)
    {
        return int.Parse(time.ToString("HHmm", CultureInfo.InvariantCulture));
    }

    #endregion
}
