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
    addSettingsListeners();
}

/** Adds the change listener to the settings form. */
function addSettingsListeners(): void {
    const form = document.querySelector(".settings__form") as HTMLFormElement;
    form.addEventListener("change", updateSummary);
}

/** Shows the selected option in the summary bar. */
function updateSummary(event: Event): void {
    const input = event.target as HTMLInputElement;
    const label = input.parentElement as HTMLLabelElement;
    const summaryItem = document.getElementById(`summary-${input.name}`) as HTMLElement;
    summaryItem.innerText = label.innerText.trim();
}

renderHome();