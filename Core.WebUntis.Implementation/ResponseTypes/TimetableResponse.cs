using System.Text.Json.Serialization;
using Core.WebUntis.Interface.Types;

namespace Core.WebUntis.Implementation.ResponseTypes;

public class TimetableResponse
{
    [JsonPropertyName("id")] public int Id { get; set; }
    [JsonPropertyName("date")] public int Date { get; set; }
    [JsonPropertyName("startTime")] public int Start { get; set; }
    [JsonPropertyName("endTime")] public int End { get; set; }
    [JsonPropertyName("code")] public string? Code { get; set; }
    [JsonPropertyName("kl")] public List<ClassId>? ClassIds { get; set; }
    [JsonPropertyName("te")] public List<TeacherId>? TeacherIds { get; set; }
    [JsonPropertyName("su")] public List<SubjectId>? SubjectIds { get; set; }
    [JsonPropertyName("ro")] public List<RoomId>? RoomIds { get; set; }
    [JsonPropertyName("activityType")] public string? LessonType { get; set; }
    //[JsonPropertyName("date")] public int Date { get; internal set; }
    [JsonPropertyName("substText")] public string? SubstitutionText { get; set; }



    public Timetable Convert()
    {
        return new Timetable
        {
            Id = Id,
            Code = Code,
            Start = UntisDateTimeMethods.ConvertUntisTimeToTime(Start),
            End = UntisDateTimeMethods.ConvertUntisTimeToTime(End),
            ClassIds = ClassIds.Select(x => x.Id).ToList(),
            LessonType = LessonType,
            RoomIds = RoomIds.Select(x => x.Id).ToList(),
            SubjectIds = SubjectIds.Select(x => x.Id).ToList(),
            TeacherIds = TeacherIds.Select(x => x.Id).ToList(),
            SubstitutionText = SubstitutionText
        };
    }
}

public class RoomId
{
    [JsonPropertyName("id")] public int Id { get; set; }
}

public class SubjectId
{
    [JsonPropertyName("id")] public int Id { get; set; }
}

public class TeacherId
{
    [JsonPropertyName("id")] public int Id { get; set; }
}

public class ClassId
{
    [JsonPropertyName("id")] public int Id { get; set; }
}
