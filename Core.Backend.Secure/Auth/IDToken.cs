namespace Core.Backend.Secure.Auth;

public class IDToken : AuthToken
{

    /*
     * ID-Token:
     *
     * username: ldap-username
     * uid: db-uuid
     * rolle: <schüler, lehrer, staff>
     * klasse
     * mnr: matrikelnr
     * connectedPlatforms: Json-Arr --plattformen mit hinterlegten credentials
     *
     */

    public string Role { get; set; }
    public string Class { get; set; }
    public string MNR { get; set; }
    public List<string> ConnectedPlatforms { get; set; }
}
