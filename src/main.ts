import "./styles/style.scss";
import { createCards } from "./game";
import { getHomeTemplate } from "./templates/home-template";
import { getSettingsTemplate } from "./templates/settings-template";
import { getCardTemplate, getGameTemplate } from "./templates/game-template";
import { getGameOverTemplate } from "./templates/game-over-template";
import { getResultTemplate } from "./templates/result-template";
import type { BoardSize, Card, GameResult, GameSettings, PlayerColor, ThemeName } from "./types";

const APP = document.getElementById("app") as HTMLElement;
const FLIP_BACK_DELAY = 1000;
const POINTS_PER_MATCH = 1;
const CARDS_PER_TURN = 2;
const GAME_OVER_DELAY = 1000;
const RESULT_DELAY = 3000;
const DEFAULT_THEME: ThemeName = "code-vibes";
const SETTINGS: GameSettings = { theme: null, player: null, size: null };

let cards: Card[] = [];
let flippedCards: Card[] = [];
let isLocked: boolean = false;
let currentPlayer: PlayerColor = "blue";
let scores: Record<PlayerColor, number> = { blue: 0, orange: 0 };
let pendingTimeout: number = 0;
let currentTheme: ThemeName = DEFAULT_THEME;

/**
 * Renders the home screen into the app container.
 */
function renderHome(): void {
    APP.innerHTML = getHomeTemplate();
    addHomeListeners();
}

/**
 * Adds the click listener to the play button.
 */
function addHomeListeners(): void {
    const playButton = document.getElementById("home-button") as HTMLButtonElement;
    playButton.addEventListener("click", renderSettings);
}

/**
 * Renders the settings screen into the app container.
 */
function renderSettings(): void {
    resetSettings();
    APP.innerHTML = getSettingsTemplate();
    addSettingsListeners();
}

/**
 * Resets the settings to their default values.
 */
function resetSettings(): void {
    SETTINGS.theme = null;
    SETTINGS.player = null;
    SETTINGS.size = null;
}

/**
 * Adds the listeners to the settings form and the start button.
 */
function addSettingsListeners(): void {
    const form = document.querySelector(".settings__form") as HTMLFormElement;
    const startButton = document.getElementById("start-button") as HTMLButtonElement;
    form.addEventListener("change", handleSettingsChange);
    form.addEventListener("mouseover", handlePreviewHover);
    form.addEventListener("mouseleave", updatePreview);
    startButton.addEventListener("click", renderGame);
}

/**
 * Saves the selected option and updates summary, preview and start button.
 * @param event - The change event fired when a radio option in the settings form is selected.
 */
function handleSettingsChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    saveSelection(input);
    updateSummary(input);
    updatePreview();
    updateStartButton();
}

/**
 * Stores the selected option in the settings object.
 * @param input - The selected radio input; its name decides the setting, its value the new value.
 */
function saveSelection(input: HTMLInputElement): void {
    if (input.name === "theme") SETTINGS.theme = input.value as ThemeName;
    if (input.name === "player") SETTINGS.player = input.value as PlayerColor;
    if (input.name === "size") SETTINGS.size = input.value as BoardSize;
}

/**
 * Shows the selected option in the summary bar.
 * @param input - The selected radio input; its label text is shown in the matching summary item.
 */
function updateSummary(input: HTMLInputElement): void {
    const label = input.parentElement as HTMLLabelElement;
    const summaryItem = document.getElementById(`summary-${input.name}`) as HTMLElement;
    summaryItem.innerText = label.innerText.trim();
}

/**
 * Shows the preview image of the given theme.
 * @param theme - The theme whose preview image is shown.
 */
function showPreview(theme: ThemeName): void {
    const image = document.getElementById("theme-preview") as HTMLImageElement;
    image.src = `img/preview-${theme}.svg`;
    image.alt = `Preview of the ${theme} theme`;
}

/**
 * Shows the preview image of the selected theme, or the default theme if none is selected.
 */
function updatePreview(): void {
    showPreview(SETTINGS.theme ?? DEFAULT_THEME);
}

