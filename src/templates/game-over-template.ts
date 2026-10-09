import type { PlayerColor, ThemeName } from "../types";

/** Returns the HTML for the game over screen. */
export function getGameOverTemplate(scores: Record<PlayerColor, number>, theme: ThemeName): string {
    return `
    <section class="game-over">
        <h1 class="game-over__title">Game over</h1>
        <p class="game-over__subtitle">Final score</p>
        <div class="game__scores">
            <div class="game__score game__score--blue">
                <img class="game__score-icon" src="/img/${theme}/player-blue.svg" alt="">
                <span>Blue</span>
                <span class="game__score-value">${scores.blue}</span>
            </div>
            <div class="game__score game__score--orange">
                <img class="game__score-icon" src="/img/${theme}/player-orange.svg" alt="">
                <span>Orange</span>
                <span class="game__score-value">${scores.orange}</span>
            </div>
        </div>
    </section>
    `;
}