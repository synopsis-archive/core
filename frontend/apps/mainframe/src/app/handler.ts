import { HandlerMap, IncomingMessage, MainframeContext, MessageMap } from "../types/handler";
import { getIDTokenHandler } from "../handler/getIDToken";
import { getPluginListHandler } from "../handler/getPluginList";
import { loadPluginHandler } from "../handler/loadPlugin";
import { containerHandler } from "../handler/container";
import { getPublicKeyHandler } from "../handler/getPublicKey";
import { sendRequest } from "../handler/sendRequest";
import { isAnyIncomingMessage } from "../types/handler.guards";
import {logout} from "../handler/logout";

const handler: HandlerMap = {
    "getIDToken": {
        handler: getIDTokenHandler,
        isAllowed: context => context.sender === "navigation" || context.sender === "plugin"
    },
    "getPluginList": {
        handler: getPluginListHandler,
        isAllowed: context => context.sender === "navigation"
    },
    "loadPlugin": {
        handler: loadPluginHandler,
        isAllowed: context => context.sender === "navigation"
    },
    "container": {
        handler: containerHandler,
        isAllowed: context => context.sender === "navigation"
    },
    "getPublicKey": {
        handler: getPublicKeyHandler,
        isAllowed: context => context.sender === "auth"
    },
    "sendRequest": {
        handler: sendRequest,
        // @todo: fix security issue
        isAllowed: (context, message) => context.sender === "plugin" && message.data != null
    },
    "logout": {
        handler: logout,
        isAllowed: context => context.sender === "navigation" || context.sender === "plugin"
    },
};

export const handleIncomingMessage = <Method extends keyof MessageMap>(message: IncomingMessage<Method>, context: MainframeContext) => {
    const handlerDefinition = handler[message.method];

    if (handlerDefinition.isAllowed(context, message)) {
        console.debug("Handling message", message);
        handlerDefinition.handler(message, context);
    } else {
        console.error("Message not allowed!", message);
    }
};

export const createIncomingMessageHandler = (context: MainframeContext) => (message: unknown) => {
    if (!isAnyIncomingMessage(message)) {
        console.warn("Ignoring invalid message", message);
        return;
    }

    handleIncomingMessage(message, context);
};