/**
 * Shows the preview of the hovered theme option, or the selected theme otherwise.
 * @param event - The mouseover event from the settings form.
 */
function handlePreviewHover(event: MouseEvent): void {
    const option = (event.target as HTMLElement).closest(".settings__option");
    const input = option?.querySelector("input");
    if (input?.name === "theme") showPreview(input.value as ThemeName);
    else updatePreview();
}

/**
 * Enables the start button once theme, player and size are selected.
 */
function updateStartButton(): void {
    const startButton = document.getElementById("start-button") as HTMLButtonElement;
    startButton.disabled = SETTINGS.theme === null || SETTINGS.player === null || SETTINGS.size === null;
}

/**
 * Renders the game screen into the app container.
 */
function renderGame(): void {
    if (SETTINGS.theme === null || SETTINGS.size === null || SETTINGS.player === null) return;
    currentTheme = SETTINGS.theme;
    APP.dataset.theme = currentTheme;
    APP.innerHTML = getGameTemplate(currentTheme);
    resetGameState(SETTINGS.size, SETTINGS.player);
    renderBoard(SETTINGS.size);
    updateCurrentPlayer();
    addGameListeners();
}

/**
 * Resets all game variables for a new round.
 * @param size - The selected board size.
 * @param player - The player who starts the round.
 */
function resetGameState(size: BoardSize, player: PlayerColor): void {
    cards = createCards(size);
    flippedCards = [];
    isLocked = false;
    currentPlayer = player;
    scores = { blue: 0, orange: 0 };
}

/**
 * Renders all cards into the game board.
 * @param size - The selected board size, used for the board's grid class.
 */
function renderBoard(size: BoardSize): void {
    const board = document.getElementById("game-board") as HTMLElement;
    board.classList.add(`game__board--${size}`, `game__board--${currentTheme}`);
    board.innerHTML = cards.map((card) => getCardTemplate(card, currentTheme)).join("");
}

/**
 * Adds the listeners for the game board and the exit dialog.
 */
function addGameListeners(): void {
    const board = document.getElementById("game-board") as HTMLElement;
    board.addEventListener("click", handleCardClick);
    addDialogListeners();
}

/**
 * Adds the listeners that open and close the exit dialog.
 */
function addDialogListeners(): void {
    const dialog = document.getElementById("exit-dialog") as HTMLDialogElement;
    const exitButton = document.getElementById("exit-button") as HTMLButtonElement;
    const backButton = document.getElementById("back-to-game") as HTMLButtonElement;
    const quitButton = document.getElementById("quit-game") as HTMLButtonElement;
    exitButton.addEventListener("click", () => dialog.showModal());
    backButton.addEventListener("click", () => closeDialog(dialog));
    quitButton.addEventListener("click", quitGame);
    dialog.addEventListener("click", (event) => closeOnBackdropClick(event, dialog));
    dialog.addEventListener("cancel", (event) => closeOnEscape(event, dialog));
}

/**
 * Plays the closing animation and closes the dialog afterwards.
 * @param dialog - The dialog to close.
 */
function closeDialog(dialog: HTMLDialogElement): void {
    dialog.classList.add("game__dialog--closing");
    dialog.addEventListener("animationend", () => {
        dialog.classList.remove("game__dialog--closing");
        dialog.close();
    }, { once: true });
}

/**
 * Closes the dialog when the click landed outside its content.
 * @param event - The click event on the dialog.
 * @param dialog - The dialog to close.
 */
function closeOnBackdropClick(event: MouseEvent, dialog: HTMLDialogElement): void {
    if (event.target === dialog) closeDialog(dialog);
}

/**
 * Replaces the instant close on Escape with the animated close.
 * @param event - The cancel event fired by the Escape key.
 * @param dialog - The dialog to close.
 */
function closeOnEscape(event: Event, dialog: HTMLDialogElement): void {
    event.preventDefault();
    closeDialog(dialog);
}

/**
 * Stops pending timers and returns to the settings screen.
 */
