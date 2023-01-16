using System.Globalization;

namespace Core.WebUntis.Implementation;

public class UntisDateTimeMethods
{
    public static DateTime ConvertUntisDateToDate(int date)
    {
        return DateTime.ParseExact(date.ToString(), "yyyyMMdd", CultureInfo.InvariantCulture);
    }

    public static int ConvertDateToUntisDate(DateTime date)
    {
        return int.Parse(date.ToString("yyyyMMdd", CultureInfo.InvariantCulture));
    }

    public static DateTime ConvertUntisTimeToTime(int time)
    {
        return DateTime.ParseExact(time.ToString("D4"), "HHmm", CultureInfo.InvariantCulture);
    }

    public static int ConvertTimeToUntisTime(DateTime time)
    {
        return int.Parse(time.ToString("HHmm", CultureInfo.InvariantCulture));
    }
}
