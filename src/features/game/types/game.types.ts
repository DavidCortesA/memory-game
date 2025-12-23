export type GameStatus = 'idle' | 'playing' | 'won' | 'loading';

export type GameMode = 'icons' | 'images';

export interface Card {
  id:  string;
  isFlipped: boolean;
  isMatched: boolean;
  imageUrl?: string;
  iconName?: string;
}

export interface GameState {
  cards: Card[];
  moves: number;
  status: GameStatus;
  difficulty: number;
  bestScore: number;
  mode: GameMode;
  isDarkMode: boolean;
  scores: ScoreEntry[];
}

export interface ScoreEntry {
  id: string;
  date: string;     // Para el día y hora
  moves: number;
  seconds: number;
  mode: GameMode;
}