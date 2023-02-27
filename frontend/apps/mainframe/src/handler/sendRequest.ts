import { IncomingMessageHandler } from "../types/handler";
import { sendMessageToFrame } from "../utils/message";
import {fetch2} from "../utils/fetch";

export const sendRequest: IncomingMessageHandler<"sendRequest"> = (message, context) => {
    fetch2(context.config.secureBackendUrl, message.data.path, message.data.method, message.data.payload ?? undefined)
        .then(response => response.json())
        .then(response => sendMessageToFrame("plugin-container", "sendRequest", response, [response]));
};
