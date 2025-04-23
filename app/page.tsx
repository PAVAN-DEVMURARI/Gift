"use client";

import { useState } from "react";
import AnniversaryFlow from "@/components/AnniversaryFlow";

export default function Home() {
  const [flowCompleted, setFlowCompleted] = useState(false);
  
  // Handle flow completion
  const handleFlowCompleted = () => {
    console.log("Flow completed, showing main content");
    setFlowCompleted(true);
  };

  return (
    <main className="min-h-screen">
      {!flowCompleted ? (
        <AnniversaryFlow onCompleted={handleFlowCompleted} />
      ) : (
        // Your main content here after the anniversary flow is completed
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-200 to-purple-100">
          <h1 className="text-3xl font-bold text-rose-600">
            Thank you for celebrating our anniversary!
          </h1>
        </div>
      )}
    </main>
  );
}