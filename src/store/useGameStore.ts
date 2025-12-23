import { create } from "zustand";
import type { GameState } from "../features/game/types/game.types";
import { generateCards } from "../features/game/utils/generateCards";

interface GameActions {
  initGame: (difficulty: number) => void;
  flipCard: (id: string) => void;
  checkMatch: () => void;
  resetGame: () => void;
  startGame: () => void;
  moves: number;
  seconds: number;
  tick: () => void;
}

// Helper para manejar localStorage de forma segura
const getStoredBestScore = () => {
  const saved = localStorage.getItem('memory-best-score');
  return saved ? Number(saved) : Infinity; // Usamos Infinity para que cualquier tiempo sea mejor al principio
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  cards: [],
  moves: 0,
  seconds: 0,
  status: 'idle',
  difficulty: 8,
  bestScore: getStoredBestScore(),
  initGame: (difficulty) => {
    set({
      cards: generateCards(difficulty),
      moves: 0,
      seconds: 0,
      status: 'idle',
      difficulty,
      bestScore: getStoredBestScore(),
    });
  },

  // Acción para que el hook llame cada segundo
  startGame: () => {
    set({ status: 'playing' });
  },

  tick: () => set((state) => ({ seconds: state.seconds + 1 })),

  flipCard: (id) => {
    const { cards, status } = get();
    // Bloquea el volteo si no se ha dado "Start" o si ya ganó
    if (status !== 'playing') return;

    const flippedCards = cards.filter(c => c.isFlipped && !c.isMatched);
    if (flippedCards.length >= 2) return;

    set({
      cards: cards.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      )
    });

    const newCards = get().cards;
    const currentlyFlipped = newCards.filter(c => c.isFlipped && !c.isMatched);

    if (currentlyFlipped.length === 2) {
      set(state => ({ moves: state.moves + 1 }));
      setTimeout(() => get().checkMatch(), 1000); 
    }
  },

  checkMatch: () => {
    const { cards, seconds, bestScore } = get();
    const flipped = cards.filter(c => c.isFlipped && !c.isMatched);

    if (flipped.length !== 2) return;

    const [card1, card2] = flipped;
    const isMatch = card1.iconName === card2.iconName;

    set({
      cards: cards.map(card => {
        if (card.id === card1.id || card.id === card2.id) {
          return { 
            ...card, 
            isMatched: isMatch, 
            isFlipped: isMatch 
          };
        }
        return card;
      })
    });

    if (get().cards.every(card => card.isMatched)) {
      set({ status: 'won' });
      if (seconds < bestScore) {
        set({ bestScore: seconds });
        localStorage.setItem('memory-best-score', seconds.toString());
      }
    }
  },

  resetGame: () => {
    const { difficulty } = get();
    // Al resetear, volvemos a llamar a initGame que pone status: 'idle'
    get().initGame(difficulty);
  }
}));