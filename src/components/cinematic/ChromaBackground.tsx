'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const CHROMA_CHAPTERS = [
  { bg: '#06080f', orb1: 'rgba(200,255,0,0.35)', orb2: 'rgba(46,196,182,0.25)', orb3: 'rgba(99,102,241,0.2)' },
  { bg: '#08061a', orb1: 'rgba(139,92,246,0.35)', orb2: 'rgba(200,255,0,0.2)', orb3: 'rgba(6,182,212,0.25)' },
  { bg: '#0a0512', orb1: 'rgba(6,182,212,0.4)', orb2: 'rgba(245,158,11,0.25)', orb3: 'rgba(200,255,0,0.15)' },
  { bg: '#120810', orb1: 'rgba(230,57,70,0.3)', orb2: 'rgba(139,92,246,0.3)', orb3: 'rgba(59,130,246,0.25)' },
  { bg: '#051210', orb1: 'rgba(16,185,129,0.35)', orb2: 'rgba(200,255,0,0.25)', orb3: 'rgba(6,182,212,0.2)' },
  { bg: '#0a0a06', orb1: 'rgba(200,255,0,0.4)', orb2: 'rgba(46,196,182,0.3)', orb3: 'rgba(99,102,241,0.15)' },
  { bg: '#060a10', orb1: 'rgba(59,130,246,0.3)', orb2: 'rgba(200,255,0,0.3)', orb3: 'rgba(230,57,70,0.15)' },
];

const SECTION_MAP = ['#hero', '#origin', '#voyage', '#research', '#philosophy', '#contact'];

export default function ChromaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ ...CHROMA_CHAPTERS[0], t: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const state = stateRef.current;

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
      state.t += 0.005;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = state.bg;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'screen';
      drawOrb(
        w * 0.15 + Math.sin(state.t * 0.6) * w * 0.1,
        h * 0.25 + Math.cos(state.t * 0.4) * h * 0.08,
        Math.min(w, h) * 0.5,
        state.orb1,
        0.7,
      );
      drawOrb(
        w * 0.8 + Math.cos(state.t * 0.5) * w * 0.08,
        h * 0.6 + Math.sin(state.t * 0.35) * h * 0.1,
        Math.min(w, h) * 0.42,
        state.orb2,
        0.6,
      );
      drawOrb(
        w * 0.5 + Math.sin(state.t * 0.25) * w * 0.12,
        h * 0.9,
        Math.min(w, h) * 0.35,
        state.orb3,
        0.5,
      );

      raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    render();

    const triggers: ScrollTrigger[] = [];
    SECTION_MAP.forEach((selector, i) => {
      const chapter = CHROMA_CHAPTERS[i] ?? CHROMA_CHAPTERS[0];
      const el = document.querySelector(selector);
      if (!el) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => gsap.to(state, { ...chapter, duration: 1.4, ease: 'power2.inOut' }),
          onEnterBack: () => gsap.to(state, { ...chapter, duration: 1.4, ease: 'power2.inOut' }),
        }),
      );
    });

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="bg-canvas" aria-hidden />
      <div className="bg-vignette" aria-hidden />
      <div className="bg-grain" aria-hidden />
      <div className="bg-scanlines" aria-hidden />
    </>
  );
}
