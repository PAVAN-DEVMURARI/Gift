"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface RoseBouquetProps {
  onContinue: () => void;
}

const RoseBouquet = ({ onContinue }: RoseBouquetProps) => {
  const [showBouquet, setShowBouquet] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBouquet(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tl from-rose-100 via-pink-100 to-red-50 dark:from-rose-900 dark:via-pink-900 dark:to-red-950 z-50">
      <div className="max-w-md w-full p-6 text-center">
        {/* Anniversary Message - Main Focus */}
        <motion.h2 
          className="text-4xl font-bold mb-8 text-rose-600 dark:text-rose-400 font-serif tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Happy Anniversary My Love
        </motion.h2>
        
        {/* Rose bouquet image */}
        <motion.div
          className="relative w-full h-80 mb-8 flex justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate={showBouquet ? "visible" : "hidden"}
        >
          {/* Decorative wrapper */}
          <div className="absolute inset-0 border-2 border-amber-300 rounded-full opacity-30"></div>
          
          {/* Image container with proper dimensions and styling */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg">
            <Image
              src="https://cdn.bloomsflora.com/uploads/product/flowers_n_fruits/1687421373_13140.png"
              alt="Bouquet of colorful roses"
              layout="fill"
              objectFit="cover"
              priority
              className="rounded-full"
            />

            {/* Add a subtle overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Golden ribbon */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16">
            <div className="absolute bottom-0 w-full h-8 bg-amber-100 rounded-lg border border-amber-300"></div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-16 flex">
              <div className="w-1/2 h-full bg-amber-200 rounded-l-full"></div>
              <div className="w-1/2 h-full bg-amber-300 rounded-r-full"></div>
            </div>
          </div>
          
          {/* Simple elegant glow around bouquet instead of sparkles */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle, rgba(244,114,182,0.2) 0%, rgba(251,207,232,0) 70%)"
            }}
          />
        </motion.div>
        
        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showBouquet ? 1 : 0, y: showBouquet ? 0 : 20 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <button
            onClick={onContinue}
            className="py-3 px-6 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors"
          >
            Continue to Celebrate
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default RoseBouquet;