export function addMessageListenerToFrame(containerId : string, callback : any) {
    const frame = document.getElementById(containerId)?.firstChild as HTMLIFrameElement;
    window.addEventListener("message", function(event) {
        if (event.source !== frame.contentWindow) return;
        const result = callback(event.data);
        if (result.then !== undefined) {
            result.catch((e: any) => console.error("Error while handling message", e));
        }
    });
}
