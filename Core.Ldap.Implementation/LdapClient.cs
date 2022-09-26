using Core.Ldap.Interface;
using System.DirectoryServices.Protocols;
using System.Net;

namespace Core.Ldap.Implementation;

public class LdapClient : ILdapClient
{
    public SignInResult SignIn(SignInParams signInParams)
    {
        var credentials = new NetworkCredential(signInParams.Username, signInParams.Password, "HTL");
        var serverId = new LdapDirectoryIdentifier("10.10.0.11");
        var connection = new LdapConnection(serverId, credentials);

        try
        {
            connection.Bind();
        }
        catch (LdapException ex)
        {
            if (ex.Message == "The supplied credential is invalid.")
            {
                throw new InvalidLoginException("Hey Schüler/Lehrer! Deine Anmeldedaten sind falsch!");
            }
            throw;
        }
        return new SignInResult();
    }
}
