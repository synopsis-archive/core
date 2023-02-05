import { IncomingMessage, MessageMap } from "./handler";

export function isAnyIncomingMessage(data: unknown): data is IncomingMessage<keyof MessageMap> {
    if (typeof data !== "object" || data === null)
        return false;

    if (!("method" in data) || typeof data.method !== "string")
        return false;
    if (!("data" in data))
        return false;

    switch (data.method) {
        case "getIDToken":
            return data.data === undefined;
        case "getPluginList":
            return data.data === undefined;
        case "loadPlugin":
            return typeof data.data === "object"
                && data.data !== null
                && "id" in data.data
                && typeof data.data.id === "string";
        case "container":
            return typeof data.data === "object"
                && data.data !== null
                && "x" in data.data
                && typeof data.data.x === "number"
                && "y" in data.data
                && typeof data.data.y === "number"
                && "width" in data.data
                && typeof data.data.width === "number"
                && "height" in data.data
                && typeof data.data.height === "number";
        case "getPublicKey":
            return data.data === undefined;
    }
    return false;
}
