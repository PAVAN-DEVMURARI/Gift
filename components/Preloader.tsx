"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

// Dynamically import Lottie with ssr disabled
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false // Disable server-side rendering
});

interface PreloaderProps {
  onLoaded?: () => void;
}

const Preloader = ({ onLoaded }: PreloaderProps) => {
  const [animationData, setAnimationData] = useState(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Use fetch instead of import for JSON files
    fetch('/animations/heart-loader.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load animation file');
        }
        return response.json();
      })
      .then(data => setAnimationData(data))
      .catch((err) => {
        console.error("Failed to load animation:", err);
        setLoadFailed(true);
      });
      
    // Simulate loading progress with a smoother progression
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // More predictable progress increments
        const increment = (100 - prev) * 0.1;
        return Math.min(prev + increment, 100);
      });
    }, 200);
    
    // Call onLoaded callback when provided
    if (onLoaded) {
      const loadedTimer = setTimeout(onLoaded, 4000);
      return () => {
        clearTimeout(loadedTimer);
        clearInterval(progressInterval);
      };
    }
    
    return () => {
      clearInterval(progressInterval);
    };
  }, [onLoaded]);

  const PreloaderAnimation = () => {
    if (loadFailed || !animationData) {
      // Elegant fallback heart animation
      return (
        <div className="flex items-center justify-center h-full w-full">
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart
                size={100} 
                className="text-rose-500" 
                fill="#f43f5e"
                strokeWidth={1}
              />
            </motion.div>
          </div>
        </div>
      );
    }
    
    // Enhanced Lottie animation with simpler styling
    return (
      <div className="relative">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 220, height: 220 }}
          />
        </motion.div>
      </div>
    );
  };
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-rose-100 via-pink-200 to-purple-100 dark:from-rose-900 dark:via-pink-800 dark:to-purple-900 z-50">
      <div className="text-center z-10">
        <PreloaderAnimation />
        
        {/* Anniversary message - large, prominent and elegant */}
        <motion.h1
          className="mt-6 text-3xl font-serif font-bold text-rose-700 dark:text-rose-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          
        </motion.h1>
      </div>
      
      {/* Heartbeat line animation */}
      <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center">
        <div className="w-64 h-20 relative">
          <svg 
            viewBox="0 0 400 100" 
            className="w-full h-full"
          >
            <motion.path
              d="M0,50 L50,50 L70,20 L90,80 L110,20 L130,80 L150,20 L170,50 L400,50"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                stroke: ["#f43f5e", "#fb7185", "#f43f5e"] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </svg>
          
          {/* Heartbeat pulse dot */}
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-rose-500"
            style={{ top: "calc(50% - 8px)" }}
            animate={{ 
              x: ["0%", "100%"],
              scale: [1, 1.2, 1, 1.5, 1]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>
      </div>
      
      {/* Remove all the rounded elements - the progress bar and particles */}
      <style jsx global>{`
        /* Hide any default rounded borders that might be applied by the Lottie animation */
        .lottie-container div {
          border-radius: 0 !important;
        }
      `}</style>
    </div>
  );
};

export { Preloader };
export default Preloader;