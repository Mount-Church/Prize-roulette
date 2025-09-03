import { useState, useEffect, useCallback } from 'react';

const useSound = (src: string, volume = 0.5) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = new Audio(src);
    audioElement.volume = volume;
    setAudio(audioElement);

    return () => {
      audioElement.pause();
      audioElement.remove();
    };
  }, [src, volume]);

  const play = useCallback(() => {
    if (!audio) return;
    
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.error('Erro ao reproduzir som:', error);
    });
    setIsPlaying(true);
    
    audio.onended = () => {
      setIsPlaying(false);
    };
  }, [audio]);

  const stop = useCallback(() => {
    if (!audio) return;
    
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }, [audio]);

  return { play, stop, isPlaying };
};

export default useSound;
