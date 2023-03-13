import { IncomingMessageHandler } from "../types/handler";
import { sendMessageToFrame } from "../utils/message";
import { fetch2 } from "../utils/fetch";

export const sendRequest: IncomingMessageHandler<"sendRequest"> = (message, context) => {
    fetch2(context.config.secureBackendUrl, message.data.path, message.data.method, message.data.payload ?? undefined)
        .then(response => response.text())
        .then(response => sendMessageToFrame("plugin-container", "sendRequest", {
            response,
            error: false,
            requestId: message.data.requestId
        }))
        .catch(error => sendMessageToFrame("plugin-container", "sendRequest", {
            response: error,
            error: true,
            requestId: message.data.requestId
        }));
};
