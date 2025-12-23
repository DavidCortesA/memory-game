import type { Card, GameMode } from '../types/game.types';
import { shuffle } from './shuffle';

// Lista de iconos para el modo offline
const ICON_LIST = ['Heart', 'Star', 'Zap', 'Ghost', 'Moon', 'Sun', 'Anchor', 'Coffee', 'Music', 'Cloud', 'Smile', 'Dribbble'];

export const generateCards = async (difficulty: number, mode: GameMode): Promise<Card[]> => {
  const numPairs = difficulty / 2;

  if (mode === 'icons') {
    // Lógica Offline (Iconos)
    const selectedIcons = ICON_LIST.slice(0, numPairs);
    const deck = [...selectedIcons, ...selectedIcons].map((icon, index) => ({
      id: `card-${index}`,
      iconName: icon,
      isFlipped: false,
      isMatched: false,
    }));
    return shuffle(deck);
  } else {
    // Lógica Online (Unsplash)
    const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${numPairs}&query=nature`
    );
    const data = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const images = data.map((img: any) => img.urls.small);
    
    const deck = [...images, ...images].map((url, index) => ({
      id: `card-${index}`,
      imageUrl: url,
      isFlipped: false,
      isMatched: false,
    }));
    return shuffle(deck);
  }
};