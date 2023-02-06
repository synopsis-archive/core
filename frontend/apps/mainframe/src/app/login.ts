import { waitForMessageFromFrame } from "../utils/message";
import { isAnyIncomingMessage } from "../types/handler.guards";
import { IncomingMessage, MessageMap } from "../types/handler";

export function sendErrorMessageToLogin(message: string) {
    const frame = document.getElementById("login-container")?.firstChild as HTMLIFrameElement;
    frame.contentWindow?.postMessage({ method: "error", data: { message } }, "*");
}

export async function waitForCredentialsFromLogin(): Promise<MessageMap["login"]> {
    const message = await waitForMessageFromFrame("login-container", (data: unknown) => {
        if (!isAnyIncomingMessage(data)) {
            console.error("Invalid message", data);
            return false;
        }

        return data.method === "login";
    });

    return (message as IncomingMessage<"login">).data;
}

export async function executeLogin(secureBackendUrl: string, username: string, password: string) {
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

export async function checkLoginState(secureBackendUrl: string) {
    try {
        const response = await fetch(secureBackendUrl + "/Auth/IsAuthed", { credentials: "include" });
        if (response.status === 401)
            return false;
        const isAuthed = await response.json();
        return isAuthed === true;
    } catch (e) {
        console.error("Failed to check login state", e);
        return false;
    }
}
