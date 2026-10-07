import "./styles/style.scss";
import { getHomeTemplate } from "./templates/home-template";
import { getSettingsTemplate } from "./templates/settings-template";

const APP = document.getElementById("app") as HTMLElement;

/** Renders the home screen into the app container. */
function renderHome(): void {
    APP.innerHTML = getHomeTemplate();
    addHomeListeners();
}

/** Adds the click listener to the play button. */
function addHomeListeners(): void {
    const playButton = document.getElementById('home-button') as HTMLButtonElement;
    playButton.addEventListener("click", renderSettings);
}

/** Renders the settings screen into the app container. */
function renderSettings(): void {
    APP.innerHTML = getSettingsTemplate();
}

renderHome();