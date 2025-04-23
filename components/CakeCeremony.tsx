"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { LOVER_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Cake, Heart, CakeSlice } from "lucide-react";

interface CakeCeremonyProps {
  onComplete: () => void;
  className?: string;
}

export const CakeCeremony = ({ onComplete, className }: CakeCeremonyProps) => {
  const [isLit, setIsLit] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate cake entrance
    if (cakeRef.current) {
      gsap.fromTo(
        cakeRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
      );
    }
    
    // Auto-light candles after 1.5 seconds
    const timer = setTimeout(() => {
      setIsLit(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleMakeWish = () => {
    if (!isCelebrating) {
      setIsLit(false);
      setIsCelebrating(true);
      
      // Create celebration effects
      if (containerRef.current) {
        // Create hearts
        for (let i = 0; i < 15; i++) {
          createHeart(containerRef.current);
        }
      }
      
      // Continue to next stage after celebration
      setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            y: -50,
            duration: 1,
            onComplete
          });
        } else {
          onComplete();
        }
      }, 3000);
    }
  };
  
  const createHeart = (container: HTMLElement) => {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'absolute text-2xl';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    container.appendChild(heart);
    
    gsap.fromTo(heart, 
      { 
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        y: -100 - Math.random() * 100,
        x: (Math.random() - 0.5) * 100,
        rotate: Math.random() * 360,
        duration: 2,
        ease: "power1.out",
        onComplete: () => { container.removeChild(heart); }
      }
    );
  };
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-8",
        className
      )}
    >
      <h2 className="font-serif text-3xl md:text-4xl text-rose-600 dark:text-rose-300 mb-8 text-center">
        Happy Anniversary, {LOVER_NAME}!
      </h2>
      
      <div 
        ref={cakeRef}
        className="relative w-64 h-72 mb-12"
      >
        {/* Cake plate */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        
        {/* Cake layers */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-24 bg-pink-200 dark:bg-pink-900 rounded-lg"></div>
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-40 h-20 bg-pink-300 dark:bg-pink-800 rounded-lg"></div>
        <div className="absolute bottom-48 left-1/2 -translate-x-1/2 w-32 h-16 bg-pink-400 dark:bg-pink-700 rounded-lg"></div>
        
        {/* Frosting */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-48 h-4 bg-white dark:bg-gray-200 rounded-full"></div>
        <div className="absolute bottom-48 left-1/2 -translate-x-1/2 w-40 h-4 bg-white dark:bg-gray-200 rounded-full"></div>
        <div className="absolute bottom-[64px] left-1/2 -translate-x-1/2 w-32 h-4 bg-white dark:bg-gray-200 rounded-full"></div>
        
        {/* Decorations */}
        <div className="absolute bottom-[75px] left-1/3 w-3 h-3 rounded-full bg-red-500"></div>
        <div className="absolute bottom-[78px] left-2/3 w-3 h-3 rounded-full bg-blue-500"></div>
        <div className="absolute bottom-[45px] left-[45%] w-3 h-3 rounded-full bg-green-500"></div>
        
        {/* Candles */}
        <div className="absolute bottom-[64px] left-[40%] w-2 h-12 bg-yellow-200 dark:bg-yellow-300 rounded-sm"></div>
        <div className="absolute bottom-[64px] left-[50%] w-2 h-10 bg-yellow-200 dark:bg-yellow-300 rounded-sm"></div>
        <div className="absolute bottom-[64px] left-[60%] w-2 h-14 bg-yellow-200 dark:bg-yellow-300 rounded-sm"></div>
        
        {/* Flames */}
        {isLit && (
          <>
            <div className="absolute bottom-[76px] left-[40%] w-4 h-6 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-300"></div>
            <div className="absolute bottom-[74px] left-[50%] w-4 h-6 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-300"></div>
            <div className="absolute bottom-[78px] left-[60%] w-4 h-6 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-300"></div>
          </>
        )}
      </div>
      
      <Button 
        onClick={handleMakeWish}
        disabled={!isLit || isCelebrating}
        className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
      >
        <CakeSlice className="w-5 h-5" />
        Make a Wish
      </Button>
      
      {isCelebrating && (
        <div className="mt-8 text-center animate-bounce">
          <p className="text-xl font-medium text-rose-600 dark:text-rose-400">
            Your wish has been granted! ✨
          </p>
        </div>
      )}
    </div>
  );
};

export default CakeCeremony;