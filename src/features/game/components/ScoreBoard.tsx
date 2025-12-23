import { useGameStore } from '../../../store/useGameStore';
import { useTimer } from '../../../hooks/useTimer';
import { RotateCcw, Timer, Hash, PlayIcon } from 'lucide-react';

export const ScoreBoard = () => {
  const { moves, resetGame, difficulty, initGame, bestScore, startGame, status, mode } = useGameStore();
  const { formatTime } = useTimer();

  return (
    <div className="flex flex-col items-center gap-6 mb-8 w-full">
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => initGame(difficulty, 'icons')}
          className={`px-3 py-1 rounded ${mode === 'icons' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Modo Offline (Iconos)
        </button>
        <button 
          onClick={() => initGame(difficulty, 'images')}
          className={`px-3 py-1 rounded ${mode === 'images' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Modo Online (Imágenes)
        </button>
      </div>
      <div className="flex gap-8 bg-white p-4 rounded-2xl shadow-md border border-indigo-100">
        <div className="flex items-center gap-2">
          <Hash className="text-indigo-500" size={20} />
          <span className="font-bold text-gray-700">Movimientos: {moves}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="text-indigo-500" size={20} />
          <span className="font-mono font-bold text-gray-700">{formatTime()}</span>
        </div>
      </div>

      <span className="text-xs uppercase text-gray-400 font-bold">Récord:</span>
      <span className="font-bold text-indigo-600">
        {bestScore === Infinity ? '--:--' : `${Math.floor(bestScore / 60)}:${(bestScore % 60).toString().padStart(2, '0')}`}
      </span>
      <div className="flex gap-4">
        <select 
          onChange={(e) => initGame(Number(e.target.value))}
          className="bg-white border-2 border-indigo-200 rounded-lg px-4 py-2 outline-none focus:border-indigo-500"
          value={difficulty}
        >
          <option value={8}>Fácil (8)</option>
          <option value={16}>Medio (16)</option>
          <option value={24}>Difícil (24)</option>
        </select>

        <div className="flex gap-4">
          {status === 'idle' ? (
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-bold shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 flex-row"
            >
              <PlayIcon size={28} />
              ¡Empezar Juego!
            </button>
          ) : (
            <button
              onClick={resetGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 flex-row"
            >
              <RotateCcw size={18} />
              Reiniciar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};