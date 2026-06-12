"use client";

import React, { useEffect, useState } from "react";

/**
 * @file components/journal/ReadingProgress.tsx
 * @description A subtle gold progress bar fixed to the top of the viewport during reading.
 */

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollableDistance = documentHeight - windowHeight;
      
      if (scrollableDistance > 0) {
        setProgress((scrollY / scrollableDistance) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div 
        className="h-full bg-[var(--color-gold-400)] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
