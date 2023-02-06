import { IncomingMessageHandler } from "../types/handler";
import { sendMessageToFrame } from "../utils/message";
import {fetch2} from "../utils/fetch";

export const sendRequest: IncomingMessageHandler<"sendRequest"> = (_message, context) => {
    fetch2(context.config.secureBackendUrl, _message.data.path, _message.method, _message.data.payload)
        .then(response => response.arrayBuffer())
        .then(response => sendMessageToFrame("plugin-container", "sendRequest", response, [response]));
};
