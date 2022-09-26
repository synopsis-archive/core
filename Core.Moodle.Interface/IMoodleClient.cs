namespace Core.Moodle.Interface;

public interface IMoodleClient
{
    /*
     * Get Course of student
     */
    Task<MoodleCourse> GetCourses(string token);

    /*
     * Get Calendar Events/Assignments of student
     * core_calendar_get_calendar_events
     */
    Task<MoodleAssignment> GetAssignment(string token);

}
