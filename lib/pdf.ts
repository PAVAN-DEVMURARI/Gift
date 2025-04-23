"use client";

import { TOP_MOMENTS, LOVER_NAME } from "./constants";

export const generatePDF = async () => {
  // Dynamically import html2pdf only on client side
  const html2pdf = (await import('html2pdf.js')).default;
  
  // Create a new div to render the PDF content
  const element = document.createElement("div");
  element.style.padding = "20px";
  element.style.fontFamily = "Arial, sans-serif";
  element.style.maxWidth = "700px";
  element.style.margin = "0 auto";
  
  // Add title and styling
  element.innerHTML = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #E53E3E; font-size: 24px; margin-bottom: 5px;">Our Top 5 Moments</h1>
      <h2 style="color: #718096; font-size: 18px; font-weight: normal; margin-top: 0;">A special gift for ${LOVER_NAME}</h2>
    </div>
  `;
  
  // Add each moment with styling
  TOP_MOMENTS.forEach((moment, index) => {
    element.innerHTML += `
      <div style="margin-bottom: 25px; padding-bottom: 15px; border-bottom: ${index < TOP_MOMENTS.length - 1 ? '1px solid #E2E8F0' : 'none'};">
        <h3 style="color: #4A5568; font-size: 18px; margin-bottom: 5px;">${index + 1}. ${moment.title}</h3>
        <p style="color: #4A5568; margin-bottom: 5px;">${moment.description}</p>
        <p style="color: #718096; font-style: italic; font-size: 14px;">${moment.date}</p>
      </div>
    `;
  });
  
  // Add footer
  element.innerHTML += `
    <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #718096;">
      <p>Created with love on our anniversary ❤️</p>
    </div>
  `;
  
  // Temporarily append to document to render
  document.body.appendChild(element);
  
  // Configure pdf options
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: "our-top-moments.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  
  // Generate PDF
  html2pdf().set(opt).from(element).save().then(() => {
    // Remove the temporary element
    document.body.removeChild(element);
  });
};