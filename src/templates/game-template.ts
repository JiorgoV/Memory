import type { Card, PlayerColor, ThemeName } from "../types";

const DIALOG_TEXTS: Record<ThemeName, { back: string; quit: string }> = {
    "code-vibes": { back: "Back to game", quit: "Exit game" },
    gaming: { back: "No, back to game", quit: "Exit game" },
    "da-projects": { back: "Back to game", quit: "Exit game" },
    foods: { back: "No, back to game", quit: "Exit game" },
};

const PLAYER_LABELS: Record<PlayerColor, string> = {
    blue: "Blue",
    orange: "Orange",
};

/**
 * Returns the HTML for the game screen.
 * @param theme - The selected theme for images and texts.
 * @returns The complete game screen with header, empty board and exit dialog as an HTML string.
 */
export function getGameTemplate(theme: ThemeName): string {
    return `
    <section class="game">
        ${getHeaderTemplate(theme)}
        <div class="game__board" id="game-board"></div>
        ${getDialogTemplate(theme)}
    </section>
    `;
}

/**
 * Returns the HTML for the game header with scores, current player and exit button.
 * @param theme - The selected theme for the header icons.
 * @returns The game header as an HTML string.
 */
function getHeaderTemplate(theme: ThemeName): string {
    return `
    <header class="game__header">
        <div class="game__status">
            <div class="game__scores">
                ${getScoreTemplate(theme, "blue")}
                ${getScoreTemplate(theme, "orange")}
            </div>
            ${getCurrentPlayerTemplate(theme)}
        </div>
        ${getExitButtonTemplate(theme)}
    </header>
    `;
}

/**
 * Returns the HTML for one player's score.
 * @param theme - The selected theme for the player icon.
 * @param player - The player whose score is shown.
 * @returns The score display of the player, starting at 0, as an HTML string.
 */
function getScoreTemplate(theme: ThemeName, player: PlayerColor): string {
    const label = PLAYER_LABELS[player];
    return `
    <div class="game__score game__score--${player}">
        <img class="game__score-icon" src="img/${theme}/player-${player}.svg" alt="${label}">
        <span class="game__score-label">${label}</span>
        <span class="game__score-value" id="score-${player}">0</span>
    </div>
    `;
}

/**
 * Returns the HTML for the current player display.
 * @param theme - The selected theme for the player icon.
 * @returns The current player display as an HTML string.
 */
function getCurrentPlayerTemplate(theme: ThemeName): string {
    return `
    <div class="game__current-player">
        <span>Current player:</span>
        <img class="game__current-player-icon" id="current-player" src="img/${theme}/current-blue.svg" alt="Blue">
    </div>
    `;
}

/**
 * Returns the HTML for the exit button with normal and hover icon.
 * @param theme - The selected theme for the exit icons.
 * @returns The exit button as an HTML string.
 */
function getExitButtonTemplate(theme: ThemeName): string {
    return `
    <button class="game__exit-button" id="exit-button" type="button" aria-label="Exit game">
        <img class="game__exit-icon" src="img/${theme}/exit.svg" alt="">
        <img class="game__exit-icon game__exit-icon--hover" src="img/${theme}/exit-hover.svg" alt="">
        <span class="game__exit-text">Exit game</span>
    </button>
    `;
}

/**
 * Returns the HTML for the exit confirmation dialog.
 * @param theme - The selected theme for the button texts.
 * @returns The closed exit dialog as an HTML string.
 */
function getDialogTemplate(theme: ThemeName): string {
    const texts = DIALOG_TEXTS[theme];
    return `
    <dialog class="game__dialog" id="exit-dialog">
        <div class="game__dialog-content">
            <p class="game__dialog-text">Are you sure you want to quit the game?</p>
            <div class="game__dialog-actions">
                <button class="game__dialog-button" id="back-to-game" type="button">${texts.back}</button>
                <button class="game__dialog-button game__dialog-button--secondary" id="quit-game" type="button">${texts.quit}</button>
            </div>
        </div>
    </dialog>
    `;
}

/**
 * Returns the HTML for a single card.
 * @param card - The card data with id and motif.
 * @param theme - The selected theme for the card images.
 * @returns The card button with back and front image as an HTML string.
 */
export function getCardTemplate(card: Card, theme: ThemeName): string {
    return `
    <button class="game__card" type="button" data-id="${card.id}" aria-label="Memory card">
        <span class="game__card-inner">
            <img class="game__card-back" src="img/${theme}/back.svg" alt="">
            <img class="game__card-front" src="img/${theme}/${card.motif}.svg" alt="">
        </span>
    </button>
    `;
}