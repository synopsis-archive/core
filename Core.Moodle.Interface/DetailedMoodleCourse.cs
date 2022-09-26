namespace Core.Moodle.Interface;

public class DetailedMoodleCourse : MoodleCourse
{
    public List<string>? Contacts { get; set; }
    public string? Description { get; set; }
    public string? CategoryName { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
