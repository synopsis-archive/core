namespace Core.Ldap.Interface;

public class InvalidUserException : Exception
{
    public override string Message { get; } = null!;

    public InvalidUserException(string message) => Message = message;
}
