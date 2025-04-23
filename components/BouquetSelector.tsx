"use client";

import { useState, useEffect, useRef } from "react";
import { ROSE_COLORS } from "@/lib/constants";
import { animateRoseToVase } from "@/lib/animations";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { ChevronRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface BouquetSelectorProps {
  onComplete: () => void;
  className?: string;
}

export const BouquetSelector = ({ onComplete, className }: BouquetSelectorProps) => {
  const [selectedRoses, setSelectedRoses] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const vaseRef = useRef<HTMLDivElement>(null);
  const colorRefs = useRef<Map<string, HTMLDivElement | HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const handleRoseSelect = (roseId: string) => {
    if (isAnimating || selectedRoses.includes(roseId)) return;
    
    const roseElement = colorRefs.current.get(roseId);
    const vaseElement = vaseRef.current;
    
    if (roseElement && vaseElement) {
      setIsAnimating(true);
      
      // Create a clone for the animation
      const clone = roseElement.cloneNode(true) as HTMLDivElement;
      const bounds = roseElement.getBoundingClientRect();
      
      clone.style.position = "absolute";
      clone.style.left = `${bounds.left}px`;
      clone.style.top = `${bounds.top}px`;
      clone.style.width = `${bounds.width}px`;
      clone.style.height = `${bounds.height}px`;
      clone.style.zIndex = "50";
      
      document.body.appendChild(clone);
      
      // Add the rose ID immediately to show in the bouquet
      setSelectedRoses((prev) => [...prev, roseId]);
      
      animateRoseToVase(clone, vaseElement, () => {
        document.body.removeChild(clone);
        setIsAnimating(false);
      });
    }
  };

  const handleConfirm = () => {
    if (selectedRoses.length > 0) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power2.in",
        onComplete,
      });
    }
  };

  const setColorRef = (id: string, ref: HTMLDivElement | HTMLButtonElement | null) => {
    if (ref) {
      colorRefs.current.set(id, ref);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "min-h-screen flex flex-col items-center justify-center py-10 px-4",
        className
      )}
    >
      <h2 className="font-serif text-3xl md:text-4xl text-rose-600 dark:text-rose-300 mb-6 text-center">
        Create a Bouquet of Love
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        Select rose colors to build a bouquet. Each color represents a different aspect of our love.
      </p>
      
      <div className="flex flex-col items-center mb-10">
        {/* Vase with enhanced styling */}
        <div 
          ref={vaseRef}
          className="relative w-40 h-48 mx-auto mb-4"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-40 bg-blue-100 dark:bg-blue-900 rounded-b-full rounded-t-xl overflow-hidden border-2 border-blue-200 dark:border-blue-800 opacity-70">
            {/* Water effect */}
            <div className="absolute w-full bottom-0 h-3/4 bg-blue-300/30 dark:bg-blue-700/30"></div>
          </div>
          
          {/* Improved flower stems with better positioning */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
            {selectedRoses.map((roseId, index) => {
              const rose = ROSE_COLORS.find(r => r.id === roseId);
              if (!rose) return null;
              
              // Calculate angle for stem positioning (fan out in semicircle)
              const totalRoses = selectedRoses.length;
              const angleRange = Math.min(120, 30 * totalRoses); // Max 120 degrees
              const angle = (index / (totalRoses - 1 || 1)) * angleRange - angleRange/2;
              const radians = (angle * Math.PI) / 180;
              const stemHeight = 20 + Math.random() * 12; // Varied heights
              
              // Position based on angle
              const offsetX = 16 * Math.sin(radians);
              const posX = 50 + offsetX;
              
              return (
                <div 
                  key={`${roseId}-${index}`} 
                  className="absolute"
                  style={{ 
                    left: `${posX}%`,
                    bottom: `${5 + Math.random() * 10}px`,
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "bottom center",
                    zIndex: 10 + index
                  }}
                >
                  {/* Stem with better thickness */}
                  <div className="w-1.5 h-32 bg-green-600 rounded"></div>
                  
                  {/* Rose with enhanced styling */}
                  <div 
                    className="w-10 h-10 rounded-full -mt-9 -ml-4 shadow-md animate-float"
                    style={{ 
                      backgroundColor: rose.color,
                      boxShadow: `0 3px 10px rgba(0,0,0,0.2), inset 0 -3px 10px rgba(0,0,0,0.1)`
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {selectedRoses.length > 0 
            ? `Selected ${selectedRoses.length} ${selectedRoses.length === 1 ? 'rose' : 'roses'}`
            : 'Tap a color to add it to your bouquet'}
        </p>
      </div>
      
      {/* Color selection grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg mb-10">
        {ROSE_COLORS.map((rose) => (
          <TooltipProvider key={rose.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  ref={(ref) => setColorRef(rose.id, ref)}
                  onClick={() => handleRoseSelect(rose.id)}
                  className={cn(
                    "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500",
                    selectedRoses.includes(rose.id) ? "opacity-50 cursor-default" : "cursor-pointer"
                  )}
                  style={{ 
                    backgroundColor: rose.color,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    border: rose.id === "white" ? "2px solid #E2E8F0" : "none"
                  }}
                  disabled={selectedRoses.includes(rose.id)}
                  aria-label={`Select ${rose.name} rose, meaning: ${rose.meaning}`}
                >
                  <Info className="w-5 h-5 text-white opacity-80" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="p-4 max-w-xs">
                <p className="font-bold text-base">{rose.name} Rose</p>
                <p className="text-sm">{rose.meaning}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      
      <Button 
        onClick={handleConfirm}
        disabled={selectedRoses.length === 0}
        variant="default"
        size="lg"
        className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-6 text-lg rounded-full font-medium"
      >
        Confirm Bouquet <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default BouquetSelector;