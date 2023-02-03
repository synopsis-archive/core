export async function loadMainframeConfig() {
    const response = await fetch("mainframe-config.json");
    const config = await response.json();
    console.log("Loaded mainframe config", config);
    return config;
}
