import type { BoardSize, Card } from "./types";

const CARD_COUNTS: Record<BoardSize, number> = { small: 16, medium: 24, large: 36 };

/**
 * Creates all card pairs for the given board size.
 * @param size - The selected board size: 16, 24 or 36 cards.
 * @returns The shuffled list of all cards for the board.
 */
export function createCards(size: BoardSize): Card[] {
    const cards: Card[] = [];
    const pairCount = CARD_COUNTS[size] / 2;
    for (let motif = 1; motif <= pairCount; motif++) {
        cards.push(createCard(cards.length, motif));
        cards.push(createCard(cards.length, motif));
    }
    return shuffleCards(cards);
}

/**
 * Creates a single hidden card.
 * @param id - The unique number of the card.
 * @param motif - The number of the card image; two cards with the same motif form a pair.
 * @returns A new card that is face down.
 */
function createCard(id: number, motif: number): Card {
    return { id, motif, state: "hidden" };
}

/**
 * Shuffles the cards into a random order.
 * @param cards - A list of all cards.
 * @returns The same list, shuffled into a random order.
 */
function shuffleCards(cards: Card[]): Card[] {
    for (let currentIndex = cards.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
    }
    return cards;
}