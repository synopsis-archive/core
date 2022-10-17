namespace Core.WebUntis.Implementation.ResponseTypes;

public class TimegridItem
{
    public DayOfWeek Day { get; set; }
    public List<TimegridUnit>? TimeUnits { get; set; }
}
