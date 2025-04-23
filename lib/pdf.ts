"use client";

// Import using the correct export name
import { TOP_MOMENTS, LOVER_NAME } from "./constants";

export const generatePDFContent = () => {
  // Create content without downloading
  const contentHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #E53E3E; font-size: 24px; margin-bottom: 5px;">Our Top 5 Moments</h1>
      <h2 style="color: #718096; font-size: 18px; font-weight: normal; margin-top: 0;">A special gift for ${LOVER_NAME}</h2>
    </div>
    
    ${TOP_MOMENTS.map((moment, index) => `
      <div style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: ${index < TOP_MOMENTS.length - 1 ? '1px solid #E2E8F0' : 'none'};">
        <h3 style="color: #4A5568; font-size: 18px; margin-bottom: 5px;">${index + 1}. ${moment.title}</h3>
        <p style="color: #4A5568; margin-bottom: 5px;">${moment.description}</p>
        <p style="color: #718096; font-style: italic; font-size: 14px;">${moment.date}</p>
      </div>
    `).join('')}
    
    <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #718096;">
      <p>Created with love on our anniversary ❤️</p>
    </div>
  `;
  
  return contentHTML;
};