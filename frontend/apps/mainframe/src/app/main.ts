import { checkLoginState, executeLogin, sendErrorMessageToLogin, waitForCredentialsFromLogin } from "./login";
import { clearFrameContainer, createPluginFrame } from "../utils/frame";
import { loadMainframeConfig } from "./config";
import { addMessageListenerToFrame } from "../utils/message";
import { createIncomingMessageHandler } from "./handler";


main().catch(e => console.error(e));

// TODO: implement loading spinner
export async function main() {
    const config = await loadMainframeConfig();
    let isAuthed = await checkLoginState(config.secureBackendUrl);

    if (!isAuthed) {
        createPluginFrame(config.login.url, "login-container");

        addMessageListenerToFrame("login-container", createIncomingMessageHandler({
            config,
            sender: "auth"
        }));

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

    addMessageListenerToFrame("nav-container", createIncomingMessageHandler({
        config,
        sender: "navigation"
    }));
}