function quitGame(): void {
    clearTimeout(pendingTimeout);
    renderSettings();
}

/**
 * Handles a click on the game board and flips the clicked card if allowed.
 * @param event - The click event from the game board.
 */
function handleCardClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const cardElement = target.closest(".game__card") as HTMLElement | null;
    if (cardElement === null || isLocked) return;
    const card = cards.find((candidate) => candidate.id === Number(cardElement.dataset.id));
    if (card === undefined || card.state !== "hidden") return;
    flipCard(card);
    if (flippedCards.length === CARDS_PER_TURN) checkMatch();
}

/**
 * Turns a card face up and remembers it.
 * @param card - The card to flip.
 */
function flipCard(card: Card): void {
    card.state = "flipped";
    flippedCards.push(card);
    getCardElement(card).classList.add("game__card--flipped");
}

/**
 * Returns the DOM element that belongs to a card.
 * @param card - The card to look up.
 * @returns The button element of the card on the game board.
 */
function getCardElement(card: Card): HTMLElement {
    return document.querySelector(`[data-id="${card.id}"]`) as HTMLElement;
}

/**
 * Compares the two flipped cards.
 */
function checkMatch(): void {
    const [first, second] = flippedCards;
    if (first.motif === second.motif) handleMatch();
    else handleMismatch();
}

/**
 * Marks both flipped cards as matched and adds a point.
 */
function handleMatch(): void {
    flippedCards.forEach((card) => {
        card.state = "matched";
        getCardElement(card).classList.add("game__card--matched");
    });
    flippedCards = [];
    scores[currentPlayer] += POINTS_PER_MATCH;
    updateScore();
    if (isGameOver()) pendingTimeout = window.setTimeout(renderGameOver, GAME_OVER_DELAY);
}

/**
 * Locks the board and turns the cards back after a delay.
 */
function handleMismatch(): void {
    isLocked = true;
    pendingTimeout = window.setTimeout(hideFlippedCards, FLIP_BACK_DELAY);
}

/**
 * Turns the flipped cards face down and unlocks the board.
 */
function hideFlippedCards(): void {
    flippedCards.forEach((card) => {
        card.state = "hidden";
        getCardElement(card).classList.remove("game__card--flipped");
    });
    flippedCards = [];
    isLocked = false;
    switchPlayer();
}

/**
 * Shows the current player's score in the header.
 */
function updateScore(): void {
    const scoreElement = document.getElementById(`score-${currentPlayer}`) as HTMLElement;
    scoreElement.innerText = String(scores[currentPlayer]);
}

/**
 * Passes the turn to the other player.
 */
function switchPlayer(): void {
    currentPlayer = currentPlayer === "blue" ? "orange" : "blue";
    updateCurrentPlayer();
}

/**
 * Shows the current player's icon in the header.
 */
function updateCurrentPlayer(): void {
    const icon = document.getElementById("current-player") as HTMLImageElement;
    icon.src = `img/${currentTheme}/current-${currentPlayer}.svg`;
    icon.alt = currentPlayer;
}

/**
 * Checks whether all cards have been matched.
 * @returns True if every card is matched, otherwise false.
 */
function isGameOver(): boolean {
    return cards.every((card) => card.state === "matched");
}

/**
 * Renders the game over screen and switches to the result after a delay.
 */
function renderGameOver(): void {
    APP.innerHTML = getGameOverTemplate(scores, currentTheme);
    setTimeout(renderResult, RESULT_DELAY);
}

/**
 * Determines the winner or a draw from the scores.
 * @returns The winning player color, or "draw" if both players have the same score.
 */
function getResult(): GameResult {
    if (scores.blue > scores.orange) return "blue";
    if (scores.orange > scores.blue) return "orange";
    return "draw";
}

/**
 * Renders the result screen into the app container.
 */
function renderResult(): void {
    APP.innerHTML = getResultTemplate(getResult(), currentTheme);
    const backButton = document.getElementById("back-button") as HTMLButtonElement;
    backButton.addEventListener("click", renderSettings);
}

renderHome();