namespace Core.WebUntis.Implementation.ResponseTypes;

public class Event
{
    public int StudentId { get; set; }
    public string? LastName { get; set; }
    public string? FirstName { get; set; }
    public DateTime Date { get; set; }
    public string? Subject { get; set; }
    public string? Reason { get; set; }
    public string? Text { get; set; }
}
