import { Sun, Moon } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useGameStore();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition-all duration-300 ${
        isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-indigo-600 shadow-md'
      }`}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};