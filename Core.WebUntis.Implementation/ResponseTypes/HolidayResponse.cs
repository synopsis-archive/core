using System.Text.Json.Serialization;

namespace Core.WebUntis.Implementation.ResponseTypes;

public class HolidayResponse
{
    [JsonPropertyName("id")] public int Id { get; set; }
    [JsonPropertyName("name")] public string Name { get; set; }
    [JsonPropertyName("longName")] public string LongName { get; set; }

    private int startDateUntis;
    [JsonPropertyName("startDate")]
    public int StartDateUntis
    {
        get
        {
            return this.startDateUntis;
        }
        set
        {
            this.startDateUntis = value;
            StartDate = UntisDateTimeMethods.ConvertUntisDateToDate(value);
        }
    }

    private int endDateUntis;

    [JsonPropertyName("endDate")]
    public int EndDateUntis
    {
        get
        {
            return this.endDateUntis;
        }
        set
        {
            this.endDateUntis = value;
            EndDate = UntisDateTimeMethods.ConvertUntisDateToDate(value);
        }
    }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }


    public Holiday Convert()
    {
        return new Holiday
        {
            Id = Id,
            Name = Name,
            EndDate = EndDate,
            LongName = LongName,
            StartDate = StartDate
        };
    }
}
