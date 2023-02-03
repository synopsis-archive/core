export function sendMessageToFrame(container : string, method : string, message : any, transferableObjects = []) {
    const frame = document.getElementById(container)?.firstChild as HTMLIFrameElement;
    frame.contentWindow?.postMessage({ method: method, data: message }, "*", transferableObjects);
}
