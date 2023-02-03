export function createPluginFrame(url : string, targetDivId : string) {
    const newFrame = document.createElement("iframe");
    newFrame.src = url;
    document.getElementById(targetDivId)?.appendChild(newFrame);
}
