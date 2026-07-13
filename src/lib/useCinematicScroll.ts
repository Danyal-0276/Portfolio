'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function useCinematicScroll(onScroll?: (y: number) => void) {
  const initialized = useRef(false);
  const onScrollRef = useRef(onScroll);
  onScrollRef.current = onScroll;

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisInstance = lenis;

    document.documentElement.classList.add('lenis', 'lenis-smooth');

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      onScrollRef.current?.(scroll);
    });

    ScrollTrigger.addEventListener('refresh', () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisInstance = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
      initialized.current = false;
    };
  }, []);
}

export function scrollToSection(selector: string) {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el || !lenisInstance) return;
  lenisInstance.scrollTo(el, { offset: -80, duration: 1.4 });
}
