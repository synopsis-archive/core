import { IncomingMessageHandler } from "../types/handler";
import { sendMessageToFrame } from "../utils/message";

export const getPublicKeyHandler: IncomingMessageHandler<"getPublicKey"> = (_message, context) => {
    fetch(context.config.secureBackendUrl + "/Auth/GetPublicKey", { credentials: "include" })
        .then(response => response.arrayBuffer())
        .then(publicKey => sendMessageToFrame("login-container", "getPublicKey", publicKey, [publicKey]));
};
