import "./styles/style.scss";
import { getHomeTemplate } from "./templates/home-template";
import { getSettingsTemplate } from "./templates/settings-template";
import { getGameTemplate } from "./templates/game-template";
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

/** Adds the listeners to the settings form and the start button. */
function addSettingsListeners(): void {
    const form = document.querySelector(".settings__form") as HTMLFormElement;
    const startButton = document.getElementById("start-button") as HTMLButtonElement;
    form.addEventListener("change", handleSettingsChange);
    startButton.addEventListener("click", renderGame);
}

/** Saves the selected option and updates summary, preview and start button. */
function handleSettingsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    saveSelection(input);
    updateSummary(input);
    updatePreview();
    updateStartButton();
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

/** Shows the preview image of the selected theme. */
function updatePreview(): void {
    const image = document.getElementById("theme-preview") as HTMLImageElement;
    image.src = `/img/preview-${SETTINGS.theme}.svg`;
    image.alt = `Preview of the ${SETTINGS.theme} theme`;
}

/** Enables the start button once player and size are selected. */
function updateStartButton(): void {
    const startButton = document.getElementById("start-button") as HTMLButtonElement;
    startButton.disabled = SETTINGS.player === null || SETTINGS.size === null;
}

/** Renders the game screen into the app container. */
function renderGame(): void {
    APP.innerHTML = getGameTemplate();
}

renderHome();