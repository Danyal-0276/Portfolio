'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function initSmoothScroll(onScroll?: (y: number) => void) {
  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  document.documentElement.classList.add('lenis', 'lenis-smooth');

  lenis.on('scroll', ScrollTrigger.update);

  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  if (onScroll) lenis.on('scroll', ({ scroll }) => onScroll(scroll));

  ScrollTrigger.addEventListener('refresh', () => lenis?.resize());

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
    document.documentElement.classList.remove('lenis', 'lenis-smooth');
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}

export function useSmoothScroll(onScroll?: (y: number) => void) {
  const ready = useRef(false);
  useEffect(() => {
    if (ready.current) return;
    ready.current = true;
    return initSmoothScroll(onScroll);
  }, [onScroll]);
}

export function scrollToChapter(id: string) {
  const el = document.querySelector(`[data-chapter="${id}"]`) as HTMLElement | null;
  if (!el || !lenis) return;
  lenis.scrollTo(el, { offset: 0, duration: 1.5 });
}

export function refreshScroll() {
  ScrollTrigger.refresh();
  lenis?.resize();
}
