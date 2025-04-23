"use client";

import { useState } from "react";
import Image from "next/image";

interface RoseSelectionProps {
  onColorSelected: (color: string) => void;
}

const RoseSelection = ({ onColorSelected }: RoseSelectionProps) => {
  const roseColors = [
    { name: "Red", value: "red", hex: "#e11d48" },
    { name: "Pink", value: "pink", hex: "#ec4899" },
    { name: "White", value: "white", hex: "#f8fafc" },
    { name: "Yellow", value: "yellow", hex: "#eab308" },
    { name: "Purple", value: "purple", hex: "#a855f7" },
  ];

  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="text-center max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Choose Your Favorite Roses
        </h2>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {roseColors.map((color) => (
            <div 
              key={color.value}
              className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 
                ${selectedColor === color.value 
                  ? "ring-4 ring-offset-2 ring-rose-500 scale-105" 
                  : "hover:scale-105"}`}
              onClick={() => handleColorSelect(color.value)}
            >
              <div 
                className="w-16 h-16 mx-auto rounded-full mb-2"
                style={{ backgroundColor: color.hex }}
              />
              <div 
                className="w-4 h-16 absolute -right-1 top-4 rounded-r-full"
                style={{ backgroundColor: "green" }}
              />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {color.name}
              </p>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => selectedColor && onColorSelected(selectedColor)}
          disabled={!selectedColor}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all
            ${selectedColor 
              ? "bg-rose-500 text-white hover:bg-rose-600" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"}`}
        >
          Continue with {selectedColor ? roseColors.find(c => c.value === selectedColor)?.name : ""} Roses
        </button>
      </div>
    </div>
  );
};

export default RoseSelection;
