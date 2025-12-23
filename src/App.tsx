import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from './store/useGameStore';
import { Board } from './features/game/components/Board';
import { ScoreBoard } from './features/game/components/ScoreBoard';
import './styles/index.css';

function App() {
  const { initGame, status } = useGameStore(
    useShallow((state) => ({
      initGame: state.initGame,
      status: state.status,
    }))
  );

  useEffect(() => {
    initGame(8); // Iniciar por defecto con 8 cartas
  }, [initGame]);

  useEffect(() => {
    if (status === 'won') {
      // !Disparar el confetti!
      // Usamos colores índigo para que coincidan con el tema
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#818cf8', '#a5b4fc', '#fbbf24'],
        ticks: 300,
      });

      //Lanzar fuegos artificiales laterales después de un momento
      setTimeout(() => {
        const end = Date.now() + 1 * 1000;
        // define colors
        const colors = ['#4f46e5', '#fbbf24'];

        (function frame() {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      }, 500);
    }
  }, [status])

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-center text-indigo-900 mb-10 tracking-tight">
          MEMORY<span className="text-indigo-500">GAME</span>
        </h1>
        
        <ScoreBoard />
        <Board />

        {/* Mensaje de victoria */}
        {status === 'won' && (
          <p className="text-center text-2xl font-bold text-indigo-600 mt-8 animate-bounce">
            ¡Felicidades! ¡Has ganado! 🎉
          </p>
        )}
      </div>
    </div>
  );
}

export default App;