"use client";

import React, { useEffect, useRef } from 'react';

export default function CodeStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const fontSize = 15;
    const columns = Math.floor(width / 20) + 1;
    const yPositions = Array(columns).fill(0).map(() => Math.random() * -height);

    const symbols = '01{}[]()<>#$*&%+=_-/\\@!:;';

    const draw = () => {
      // Muted trail opacity
      ctx.fillStyle = 'rgba(5, 5, 5, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "Share Tech Mono"`;

      for (let i = 0; i < yPositions.length; i++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const x = i * 20;
        const y = yPositions[i];

        // Draw symbol with subtle crimson glow
        ctx.fillStyle = 'rgba(255, 0, 60, 0.12)'; // keep it very subtle
        ctx.fillText(symbol, x, y);

        // Head of stream has a slightly brighter red
        if (Math.random() > 0.98) {
          ctx.fillStyle = 'rgba(255, 0, 60, 0.4)';
          ctx.fillText(symbol, x, y);
        }

        // Increment drop or reset
        if (y > height + Math.random() * 600) {
          yPositions[i] = 0;
        } else {
          yPositions[i] = y + fontSize;
        }
      }
    };

    const interval = setInterval(draw, 40);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
        opacity: 0.35
      }}
    />
  );
}
