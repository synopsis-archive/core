import {loadMainframeConfig} from "./loadMainframeConfig";
import {checkLoginState} from "./checkLoginState";
import {createPluginFrame} from "./createPluginFrame";
import {waitForCredentialsFromLogin} from "./waitForCredentialsFromLogin";
import {executeLogin} from "./executeLogin";
import {clearFrameContainer} from "./clearFrameContainer";
import {sendErrorMessageToLogin} from "./sendErrorMessageToLogin";
import {addMessageListenerToFrame} from "./addMessageListenerToFrame";
import {sendMessageToFrame} from "./sendMessageToFrame";
import {fetch2} from "./fetch2";



main();
export async function main() {
    // TODO: implement loading spinner

    const config = await loadMainframeConfig();
    let isAuthed = await checkLoginState(config.secureBackendUrl);
    if (!isAuthed) {
        createPluginFrame(config.login.url, "login-container");

        addMessageListenerToFrame("login-container", async (data: { method: string; }) => {
            if (data.method === "getPublicKey") {
                const publicKey = await (await fetch(config.secureBackendUrl + "/Auth/GetPublicKey", {
                    credentials: "include"
                })).arrayBuffer();
                // @ts-ignore
              sendMessageToFrame("login-container", "getPublicKey", publicKey, [publicKey]);
            }
        });

        do {
            const credentials = await waitForCredentialsFromLogin();
            try {
                await executeLogin(config.secureBackendUrl, credentials.username, credentials.password);
                isAuthed = true;
            } catch (e) {
                console.error("Failed to login", e);
                // @ts-ignore
              sendErrorMessageToLogin(e.message);
            }
        } while (!isAuthed);
        clearFrameContainer("login-container");
    }

    createPluginFrame(config.navigation.url, "nav-container");


    const plugins = Object.entries(config.plugins as Record<string, Plugin>).map(([name, plugin]) => {
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
            // @ts-ignore
            document.getElementById("plugin-container").style.left = navData.x + "px";
            // @ts-ignore
            document.getElementById("plugin-container").style.top = navData.y + "px";
            // @ts-ignore
            document.getElementById("plugin-container").style.width = navData.width + "px";
            // @ts-ignore
            document.getElementById("plugin-container").style.height = navData.height + "px";
            break;
          default:
            console.warn("Ignoring unknown message method", navData.method);
        }
      });
}

interface Plugin {
  info: {
    name: string,
    description: string,
    teachers: string[],
    tags: string[],
    startDate: string,
    endDate: string,
    image: string,
    isFavourite: boolean
  },
}
