export async function executeLogin(secureBackendUrl : string, username : string, password : string) {
    const response = await fetch(secureBackendUrl + "/Auth/Login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "username": username.trim(),
            "password": password.trim()
        })
    });

    if (response.status === 200)
        return true;

    const error = await response.json();

    if (typeof error === "string")
        throw new Error(error);

    throw new Error("Es ist ein unbekannter Fehler aufgetreten!");
}
