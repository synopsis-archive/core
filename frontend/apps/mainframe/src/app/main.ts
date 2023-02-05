import { checkLoginState, executeLogin, sendErrorMessageToLogin, waitForCredentialsFromLogin } from "./login";
import { addMessageListenerToFrame, clearFrameContainer, createPluginFrame } from "../utils/frame";
import { loadMainframeConfig } from "./config";
import { sendMessageToFrame } from "../utils/message";
import { fetch2 } from "../utils/fetch";

// TODO: implement loading spinner

export async function main() {
    const config = await loadMainframeConfig();
    let isAuthed = await checkLoginState(config.secureBackendUrl);
    if (!isAuthed) {
        createPluginFrame(config.login.url, "login-container");

        addMessageListenerToFrame("login-container", async (data: { method: string; }) => {
            if (data.method === "getPublicKey") {
                const publicKey = await (await fetch(config.secureBackendUrl + "/Auth/GetPublicKey", {
                    credentials: "include"
                })).arrayBuffer();
                sendMessageToFrame("login-container", "getPublicKey", publicKey, [publicKey]);
            }
        });

        do {
            const credentials = await waitForCredentialsFromLogin();
            try {
                await executeLogin(config.secureBackendUrl, credentials.username, credentials.password);
                isAuthed = true;
            } catch (e: any) {
                console.error("Failed to login", e);
                if (e !== null && typeof e === "object" && typeof e.message === "string")
                    sendErrorMessageToLogin(e.message);
                else
                    sendErrorMessageToLogin("Es ist ein unbekannter Fehler aufgetreten!");
            }
        } while (!isAuthed);
        clearFrameContainer("login-container");
    }

    createPluginFrame(config.navigation.url, "nav-container");

    const plugins = Object.entries(config.plugins).map(([name, plugin]) => {
        return {
            id: name,
            name: plugin.info.name,
            description: plugin.info.description,
            teachers: plugin.info.teachers,
            tags: plugin.info.tags,
            startDate: plugin.info.startDate,
            endDate: plugin.info.endDate,
            image: plugin.info.image,
            isFavourite: plugin.info.isFavourite
        };
    });

    addMessageListenerToFrame("nav-container",
        async (navData: { method: any; plugin: string | number; x: string; y: string; width: string; height: string; }) => {
            if (typeof navData.method !== "string") {
                console.warn("Ignoring invalid message", navData);
                return;
            }

            switch (navData.method) {
                case "getIDToken":
                    sendMessageToFrame("nav-container", "getIDToken", await fetch2(config.secureBackendUrl, "/Auth/GetIDToken", "GET"));
                    break;
                case "getPluginList":
                    sendMessageToFrame("nav-container", "getPluginList", plugins);
                    break;
                case "loadPlugin":
                    if (typeof navData.plugin !== "string") {
                        console.warn("Ignoring invalid loadPlugin message", navData);
                        return;
                    }
                    let plugin = config.plugins[navData.plugin];
                    if (plugin === undefined) {
                        console.error("Could not find plugin", navData.plugin);
                        return;
                    }
                    clearFrameContainer("plugin-container");
                    createPluginFrame(plugin.url, "plugin-container");
                    break;
                case "container":
                    if (typeof navData.x !== "number" ||
                        typeof navData.y !== "number" ||
                        typeof navData.width !== "number" ||
                        typeof navData.height !== "number") {
                        console.warn("Ignoring invalid container message", navData);
                        return;
                    }
                    console.debug("Setting container size", navData);
                    document.getElementById("plugin-container")!.style.left = navData.x + "px";
                    document.getElementById("plugin-container")!.style.top = navData.y + "px";
                    document.getElementById("plugin-container")!.style.width = navData.width + "px";
                    document.getElementById("plugin-container")!.style.height = navData.height + "px";
                    break;
                default:
                    console.warn("Ignoring unknown message method", navData.method);
            }
        });
}

main();
