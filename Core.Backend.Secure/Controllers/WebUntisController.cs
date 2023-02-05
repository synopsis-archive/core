using Core.Backend.Secure.Services;
using Core.WebUntis.Interface.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Backend.Secure.Controllers;

[Authorize(Policy = "Auth-Token")]
[ApiController]
[Route("[controller]")]
public class WebUntisController : ControllerBase
{
    private WebUntisService _webUntisService;

    public WebUntisController(WebUntisService webUntisService)
    {
        _webUntisService = webUntisService;
    }

    [HttpGet("Teachers")]
    public IEnumerable<TeacherDTO> GetTeachers()
    {
        return _webUntisService.GetTeachers();
    }

    [HttpGet("Students")]
    public async Task<IEnumerable<Student>> GetStudents()
    {
        return await _webUntisService.GetStudents(User);
    }

    [HttpGet("Classes")]
    public async Task<IEnumerable<Class>> GetClasses()
    {
        return await _webUntisService.GetClasses(User);
    }

    [HttpGet("Homeworks")]
    public async Task<IEnumerable<Homework>> GetHomeworks(DateTime startDate, DateTime endDate)
    {
        var homeworks = await _webUntisService.GetHomeworks(User, startDate, endDate);
        return homeworks;
    }

    [HttpGet("Holidays")]
    public async Task<IEnumerable<Holiday>> GetHolidays()
    {
        var holidays = await _webUntisService.GetHolidays(User);
        return holidays;
    }

    [HttpGet("Subjects")]
    public async Task<IEnumerable<Subject>> GetSubjects()
    {
        return await _webUntisService.GetSubject(User);
    }

    [HttpGet("Rooms")]
    public async Task<IEnumerable<Room>> GetRooms()
    {
        return await _webUntisService.GetRooms(User);
    }

    [HttpGet("TeacherTimetable")]
    public async Task<IEnumerable<Timetable>> GetTimetableFromTeacher(int teacherId, DateTime startDate,
        DateTime endDate)
    {
        return await _webUntisService.GetTimetableFromTeacher(User, teacherId, startDate, endDate);
    }

    [HttpGet("StudentTimetable")]
    public async Task<IEnumerable<Timetable>> GetTimetableFromStudent(DateTime startDate, DateTime endDate)
    {
        return await _webUntisService.GetTimetableFromStudent(User, startDate, endDate);
    }

    [HttpGet("ClassTimetable")]
    public async Task<IEnumerable<Timetable>> GetTimetableFromClass(int classId, DateTime startDate, DateTime endDate)
    {
        return await _webUntisService.GetTimetableFromClass(User, classId, startDate, endDate);
    }

    [HttpGet("StudentSubstitutionTimetable")]
    public async Task<IEnumerable<Timetable>> GetSubstitutionsFromStudent(DateTime startDate, DateTime endDate)
    {
        return await _webUntisService.GetSubstitutionsFromStudent(User, startDate, endDate);
    }

    [HttpGet("TeacherSubstitutionTimetable")]
    public async Task<IEnumerable<Timetable>> GetSubstitutionsFromTeacher(int teacherId, DateTime startDate,
        DateTime endDate)
    {
        return await _webUntisService.GetSubstitutionsFromTeacher(User, teacherId, startDate, endDate);
    }
}
