using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Core.WebUntis.Implementation.RequestTypes;
using Core.WebUntis.Implementation.ResponseTypes;
using Core.WebUntis.Interface;
using Core.WebUntis.Interface.Exceptions;
using Core.WebUntis.Interface.Types;
using Holiday = Core.WebUntis.Interface.Types.Holiday;
using Homework = Core.WebUntis.Interface.Types.Homework;
using Room = Core.WebUntis.Interface.Types.Room;

namespace Core.WebUntis.Implementation;

public class WebUntisClient : IWebUntisClient
{
    private readonly string _baseUrl;
    private Uri BaseUri => new(_baseUrl);
    private string BaseUrlJsonRpc => _baseUrl + "/WebUntis/jsonrpc.do";
    private string BaseUrlJsonRpcIntern => _baseUrl + "/WebUntis/jsonrpc_intern.do";
    private string BaseUrlRest => _baseUrl + "/WebUntis/api";
    private readonly string _school;
    private readonly string _client;

    private readonly HttpClient _httpClient;
    private readonly CookieContainer _cookies;
    public int PersonId;

    public WebUntisClient(
        string baseUrl,
        string school,
        string client,
        string? token = null
    )
    {
        _baseUrl = baseUrl;
        _school = school;
        _client = client;

        _cookies = new CookieContainer();

        if (token != null)
        {
            AddToken(token);
        }

        var handler = new HttpClientHandler { CookieContainer = _cookies };
        _httpClient = new HttpClient(handler);
    }

    private void AddToken(string token)
    {
        _cookies.Add(BaseUri, new Cookie("JSESSIONID", token));
    }

    public async Task<Authentication> Authenticate(string user, string password)
    {
        var authenticateResponse = await JsonRpcRequest<AuthenticateResponse>(
            "authenticate",
            new AuthenticateRequest
            {
                User = user,
                Password = password,
                Client = _client
            },
            new Dictionary<string, string> {
                {"school", _school}
            }
        );

        var authentication = authenticateResponse.Convert();

        AddToken(authentication.Token);

        PersonId = authentication.PersonId;

        return authentication;
    }

    public async Task<IEnumerable<Class>> GetClasses()
    {
        var classesResponse = await JsonRpcRequest<ClassResponse[]>(
            "getKlassen"
        );
        return classesResponse
            .Select(x => x.Convert());
    }

    public async Task<IEnumerable<Room>> GetRooms()
    {
        var roomsResponse = await JsonRpcRequest<RoomResponse[]>(
            "getRooms"
        );
        return roomsResponse
            .Select(x => x.Convert());
    }

    public async Task<IEnumerable<Homework>> GetHomeworks(DateTime startDate, DateTime endDate)
    {
        var homeworkResponse = await RestRequest<HomeworkResponse>(
            method: HttpMethod.Get,
            path: "/homeworks/lessons",
            urlParameters: new Dictionary<string, string>
            {
                {"startDate", UntisDateTimeMethods.ConvertDateToUntisDate(startDate).ToString()},
                {"endDate", UntisDateTimeMethods.ConvertDateToUntisDate(endDate).ToString()}
            }
        );
        return homeworkResponse.Convert();
    }

    public async Task<IEnumerable<Holiday>> GetHolidays()
    {
        var holidayResponse = await JsonRpcRequest<HolidayResponse[]>(
            method: "getHolidays"
        );
        return holidayResponse.Select(x => x.Convert());
    }

    public async Task<IEnumerable<Subject>> GetSubjects()
    {
        var subjectResponse = await JsonRpcRequest<SubjectResponse[]>("getSubjects");
        return subjectResponse
            .Select(x => x.Convert());
    }

    public async Task<IEnumerable<Timetable>> GetTimetable(ElementType type, int id, DateTime startDate,
        DateTime endDate)
    {
        var request = new TimetableRequest(
            id,
            (int)type,
            UntisDateTimeMethods.ConvertDateToUntisDate(startDate),
            UntisDateTimeMethods.ConvertDateToUntisDate(endDate));
        var timetableResponse = await JsonRpcRequest<TimetableResponse[]>("getTimetable",
            request,
            new Dictionary<string, string>
            {
                {"school", _school}
            });
        return timetableResponse.Select(x => x.Convert());
    }

    private async Task<TResponse> JsonRpcRequest<TResponse>(
        string method,
        object? body = null,
        Dictionary<string, string>? urlParameters = null
    )
    {
        var response = await Request(
            HttpMethod.Post,
            BaseUrlJsonRpc,
            GetJsonRpcRequestContent(method, body),
            urlParameters
        );
        var responseJson = JsonNode.Parse(await response.Content.ReadAsStringAsync())!;

        var errorJson = responseJson["error"];
        if (errorJson != null)
        {
            var errorCode = int.Parse(errorJson["code"]!.ToString());

            throw errorCode switch
            {
                -8520 => new InvalidTokenException(),
                -8509 => new InsufficientRightsException(),
                -8507 => new InvalidDateException(),
                -8504 => new BadCredentialsException(),
                _ => new Exception("unknown WebUntis error occured")
            };
        }

        var resultJsonString = responseJson["result"]!.ToJsonString();
        return JsonSerializer.Deserialize<TResponse>(resultJsonString)!;
    }

    private async Task<TResponse> RestRequest<TResponse>(
        HttpMethod method,
        string path,
        object? body = null,
        Dictionary<string, string>? urlParameters = null
    )
    {
        var response = await Request(
            method,
            $"{BaseUrlRest}/{path}",
            GetRestRequestContent(body),
            urlParameters
        );

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception();
        }

        var responseJson = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<TResponse>(responseJson)!;
    }

    private async Task<HttpResponseMessage> Request(
        HttpMethod method,
        string url,
        HttpContent? httpContent = null,
        Dictionary<string, string>? urlParameters = null
    )
    {
        return await _httpClient.SendAsync(
            new HttpRequestMessage(method, GetUrlWithParameters(url, urlParameters))
            {
                Content = httpContent
            }
        );
    }

    private static string GetUrlWithParameters(string url, Dictionary<string, string>? urlParameters = null)
    {
        return url + (urlParameters != null
            ? $"?{string.Join("&", urlParameters.Select(entry => $"{entry.Key}={entry.Value}"))}"
            : "");
    }

    private static HttpContent GetJsonRpcRequestContent(
        string method,
        object? body = null
    )
    {
        var json = new JsonObject
        {
            ["method"] = method,
            ["id"] = 0,
            ["jsonrpc"] = "2.0"
        };

        if (body != null)
            json["params"] = JsonNode.Parse(JsonSerializer.Serialize(body));

        return new StringContent(json.ToJsonString(), Encoding.UTF8, "application/json");
    }

    private static HttpContent GetRestRequestContent(
        object? body = null
    )
    {
        return new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
    }
}
