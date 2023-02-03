export function sendErrorMessageToLogin(message : any) {
    const frame = document.getElementById("login-container")?.firstChild as HTMLIFrameElement;
    frame.contentWindow?.postMessage({ method: "error", data: { message } }, "*");
}
