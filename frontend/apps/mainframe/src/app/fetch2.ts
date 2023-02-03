export async function fetch2(secureBackendUrl : string, requestPath : string, method : string, body = undefined) {
    const response = await fetch(secureBackendUrl + requestPath, {
        method: method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: body === undefined ? undefined : JSON.stringify(body)
    });

    if (response.status === 200)
        return await response.json();

    const error = await response.json();

    if (typeof error === "string")
        throw new Error(error);

    throw new Error("Es ist ein unbekannter Fehler aufgetreten!");
}
