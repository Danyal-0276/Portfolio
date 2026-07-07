'use client';

import { useEffect, useRef } from 'react';

const PALETTE = [
  ['#0b0f1a', '#1a1035'],
  ['#0d1520', '#0f2a3d'],
  ['#100a1a', '#1e0a2e'],
  ['#0a1210', '#0a2820'],
];

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const drawOrb = (x: number, y: number, r: number, color: string, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(1, 'transparent');
      ctx.globalAlpha = alpha;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      t += 0.004;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, PALETTE[0][0]);
      grad.addColorStop(0.5, PALETTE[1][1]);
      grad.addColorStop(1, PALETTE[2][0]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'screen';
      drawOrb(
        w * 0.2 + Math.sin(t * 0.7) * w * 0.12,
        h * 0.3 + Math.cos(t * 0.5) * h * 0.1,
        Math.min(w, h) * 0.45,
        'rgba(46, 196, 182, 0.35)',
        0.55,
      );
      drawOrb(
        w * 0.75 + Math.cos(t * 0.6) * w * 0.1,
        h * 0.65 + Math.sin(t * 0.4) * h * 0.08,
        Math.min(w, h) * 0.38,
        'rgba(200, 255, 0, 0.28)',
        0.5,
      );
      drawOrb(
        w * 0.5 + Math.sin(t * 0.3) * w * 0.15,
        h * 0.85,
        Math.min(w, h) * 0.3,
        'rgba(99, 102, 241, 0.3)',
        0.4,
      );
      drawOrb(
        w * 0.9,
        h * 0.15 + Math.sin(t) * 40,
        Math.min(w, h) * 0.25,
        'rgba(230, 57, 70, 0.2)',
        0.35,
      );

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="bg-canvas" aria-hidden />
      <div className="bg-vignette" aria-hidden />
      <div className="bg-grain" aria-hidden />
    </>
  );
}
