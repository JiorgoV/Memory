import type { Card, ThemeName } from "../types";

const DIALOG_TEXTS: Record<ThemeName, { back: string; quit: string }> = {
    "code-vibes": { back: "Back to game", quit: "Exit game" },
    gaming: { back: "No, back to game", quit: "Exit game" },
    "da-projects": { back: "Back to game", quit: "Exit game" },
    foods: { back: "No, back to game", quit: "Exit game" },
};

/** Returns the HTML for the game screen. */
export function getGameTemplate(theme: ThemeName): string {
    const dialogTexts = DIALOG_TEXTS[theme];
    return `
            <section class="game">
            <header class="game__header">
            <div class="game__status">
                <div class="game__scores">
                    <div class="game__score game__score--blue">
                        <img class="game__score-icon" src="/img/${theme}/player-blue.svg" alt="Blue">
                        <span class="game__score-label">Blue</span>
                        <span class="game__score-value" id="score-blue">0</span>
                    </div>
                    <div class="game__score game__score--orange">
                        <img class="game__score-icon" src="/img/${theme}/player-orange.svg" alt="Orange">
                        <span class="game__score-label">Orange</span>
                        <span class="game__score-value" id="score-orange">0</span>
                    </div>
                </div>

                <div class="game__current-player">
                    <span>Current player:</span>
                    <img class="game__current-player-icon" id="current-player" src="/img/${theme}/player-blue.svg" alt="Blue">
                </div>
            </div>

                <button class="game__exit-button" id="exit-button" type="button">
                    <img class="game__exit-icon" src="/img/${theme}/exit.svg" alt="">
                    <img class="game__exit-icon game__exit-icon--hover" src="/img/${theme}/exit-hover.svg" alt="">
                    Exit game
                </button>
            </header>

            <div class="game__board" id="game-board"></div>

                <dialog class="game__dialog" id="exit-dialog">
                    <div class="game__dialog-content">
                        <p class="game__dialog-text">Are you sure you want to quit the game?</p>
                        <div class="game__dialog-actions">
                            <button class="game__dialog-button" id="back-to-game" type="button">${dialogTexts.back}</button>
                            <button class="game__dialog-button game__dialog-button--secondary" id="quit-game" type="button">${dialogTexts.quit}</button>
                        </div>
                    </div>
                </dialog>
            
        </section>
    `;
}

/** Returns the HTML for a single card. */
export function getCardTemplate(card: Card, theme: ThemeName): string {
    return `
    <button class="game__card" type="button" data-id="${card.id}" aria-label="Memory card">
        <span class="game__card-inner">
            <img class="game__card-back" src="/img/${theme}/back.svg" alt="">
            <img class="game__card-front" src="/img/${theme}/${card.motif}.svg" alt="">
        </span>
    </button>
    `;
}