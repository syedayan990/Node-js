import { useCallback, useRef } from "react";

const useSound = () => {
  const ctxRef = useRef(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  };

  const beep = useCallback((freq, duration = 0.08, type = "sine", volume = 0.05) => {
    try {
      const ctx = getCtx();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = type;
      oscillator.frequency.value = freq;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    } catch {
      // Audio blocked/unsupported — fail silently
    }
  }, []);

  const playAdd = useCallback(() => beep(660, 0.08), [beep]);
  const playDelete = useCallback(() => beep(220, 0.12, "triangle"), [beep]);
  const playComplete = useCallback(() => beep(880, 0.1, "sine"), [beep]);

  return { playAdd, playDelete, playComplete };
};
export default useSound;