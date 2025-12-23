import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Timer, Hash } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal = ({ isOpen, onClose }: Props) => {
  const { scores, isDarkMode } = useGameStore();

  const getTrophyColor = (index: number) => {
    switch (index) {
      case 0: return 'text-yellow-400'; // Oro
      case 1: return 'text-slate-300';  // Plata
      case 2: return 'text-amber-600';  // Bronce
      default: return 'text-slate-500';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border ${
              isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-indigo-100'
            }`}
          >
            {/* Header */}
            <div className={`p-6 flex justify-between items-center border-b ${
              isDarkMode ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <h2 className="text-2xl font-black flex items-center gap-2">
                <Trophy className="text-yellow-500" /> TOP 10 RANKING
              </h2>
              <button onClick={onClose} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            {/* List */}
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {scores.length === 0 ? (
                <p className="text-center py-8 text-slate-500 italic">Aún no hay récords. ¡Sé el primero!</p>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-slate-400">
                      <th className="pb-4 px-2">Pos</th>
                      <th className="pb-4">Fecha</th>
                      <th className="pb-4 text-center"><Timer size={14} /></th>
                      <th className="pb-4 text-center"><Hash size={14} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score, index) => (
                      <tr key={score.id} className={`group ${
                        isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-indigo-50'
                      } transition-colors`}>
                        <td className="py-3 px-2 font-bold">
                          {index < 3 ? (
                            <Trophy size={18} className={getTrophyColor(index)} />
                          ) : (
                            <span className="text-slate-500 ml-1">{index + 1}</span>
                          )}
                        </td>
                        <td className="py-3">
                          <div className="flex flex-col">
                            <span className="text-xs font-medium">{score.date.split(',')[0]}</span>
                            <span className="text-[10px] text-slate-500">{score.date.split(',')[1]}</span>
                          </div>
                        </td>
                        <td className="py-3 text-center font-mono font-bold text-indigo-500">
                          {score.seconds}s
                        </td>
                        <td className="py-3 text-center text-sm font-medium">
                          {score.moves} mov
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};