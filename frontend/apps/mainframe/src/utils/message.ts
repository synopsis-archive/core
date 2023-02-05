export function sendMessageToFrame(container: string, method: string, message: any, transferableObjects: Transferable[] = []) {
    const frame = document.getElementById(container)?.firstChild as HTMLIFrameElement;
    frame.contentWindow?.postMessage({ method: method, data: message }, "*", transferableObjects);
}

export function waitForMessageFromFrame(containerId: string, filter: any): Promise<any> {
    return new Promise(resolve => {
        const frame = document.getElementById(containerId)?.firstChild as HTMLIFrameElement;

        let listener = (event: MessageEvent) => {
            if (event.source !== frame.contentWindow) {
                console.debug("Ignoring message from unknown source", event);
                return;
            }

            if (filter(event.data)) {
                window.removeEventListener("message", listener);
                resolve(event.data);
            }
        };
        window.addEventListener("message", listener);
    });
}
