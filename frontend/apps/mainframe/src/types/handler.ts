import { MainframeConfig } from "./config";

export type MessageMap = {
    "getIDToken": undefined;
    "getPluginList": undefined;
    "loadPlugin": { id: string };
    "container": { x: number; y: number; width: number; height: number };
    "getPublicKey": undefined;
    "login": { username: string; password: string };
};

export interface IncomingMessage<Method extends keyof MessageMap> {
    method: Method;
    data: MessageMap[Method];
}

type SenderProperty = { sender: "navigation" | "auth" } | { sender: "plugin", pluginId: string };

export type MainframeContext = {
    config: MainframeConfig;
} & SenderProperty;

export type IncomingMessageHandler<Method extends keyof MessageMap> = (message: IncomingMessage<Method>, context: MainframeContext) => void;

export interface HandlerDefinition<Method extends keyof MessageMap> {
    handler: IncomingMessageHandler<Method>;
    isAllowed: (context: MainframeContext, message: IncomingMessage<Method>) => boolean;
}

export type HandlerMap = {
    [Method in keyof MessageMap]: HandlerDefinition<Method>;
}
