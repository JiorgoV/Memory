/** Returns the HTML for the settings screen. */
export function getSettingsTemplate(): string {
    return `
    <section class="settings">
        <h1 class="settings__title">Settings</h1>
        <div class="settings__layout">
            <form class="settings__form">
                <fieldset class="settings__form-group">
                    <legend class="settings__form-title">
                        <img src="/icons/palette.svg" alt="">Game themes
                    </legend>
                    <label class="settings__option">
                        <input type="radio" name="theme" value="code-vibes" checked>
                        Code vibes theme
                    </label>
                    <label class="settings__option">
                        <input type="radio" name="theme" value="gaming">
                        Gaming theme
                    </label>
                    <label class="settings__option">
                        <input type="radio" name="theme" value="da-projects">
                        DA Projects theme
                    </label>
                    <label class="settings__option">
                        <input type="radio" name="theme" value="foods">
                        Foods theme
                    </label>
                </fieldset>

                <fieldset class="settings__form-group">
                    <legend class="settings__form-title">
                        <img src="/icons/chess-pawn.svg" alt="">Choose player
                    </legend>
                    <label class="settings__option">
                        <input type="radio" name="player" value="blue">
                        Blue
                    </label>
                    <label class="settings__option">
                        <input type="radio" name="player" value="orange">
                        Orange
                    </label>
                </fieldset>

                <fieldset class="settings__form-group">
                    <legend class="settings__form-title">
                        <img src="/icons/board-icon.svg" alt="">Board size
                    </legend>
                    <label class="settings__option">
                        <input type="radio" name="size" value="small">
                        16 cards
                    </label>
                    <label class="settings__option">
                        <input type="radio" name="size" value="medium">
                        24 cards
                    </label>
                    <label class="settings__option">
                        <input type="radio" name="size" value="large">
                        36 cards
                    </label>
                </fieldset>
            </form>
            <div class="settings__preview">
                <img class="settings__preview-image" id="theme-preview" src="/img/preview-code-vibes.svg" alt="Preview of the code vibes theme">
                <div class="settings__summary">
                    <span class="settings__summary-item" id="summary-theme">Game theme</span>
                    <span class="settings__summary-item" id="summary-player">Player</span>
                    <span class="settings__summary-item" id="summary-size">Board size</span>
                    <button class="settings__start-button" id="start-button" type="button">
                        <img src="/icons/smart-display.svg" alt="">
                        <span class="settings__start-button-text">Start</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
    `;
}