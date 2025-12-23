import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Card as CardType } from '../types/game.types';
import { useGameStore } from '../../../store/useGameStore';
import clickSound from '../../../assets/sounds/clic-card.mp3'

interface Props {
  card: CardType;
}

export const CardIcon = ({ card }: Props) => {
  const mode = useGameStore((state) => state.mode);
  const flipCard = useGameStore((state) => state.flipCard);
  
  // Obtenemos el componente de icono dinámicamente
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = card.iconName ? (Icons as any)[card.iconName] : null;

  const handleClickCard = () => {
    // Solo suena y voltea si el juego está activo y la carta está boca abajo
    if (!card.isFlipped && !card.isMatched) {
      const audio = new Audio(clickSound);
      audio.volume = 0.5; // Ajustamos volumen
      audio.play().catch(e => console.log("Error al reproducir audio:", e));
      
      flipCard(card.id);
    }
  }

  return (
    <div 
      // Proporción rectangular: h-36 w-24 (relación 3:2 aproximada)
      className="relative h-28 w-28 sm:h-40 sm:w-40 cursor-pointer [perspective:1000px]"
      onClick={handleClickCard}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        // Transición más rápida: subimos stiffness (fuerza) y bajamos damping (freno)
        transition={{ 
          type: 'spring', 
          stiffness: 400, // Más alto = más rápido
          damping: 25,    // Equilibrio para que no rebote demasiado
          mass: 0.8       // Menos masa = más agilidad
        }}
      >
        {/* PARTE TRASERA (Cerrada) */}
        <div className="absolute inset-0 w-full h-full bg-indigo-600 rounded-xl shadow-xl border-2 border-white flex items-center justify-center [backface-visibility:hidden]">
          {/* Un patrón simple para que parezca el reverso de una carta */}
          <div className="w-16 h-24 border-2 border-indigo-400 rounded-lg opacity-30 flex items-center justify-center">
            <div className="w-8 h-8 bg-indigo-400 rounded-full" />
          </div>
        </div>

        {/* PARTE FRONTAL (Icono) */}
        <div className="absolute inset-0 w-full h-full bg-white rounded-xl shadow-xl border-2 border-indigo-600 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {mode === 'icons' && IconComponent ? (
            <IconComponent className="text-indigo-600 w-12 h-12" />
          ): (
            <img src={card.imageUrl} className="w-full h-full object-cover rounded-xl" alt="Card" />
          )}
        </div>
      </motion.div>
    </div>
  );
};