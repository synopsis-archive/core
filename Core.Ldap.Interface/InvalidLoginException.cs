namespace Core.Ldap.Interface;

public class InvalidLoginException : Exception
{
    public override string Message { get; } = null!;

    public InvalidLoginException(string message) => Message = message;
}
