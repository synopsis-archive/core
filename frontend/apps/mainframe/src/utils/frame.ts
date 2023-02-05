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
