"use client";

import { useState, useEffect } from "react";
import Preloader from "./Preloader";
import RoseBouquet from "./RoseBouquet";
import CakeCutting from "./CakeCutting";
import RomanticMessage from "./RomanticMessage";  // Import the next component in the flow

enum FlowStep {
  PRELOADER,
  ROSE_BOUQUET,
  CAKE_CUTTING,
  ROMANTIC_MESSAGE,  // Add this step
  COMPLETED
}

interface AnniversaryFlowProps {
  onCompleted?: () => void;
}

const AnniversaryFlow = ({ onCompleted }: AnniversaryFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>(FlowStep.PRELOADER);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // This useEffect ensures we don't have multiple components rendering at once
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  
  // Handler for preloader completion
  const handlePreloaderComplete = () => {
    console.log("Preloader complete, moving to Rose Bouquet");
    setIsTransitioning(true);
    setCurrentStep(FlowStep.ROSE_BOUQUET);
  };
  
  // Handler for rose bouquet presentation completion
  const handleBouquetContinue = () => {
    console.log("Bouquet presented, moving to Cake Cutting");
    setIsTransitioning(true);
    setCurrentStep(FlowStep.CAKE_CUTTING);
  };
  
  // Handler for cake cutting completion
  const handleCakeCuttingComplete = () => {
    console.log("Cake cutting complete, showing romantic message");
    setIsTransitioning(true);
    setCurrentStep(FlowStep.ROMANTIC_MESSAGE); // Change this to go to romantic message
  };
  
  // Handler for romantic message completion
  const handleRomanticMessageComplete = () => {
    console.log("Romance complete, completing journey");
    setIsTransitioning(true);
    setCurrentStep(FlowStep.COMPLETED);
    
    if (onCompleted) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        onCompleted();
      }, 300);
    }
  };
  
  return (
    <>
      {currentStep === FlowStep.PRELOADER && !isTransitioning && (
        <Preloader onLoaded={handlePreloaderComplete} />
      )}
      
      {currentStep === FlowStep.ROSE_BOUQUET && !isTransitioning && (
        <RoseBouquet onContinue={handleBouquetContinue} />
      )}
      
      {currentStep === FlowStep.CAKE_CUTTING && !isTransitioning && (
        <CakeCutting onComplete={handleCakeCuttingComplete} />
      )}
      
      {currentStep === FlowStep.ROMANTIC_MESSAGE && !isTransitioning && (
        <RomanticMessage />
      )}
      
      {/* Debug message to help troubleshoot */}
      {isTransitioning && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-200 to-purple-100 dark:from-rose-950 dark:via-purple-900 dark:to-pink-900 z-50">
          <p className="text-rose-600 dark:text-rose-400 text-xl">Loading next step...</p>
        </div>
      )}
    </>
  );
};

export default AnniversaryFlow;
