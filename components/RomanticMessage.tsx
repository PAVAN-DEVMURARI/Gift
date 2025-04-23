"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Heart, Music, Pause } from "lucide-react";

// Define fallback constants in case the import fails
const FALLBACK_LOVER_NAME = "Love";
const FALLBACK_MESSAGE = "Happy Anniversary! I'm so grateful for every moment we share together.";

export const RomanticMessage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    // Create audio element
    try {
      audioRef.current = new Audio('/music/anniversary-song.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.7; // Set volume to 70%
      
      // Preload the audio
      audioRef.current.preload = 'auto';
    } catch (error) {
      console.error('Error creating audio element:', error);
    }
    
    // Cleanup on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  // Toggle music playback
  const toggleMusic = () => {
    if (!audioRef.current) {
      console.error('Audio element not available');
      return;
    }
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Handle autoplay restrictions by using a Promise
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playback started successfully');
              setIsPlaying(true);
            })
            .catch(error => {
              console.error('Error playing audio:', error);
              alert('Could not play music. Please ensure your browser allows audio playback.');
            });
        }
      }
    } catch (error) {
      console.error('Error toggling audio playback:', error);
    }
  };
  
  useEffect(() => {
    if (containerRef.current && messageRef.current) {
      // Animate container entrance
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );
      
      try {
        // Try to import constants, use fallback if they don't exist
        let message = FALLBACK_MESSAGE;
        try {
          const constants = require('@/lib/constants');
          if (constants && constants.ROMANTIC_MESSAGE) {
            message = constants.ROMANTIC_MESSAGE;
          }
        } catch (e) {
          console.warn('Could not load constants, using fallbacks');
        }
        
        // Animate text reveal character by character
        const messageElement = messageRef.current;
        messageElement.innerHTML = '';
        
        gsap.to({}, {
          duration: message.length * 0.05,
          onUpdate: function() {
            const progress = Math.floor(this.progress() * message.length);
            messageElement.innerHTML = message.substring(0, progress);
          }
        });
      } catch (error) {
        console.error('Error displaying message:', error);
        if (messageRef.current) {
          messageRef.current.innerHTML = 
            '<p class="text-rose-500">Something went wrong displaying the message.</p>';
        }
      }
      
      // Create floating hearts
      const interval = setInterval(() => {
        if (containerRef.current) {
          createFloatingHeart(containerRef.current);
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  const createFloatingHeart = (container: HTMLElement) => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'absolute text-xl opacity-70';
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.bottom = '0';
    container.appendChild(heart);
    
    gsap.to(heart, {
      y: -1 * (100 + Math.random() * 300),
      x: (Math.random() - 0.5) * 100,
      opacity: 0,
      duration: 4 + Math.random() * 7,
      ease: "power1.out",
      onComplete: () => {
        if (container.contains(heart)) {
          container.removeChild(heart);
        }
      }
    });
  };
  
  // Get lover name safely
  const getLoverName = () => {
    try {
      const constants = require('@/lib/constants');
      return (constants && constants.LOVER_NAME) || FALLBACK_LOVER_NAME;
    } catch (e) {
      return FALLBACK_LOVER_NAME;
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 dark:from-rose-900 dark:via-pink-900 dark:to-purple-950"
    >
      <div className="max-w-xl w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-pink-200 dark:border-rose-800">
        <h2 className="font-serif text-3xl md:text-4xl text-rose-600 dark:text-rose-300 mb-6 text-center flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 fill-rose-500 text-rose-500" />
          For My {getLoverName()}
          <Heart className="h-6 w-6 fill-rose-500 text-rose-500" />
        </h2>
        
        <div 
          ref={messageRef}
          className="prose dark:prose-invert max-w-none mb-8 text-center text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed"
        >
          {/* Message will be inserted here by the animation */}
        </div>
        
        {/* Music Control Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleMusic}
            className="p-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg transition-all flex items-center gap-2"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <>
                <Pause size={20} />
                <span>Pause Music</span>
              </>
            ) : (
              <>
                <Music size={20} />
                <span>Play Song</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RomanticMessage;