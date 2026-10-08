export type PlayerColor = "blue" | "orange";
export type ThemeName = "code-vibes" | "gaming" | "da-projects" | "foods";
export type BoardSize = "small" | "medium" | "large";
export type CardState = "hidden" | "flipped" | "matched";

export interface GameSettings {
    theme: ThemeName;
    player: PlayerColor | null;
    size: BoardSize | null;
}

export interface Card {
    id: number;
    motif: number;
    state: CardState;
}