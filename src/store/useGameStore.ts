import { create } from "zustand";
import type { GameMode, GameState, ScoreEntry } from "../features/game/types/game.types";
import { generateCards } from "../features/game/utils/generateCards";
import { sounds } from "../features/game/utils/audio";

interface GameActions {
  initGame: (difficulty: number, mode?: GameMode) => void;
  flipCard: (id: string) => void;
  checkMatch: () => void;
  resetGame: () => void;
  startGame: () => void;
  moves: number;
  seconds: number;
  tick: () => void;
  toggleDarkMode: () => void;
}

// Helper para manejar localStorage de forma segura
const getStoredBestScore = () => {
  const saved = localStorage.getItem('memory-best-score');
  return saved ? Number(saved) : Infinity; // Usamos Infinity para que cualquier tiempo sea mejor al principio
};

const getStoredScores = (): ScoreEntry[] => {
  const saved = localStorage.getItem('memory-scores');
  return saved ? JSON.parse(saved) : [];
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  cards: [],
  moves: 0,
  seconds: 0,
  status: 'idle',
  difficulty: 8,
  mode: 'icons',
  scores: getStoredScores(),
  isDarkMode: localStorage.getItem('theme') === 'dark',
  bestScore: getStoredBestScore(),
  initGame: async (difficulty, mode = 'icons') => {
    set({ status: 'loading'});
    const cards = await generateCards(difficulty, mode);

    set({
      cards,
      mode,
      moves: 0,
      seconds: 0,
      status: 'idle',
      difficulty,
      bestScore: getStoredBestScore(),
    });
  },

  toggleDarkMode: () => {
    const newMode = !get().isDarkMode;
    set({ isDarkMode: newMode });
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  },

  // Acción para que el hook llame cada segundo
  startGame: () => {
    sounds.start();
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
    const isMatch = get().mode === 'icons' 
      ? card1.iconName === card2.iconName 
      : card1.imageUrl === card2.imageUrl;

    if (isMatch) {
      sounds.match();
    } else {
      sounds.error();
    }

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
      sounds.win();

      const newScore: ScoreEntry = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleString(),
        moves: get().moves,
        seconds: get().seconds,
        mode: get().mode
      };

      const updatedScores = [...get().scores, newScore]
        .sort((a, b) => a.moves - b.moves)
        .slice(0, 10);

      set({ scores: updatedScores });
      localStorage.setItem('memory-scores', JSON.stringify(updatedScores));

      if (seconds < bestScore) {
        set({ bestScore: seconds });
        localStorage.setItem('memory-best-score', seconds.toString());
      }
    }
  },

  resetGame: () => {
    const { difficulty } = get();
    sounds.reset();
    // Al resetear, volvemos a llamar a initGame que pone status: 'idle'
    get().initGame(difficulty);
  }
}));