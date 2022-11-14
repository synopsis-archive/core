namespace Core.Backend.Secure.Auth;

public class AuthToken
{
    /*
     * Auth-Token:
     *
     * username: ldap-username
     * uid: db-uuid
     *
     */

    public string Username { get; set; }
    public Guid UUID { get; set; }

    public bool IsAuthToken = true;
}
