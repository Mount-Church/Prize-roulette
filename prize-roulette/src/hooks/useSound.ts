import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSoundOptions {
  volume?: number;
  loop?: boolean;
  playbackRate?: number;
}

const useSound = (src: string, { volume = 0.5, loop = false, playbackRate = 1.0 }: UseSoundOptions = {}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // Create audio element
    const audioElement = new Audio(src);
    
    // Set initial properties
    audioElement.volume = volume;
    audioElement.loop = loop;
    audioElement.preload = 'auto';
    audioElement.load();
    
    // Store in ref and state
    audioRef.current = audioElement;
    setAudio(audioElement);

    // Cleanup
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
        audioElement.remove();
      }
      audioRef.current = null;
    };
  }, [src, loop, volume]);

  // Update volume when it changes
  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [audio, volume]);

  // Update playback rate when it changes
  useEffect(() => {
    if (audio) {
      audio.playbackRate = playbackRate;
    }
  }, [audio, playbackRate]);

  const play = useCallback(async () => {
    if (!audio) {
      console.error('Audio element not initialized');
      return;
    }
    
    try {
      // Reset audio to start if already playing
      if (isPlaying) {
        audio.currentTime = 0;
      } else {
        // For iOS devices, we need to play/pause first to enable audio
        await audio.play().catch(e => {
          console.log('Initial play failed, trying with play/pause workaround');
          audio.muted = true;
          return audio.play().then(() => {
            audio.pause();
            audio.muted = false;
            return audio.play();
          });
        });
      }
      
      // Play the audio
      await audio.play();
      setIsPlaying(true);
      
      // Only set ended handler if not looping
      if (!loop) {
        const handleEnded = () => setIsPlaying(false);
        audio.onended = handleEnded;
        return () => {
          audio.onended = null;
        };
      }
    } catch (error) {
      console.error('Error playing sound:', error);
      setIsPlaying(false);
    }
  }, [audio, isPlaying, loop]);

  const stop = useCallback(() => {
    if (!audio) return;
    
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }, [audio]);

  const pause = useCallback(() => {
    if (!audio) return;
    
    audio.pause();
    setIsPlaying(false);
  }, [audio]);

  return { play, stop, pause, isPlaying };
};

export default useSound;
