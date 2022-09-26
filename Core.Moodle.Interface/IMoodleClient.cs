namespace Core.Moodle.Interface;

public interface IMoodleClient
{
    /*
     * Get Course of student
     */
    IEnumerable<MoodleCourse> GetCourses(string token);

    /*
     * Get detailed course information
     */
    DetailedMoodleCourse? GetDetailedCourse(string courseId, string token);

    /*
     * Get Calendar Events/Assignments of student
     */
    IEnumerable<MoodleAssignment> GetAssignments(string token);
}
