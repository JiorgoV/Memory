import type { BoardSize, Card } from "./types";

const CARD_COUNTS: Record<BoardSize, number> = { small: 16, medium: 24, large: 36 };

/** Creates all card pairs for the given board size. */
export function createCards(size: BoardSize): Card[] {
    const cards: Card[] = [];
    const pairCount = CARD_COUNTS[size] / 2;
    for (let motif = 1; motif <= pairCount; motif++) {
        cards.push(createCard(cards.length, motif));
        cards.push(createCard(cards.length, motif));
    }
    return cards;
}

/** Creates a single hidden card. */
function createCard(id: number, motif: number): Card {
    return { id, motif, state: "hidden" };
}