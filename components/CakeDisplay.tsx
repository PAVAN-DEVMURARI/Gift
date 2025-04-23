"use client";

import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { LOVER_NAME } from "@/lib/constants";

interface CakeDisplayProps {
  onComplete?: () => void;
  className?: string;
}

export const CakeDisplay = ({ onComplete, className }: CakeDisplayProps) => {
  const [isLit, setIsLit] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  
  useEffect(() => {
    // Animate cake entrance
    gsap.fromTo(
      ".cake-container",
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
    );
    
    // Auto-light candles after 1 second
    const timer = setTimeout(() => {
      setIsLit(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleLightCandles = () => {
    if (!isLit) {
      setIsLit(true);
    }
  };
  
  const handleBlowCandles = () => {
    if (isLit && !isCelebrating) {
      setIsLit(false);
      setIsCelebrating(true);
      
      // Animate celebration
      gsap.fromTo(
        ".celebration",
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5 }
      );
      
      // Show message and confetti
      gsap.to(".celebration-message", {
        opacity: 1, 
        y: -20, 
        duration: 1,
        delay: 0.3
      });
      
      // Trigger onComplete callback after celebration
      if (onComplete) {
        setTimeout(onComplete, 3000);
      }
    }
  };
  
  return (
    <div className={cn("flex flex-col items-center justify-center py-10 px-4", className)}>
      <h2 className="font-serif text-3xl md:text-4xl text-rose-600 dark:text-rose-300 mb-6 text-center">
        Happiest Anniversary, {LOVER_NAME}!
      </h2>
      
      <div className="cake-container relative w-64 h-80 mb-10">
        {/* Cake plate */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        
        {/* Cake body - using stacked layers for better appearance */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-24 bg-pink-200 dark:bg-pink-900 rounded-lg"></div>
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-40 h-20 bg-pink-300 dark:bg-pink-800 rounded-lg"></div>
        <div className="absolute bottom-48 left-1/2 -translate-x-1/2 w-32 h-16 bg-pink-400 dark:bg-pink-700 rounded-lg"></div>
        
        {/* Cake frosting */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-48 h-4 bg-white dark:bg-gray-200 rounded-lg"></div>
        <div className="absolute bottom-48 left-1/2 -translate-x-1/2 w-40 h-4 bg-white dark:bg-gray-200 rounded-lg"></div>
        <div className="absolute bottom-64 left-1/2 -translate-x-1/2 w-32 h-4 bg-white dark:bg-gray-200 rounded-lg"></div>
        
        {/* Hearts decoration */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-4 h-4 bg-red-500 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              bottom: `${20 + Math.random() * 50}%`,
              transform: "rotate(45deg)",
              boxShadow: "2px 0 0 #fff, 0 -2px 0 #fff"
            }}
          ></div>
        ))}
        
        {/* Candles */}
        <div className="absolute bottom-64 left-1/2 -translate-x-[30px] w-2 h-12 bg-blue-300 dark:bg-blue-400 rounded-sm"></div>
        <div className="absolute bottom-64 left-1/2 -translate-x-[10px] w-2 h-12 bg-pink-300 dark:bg-pink-400 rounded-sm"></div>
        <div className="absolute bottom-64 left-1/2 translate-x-[10px] w-2 h-12 bg-green-300 dark:bg-green-400 rounded-sm"></div>
        <div className="absolute bottom-64 left-1/2 translate-x-[30px] w-2 h-12 bg-purple-300 dark:bg-purple-400 rounded-sm"></div>
        
        {/* Candle flames */}
        {isLit && (
          <>
            <div className="absolute bottom-[19rem] left-1/2 -translate-x-[30px] w-4 h-6 bg-yellow-300 rounded-full animate-pulse-glow"></div>
            <div className="absolute bottom-[19rem] left-1/2 -translate-x-[10px] w-4 h-6 bg-yellow-300 rounded-full animate-pulse-glow"></div>
            <div className="absolute bottom-[19rem] left-1/2 translate-x-[10px] w-4 h-6 bg-yellow-300 rounded-full animate-pulse-glow"></div>
            <div className="absolute bottom-[19rem] left-1/2 translate-x-[30px] w-4 h-6 bg-yellow-300 rounded-full animate-pulse-glow"></div>
          </>
        )}
        
        {/* Celebration elements */}
        {isCelebrating && (
          <div className="celebration absolute inset-0 pointer-events-none">
            {/* Confetti */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-sm"
                style={{
                  backgroundColor: ['#FF5252', '#FFD740', '#64FFDA', '#536DFE'][Math.floor(Math.random() * 4)],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${1 + Math.random() * 3}s ease-in-out infinite`
                }}
              ></div>
            ))}
            
            {/* Celebration message */}
            <div className="celebration-message absolute top-0 left-0 right-0 text-center opacity-0">
              <p className="font-bold text-2xl text-rose-500">Wish Granted!</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Interactive buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleLightCandles}
          disabled={isLit}
          className={cn(
            "px-6 py-2 rounded-full font-medium",
            isLit 
              ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
              : "bg-amber-500 hover:bg-amber-600 text-white"
          )}
        >
          Light Candles
        </button>
        
        <button
          onClick={handleBlowCandles}
          disabled={!isLit || isCelebrating}
          className={cn(
            "px-6 py-2 rounded-full font-medium",
            !isLit || isCelebrating
              ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
              : "bg-blue-500 hover:bg-blue-600 text-white"
          )}
        >
          Make a Wish
        </button>
      </div>
    </div>
  );
};

export default CakeDisplay;
