export function clearFrameContainer(targetDivId : string) {
    const targetDiv = document.getElementById(targetDivId);
    while (targetDiv?.firstChild) {
        targetDiv.removeChild(targetDiv.firstChild);
    }
}
