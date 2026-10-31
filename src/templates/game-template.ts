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

/** Returns the HTML for the game screen. */
export function getGameTemplate(theme: ThemeName): string {
    return `
    <section class="game">
        ${getHeaderTemplate(theme)}
        <div class="game__board" id="game-board"></div>
        ${getDialogTemplate(theme)}
    </section>
    `;
}

/** Returns the HTML for the game header with scores, current player and exit button. */
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

/** Returns the HTML for one player's score. */
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

/** Returns the HTML for the current player display. */
function getCurrentPlayerTemplate(theme: ThemeName): string {
    return `
    <div class="game__current-player">
        <span>Current player:</span>
        <img class="game__current-player-icon" id="current-player" src="img/${theme}/current-blue.svg" alt="Blue">
    </div>
    `;
}

/** Returns the HTML for the exit button with normal and hover icon. */
function getExitButtonTemplate(theme: ThemeName): string {
    return `
    <button class="game__exit-button" id="exit-button" type="button" aria-label="Exit game">
        <img class="game__exit-icon" src="img/${theme}/exit.svg" alt="">
        <img class="game__exit-icon game__exit-icon--hover" src="img/${theme}/exit-hover.svg" alt="">
        <span class="game__exit-text">Exit game</span>
    </button>
    `;
}

/** Returns the HTML for the exit confirmation dialog. */
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

/** Returns the HTML for a single card. */
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