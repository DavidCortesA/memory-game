export type GameStatus = 'idle' | 'playing' | 'won';

export interface Card {
  id:  string;
  iconName: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  moves: number;
  status: GameStatus;
  difficulty: number;
  bestScore: number;
}