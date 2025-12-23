import { useGameStore } from '../../../store/useGameStore';
import { useTimer } from '../../../hooks/useTimer';
import { RotateCcw, Timer, Hash, PlayIcon, Trophy } from 'lucide-react';
import { LeaderboardModal } from './LeaderboardModal';
import { useState } from 'react';

export const ScoreBoard = () => {
  const { moves, resetGame, difficulty, initGame, bestScore, startGame, status, mode, isDarkMode } = useGameStore();
  const { formatTime } = useTimer();
  const [openLeaderboard, setOpenLeaderboard] = useState(false);

  const handleOpenLeaderboard = () => {
    setOpenLeaderboard(true);
  };

  const handleCloseLeaderboard = () => {
    setOpenLeaderboard(false);
  }

  return (
    <div className="flex flex-col items-center gap-6 mb-8 w-full">
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => initGame(difficulty, 'icons')}
          className={`px-3 py-1 rounded ${mode === 'icons' ? 'bg-indigo-600 text-white' : isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}
        >
          Modo Offline (Iconos)
        </button>
        <button 
          onClick={() => initGame(difficulty, 'images')}
          className={`px-3 py-1 rounded ${mode === 'images' ? 'bg-indigo-600 text-white' : isDarkMode ? 'bg-gray-500' : 'bg-gray-200'}`}
        >
          Modo Online (Imágenes)
        </button>
      </div>
      <div className={`flex gap-8 p-4 rounded-2xl shadow-md border ${isDarkMode ? 'bg-indigo-900 border-white' : 'bg-white border-indigo-100'}`}>
        <div className="flex items-center gap-2">
          <Hash className={`${isDarkMode ? 'text-white' : 'text-indigo-600'}`} size={20} />
          <span className={`font-bold text-gray-700 ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>Movimientos: {moves}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className={`${isDarkMode ? 'text-white' : 'text-indigo-600'}`} size={20} />
          <span className={`font-bold text-gray-700 font-mono ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>{formatTime()}</span>
        </div>
      </div>
      <div>
        <span className="text-md uppercase text-gray-400 font-bold">Récord: </span>
        <span className="font-bold text-indigo-600">
          {bestScore === Infinity ? '--:--' : `${Math.floor(bestScore / 60)}:${(bestScore % 60).toString().padStart(2, '0')}`}
        </span>
      </div>
      <button className={`${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-600'} text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 flex-row transition-all duration-300 hover:scale-105`} onClick={handleOpenLeaderboard}>
        <Trophy size={20} />
        Ver Records
      </button>
      <div className="flex gap-4">
        <select 
          onChange={(e) => initGame(Number(e.target.value))}
          className={`border-2 border-indigo-200 rounded-lg px-4 py-2 outline-none focus:border-indigo-500 transition-all duration-300 ${isDarkMode ? 'bg-neutral-900': 'bg-white'}`}
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
      <LeaderboardModal isOpen={openLeaderboard} onClose={handleCloseLeaderboard} />
    </div>
  );
};