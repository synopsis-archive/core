using Core.WebUntis.Interface.Types;

namespace Core.WebUntis.Interface;

public interface IWebUntisClient
{
    public Task<Authentication> Authenticate(string user, string password);
    public Task<IEnumerable<Class>> GetClasses();
    public Task<IEnumerable<Subject>> GetSubjects();
    public Task<IEnumerable<Room>> GetRooms();
    public Task<IEnumerable<Homework>> GetHomeworks(DateTime startDate, DateTime endDate);
    public Task<IEnumerable<Holiday>> GetHolidays();
    public Task<IEnumerable<Timetable>> GetTimetable(ElementType type, int? personId, DateTime startDate,
        DateTime endDate);
    [Obsolete("Deprecated due to unknown documentation")]
    public Task<IEnumerable<ExamType>> GetExamTypes();
    [Obsolete("Deprecated due to insufficient rights")]
    public Task<IEnumerable<Exam>> GetExams(int examTypeId, DateTime startDate, DateTime endDate);
}
