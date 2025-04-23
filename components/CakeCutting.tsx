"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CakeCuttingProps {
  onComplete: () => void;
}

const CakeCutting = ({ onComplete }: CakeCuttingProps) => {
  const [isCutting, setIsCutting] = useState(false);
  const [isCut, setIsCut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showBlowingEffect, setShowBlowingEffect] = useState(false);
  
  // Rose colors for decoration
  const roseColors = ["#e11d48", "#ec4899", "#f8fafc", "#eab308", "#a855f7"];

  // Handle blowing out candles
  const handleBlowCandles = () => {
    setShowBlowingEffect(true);
    
    setTimeout(() => {
      setCandlesBlown(true);
      setShowBlowingEffect(false);
    }, 1500);
  };

  // Handle cake cutting animation
  const handleCakeCut = () => {
    if (isCutting || isCut) return;
    
    setIsCutting(true);
    
    // After animation completes
    setTimeout(() => {
      setIsCutting(false);
      setIsCut(true);
      setShowConfetti(true);
      
      // Hide confetti after some time
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }, 1500);
  };

  // Candle flame animation
  const flameVariants = {
    animate: {
      scaleY: [1, 1.2, 0.9, 1.1, 1],
      translateY: [0, -1, 0, -2, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Decorations falling animation
  const fallingDecorations = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    type: i % 3, // 0: heart, 1: star, 2: circle
    size: Math.random() * 10 + 10,
    color: roseColors[i % roseColors.length],
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-200 to-purple-100 dark:from-rose-950 dark:via-purple-900 dark:to-pink-900 z-50">
      <style jsx global>{`
        /* Hide any default rounded borders that might be applied by the Lottie animation */
        .lottie-container div {
          border-radius: 0 !important;
        }
      `}</style>

      {/* Add elegant decorative elements around the scene */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top left corner decoration */}
        <div className="absolute top-5 left-5">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <motion.path
              d="M5,5 Q40,20 60,60 T120,100"
              stroke="#ec4899"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
              d="M5,15 Q50,30 70,70 T120,110"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>
        </div>

        {/* Top right corner decoration */}
        <div className="absolute top-5 right-5">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ transform: 'scaleX(-1)' }}>
            <motion.path
              d="M5,5 Q40,20 60,60 T120,100"
              stroke="#ec4899"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
              d="M5,15 Q50,30 70,70 T120,110"
              stroke="#f43f5e"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>
        </div>

        {/* Decorative banner at the top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <motion.div 
            className="bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 py-3 px-8 shadow-lg"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-2xl font-serif font-bold text-white text-center">
              Happy Anniversary My Love
            </h1>
          </motion.div>
        </div>

        {/* Floating hearts */}
        {[...Array(8)].map((_, i) => {
          const size = 10 + Math.random() * 15;
          const startX = Math.random() * 100;
          const startY = 20 + Math.random() * 60;
          
          return (
            <motion.div
              key={`heart-${i}`}
              className="absolute"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${size}px`,
                height: `${size}px`,
                color: ["#e11d48", "#f43f5e", "#fb7185", "#fda4af"][i % 4],
              }}
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 1, 1, 0],
                rotate: [-10, 10, -10, 10, -10],
                opacity: [0, 0.7, 0.7, 0.7, 0],
                y: [0, -30, -60, -90, -120]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
              </svg>
            </motion.div>
          );
        })}

        {/* Side ribbons */}
        <div className="absolute left-0 top-1/3 bottom-1/3 w-3 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-300"></div>
        <div className="absolute right-0 top-1/3 bottom-1/3 w-3 bg-gradient-to-b from-rose-300 via-pink-400 to-rose-300"></div>

        {/* Sparkles */}
        {[...Array(20)].map((_, i) => {
          const size = 3 + Math.random() * 4;
          const delay = Math.random() * 5;
          const duration = 1.5 + Math.random() * 2;
          const x = 10 + Math.random() * 80;
          const y = 30 + Math.random() * 40;
          
          return (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute bg-yellow-300"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                borderRadius: i % 2 === 0 ? '50%' : '0',
                transform: i % 2 === 0 ? 'rotate(0deg)' : 'rotate(45deg)',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            />
          );
        })}
      </div>

      <div className="relative w-full max-w-md mx-auto px-4">
        {/* Decorations above the cake */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden h-40 pointer-events-none">
          {fallingDecorations.map((item) => (
            <motion.div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.x}%`,
                top: "-20px",
              }}
              initial={{ y: -50, opacity: 0, rotate: 0 }}
              animate={{
                y: [null, 200 + Math.random() * 100],
                opacity: [0, 1, 1, 0],
                rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 5,
                ease: "easeInOut",
              }}
            >
              {item.type === 0 && (
                <div
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    backgroundColor: item.color,
                    clipPath:
                      "path('M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z')",
                  }}
                />
              )}
              {item.type === 1 && (
                <div
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    backgroundColor: item.color,
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                />
              )}
              {item.type === 2 && (
                <div
                  className="rounded-full opacity-50"
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    border: `2px solid ${item.color}`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Cake display - adjusted for better visibility */}
        <div className="relative w-full h-80 mx-auto mb-10">
          {/* Base cake */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-40 bg-amber-100 rounded-t-full shadow-lg flex items-center justify-center overflow-hidden">
            {/* Cake layers */}
            <div className="absolute bottom-0 w-full h-32 bg-amber-200 rounded-t-full shadow-inner"></div>
            <div className="absolute bottom-0 w-11/12 h-24 bg-pink-200 rounded-t-full shadow-inner"></div>
            <div className="absolute bottom-0 w-10/12 h-16 bg-pink-300 rounded-t-full shadow-inner"></div>

            {/* Cake plate */}
            <div className="absolute -bottom-4 w-72 h-4 bg-gray-200 rounded-full shadow-md"></div>

            {/* Cake decorations */}
            <div className="absolute top-4 w-full flex justify-center space-x-8">
              {/* Candles with animated flames */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative">
                  <div className="w-2 h-12 bg-blue-300 rounded-sm"></div>
                  {!candlesBlown && (
                    <motion.div
                      className="absolute -top-4 w-3 h-5 bg-yellow-500 rounded-full filter blur-[2px]"
                      variants={flameVariants}
                      animate="animate"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Happy Anniversary text on cake */}
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full text-center">
              <p className="text-xs font-bold text-pink-600">Happy Anniversary</p>
            </div>
          </div>

          {/* Blowing effect - wind particles */}
          {showBlowingEffect && (
            <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`wind-${i}`}
                  className="absolute rounded-full bg-blue-100 dark:bg-blue-300"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    top: `${Math.random() * 20 - 10}px`,
                    left: "0px",
                    opacity: 0.7,
                  }}
                  animate={{
                    x: [0, 60 + Math.random() * 40],
                    opacity: [1, 0],
                    y: [
                      Math.random() * 20 - 10,
                      Math.random() * 40 - 20,
                    ],
                  }}
                  transition={{
                    duration: 1 + Math.random() * 0.5,
                  }}
                />
              ))}
            </div>
          )}

          {/* Knife for cutting */}
          {candlesBlown && !isCut && (
            <motion.div
              className="absolute right-1/4 bottom-1/3 w-20 h-4 bg-gray-300 rounded-r-lg z-20 shadow-md"
              animate={
                isCutting
                  ? {
                      x: [-50, -100],
                      y: [0, 50],
                      rotate: [0, -20],
                    }
                  : {}
              }
              transition={{ duration: 1.5 }}
            >
              <div className="absolute left-0 top-0 w-full h-1 bg-gray-100"></div>
              <div className="absolute right-full top-0 w-3 h-4 bg-gray-500 rounded-l-sm"></div>
            </motion.div>
          )}

          {/* Cake cut overlay */}
          {isCut && (
            <div className="absolute bottom-10 left-1/2 w-32 h-40 bg-gray-100 dark:bg-gray-800 opacity-20 rounded-tr-full"></div>
          )}
        </div>

        {/* Multi-colored rose decorations */}
        <div className="absolute top-10 left-10 flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: roseColors[i % roseColors.length] }}
            />
          ))}
        </div>
        <div className="absolute top-10 right-10 flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full"
              style={{
                backgroundColor: roseColors[(i + 2) % roseColors.length],
              }}
            />
          ))}
        </div>

        {/* Confetti overlay */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    roseColors[
                      Math.floor(Math.random() * roseColors.length)
                    ],
                  left: `${Math.random() * 100}%`,
                  top: "-5%",
                }}
                animate={{
                  y: ["0vh", "100vh"],
                  x: [
                    `${Math.random() * 20 - 10}px`,
                    `${Math.random() * 100 - 50}px`,
                  ],
                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  ease: "easeOut",
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </div>
        )}

        {/* Instructions and buttons */}
        <div className="mt-8 text-center p-4">
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {!candlesBlown
              ? "Make a wish and blow out the candles!"
              : !isCut
              ? "It's time to cut the cake together"
              : "You've made this day special!"}
          </p>

          <div className="flex justify-center">
            {!candlesBlown ? (
              <button
                onClick={handleBlowCandles}
                className="py-3 px-6 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
              >
                Blow Candles
              </button>
            ) : !isCut ? (
              <button
                onClick={handleCakeCut}
                className="py-3 px-6 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
              >
                Cut the Cake
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="py-3 px-6 rounded-lg bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
              >
                Continue Our Journey
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeCutting;
