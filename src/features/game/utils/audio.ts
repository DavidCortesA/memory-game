import matchSfx from '../../../assets/sounds/correct-choice.mp3';
import errorSfx from '../../../assets/sounds/negative_beeps.mp3';
import winSfx from '../../../assets/sounds/success.mp3';
import resetSfx from '../../../assets/sounds/restart-game.mp3';
import startSfx from '../../../assets/sounds/start-game.mp3';


const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.5;
  audio.play().catch(() => {});
};

export const sounds = {
  match: () => playSound(matchSfx),
  error: () => playSound(errorSfx),
  win: () => playSound(winSfx),
  reset: () => playSound(resetSfx),
  start: () => playSound(startSfx),
}