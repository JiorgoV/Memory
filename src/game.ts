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
    return shuffleCards(cards);
}

/** Creates a single hidden card. */
function createCard(id: number, motif: number): Card {
    return { id, motif, state: "hidden" };
}

/** Shuffles the cards into a random order. */
function shuffleCards(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}