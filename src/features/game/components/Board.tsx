import { useGameStore } from '../../../store/useGameStore';
import { CardIcon } from './CardIcon';

export const Board = () => {
  const { cards, difficulty } = useGameStore();

  // Ajustamos las columnas según la cantidad de cartas
  const gridCols = difficulty <= 8 ? 'grid-cols-4' : difficulty <= 16 ? 'grid-cols-4 sm:grid-cols-4' : 'grid-cols-4 sm:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-4 p-4 max-w-4xl mx-auto justify-items-center`}>
      {cards.map((card) => (
        <CardIcon key={card.id} card={card} />
      ))}
    </div>
  );
};