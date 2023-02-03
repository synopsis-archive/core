export async function waitForCredentialsFromLogin() {
  // @ts-ignore
  return (await waitForMessageFromFrame("login-container", (data) => {
        if (data.method === "login") {
            if (typeof data.data === "object" &&
                typeof data.data.username === "string" &&
                typeof data.data.password === "string") {
                return true;
            } else {
                console.error("Invalid login data", data);
                return false;
            }
        }
        // @ts-ignore
    }))?.data;
}

export function waitForMessageFromFrame(containerId : string, filter : any) {
    return new Promise(resolve => {
        const frame = document.getElementById(containerId)?.firstChild as HTMLIFrameElement;
        window.addEventListener("message", function(event) {
            if (event.source !== frame.contentWindow) {
                console.debug("Ignoring message from unknown source", event);
                return;
            }

            if (filter(event.data)) {
                // @ts-ignore
              window.removeEventListener("message", this);
                resolve(event.data);
            }
        });
    });
}
