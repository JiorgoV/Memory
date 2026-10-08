import type { Card, ThemeName } from "../types";

/** Returns the HTML for the game screen. */
export function getGameTemplate(): string {
    return `
            <section class="game">
            <header class="game__header">
            <div class="game__status">
                <div class="game__scores">
                    <div class="game__score game__score--blue">
                        <img class="game__score-icon" src="/icons/label-blue.svg" alt="">
                        <span>Blue</span>
                        <span class="game__score-value" id="score-blue">0</span>
                    </div>
                    <div class="game__score game__score--orange">
                        <img class="game__score-icon" src="/icons/label-orange.svg" alt="">
                        <span>Orange</span>
                        <span class="game__score-value" id="score-orange">0</span>
                    </div>
                </div>

                <div class="game__current-player">
                    <span>Current player:</span>
                    <img class="game__current-player-icon" id="current-player" src="/icons/label-blue.svg" alt="Blue">
                </div>
            </div>

                <button class="game__exit-button" id="exit-button" type="button">
                    <img src="/icons/exit.svg" alt="">Exit game
                </button>
            </header>

            <div class="game__board" id="game-board"></div>
        </section>
    `;
}

/** Returns the HTML for a single card. */
export function getCardTemplate(card: Card, theme: ThemeName): string {
    return `
    <button class="game__card" type="button" data-id="${card.id}" aria-label="Memory card">
        <img class="game__card-back" src="/img/${theme}/back.svg" alt="">
    </button>
    `;
}