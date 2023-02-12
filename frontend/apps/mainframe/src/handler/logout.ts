import { IncomingMessageHandler } from "../types/handler";
import { fetch2 } from "../utils/fetch";
import { sendMessageToFrame } from "../utils/message";

export const logout: IncomingMessageHandler<"logout"> = (_message, context) =>
    fetch2(context.config.secureBackendUrl, "/Auth/Logout", "POST")
        .then(res => sendMessageToFrame(context.sender === "navigation" ? "nav-container" : "plugin-container", "logout", res));
