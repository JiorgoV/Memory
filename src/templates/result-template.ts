import type { GameResult, ThemeName } from "../types";

const WIDESCREEN_MEDIA = "(min-width: 1440px)";
const THEMES_WITH_CONFETTI: ThemeName[] = ["code-vibes"];

const RESULT_TEXTS: Record<GameResult, { subtitle: string; title: string }> = {
    "blue": { subtitle: "The winner is", title: "Blue player" },
    "orange": { subtitle: "The winner is", title: "Orange player" },
    "draw": { subtitle: "It's a", title: "Draw" },
};

const BACK_BUTTON_TEXTS: Record<ThemeName, string> = {
    "code-vibes": "Back to start",
    "gaming": "Home",
    "da-projects": "Home",
    "foods": "Home"
};

/**
 * Returns the HTML for the result screen.
 * @param result - The winning player color, or "draw".
 * @param theme - The selected theme for images and button text.
 * @returns The complete result screen as an HTML string.
 */
export function getResultTemplate(result: GameResult, theme: ThemeName): string {
    const texts = RESULT_TEXTS[result];
    return `
    <section class="result result--${result}">
        ${hasConfetti(result, theme) ? getConfettiTemplate(theme) : ""}
        <p class="result__subtitle">${texts.subtitle}</p>
        <h1 class="result__title">${texts.title}</h1>
        <img class="result__icon" src="img/${theme}/result-${result}.svg" alt="">
        <button class="result__button" id="back-button" type="button">${BACK_BUTTON_TEXTS[theme]}</button>
    </section>
    `;
}

/**
 * Returns the confetti image, with a longer version on wide screens.
 * @param theme - The selected theme whose confetti images are used.
 * @returns The picture element with both confetti versions as an HTML string.
 */
function getConfettiTemplate(theme: ThemeName): string {
    return `
    <picture class="result__confetti">
        <source media="${WIDESCREEN_MEDIA}" srcset="img/${theme}/confetti-long.svg">
        <img src="img/${theme}/confetti.svg" alt="">
    </picture>
    `;
}

/**
 * Checks whether the confetti is shown for this result and theme.
 * @param result - The winning player color, or "draw".
 * @param theme - The selected theme.
 * @returns True if a player won and the theme has confetti, otherwise false.
 */
function hasConfetti(result: GameResult, theme: ThemeName): boolean {
    return result !== "draw" && THEMES_WITH_CONFETTI.includes(theme);
}