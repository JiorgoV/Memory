interface SettingsOption {
    value: string;
    label: string;
}

interface SettingsGroup {
    name: string;
    title: string;
    icon: string;
    checkedValue?: string;
    options: SettingsOption[];
}

const SETTINGS_GROUPS: SettingsGroup[] = [
    {
        name: "theme",
        title: "Game themes",
        icon: "palette.svg",
        checkedValue: "code-vibes",
        options: [
            { value: "code-vibes", label: "Code vibes theme" },
            { value: "gaming", label: "Gaming theme" },
            { value: "da-projects", label: "DA Projects theme" },
            { value: "foods", label: "Foods theme" }
        ],
    },
    {
        name: "player",
        title: "Choose player",
        icon: "chess-pawn.svg",
        options: [
            { value: "blue", label: "Blue" },
            { value: "orange", label: "Orange" }
        ],
    },
    {
        name: "size",
        title: "Board size",
        icon: "board-icon.svg",
        options: [
            { value: "small", label: "16 cards" },
            { value: "medium", label: "24 cards" },
            { value: "large", label: "36 cards" }
        ],
    },
];

/** Returns the HTML for the settings screen. */
export function getSettingsTemplate(): string {
    return `
    <section class="settings">
        <h1 class="settings__title">Settings</h1>
        <div class="settings__layout">
            ${getFormTemplate()}
            ${getPreviewTemplate()}
        </div>
    </section>
    `;
}

/** Returns the HTML for the settings form with all option groups. */
function getFormTemplate(): string {
    const groups = SETTINGS_GROUPS.map((group) => getGroupTemplate(group)).join("");
    return `<form class="settings__form">${groups}</form>`;
}

/** Returns the HTML for one group of radio options. */
function getGroupTemplate(group: SettingsGroup): string {
    const options = group.options.map((option) => getOptionTemplate(group, option)).join("");
    return `
    <fieldset class="settings__form-group">
        <legend class="settings__form-title">
            <img src="icons/${group.icon}" alt="">${group.title}
        </legend>
        ${options}
    </fieldset>
    `;
}

/** Returns the HTML for a single radio option. */
function getOptionTemplate(group: SettingsGroup, option: SettingsOption): string {
    const checked = option.value === group.checkedValue ? "checked" : "";
    return `
    <label class="settings__option">
        <input type="radio" name="${group.name}" value="${option.value}" ${checked}>
        ${option.label}
    </label>
    `;
}

/** Returns the HTML for the theme preview and the summary bar. */
function getPreviewTemplate(): string {
    return `
    <div class="settings__preview">
        <img class="settings__preview-image" id="theme-preview" src="img/preview-code-vibes.svg" alt="Preview of the code vibes theme">
        ${getSummaryTemplate()}
    </div>
    `;
}

/** Returns the HTML for the summary bar with the start button. */
function getSummaryTemplate(): string {
    return `
    <div class="settings__summary">
        <span class="settings__summary-item" id="summary-theme">Game theme</span>
        <span class="settings__summary-item" id="summary-player">Player</span>
        <span class="settings__summary-item" id="summary-size">Board size</span>
        <button class="settings__start-button" id="start-button" type="button" disabled>
            <img class="settings__start-button-icon" src="icons/smart-display.svg" alt="">
            <span class="settings__start-button-text">Start</span>
        </button>
    </div>
    `;
}