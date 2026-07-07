"use client";

import React, { useEffect, useRef } from 'react';
import { usePortfolioStore } from '@/lib/store';

// Hex color presets for the 7 slides (Chapters 1 to 7)
const bgColors = [
  ['#030712', '#1e1b4b'], // Slide 0 (Hero): Deep Indigo/Black
  ['#0a0b10', '#1e293b'], // Slide 1 (Origin): Slate Blue/Dark Gray
  ['#020617', '#0f172a'], // Slide 2 (Skills): Dark Steel
  ['#0f051d', '#3b0764'], // Slide 3 (Flagships): Intense Purple
  ['#021c1e', '#115e59'], // Slide 4 (Research): Deep Teal/Emerald
  ['#180802', '#451a03'], // Slide 5 (Philosophy): Rust Amber
  ['#020617', '#172554']  // Slide 6 (Contact): Blue Midnight
];

// Helper to interpolate between two hex colors
function interpolateColor(color1: string, color2: string, factor: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  const rs = r.toString(16).padStart(2, '0');
  const gs = g.toString(16).padStart(2, '0');
  const bs = b.toString(16).padStart(2, '0');

  return `#${rs}${gs}${bs}`;
}

export default function MorphingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = usePortfolioStore((state) => state.scrollProgress);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const render = () => {
      time += 0.005;
      
      // Calculate interpolation targets based on scrollProgress
      const scaledProgress = scrollProgress * (bgColors.length - 1);
      const index1 = Math.floor(scaledProgress);
      const index2 = Math.min(index1 + 1, bgColors.length - 1);
      const factor = scaledProgress - index1;

      const activeColorStart = interpolateColor(bgColors[index1][0], bgColors[index2][0], factor);
      const activeColorEnd = interpolateColor(bgColors[index1][1], bgColors[index2][1], factor);

      ctx.clearRect(0, 0, width, height);

      // 1. Draw base linear gradient
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, activeColorStart);
      baseGrad.addColorStop(1, activeColorEnd);
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw organic morphing blobs over the gradient
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.12;

      const blobCount = 3;
      for (let i = 0; i < blobCount; i++) {
        // Blob coordinates drifting using sine waves
        const x = width / 2 + Math.sin(time * 0.4 + i * 2) * (width * 0.25);
        const y = height / 2 + Math.cos(time * 0.3 + i * 1.5) * (height * 0.25);
        const radius = Math.min(width, height) * (0.35 + Math.sin(time * 0.2 + i) * 0.05);

        const radialGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        radialGrad.addColorStop(0, activeColorEnd);
        radialGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [scrollProgress]);

  return (
    <canvas 
      ref={canvasRef} 
      className="morph-bg" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
