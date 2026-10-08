import "./styles/style.scss";
import { getHomeTemplate } from "./templates/home-template";
import { getSettingsTemplate } from "./templates/settings-template";
import type { BoardSize, GameSettings, PlayerColor, ThemeName } from "./types";

const APP = document.getElementById("app") as HTMLElement;
const SETTINGS: GameSettings = { theme: "code-vibes", player: null, size: null };

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
    form.addEventListener("change", handleSettingsChange);
}

/** Saves the selected option and updates the summary bar. */
function handleSettingsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    saveSelection(input);
    updateSummary(input);
}

/** Stores the selected option in the settings object. */
function saveSelection(input: HTMLInputElement): void {
    if (input.name === "theme") SETTINGS.theme = input.value as ThemeName;
    if (input.name === "player") SETTINGS.player = input.value as PlayerColor;
    if (input.name === "size") SETTINGS.size = input.value as BoardSize;
}

/** Shows the selected option in the summary bar. */
function updateSummary(input: HTMLInputElement): void {
    const label = input.parentElement as HTMLLabelElement;
    const summaryItem = document.getElementById(`summary-${input.name}`) as HTMLElement;
    summaryItem.innerText = label.innerText.trim();
}

renderHome();