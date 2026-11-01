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

/**
 * Returns the HTML for the settings screen.
 * @returns The complete settings screen as an HTML string.
 */
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

/**
 * Returns the HTML for the settings form with all option groups.
 * @returns The settings form with all option groups as an HTML string.
 */
function getFormTemplate(): string {
    const groups = SETTINGS_GROUPS.map((group) => getGroupTemplate(group)).join("");
    return `<form class="settings__form">${groups}</form>`;
}

/**
 * Returns the HTML for one group of radio options.
 * @param group - The group data with name, title, icon and options.
 * @returns The fieldset with all options of the group as an HTML string.
 */
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

/**
 * Returns the HTML for a single radio option.
 * @param group - The group the option belongs to; provides the input name and the preselected value.
 * @param option - The option data with value and label.
 * @returns The label with its radio input as an HTML string.
 */
function getOptionTemplate(group: SettingsGroup, option: SettingsOption): string {
    const checked = option.value === group.checkedValue ? "checked" : "";
    return `
    <label class="settings__option">
        <input type="radio" name="${group.name}" value="${option.value}" ${checked}>
        ${option.label}
    </label>
    `;
}

/**
 * Returns the HTML for the theme preview and the summary bar.
 * @returns The preview area with the default theme image and the summary bar as an HTML string.
 */
function getPreviewTemplate(): string {
    return `
    <div class="settings__preview">
        <img class="settings__preview-image" id="theme-preview" src="img/preview-code-vibes.svg" alt="Preview of the code vibes theme">
        ${getSummaryTemplate()}
    </div>
    `;
}

/**
 * Returns the HTML for the summary bar with the start button.
 * @returns The summary bar with placeholders for the selection and the disabled start button as an HTML string.
 */
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