import "./styles/style.scss";
import { getHomeTemplate } from "./templates/home-template";
import { getSettingsTemplate } from "./templates/settings-template";
import { getGameTemplate } from "./templates/game-template";
import { createCards } from "./game";
import { getCardTemplate } from "./templates/game-template";
import type { BoardSize, Card, GameSettings, PlayerColor, ThemeName } from "./types";

const APP = document.getElementById("app") as HTMLElement;
const SETTINGS: GameSettings = { theme: "code-vibes", player: null, size: null };
const FLIP_BACK_DELAY = 1000;

let cards: Card[] = [];
let flippedCards: Card[] = [];
let isLocked = false;

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
    if (SETTINGS.size === null) return;
    APP.innerHTML = getGameTemplate();
    cards = createCards(SETTINGS.size);
    flippedCards = [];
    isLocked = false;
    renderBoard(SETTINGS.size);
    addGameListeners();
}

/** Renders all cards into the game board. */
function renderBoard(size: BoardSize): void {
    const board = document.getElementById("game-board") as HTMLElement;
    board.classList.add(`game__board--${size}`);
    board.innerHTML = cards.map((card) => getCardTemplate(card, SETTINGS.theme)).join("");
}

/** Adds the click listener to the game board. */
function addGameListeners(): void {
    const board = document.getElementById("game-board") as HTMLElement;
    board.addEventListener("click", handleCardClick);
}

/** Handles a click on the game board. */
function handleCardClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const cardElement = target.closest(".game__card") as HTMLElement | null;
    if (cardElement === null || isLocked) return;
    const card = cards.find((c) => c.id === Number(cardElement.dataset.id));
    if (card === undefined || card.state !== "hidden") return;
    flipCard(card);
    if (flippedCards.length === 2) checkMatch();
}

/** Turns a card face up and remembers it. */
function flipCard(card: Card): void {
    card.state = "flipped";
    flippedCards.push(card);
    getCardElement(card).classList.add("game__card--flipped");
}

/** Returns the DOM element that belongs to a card. */
function getCardElement(card: Card): HTMLElement {
    return document.querySelector(`[data-id="${card.id}"]`) as HTMLElement;
}

/** Compares the two flipped cards. */
function checkMatch(): void {
    const [first, second] = flippedCards;
    if (first.motif === second.motif) handleMatch();
    else handleMismatch();
}

/** Marks both flipped cards as matched. */
function handleMatch(): void {
    flippedCards.forEach((card) => (card.state = "matched"));
    flippedCards = [];
}

/** Locks the board and turns the cards back after a delay. */
function handleMismatch(): void {
    isLocked = true;
    setTimeout(hideFlippedCards, FLIP_BACK_DELAY);
}

/** Turns the flipped cards face down and unlocks the board. */
function hideFlippedCards(): void {
    flippedCards.forEach((card) => {
        card.state = "hidden";
        getCardElement(card).classList.remove("game__card--flipped");
    });
    flippedCards = [];
    isLocked = false;
}

renderHome();