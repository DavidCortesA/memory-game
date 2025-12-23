import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

export const useTimer = () => {
  // Leemos desde el store global
  const status = useGameStore((state) => state.status);
  const seconds = useGameStore((state) => state.seconds);
  const tick = useGameStore((state) => state.tick);

  useEffect(() => {
    let interval: number | undefined;

    if (status === 'playing') {
      interval = window.setInterval(() => {
        tick(); // Actualizamos el store
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, tick]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return { formatTime };
};