import { gsap } from "gsap";

// Confetti animation for cake cutting and message reveal
export const playConfetti = (elementRef: React.RefObject<HTMLDivElement>) => {
  if (!elementRef.current) return;
  
  const element = elementRef.current;
  const colors = ["#FFD700", "#FF69B4", "#FF6347", "#9370DB", "#20B2AA"];
  const confettiCount = 150;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "absolute w-2 h-2 rounded-full";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.zIndex = "50";
    element.appendChild(confetti);
    
    gsap.set(confetti, {
      x: Math.random() * element.offsetWidth,
      y: 0,
      opacity: 1,
      scale: Math.random() * 0.5 + 0.5,
    });
    
    gsap.to(confetti, {
      y: element.offsetHeight,
      x: `+=${Math.random() * 100 - 50}`,
      rotation: Math.random() * 360,
      opacity: 0,
      duration: Math.random() * 2 + 1,
      ease: "power2.out",
      onComplete: () => {
        if (element.contains(confetti)) {
          element.removeChild(confetti);
        }
      }
    });
  }
};

// Heart trail cursor animation
export const initHeartTrail = (container: HTMLElement | null) => {
  if (!container) return;
  
  container.addEventListener("mousemove", (e) => {
    createHeart(e, container);
  });
  
  container.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const event = { clientX: touch.clientX, clientY: touch.clientY };
    createHeart(event, container);
  });
};

const createHeart = (e: { clientX: number; clientY: number; }, container: HTMLElement) => {
  const heart = document.createElement("div");
  heart.className = "absolute w-4 h-4 text-pink-500 pointer-events-none";
  heart.innerHTML = "❤️";
  heart.style.zIndex = "50";
  
  const x = e.clientX;
  const y = e.clientY;
  
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  
  container.appendChild(heart);
  
  gsap.to(heart, {
    y: "-=100",
    opacity: 0,
    scale: 0.5,
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      if (container.contains(heart)) {
        container.removeChild(heart);
      }
    }
  });
};

// Fade in animation for sections
export const fadeInAnimation = (element: HTMLElement, delay: number = 0) => {
  gsap.fromTo(element, 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 0.8, delay, ease: "power2.out" }
  );
};

// Slice animation for cake
export const animateCakeSlice = (cakeRef: React.RefObject<HTMLDivElement>, knifeRef: React.RefObject<HTMLDivElement>, onComplete: () => void) => {
  if (!cakeRef.current || !knifeRef.current) return;
  
  const tl = gsap.timeline({ onComplete });
  
  // Move knife to starting position
  tl.to(knifeRef.current, {
    x: -50, 
    y: -100,
    rotation: -20,
    duration: 0.5
  });
  
  // Slice through cake
  tl.to(knifeRef.current, {
    x: 50,
    y: 50,
    rotation: 20,
    duration: 1,
    ease: "power2.inOut"
  });
  
  // Show slice separating
  tl.to(".cake-slice", {
    x: (i) => i % 2 === 0 ? -20 : 20,
    stagger: 0.1,
    duration: 0.5
  });
};

// Rose animation for bouquet builder
export const animateRoseToVase = (
  rose: HTMLElement, 
  vase: HTMLElement,
  onComplete: () => void
) => {
  const vaseRect = vase.getBoundingClientRect();
  const targetX = vaseRect.left + vaseRect.width / 2;
  const targetY = vaseRect.top + vaseRect.height / 4;

  gsap.timeline({ onComplete })
    .to(rose, {
      x: targetX - parseFloat(rose.style.left),
      y: targetY - parseFloat(rose.style.top),
      scale: 0.8,
      duration: 0.8,
      ease: "power2.inOut"
    })
    .to(rose, {
      y: targetY - parseFloat(rose.style.top) + 50,
      opacity: 0,
      scale: 0.5,
      duration: 0.3
    });
};

/**
 * Creates a confetti effect
 */
export const createConfetti = (container: HTMLElement) => {
  const colors = ["#FF5252", "#FFD740", "#64FFDA", "#536DFE", "#FF4081"];
  const confettiCount = 100;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "absolute w-2 h-2 rounded-sm";
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.backgroundColor = randomColor;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `-20px`;
    
    container.appendChild(confetti);
    
    gsap.to(confetti, {
      x: `${-50 + Math.random() * 100}%`,
      y: `${window.innerHeight}px`,
      rotation: Math.random() * 360,
      duration: 1 + Math.random() * 3,
      ease: "power1.out",
      onComplete: () => { container.removeChild(confetti); }
    });
  }
};