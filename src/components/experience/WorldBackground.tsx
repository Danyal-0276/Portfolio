'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from '@/lib/chapters';

export default function WorldBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    if (!bg || !orb1 || !orb2) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      CHAPTERS.forEach((chapter, i) => {
        const el = document.querySelector(`[data-chapter="${chapter.id}"]`);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => applyTheme(chapter),
          onEnterBack: () => applyTheme(chapter),
        });

      });

      function applyTheme(ch: typeof CHAPTERS[number]) {
        gsap.to(bg, { backgroundColor: ch.bg, duration: 0.8 });
        gsap.to(orb1, { backgroundColor: ch.orb, duration: 0.8 });
        gsap.to(orb2, { backgroundColor: ch.accent, opacity: 0.25, duration: 0.8 });
      }

      const first = CHAPTERS[0];
      gsap.set(bg, { backgroundColor: first.bg });
      gsap.set(orb1, { backgroundColor: first.orb });
      gsap.set(orb2, { backgroundColor: first.accent, opacity: 0.25 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={bgRef} className="world-bg" />
      <div ref={orb1Ref} className="world-orb world-orb-1" />
      <div ref={orb2Ref} className="world-orb world-orb-2" />
      <div className="world-grain" />
    </>
  );
}
