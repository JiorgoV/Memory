import type { GameResult, ThemeName } from "../types";

const RESULT_TEXTS: Record<GameResult, { subtitle: string; title: string }> = {
    blue: { subtitle: "The winner is", title: "Blue player" },
    orange: { subtitle: "The winner is", title: "Orange player" },
    draw: { subtitle: "It's a", title: "Draw" },
};

/** Returns the HTML for the result screen. */
export function getResultTemplate(result: GameResult, theme: ThemeName): string {
    const texts = RESULT_TEXTS[result];
    return `
    <section class="result result--${result}">
        <p class="result__subtitle">${texts.subtitle}</p>
        <h1 class="result__title">${texts.title}</h1>
        <img class="result__icon" src="/img/${theme}/result-${result}.svg" alt="">
        <button class="result__button" id="back-button" type="button">Back to start</button>
    </section>
    `;
}