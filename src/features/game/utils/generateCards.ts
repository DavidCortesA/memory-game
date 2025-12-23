import type { Card } from "../types/game.types";
import { shuffle } from "./shuffle";

// Lista de nombre de iconos disponibles en Lucide
const ICON_POOL = [
  'Ghost', 'Box', 'Camera', 'Moon', 'Star', 'Sun', 
  'Cloud', 'Heart', 'Zap', 'Anchor', 'Bell', 'Bird'
];

export const generateCards = (count: number): Card[] => {
  // Tomamos la mitad del totla para tener parejas
  const selectedIcons = ICON_POOL.slice(0, count / 2);

  const duplicatedCard = [...selectedIcons, ...selectedIcons].map((icon, index) => ({
    id: `${icon}-${index}-${Math.random()}`,
    iconName: icon,
    isFlipped: false,
    isMatched: false,
  }));

  // Algoritmo de barajado Fisher-Yates
  for (let i = duplicatedCard.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [duplicatedCard[i], duplicatedCard[j]] = [duplicatedCard[j], duplicatedCard[i]];
  }

  return shuffle(duplicatedCard);
}