"use client";

import { useState, useEffect, useRef } from "react";
import { BACKGROUND_MUSIC_URL } from "@/lib/constants";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create audio element
      const audio = new Audio(BACKGROUND_MUSIC_URL);
      audio.loop = true;
      audioRef.current = audio;
      
      // Auto-play with user interaction (first click anywhere)
      const handleFirstInteraction = () => {
        playAudio();
        document.removeEventListener("click", handleFirstInteraction);
      };
      
      document.addEventListener("click", handleFirstInteraction);
      
      return () => {
        document.removeEventListener("click", handleFirstInteraction);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, []);
  
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Failed to play audio:", err));
    }
  };
  
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <button 
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="w-10 h-10 flex items-center justify-center bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      
      <button 
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
};

export default MusicPlayer;