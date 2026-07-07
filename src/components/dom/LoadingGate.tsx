"use client";

import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';

export default function LoadingGate() {
  const isLoaded = usePortfolioStore((state) => state.isLoaded);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental values to make it feel natural
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Hide loader when the Three.js assets are loaded and simulated progress reaches 100%
  const isFullyDone = isLoaded && progress >= 100;

  if (isFullyDone) return null;

  return (
    <div 
      className="loading-overlay" 
      style={{ 
        opacity: isFullyDone ? 0 : 1,
        pointerEvents: isFullyDone ? 'none' : 'auto'
      }}
    >
      <h1 className="loader-title text-gradient">DANYAL TANVEER</h1>
      
      <div className="loader-bar-bg">
        <div 
          className="loader-bar-fill" 
          style={{ width: `${Math.min(progress, 100)}%` }} 
        />
      </div>
      
      <div className="loader-subtitle">
        INITIALIZING 3D BUILD CORRIDOR... {Math.min(progress, 100)}%
      </div>
    </div>
  );
}
