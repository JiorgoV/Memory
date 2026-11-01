import type { PlayerColor, ThemeName } from "../types";

const PLAYER_LABELS: Record<PlayerColor, string> = {
    blue: "Blue",
    orange: "Orange",
};

/**
 * Returns the HTML for the game over screen.
 * @param scores - The final score of both players.
 * @param theme - The selected theme for the player icons.
 * @returns The complete game over screen with the final score as an HTML string.
 */
export function getGameOverTemplate(scores: Record<PlayerColor, number>, theme: ThemeName): string {
    return `
    <section class="game-over">
        <h1 class="game-over__title">Game over</h1>
        <p class="game-over__subtitle">Final score</p>
        <div class="game__scores">
            ${getFinalScoreTemplate(theme, "blue", scores.blue)}
            ${getFinalScoreTemplate(theme, "orange", scores.orange)}
        </div>
    </section>
    `;
}

/**
 * Returns the HTML for one player's final score.
 * @param theme - The selected theme for the player icon.
 * @param player - The player whose score is shown.
 * @param score - The final score of the player.
 * @returns The score display of the player as an HTML string.
 */
function getFinalScoreTemplate(theme: ThemeName, player: PlayerColor, score: number): string {
    const label = PLAYER_LABELS[player];
    return `
    <div class="game__score game__score--${player}">
        <img class="game__score-icon" src="img/${theme}/player-${player}.svg" alt="${label}">
        <span class="game__score-label">${label}</span>
        <span class="game__score-value">${score}</span>
    </div>
    `;
}