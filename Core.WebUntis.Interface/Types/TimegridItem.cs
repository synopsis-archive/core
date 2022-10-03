namespace Core.WebUntis.Interface.Types;

public class TimegridItem
{
    public DayOfWeek Day { get; set; }
    public List<TimegridUnit>? TimeUnits { get; set; }
}
