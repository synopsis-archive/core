export function clearFrameContainer(targetDivId: string) {
    const targetDiv = document.getElementById(targetDivId);
    while (targetDiv?.firstChild) {
        targetDiv.removeChild(targetDiv.firstChild);
    }
}

export function createPluginFrame(url: string, targetDivId: string) {
    const newFrame = document.createElement("iframe");
    newFrame.src = url;
    document.getElementById(targetDivId)?.appendChild(newFrame);
}

export function addMessageListenerToFrame(containerId: string, callback: any) {
    const frame = document.getElementById(containerId)?.firstChild as HTMLIFrameElement;
    window.addEventListener("message", function(event) {
        if (event.source !== frame.contentWindow) return;
        const result = callback(event.data);
        if (result.then !== undefined) {
            result.catch((e: any) => console.error("Error while handling message", e));
        }
    });
}
